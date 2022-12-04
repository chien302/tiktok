import React from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

const ProfileVideoItem = ({ item }) => {
    return (
        <>
            <div className={cx('video-item')}>
                <video poster={item.thumb_url} width="320" height="240">
                    <source src={item.file_url} type="video/mp4" />
                </video>
                <div className={cx('video-desc')}>{item.description}</div>
            </div>
        </>
    );
};

export default ProfileVideoItem;
