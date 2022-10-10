import React from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const SideBar = () => {
    return (
        <aside className={cx('wrapper')}>
            <div>side bar</div>
        </aside>
    );
};

export default SideBar;
