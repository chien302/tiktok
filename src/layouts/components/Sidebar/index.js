import React, { useState, useEffect } from 'react';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
import Menu, { MenuItem } from './Menu';
import {
    HomeIcon,
    HomeActiveIcon,
    UserGroupIcon,
    UserGroupActiveIcon,
    LiveIcon,
    LiveActiveIcon,
} from '~/components/Icons';
import config from '~/config/routes';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import FollowingAccount from '~/components/SuggestedAccounts/FollowingAccount';

import * as userService from '~/services/userService';
const cx = classNames.bind(styles);

const INIT_PAGE = 1;
const PER_PAGE = 5;
const F_PER_PAGE = 1;
const SideBar = ({ wider }) => {
    const [suggestedUser, setSuggestedUser] = useState([]);
    const [followingUser, setFollowingUser] = useState([]);
    const [page, setPage] = useState(INIT_PAGE);
    const [fPerPage, setFPerPage] = useState(F_PER_PAGE);

    const currentUser = JSON.parse(localStorage.getItem('user'));
    const metaToken = JSON.parse(localStorage.getItem('token'));
    let accessToken = metaToken.token;

    useEffect(() => {
        userService
            .getSuggested({ page, perPage: PER_PAGE })
            .then((data) => {
                setSuggestedUser((prevUser) => [...prevUser, ...data]);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);
    const handleSeeAll = () => {
        // setPage(page + 1);
    };

    useEffect(() => {
        if (accessToken) {
            userService
                .getFollowing({ page: fPerPage, accessToken: accessToken })
                .then((data) => {
                    setFollowingUser(data);
                    // console.log(data);
                })
                .catch((err) => console.log(err));
        }
    }, [fPerPage, accessToken]);
    return (
        <aside className={cx(`${wider ? 'wider' : 'wrapper'}`)}>
            <Menu>
                <MenuItem title="For You" to={config.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
                <MenuItem title="LIVE" to={config.live} icon={<LiveIcon />} activeIcon={<LiveActiveIcon />} />
            </Menu>
            <SuggestedAccounts label="Suggested accounts" data={suggestedUser} onSeeAll={handleSeeAll} />
            {currentUser && <FollowingAccount label="Following accounts" data={followingUser} />}
        </aside>
    );
};

export default SideBar;
