import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';
const cx = classNames.bind(styles);

const SuggestedAcount = ({ label, data = [], onSeeAll }) => {
    return (
        <div className={cx('wrapper')}>
            <p className={cx('label')}>{label}</p>

            {data.map((account) => (
                <AccountItem key={account.id} data={account} />
            ))}

            <p className={cx('see-more')} onClick={onSeeAll}>
                See all
            </p>
        </div>
    );
};

SuggestedAcount.propTypes = {
    label: PropTypes.string.isRequired,
    data: PropTypes.array,
};

export default SuggestedAcount;
