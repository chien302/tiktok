import React from 'react';
import Header from '~/layouts/components/Header';
import SideBar from './Sidebar';
import styles from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <SideBar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
