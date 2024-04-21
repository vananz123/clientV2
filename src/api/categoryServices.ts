import * as request from '../utils/request'
import { Result } from './ResType'
import { Category } from '@/pages/Admin/Product/ProductList'
export const getAllCate = async()=>{ 
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
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
export const getCateById = async(id:string)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res:Category = await request.get(`/category/id/${encodeURIComponent(id)}?page=1&offset=10`,option)
        const resp: Result ={
            error :'',
            message:'Success',
            statusCode:200,
            resultObj : res
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const getCateByName = async(name:string,productName:any, page:number, pageSize:number)=>{
    try{
        const res:Category = await request.get(`/category/${encodeURIComponent(name)}?productName=${encodeURIComponent(productName)}&page=${encodeURIComponent(page)}&offset=${encodeURIComponent(pageSize)}`)
        const resp: Result ={
            error :'',
            message:'Success',
            statusCode:200,
            resultObj : res
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const addCate = async(data:Category)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const cate = {
            name:data.name
        }
        const res:Category = await request.post(`/category`,cate,option)
        const resp: Result ={
            error :'',
            message:'Success',
            statusCode:201,
            resultObj : res
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const updateCate = async(id:string,data:Category)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const cate = {
            name:data.name
        }
        const res:Category = await request.patch(`/category/${encodeURIComponent(id)}`,cate,option)
        const resp: Result ={
            error :'',
            message:'Success',
            statusCode:200,
            resultObj : res
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const deleteCate = async(id:string)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res:Category = await request.del(`/category/${encodeURIComponent(id)}`,option)
        const resp: Result ={
            error :'',
            message:'Success',
            statusCode:204,
            resultObj : res
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}