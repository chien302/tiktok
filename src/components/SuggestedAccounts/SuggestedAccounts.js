import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
const cx = classNames.bind(styles);
const SuggestedAcount = ({ label }) => {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>
            <AccountItem />
            <AccountItem />
            <p className={cx('see-more')}>See all</p>
        </div>
    );
};

SuggestedAcount.propTypes = {
    lable: PropTypes.string.isRequired,
};

export default SuggestedAcount;
