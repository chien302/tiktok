import React, { useState } from 'react';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEllipsisVertical,
    faEarthAsia,
    faCircleQuestion,
    faKeyboard,
    faVideo,
    faGear,
    faCoins,
    faUser,
    faArrowRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import images from '~/assets/images';
import routesConfig from '~/config/routes';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { IconInbox, IconMessage } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
import MenuLogin from '../MenuLogin';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shotcuts',
    },
];

const Header = ({ wider }) => {
    const [isShowMenuLogin, setIsShowMenuLogin] = useState(false);

    const handleLogin = () => {
        setIsShowMenuLogin(!isShowMenuLogin);
    };
    const handleCloseModal = () => {
        setIsShowMenuLogin(false);
    };
    const currentUser = JSON.parse(localStorage.getItem('user'));
    // console.log(currentUser.nickname);

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: `/@${currentUser?.nickname}` || '',
        },
        {
            icon: <FontAwesomeIcon icon={faCoins} />,
            title: 'Get coins',
            to: '/coin',
        },
        {
            icon: <FontAwesomeIcon icon={faVideo} />,
            title: 'LIVE Studio',
            to: '/studio',
        },
        {
            icon: <FontAwesomeIcon icon={faGear} />,
            title: 'Settings',
            to: '/settings',
        },
        ...MENU_ITEMS,
        {
            icon: <FontAwesomeIcon icon={faArrowRightFromBracket} />,
            title: 'Log out',
            to: '/',
            separate: true,
            type: 'logout',
        },
    ];
    const handleMenuChange = (item) => {
        console.log(item);
        // switch (item.to) {
        //     case '/@profile':
        //         item.to = currentUser.nickname;
        //         console.log('sdf');
        //         break;
        //     default:
        //         break;
        // }
    };
    const handleUpload = () => {
        window.location.href = 'upload';
        console.log('upload');
    };
    return (
        <>
            <header className={cx(`${wider ? 'wider' : 'wrapper'}`)}>
                <div className={cx('inner')}>
                    <Link to={routesConfig.home} className={cx('logo')}>
                        <img src={images.logo} alt="Tiktok" />
                    </Link>

                    {/* search */}
                    <Search />

                    <div className={cx('actions')}>
                        {currentUser ? (
                            <>
                                <Link to={routesConfig.upload}>
                                    <Button text>
                                        <FontAwesomeIcon icon={faPlus} /> Upload
                                    </Button>
                                </Link>
                                <Tippy placement="bottom" content="Message">
                                    <button className={cx('actions-btn')}>
                                        <IconMessage />
                                    </button>
                                </Tippy>
                                <Tippy placement="bottom" content="Inbox">
                                    <button className={cx('actions-btn')}>
                                        <IconInbox />
                                    </button>
                                </Tippy>
                            </>
                        ) : (
                            <>
                                <Button text>
                                    <FontAwesomeIcon icon={faPlus} /> Upload
                                </Button>
                                <Button primary onClick={handleLogin}>
                                    Log in
                                </Button>
                            </>
                        )}
                        <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                            {currentUser ? (
                                <Image className={cx('user-avatar')} src={currentUser.avatar} alt="ten" />
                            ) : (
                                <button className={cx('more-btn')}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} />
                                </button>
                            )}
                        </Menu>
                    </div>
                </div>
            </header>
            {isShowMenuLogin && <MenuLogin onClose={handleCloseModal} />}
        </>
    );
};

export default Header;
