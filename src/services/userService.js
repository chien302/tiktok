import * as request from '~/utils/request';

export const getSuggested = async ({ page, perPage }) => {
    try {
        const res = await request.get(`users/suggested`, {
            params: {
                page,
                per_page: perPage,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const getFollowing = async ({ page, accessToken }) => {
    try {
        const res = await request.get(`me/followings`, {
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
            params: {
                page: page,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
export const getCurrentUser = async ({ accessToken }) => {
    try {
        const res = await request.get('auth/me', {
            headers: { Authorization: 'Bearer ' + accessToken },
        });

        return res.data;
    } catch (error) {
        console.error(error);
    }
};
export const getAnUser = async ({ nickname, accessToken }) => {
    try {
        const res = await request.get(`users/@${nickname}`, {
            headers: { Authorization: 'Bearer ' + accessToken },
        });

        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const followAnUser = async ({ id, accessToken }) => {
    try {
        const res = await request.post(`users/${id}/follow`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const unFollowAnUser = async ({ id, accessToken }) => {
    try {
        const res = await request.post(`users/${id}/unfollow`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
