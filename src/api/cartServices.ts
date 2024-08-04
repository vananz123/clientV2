/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { CartResult } from './ResType';
interface Result<T> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
export const getCart = async (id: string) => {
    const res: Result<CartResult> = await request.get(`/cart/user/${encodeURIComponent(id)}`);
    return res;
};
export const addCart = async (userId: string, productItemId: number, quantity: number) => {
    const item = {
        userId: userId,
        productItemId: productItemId,
        quantity: quantity,
    };
    const res: Result<CartResult> = await request.post(`/cart`, item);
    return res;
};
export const updateCart = async (id: number, quantity: number) => {
    const item = {
        id: id,
        quantity: quantity,
    };
    const res: Result<CartResult> = await request.put(`/cart`, item);
    return res;
};
export const deleteCart = async (id: number) => {
    const res: Result<CartResult> = await request.del(`/cart/${encodeURIComponent(id)}`);
    return res;
};
