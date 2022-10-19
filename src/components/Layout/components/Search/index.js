import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faSpinner, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import HeadLess from '@tippyjs/react/headless';
import Wrapper from '~/components/Popper/Wrapper';
import AccountItem from '~/components/AccountItem';
import { useDebouned } from '~/hooks';
import * as searchService from '~/apiServices/searchService';

const cx = classNames.bind(styles);

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const debouned = useDebouned(searchValue, 500);
    const inputRef = useRef();

    useEffect(() => {
        if (!searchValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debouned);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debouned]);

    const handleHideResult = () => {
        setShowResult(false);
    };
    return (
        <HeadLess
            interactive={true}
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        <h4 className={cx('search-title')}>Account</h4>
                        {searchResult.map((result) => (
                            <AccountItem key={result.id} data={result} />
                        ))}
                    </Wrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    placeholder="Search accounts and videos"
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    onFocus={() => setShowResult(true)}
                />
                {!!searchValue && !loading && (
                    <button
                        className={cx('clear')}
                        onClick={() => {
                            setSearchValue('');
                            setSearchResult([]);
                            inputRef.current.focus();
                        }}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}
                {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
            </div>
        </HeadLess>
    );
};

export default Search;
