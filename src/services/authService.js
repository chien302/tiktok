import * as request from '~/utils/request';

export const login = async (email, password) => {
    try {
        const res = await request.post('auth/login', {
            email: email,
            password: password,
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

export const logout = async () => {
    try {
        const res = await request.post('auth/logout');
        return res.data;
    } catch (error) {
        console.error(error);
    }
};
