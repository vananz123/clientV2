import * as request from '../utils/request'
import { PagingResult, Result } from './ResType'
import { Product } from '@/pages/Admin/Product/ProductList'
export const getAllProduct = async()=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get(`/product`)

        const resultObj : Product[]  = res.resultObj
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
export const getProductDetail = async(id:number)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res = await request.get(`/product/${encodeURIComponent(id)}`)

        const resultObj : Product  = res.resultObj
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
const pageSize = 4
export const getProductByCategoryIdPaging = async(categoryId:number, page:number)=>{
    try{
        const res = await request.get(`/product/category/${encodeURIComponent(categoryId)}?PageIndex=${encodeURIComponent(page)}&PageSize=${encodeURIComponent(pageSize)}`)
        const resultObj :Product[] = res.resultObj.items
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
export const getProductPaging = async(productName:any, page:number, pageSize:number)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res:Product[] = await request.get(`/product?productName=${encodeURIComponent(productName)}&page=${encodeURIComponent(page)}&offset=${encodeURIComponent(pageSize)}`)
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
export const getProductByUrlName = async(url:string)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res:Product = await request.get(`/product/${encodeURIComponent(url)}`)
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
export const getProductById = async(id:string)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res:Product = await request.get(`/product/id/${encodeURIComponent(id)}`)
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
export const productSearch = async(keyword:any)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res:Product[] = await request.get(`/product?productName=${encodeURIComponent(keyword)}&page=1&offset=10`)
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
export const addProduct = async(data:Product)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const pro ={
            name: data.name,
            seoDescription: data.seoDescription,
            seoTitle: data.seoTitle,
            categoryId: data.categoryId
        }
        const res= await request.post(`/product`,pro)
        const resultObj   = res.resultObj
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
export const updateProduct = async(id:number, data:Product)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const pro ={
            id:id,
            name: data.name,
            seoDescription: data.seoDescription,
            seoTitle: data.seoTitle,
            status:data.status,
            categoryId: data.categoryId
        }
        const res= await request.put(`/product`,pro)
        const resultObj:Product   = res.resultObj
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
export const deleteProduct = async(id:number)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res= await request.del(`/product/${encodeURIComponent(id)}`)
        const resultObj   = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:204,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        console.log(error.response.data)
        const resError: Result =error.response.data
        return resError
    }
}
export const uploadThumbnailImage = async(id:string,data:any)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const formData = new FormData()
        formData.append('ImageFile',data);
        const option = {
            headers: {  
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        const res= await request.put(`/product/${encodeURIComponent(id)}/thumbnail-image`,formData)
        const resultObj   = res.resultObj
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
export const uploadImage = async(id:number,data:any)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const formData = new FormData()
        data.forEach((element:any) => {
            formData.append('ImageFile',element.originFileObj);
        });
        const option = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        }
        const res= await request.put(`/product/${encodeURIComponent(id)}/images`,formData)
        const resultObj   = res.resultObj
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
export const addProductNoSize = async(id:number, price:number,stock:number)=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const res= await request.post(`/product/${encodeURIComponent(id)}/product-item`,{price:price,stock:stock})
        const resultObj   = res.resultObj
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
function randomNumber(min:number, max:number):number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export const addProductSize = async(id:number, data:any[])=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const pro:any[]= []
        data.forEach((element:any) => {
            const item ={
                id:randomNumber(1,1000),
                price:element.price,
                stock:element.stock,
                sku:element.sku,
                value:element.value
            }
            pro.push(item)
        });
        const res= await request.post(`/product/${encodeURIComponent(id)}/product-item-size`,pro)
        const resultObj   = res.resultObj
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
export const addVariation = async(id:number, data:any[])=>{
    try{
        const token = localStorage.getItem('accessToken')
        const option = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        const pro:any[]= []
        data.forEach((element:any) => {
            const item ={
                id:randomNumber(1,1000),
                name:element.name,
                value:element.value,
                selected:true
            }
            pro.push(item)
        });
        const res= await request.put(`/product/${encodeURIComponent(id)}/variation`,{variations:pro})
        const resultObj   = res.resultObj
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