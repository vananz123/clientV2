/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request';
import { Product, Filter } from '@/type';
interface Result<T> {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: T;
}
interface PagingResult<T> {
    items: T;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalRecords: number;
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
    const res: Result<PagingResult<Product[]>> = await request.get(`/product/suggest/user`);
    return res;
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
    const resp: Result<PagingResult<Product[]>> = {
        error: '',
        isSuccessed: res.isSuccessed,
        message: res.message,
        statusCode: 200,
        resultObj: res.resultObj,
    };
    return resp;
};
export const productViewCount = async (id: number) => {
    const res = await request.put(`/product/view-count/${id}`);
    const resp: Result<number> = {
        error: '',
        isSuccessed: res.isSuccessed,
        message: res.message,
        statusCode: 201,
        resultObj: res.resultObj,
    };
    return resp;
};
export const productItemViewCount = async (id: number) => {
    const res = await request.put(`/product/product-item/view-count/${id}`);
    const resp: Result<number> = {
        error: '',
        isSuccessed: res.isSuccessed,
        message: res.message,
        statusCode: 201,
        resultObj: res.resultObj,
    };
    return resp;
};
