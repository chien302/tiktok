import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './EmailAndPassword.module.scss';
import { Link } from 'react-router-dom';
import Button from '~/components/Button';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as authService from '~/services/authService';
const cx = classNames.bind(styles);

const EmailAndPassword = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        authService
            .login(email, password)
            .then((res) => {
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('token', JSON.stringify(res.meta));
                setCurrentUser(true);
                navigate('/');
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });
    };
    return (
        <div className={cx('wrapper')}>
            <div onClick={onBack} className={cx('icon-back')}>
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
            {/* <h2>{title}</h2> */}
            <h2>Login</h2>
            <div className={cx('login-type')}>
                Email or username
                <Link>Log in with phone</Link>
            </div>
            <form className={cx('form')}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email or username"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <Link>Forgot Password?</Link>
                <Button
                    onClick={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }}
                    primary
                >
                    Log in
                </Button>
            </form>
        </div>
    );
};

export default EmailAndPassword;
