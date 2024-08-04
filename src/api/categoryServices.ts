/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result } from './ResType'
import { Category } from '@/type'
export const getAllCate = async()=>{ 
    try{
        const res = await request.get(`/category`)
        const resultObj : Category[]  = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const getAllAdminCate = async(type:string = 'sub')=>{ 
    try{
        const res = await request.get(`/category/admin?type=${type}`)
        const resultObj : Category[]  = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const getCateById = async(id:string)=>{
    try{
        const res = await request.get(`/category/${encodeURIComponent(id)}`)
        const resultObj : Category  = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}