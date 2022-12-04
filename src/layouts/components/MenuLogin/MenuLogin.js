import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import styles from './MenuLogin.module.scss';
import Modal from '~/components/Modal';
import routerConfig from '~/config/routes';
import {
    QRCodeIcon,
    PeopleIcon,
    FacebookIcon,
    GoogleIcon,
    LineIcon,
    TwitterIcon,
    KakaoTalkIcon,
    AppleIcon,
    InstagramIcon,
} from '~/components/Icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import EmailAndPassword from '../FormLogin/EmailAndPassword';
const cx = classNames.bind(styles);

const MenuLogin = ({ onClose }) => {
    const [more, setMore] = useState(false);

    const arrBtnLogin = [
        { type: 'qr', icon: <QRCodeIcon width={20} height={20} />, text: 'Use QR code' },
        {
            type: 'user',
            icon: <PeopleIcon width={20} height={20} />,
            text: 'Use phone / email / username',
            children: {
                title: 'Login',
            },
        },
        { type: 'fb', icon: <FacebookIcon width={20} height={20} />, text: 'Continue with Facebook' },
        { type: 'gg', icon: <GoogleIcon width={20} height={20} />, text: 'Continue with Google' },
        { type: 'line', icon: <LineIcon width={20} height={20} />, text: 'Continue with Line' },
        { type: 'twitter', icon: <TwitterIcon width={20} height={20} />, text: 'Continue with Twitter' },
        { type: 'kakao', icon: <KakaoTalkIcon width={20} height={20} />, text: 'Continue with KakaoTalk' },
        { type: 'apple', icon: <AppleIcon width={20} height={20} />, text: 'Continue with Apple' },
        { type: 'instagram', icon: <InstagramIcon width={20} height={20} />, text: 'Continue with Instagram' },
    ];
    const [history, setHistory] = useState({ data: arrBtnLogin });

    const handleShowTypeFormLogin = (item) => {
        setMore(!more);
        // if (item.type === 'user') {
        //     if (item.children && more === true) {
        //         setHistory((prev) => [...prev, ...item.children]);
        //     }
        // }
    };
    const handleBack = () => {
        setMore(false);
    };
    return (
        <Modal>
            <div className={cx('wrapper')}>
                <div className={cx('header')} onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={cx('content')}>
                    {more ? (
                        <EmailAndPassword onBack={handleBack} />
                    ) : (
                        <div className={cx('content-first')}>
                            <div className={cx('heading')}>
                                <p>Log in to Tiktok</p>
                            </div>
                            <div className={cx('content-social')}>
                                <div className={cx('social-icons')}>
                                    {arrBtnLogin.map((item, index) => (
                                        <Link onClick={() => handleShowTypeFormLogin(item)} key={index}>
                                            {item.icon}
                                            <span>{item.text}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={cx('btn-auth')}>
                        <p>Don’t have an account?</p>
                        <Link className={cx('btn-signup')} to={routerConfig.signUp}>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default MenuLogin;
