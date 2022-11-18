import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import Button from '~/components/Button';

const cx = classNames.bind(styles);
const MenuItem = ({ data, onClick }) => {
    return (
        <Button
            className={cx('menu-item', data.separate ? 'separate' : '')}
            leftIcon={data.icon}
            to={data.to}
            onClick={onClick}
        >
            {data.title}
        </Button>
    );
};
MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
