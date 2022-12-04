import * as request from '~/utils/request';

export const getVideos = async ({ type, page = 1 }) => {
    try {
        const res = await request.get(`videos`, {
            params: {
                type,
                page,
            },
        });
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
export const likeAVideo = async ({ videoId }) => {
    try {
        const res = await request.post(`posts/${videoId}/like`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
};

export const createAVideo = async ({ post, accessToken }) => {
    try {
        const res = await request.post('videos', {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: 'Bearer ' + accessToken,
            },
        });
    } catch (error) {
        console.error(error);
    }
};
