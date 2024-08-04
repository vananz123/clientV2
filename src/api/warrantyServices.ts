/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import * as request from '../utils/request';
import { Result, Warranty } from './ResType';
export interface ResultWarranty  extends Result {
    resultObj: Warranty | undefined;
}
export const getAllByOrderDetailId = async (id:number) => {
    try {
        const params = {
            id:id
        }
        const res = await request.get(`/warranties`,{params});
        const resultObj: Warranty[] = res.resultObj;
        return resultObj
    } catch (error) {
        //const resError = error as AxiosError
        return undefined;
    }
};
export const GetBuId = async (id:number) => {
    try {
        const res = await request.get(`/warranties/${encodeURIComponent(id)}`);
        const resultObj: Warranty = res.resultObj;
        return resultObj
    } catch (error) {
        const resError = error as AxiosError
        return resError;
    }
};