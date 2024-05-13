/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result, PurchaseResult, Order, PagingResult } from './ResType'

export const create = async(userId:string,addressId:number,paymentMethodId:number)=>{
    try{
        const order ={
            userId:userId,
            shippingMethodId:1,
            addressId:addressId,
            paymentMethodId:paymentMethodId
        }
        const res = await request.post(`/order`,order)
        const resultObj : PurchaseResult = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:201,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const paided = async(id:number)=>{
    try{
        const res = await request.put(`/order/paided/${encodeURIComponent(id)}`)
        const resultObj = res.resultObj
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
export const comfirm = async(id:number)=>{
    try{
        const res = await request.put(`/order/confirmed/${encodeURIComponent(id)}`)
        const resultObj = res.resultObj
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
export const successed = async(id:number)=>{
    try{
        const res = await request.put(`/order/successed/${encodeURIComponent(id)}`)
        const resultObj = res.resultObj
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
export const canceled = async(id:number)=>{
    try{
        const res = await request.put(`/order/canceled/${encodeURIComponent(id)}`)
        const resultObj = res.resultObj
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
export const getOrderAdmin = async(statusName:string | undefined)=>{
    try{ 
        let res;
        if(statusName == undefined){
            res = await request.get(`/order/admin?PageIndex=1&PageSize=100`)
        }else{
            res = await request.get(`order/admin?StatusName=${encodeURIComponent(statusName)}&PageIndex=1&PageSize=100`)
        }
        
        const resultObj :Order[] = res.resultObj.items
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
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const getOrderAdminByOrderId = async(id:number)=>{
    try{
        const res = await request.get(`/order/admin/${encodeURIComponent(id)}`)
        const resultObj :Order = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj,
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const getOrderByUserId = async(id:string)=>{
    try{
        const res = await request.get(`/order/user/${encodeURIComponent(id)}?PageIndex=1&PageSize=100`)
        const resultObj :Order[] = res.resultObj.items
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
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const getOrderDetailByOrderId = async(id:number)=>{
    try{
        const res = await request.get(`/order/${encodeURIComponent(id)}`)
        const resultObj :Order = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj,
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}