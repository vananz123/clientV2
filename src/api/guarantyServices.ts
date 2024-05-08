/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result } from './ResType'
import { Guaranty } from '@/type'
export const getAllGuaranty = async(period:number =0)=>{ 
    try{
        const res = await request.get(`/guaranties?period=${period}`)
        const resultObj : Guaranty[]  = res.resultObj
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