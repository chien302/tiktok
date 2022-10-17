import React from 'react';
import classNames from 'classnames/bind';
import styles from './AccountItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import Image from '~/components/Image/index';
const cx = classNames.bind(styles);

const AccountItem = () => {
    return (
        <div className={cx('wrapper')}>
            <Image
                className={cx('avatar')}
                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6389d4daedc46c24becb210be44bec2e~c5_100x100.jpeg?x-expires=1665943200&x-signature=h4fz6kPlhezGuEfNphGum%2BCKrx8%3D"
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
