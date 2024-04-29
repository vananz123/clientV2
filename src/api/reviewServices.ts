import * as request from '../utils/request';
import { Result, Review } from './ResType';

export const createReivew = async (data: Review) => {
    try {
        const add = {
            userId:data.userId,
            orderDetailId:data.orderDetailId,
            rate:data.rate,
            comment:data.comment
        };
        const res = await request.post(`/review`, add);
        const resultObj: Review = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 201,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const updateReivew = async (data: Review) => {
    try {
        const add = {
            id:data.id,
            rate:data.rate,
            comment:data.comment
        };
        const res = await request.put(`/review`, add);
        const resultObj: Review = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 201,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const deleteReivew = async (id: number) => {
    try {

        const res = await request.del(`/review/${encodeURIComponent(id)}`);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 201,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};