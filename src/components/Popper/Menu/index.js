import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { Wrapper } from '~/components/Popper';
import MenuItem from './MenuItem';
import Header from './Header';
import * as authService from '~/services/authService';

const cx = classNames.bind(styles);

const Menu = ({ children, hideOnClick = false, items = [], onChange }) => {
    const [history, setHistory] = useState([{ data: items }]);
    // const [isLogout, setIsLogout] = useState(false);
    const current = history[history.length - 1];
    const navigate = useNavigate();
    const logout = () => {
        authService
            .logout()
            .then(() => {
                localStorage.removeItem('user');
                // navigate('/');
                navigate('/');
                window.location.reload();
            })
            .catch((error) => console.log(error));
    };
    // logout();
    const handleClickOption = (item) => {
        if (item.type && item.type === 'logout') {
            logout();
        }
    };

    const renderItem = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;
            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={
                        () => handleClickOption(item)
                        // () => {
                        // if (isParent) {
                        //     setHistory((prev) => [...prev, item.children]);
                        //     console.log(item.children);
                        // } else {
                        // onChange(item);
                        // if (item.children.type) {
                        //     console.log(item.children.type);
                        // }
                        // if (item.children.type === 'logout') {
                        //     logout();
                        //     console.log(isLogout);
                        // }
                        // }
                        // }
                    }
                />
            );
        });
    };
    return (
        <Tippy
            interactive={true}
            delay={[0, 700]}
            offset={[20, 10]}
            hideOnClick={hideOnClick}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <Wrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <Header
                                title={current.title}
                                onBack={() => setHistory((prev) => prev.slice(0, prev.length - 1))}
                            />
                        )}
                        <div className={cx('menu-body')}>{renderItem()}</div>
                        {/* {renderItem()} */}
                    </Wrapper>
                </div>
            )}
            onHide={() => setHistory((prev) => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
};

Menu.propTypes = {
    children: PropTypes.node.isRequired,
    hideOnClick: PropTypes.bool,
    items: PropTypes.array,
    onChange: PropTypes.func,
};

export default Menu;
