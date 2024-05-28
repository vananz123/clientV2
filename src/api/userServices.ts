/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterUser } from '@/pages/Register';
import * as request from '../utils/request';
import { Result, Address, RoleType } from './ResType';
import { ResponseUser } from './ResType';
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
export const getRoles = async () => {
    try {
        const res = await request.get(`/role`);
        const resultObj: RoleType[] = res.resultObj;
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
export const assginRoles = async (id:string,value:string) => {
    try {
        const res = await request.put(`/user/roles`,{id:id,roleName:value});
        const resultObj: RoleType[] = res.resultObj;
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
export const getAllUser = async (roleName:string) => {
    try {
        const res = await request.get(`/user/role/${encodeURIComponent(roleName)}`);
        const resultObj :ResponseUser[] = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj,
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
        // const resp: Result = {
        //     error: '',
        //     isSuccessed: res.isSuccessed,
        //     message: res.message,
        //     statusCode: 200,
        //     resultObj: resultObj,
        // };
        return resultObj;
    } catch (error: any) {
        return undefined;
    }
};
export const addAddress = async (data: Address) => {
    try {
        const add = {
            province:data.province,
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
            province:data.province,
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

