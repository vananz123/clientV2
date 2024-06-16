/* eslint-disable @typescript-eslint/no-explicit-any */
import * as request from '../utils/request'
import { Result, PurchaseResult, Order, PagingResult, Shipping } from './ResType'


export const shippingGetAll = async()=>{
    try{
        const res = await request.get(`/shippings`)
        const resultObj : Shipping[] = res.resultObj
        return resultObj
    }
    catch{
        return undefined
    }
}

export const create = async(userId:string,addressId:number,paymentMethodId:number, shippingId:number,departmentId:number)=>{
    try{
        const order ={
            userId:userId,
            shippingMethodId:shippingId,
            addressId:addressId,
            paymentMethodId:paymentMethodId,
            departmentId:departmentId
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
export const returned = async(id:number)=>{
    try{
        const res = await request.put(`/order/returned/${encodeURIComponent(id)}`)
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
export const getOrderAdmin = async(statusName:string)=>{
    try{ 
        let res;
        if(statusName == "All"){
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
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : paging,
        // }
        return paging
    }catch(error:any){
        // console.log(error.response.data)
        // const resError: Result =error.response.data
        return undefined
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
export const getOrderByUserId = async(id:string ,statusName:string | undefined)=>{
    try{
        const params = {
            statusName:statusName,
            pageIndex : 1,
            pageSize : 100,
        }
        const res = await request.get(`/order/user/${encodeURIComponent(id)}`, {params})
        const resultObj :Order[] = res.resultObj.items
        // const paging: PagingResult = {
        //     items: resultObj,
        //     pageIndex : res.resultObj.pageIndex,
        //     pageCount:res.resultObj.pageCount,
        //     pageSize:res.resultObj.pageSize,
        //     totalRecords:res.resultObj.totalRecords
        // }
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : paging,
        // }
        return resultObj
    }catch(error:any){
        //const resError: Result =error.response.data
        return undefined
    }
}
export const getOrderDetailByOrderId = async(id:number)=>{
    try{
        const res = await request.get(`/order/${encodeURIComponent(id)}`)
        const resultObj :Order = res.resultObj
        // const resp: Result ={
        //     error :'',
        //     isSuccessed:res.isSuccessed,
        //     message:res.message,
        //     statusCode:200,
        //     resultObj : resultObj,
        // }
         return resultObj
    }catch(error:any){
        return undefined
    }
}