import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import { Wrapper } from '~/components/Popper';

import styles from './SuggestedAccounts.module.scss';
import AccountPreview from './AccountPreview';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

const AccountItem = ({ data }) => {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <Wrapper>
                    <AccountPreview data={data} />
                </Wrapper>
            </div>
        );
    };
    return (
        <Tippy interactive delay={[800, 0]} render={renderPreview} placement="bottom-start" offset={[0, 0]}>
            <Link to={`/@${data.nickname}`} className={cx('account-item')}>
                <Image className={cx('avatar')} src={data.avatar} alt={data.nickname} />
                <div className={cx('item-info')}>
                    <p className={cx('nickname')}>
                        <strong>{data.nickname}</strong>
                        {data.tick ? <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} /> : ''}
                    </p>
                    <p className={cx('name')}>
                        {data.first_name} {data.last_name}
                    </p>
                </div>
            </Link>
        </Tippy>
    );
};

AccountItem.propTypes = {
    data: PropTypes.object.isRequired,
};

export default AccountItem;
