import { RegisterUser } from '@/pages/Register'
import * as request from '../utils/request'
import { Result } from './ResType'
export type ResponseUser ={
    id: string,
    roles:string[],
    firstName:string,
    lastName:string,
    fullName:string,
    email: string,
    userName: string,
    phoneNumber: string,
}
export const getUser = async()=>{
    try{
        const res = await request.get(`/user`)
        const resultObj : ResponseUser = res.resultObj
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
export const Register = async(data:RegisterUser)=>{
    try{
        const user = {
            name:data.name,
            email:data.email,
            password:data.password,
            address:data.address
        }
        const res = await request.post(`/user`,user)
        const resultObj : ResponseUser = res.resultObj
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
