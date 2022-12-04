import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleCheck,
    faCommentDots,
    faHeart,
    faMusic,
    faShare,
    faCode,
    faPaperPlane,
    faLink,
    faChevronDown,
    faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import config from '../../config/routes';
import styles from './VideoItem.module.scss';
import Image from '../Image';
import Button from '../Button';
import VideoControl from './VideoControl';
import {
    faFacebook,
    faLine,
    faLinkedinIn,
    faPinterest,
    faReddit,
    faTelegram,
    faTwitter,
    faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
// import * as videoService from '~/services/videoService';
import * as userService from '~/services/userService';
const cx = classNames.bind(styles);

const VideoItem = ({ data }) => {
    console.log(data);
    const refVideo = useRef();
    const [showMore, setShowMore] = useState(false);
    const [isFollowed, setIsFollowed] = useState(data.user.is_followed);
    // const [isShowTippy, setIsShowTippy] = useState(false);
    const metaToken = JSON.parse(localStorage.getItem('token'));
    let accessToken = metaToken.token;
    const currentUser = JSON.parse(localStorage.getItem('user'));
    let arrSocialBefore = [
        { icon: faCode, title: 'Nhúng' },
        { icon: faPaperPlane, title: 'Gửi đến bạn bè' },
        { icon: faFacebook, title: 'Chia sẻ với Facebook' },
        { icon: faWhatsapp, title: 'Chia sẻ với Whatsapp' },
        { icon: faLink, title: 'Sao chép liên kết' },
    ];
    let arrSocialAfter = [
        { icon: faTwitter, title: 'Chia sẻ với Twitter' },
        { icon: faLinkedinIn, title: 'Chia sẻ với LinkedIn' },
        { icon: faReddit, title: 'Chia sẻ với Reddit' },
        { icon: faTelegram, title: 'Chia sẻ với Telegram' },
        { icon: faEnvelope, title: 'Chia sẻ với Email' },
        { icon: faLine, title: 'Chia sẻ với Line' },
        { icon: faPinterest, title: 'Chia sẻ với Pinterest' },
    ];
    let result = [];
    const handleLoadMoreSocialShare = () => {
        setShowMore(!showMore);
    };
    if (showMore === true) {
        result = arrSocialBefore.push(...arrSocialAfter);
    } else {
        result = arrSocialBefore.slice(5);
    }
    const renderInforShare = () => {
        return (
            <div className={cx('share-social')}>
                {arrSocialBefore.map((item, index) => (
                    <Link to="/embed" key={index}>
                        <span>
                            <FontAwesomeIcon icon={item.icon} />
                        </span>
                        <p>{item.title}</p>
                    </Link>
                ))}

                {!showMore === true && (
                    <button onClick={handleLoadMoreSocialShare}>
                        <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                )}
            </div>
        );
    };
    const handleLikeAPost = (id) => {
        console.log(id);
        console.log('api not support');

        // videoService
        //     .likeAVideo(id)
        //     .then((data) => {
        //         console.log(data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };
    const handleFolowUser = () => {
        if (accessToken) {
            if (isFollowed) {
                userService
                    .unFollowAnUser({ id: data.user_id, accessToken: accessToken })
                    .then((data) => {
                        setIsFollowed(data.is_followed);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                userService
                    .followAnUser({ id: data.user_id, accessToken: accessToken })
                    .then((data) => {
                        // console.log(data.is_followed);
                        setIsFollowed(data.is_followed);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            alert('Please login!!!');
            return;
        }
    };
    return (
        <div className={cx('wrapper')}>
            <Link to={`@${data.user.nickname}`}>
                <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
            </Link>
            <div className={cx('content')}>
                <div className={cx('content-info')}>
                    {/* <div> */}
                    <div className={cx('info')}>
                        <Link to={`@${data.user.nickname}`} className={cx('title-name')}>
                            <h3 className={cx('nickname')}>
                                {data.user.nickname}
                                {data.user.tick && (
                                    <FontAwesomeIcon className={cx('icon-check')} icon={faCircleCheck} />
                                )}
                            </h3>
                            <h4 className={cx('username')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                        </Link>
                        <div className={cx('description')}>{data.description}</div>

                        <div className={cx('music')}>
                            <FontAwesomeIcon icon={faMusic} />
                            <p>Nhạc nền</p>
                        </div>
                        <Button className={cx('button')} outline onClick={handleFolowUser}>
                            {data.user.is_followed ? 'Following' : 'Follow'}
                        </Button>
                    </div>
                    {/* </div> */}
                </div>
                <div className={cx('content-wrapper')}>
                    <div className={cx('content-video')}>
                        <video ref={refVideo} loop className={cx('video')}>
                            <source src={data.file_url} type="video/mp4" />
                            <source src={data.thumb_url} type="video/ogg" />
                        </video>
                        <div className={cx('control')}>
                            <VideoControl refVideo={refVideo} />
                        </div>
                    </div>
                    <div className={cx('count-social')}>
                        <button
                            onClick={() => {
                                handleLikeAPost(data.id);
                            }}
                        >
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                            </span>
                            <strong>{data.likes_count}</strong>
                        </button>
                        <button>
                            <span>
                                <FontAwesomeIcon className={cx('icon')} icon={faCommentDots} />
                            </span>
                            <strong>{data.comments_count}</strong>
                        </button>
                        <Tippy zIndex delay={[0, 0]} interactive render={renderInforShare}>
                            <button className={cx('btn-relative')}>
                                <span>
                                    <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                                </span>
                                <strong>{data.shares_count}</strong>
                                <div className={cx('arrow-down--after')}></div>
                            </button>
                        </Tippy>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;
