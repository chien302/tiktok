import React from 'react';
import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

const Modal = ({ children }) => {
    return <div className={cx('modal')}>{children}</div>;
};

export default Modal;
