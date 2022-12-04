import React from 'react';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';
import SideBar from '../components/Sidebar';
import styles from './WiderLayout.module.scss';

const cx = classNames.bind(styles);
const WiderLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header wider={true} />
            <div className={cx('container')}>
                <SideBar wider={true} />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default WiderLayout;
