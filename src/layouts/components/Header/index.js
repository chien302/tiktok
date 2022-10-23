import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
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
import routesConfig from '~/config/routes';

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { IconInbox, IconMessage } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
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

const Header = () => {
    const handleMenuChange = (item) => {
        console.log(item);
    };
    const currentUser = true;

    const userMenu = [
        {
            icon: <FontAwesomeIcon icon={faUser} />,
            title: 'View profile',
            to: '/@chien302',
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
            to: '/logout',
            separate: true,
        },
    ];
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Link to={routesConfig.home} className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok" />
                </Link>

                {/* search */}
                <Search />

                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Button text>
                                <FontAwesomeIcon icon={faPlus} /> Upload
                            </Button>
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
                            <Button primary>Log in</Button>
                        </>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/6389d4daedc46c24becb210be44bec2e~c5_100x100.jpeg?x-expires=1665943200&x-signature=h4fz6kPlhezGuEfNphGum%2BCKrx8%3D"
                                alt="ten"
                            />
                        ) : (
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    );
};

export default Header;
