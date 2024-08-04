/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { LoginType } from '@/pages/Login';

interface Result<T> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export type ResponseLoginType = {
    accessToken: string;
    refreshToken: string;
};
export const loginGoogle = async (accessToken: string) => {
    const res: Result<ResponseLoginType> = await request.post(`/authentication/login-google`, {
        accessToken: accessToken,
        provider: 'google',
    });
    return res;
};
export const login = async (user: LoginType) => {
    const login = {
        email: user.email,
        password: user.password,
        rememberMe: true,
    };
    const res: Result<ResponseLoginType> = await request.post(`/authentication/login`, login);
    return res;
};
