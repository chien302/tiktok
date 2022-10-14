import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const AccountItem = () => {
    return (
        <div className={cx('wrapper')}>
            <img
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-aiso/587e36217ad942a8de6c88163441e37a~c5_100x100.jpeg?x-expires=1665878400&x-signature=T%2BYVahYAce9ZZa%2F1yxnKtWiqsM0%3D"
                alt="name"
            />
            <div className={cx('info')}>
                <h4 className={cx('name')}>
                    <span>vuong xuan chien</span>
                    <FontAwesomeIcon className={cx('check')} icon={faCircleCheck} />
                </h4>
                <span className={cx('username')}>chienvuong302</span>
            </div>
        </div>
    );
};

export default AccountItem;
