import * as request from '../utils/request';
import {  Result } from './ResType';
export const getAnalysis = async () => {
    try {
        const res = await request.get(`/statistic`);
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : res,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const getSaleOfDate = async () => {
    try {
        const res = await request.get(`/statistic/sale-of-date`);
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : res,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};