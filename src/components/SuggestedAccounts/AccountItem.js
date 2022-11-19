import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';

const cx = classNames.bind(styles);
const AccountItem = () => {
    return (
        <Link to="/profile" className={cx('account-item')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/798ca29ead6940b00e23b1b7fbd45b46~c5_100x100.jpeg?x-expires=1669021200&x-signature=luHCFcO05B2vDmdS5W3zzpBItQk%3D"
                alt=""
            />
            <div className={cx('item-info')}>
                <p className={cx('nickname')}>
                    <strong>chien302</strong>
                    <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />
                </p>
                <p className={cx('name')}>chien vuong xuan</p>
            </div>
        </Link>
    );
};

export default AccountItem;
