/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { PagingResult, Result } from './ResType';
import { Product, Filter } from '@/type';
export interface PagingProduct extends PagingResult {
    items: Product[];
}
export interface ResultProduct extends Result {
    resultObj: Product;
}
export const getAllProduct = async () => {
    try {
        const res = await request.get(`/product`);
        const resultObj: Product[] = res.resultObj;
        return resultObj;
    } catch (error: any) {
        return undefined;
    }
};
export const getAllProductByUser = async () => {
    const res = await request.get(`/product/suggest/user`);
    const resultObj: PagingProduct = res.resultObj;
    return resultObj;
};
export const getProductDetail = async (id: number) => {
    try {
        const res = await request.get(`/product/${encodeURIComponent(id)}`);
        const resultObj: Product = res.resultObj;
        return resultObj;
    } catch (error) {
        return undefined;
    }
};
export const getProductPagingByFilter = async (filter: Filter) => {
    let material: string = '';
    filter.optionMaterial?.forEach((e: string) => {
        material += e + ',';
    });
    const params = {
        categoryId: filter.categoryId,
        productName: filter.productName,
        optionPrice: filter.optionPrice,
        pageIndex: filter.page,
        pageSize: filter.pageSize,
        MaterialName: material,
        sortOder: filter.sortOder || 'ascending',
        isPromotion: filter.isPromotion || false,
        productStatus: filter.productStatus,
    };
    const res = await request.get(`/product/filter`, {
        params,
        paramsSerializer: {
            indexes: null, // by default: false
        },
    });
    const paging: PagingProduct = res.resultObj;
    const resp: Result = {
        error: '',
        isSuccessed: res.isSuccessed,
        message: res.message,
        statusCode: 200,
        resultObj: paging,
    };
    return resp;
};
export const productViewCount = async (id: number) => {
    try {
        const res = await request.put(`/product/view-count/${id}`);
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
export const productItemViewCount = async (id: number) => {
    try {
        const res = await request.put(`/product/product-item/view-count/${id}`);
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
