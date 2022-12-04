import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless';
import { useParams, Link } from 'react-router-dom';
import * as userService from '~/services/userService';
import styles from './Profile.module.scss';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { ShareIcon, MoreIcon, SendMessageIcon, ReportIcon, BlockIcon, NoVideoIcon } from '~/components/Icons';
// import useHover from '~/hooks/useHover';
import ProfileVideoItem from './ProfileVideoItem';

const cx = classNames.bind(styles);
const Profile = () => {
    // const currentUser = localStorage.getItem('user');
    const metaToken = localStorage.getItem('token');
    const accessToken = JSON.parse(metaToken).token;
    // console.log(accessToken);
    // console.log(currentUser);
    const [user, setUser] = useState({});
    // const [authUser, setAuthUser] = useState(null);
    // const postRef = useRef();
    // const [postRef, isHovered] = useHover();
    // const [likeRef, isChoose] = useHover();

    // console.log(isHovered);
    // console.log(isChoose);

    // console.log(postRef);
    // console.log(likeRef);

    const { nickname } = useParams();
    // useEffect(() => {
    //     if (currentUser && accessToken) {
    //         userService
    //             .getAnUser({ nickname, accessToken })
    //             .then((data) => {
    //                 setAuthUser(data);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     } else {
    //         userService
    //             .getAnUser({ nickname })
    //             .then((item) => {
    //                 setUser(item);
    //             })
    //             .catch((error) => console.log(error));
    //     }
    // }, [nickname]);
    useEffect(() => {
        userService
            .getAnUser({ nickname, accessToken })
            .then((data) => {
                setUser(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [nickname, accessToken]);

    const renderMore = () => {
        return (
            <div className={cx('more-wrapper')}>
                <div className={cx('more-container')}>
                    <Link to="/message">
                        <SendMessageIcon />
                        <p>Send message</p>
                    </Link>
                    <Link to="/report">
                        <ReportIcon />
                        <p>Report</p>
                    </Link>
                    <Link to="/block">
                        <BlockIcon />
                        <p>Block</p>
                    </Link>
                </div>
            </div>
        );
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('profile')}>
                <div className={cx('info')}>
                    <Image className={cx('avatar')} src={user.avatar} alt={user.nickname} />
                    <div className={cx('title-contain')}>
                        <h2 className={cx('nickname')}>
                            {user.nickname}
                            {user.tick && <FontAwesomeIcon className={cx('icon-check')} icon={faCheckCircle} />}
                        </h2>
                        <h1 className={cx('fullname')}>{`${user.first_name} ${user.last_name}`}</h1>
                        <Button className={cx('btn')} primary>
                            Follow
                        </Button>
                    </div>
                </div>
                <h2 className={cx('count-info')}>
                    <div>
                        <strong>{user.followings_count}</strong>
                        <span>Following</span>
                    </div>
                    <div>
                        <strong>{user.followers_count}</strong>
                        <span>Followers</span>
                    </div>
                    <div>
                        <strong>{user.likes_count}</strong>
                        <span>Likes</span>
                    </div>
                </h2>
                <h2 className={cx('descript')}>{user.bio}</h2>
                <div className={cx('share-item')}>
                    <ShareIcon />
                </div>
                <Tippy
                    // onHide={false}
                    interactive
                    delay={[200, 0]}
                    render={renderMore}
                    placement="bottom-end"
                    offset={[0, 10]}
                    zIndex={100}
                >
                    <div className={cx('more-item')}>
                        <MoreIcon />
                    </div>
                </Tippy>
            </div>
            <div className={cx('collection')}>
                <div className={cx('feed-tab')}>
                    <p className={cx(`video-post`)}>
                        <span>Videos</span>
                    </p>
                    <p className={cx(`video-like`)}>
                        <span>Liked</span>
                    </p>
                    <div className={cx('bottom-line')}></div>
                </div>
                {/* <div className={cx('list-video')}>
                    {user.videos && user.videos.length > 0 ? (
                        user.videos?.map((item) => <ProfileVideoItem key={item.id} item={item} />)
                    ) : (
                       
                    )}
                </div> */}
                {user.videos && user.videos.length > 0 ? (
                    <div className={cx('list-video')}>
                        {user.videos?.map((item) => (
                            <ProfileVideoItem key={item.id} item={item} />
                        ))}
                    </div>
                ) : (
                    <div className={cx('no-video')}>
                        <NoVideoIcon />
                        <strong>Upload your first video</strong>
                        <h3>Your videos will appear here</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
