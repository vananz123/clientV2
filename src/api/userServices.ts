import { RegisterUser } from '@/pages/Register';
import * as request from '../utils/request';
import { Result, Address, PagingResult } from './ResType';
export type ResponseUser = {
    id: string;
    roles: string[];
    firstName: string;
    lastName: string;
    fullName: string;
    email: string;
    userName: string;
    phoneNumber: string;
};
export const getUser = async () => {
    try {
        const res = await request.get(`/user`);
        const resultObj: ResponseUser = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const getAllUser = async () => {
    try {
        const res = await request.get(`/user/keyword?PageIndex=1&PageSize=100`);
        const resultObj :ResponseUser[] = res.resultObj.items
        const paging: PagingResult = {
            items: resultObj,
            pageIndex : res.resultObj.pageIndex,
            pageCount:res.resultObj.pageCount,
            pageSize:res.resultObj.pageSize,
            totalRecords:res.resultObj.totalRecords
        }
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : paging,
        }
        return resp
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const Register = async (data: RegisterUser) => {
    try {
        const user = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            password: data.password,
            userName: data.userName,
            confirmPassword: data.confirmPassword,
        };
        const res = await request.post(`/user`, user);
        const resultObj: ResponseUser = res.resultObj;
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
export const getAddressByUserId = async (id: string) => {
    try {
        const res = await request.get(`/address/user/${encodeURIComponent(id)}`);
        const resultObj: Address[] = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const addAddress = async (data: Address) => {
    try {
        const add = {
            province:'',
            city: data.city,
            phoneNumber: data.phoneNumber,
            streetNumber: data.streetNumber,
            urbanDistrict: data.urbanDistrict,
            userId: data.userId,
            wardCommune: data.wardCommune,
        };
        const res = await request.post(`/address`, add);
        const resultObj: Address = res.resultObj;
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
export const updateAddress = async (data: Address) => {
    try {
        const add = {
            id:data.id,
            province:'',
            city: data.city,
            phoneNumber: data.phoneNumber,
            streetNumber: data.streetNumber,
            urbanDistrict: data.urbanDistrict,
            userId: data.userId,
            wardCommune: data.wardCommune,
        };
        const res = await request.put(`/address`, add);
        const resultObj: Address = res.resultObj;
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
export const deleteAddress = async (id: number) => {
    try {
        const res = await request.del(`/address/${encodeURIComponent(id)}`);
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
export const forgotPass = async (email: string) => {
    try {
        const res = await request.post(`/user/forgot-password?email=${encodeURIComponent(email)}`,{});
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};
export const resetPass = async (token:string,email: string,password:string) => {
    try {
        const re ={
            token :token,
            email:email,
            password:password,
            confirmPassword:password
        }
        const res = await request.post(`/user/reset-password`,re);
        const resultObj = res.resultObj;
        const resp: Result = {
            error: '',
            isSuccessed: res.isSuccessed,
            message: res.message,
            statusCode: 200,
            resultObj: resultObj,
        };
        return resp;
    } catch (error: any) {
        console.log(error.response.data);
        const resError: Result = error.response.data;
        return resError;
    }
};

