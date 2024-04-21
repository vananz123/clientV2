import * as request from '../utils/request'
import { LoginType } from '@/pages/Login'
import { Result } from './ResType'
export type ResponseLoginType ={
    accessToken:string,
    refreshToken:string
}

export const login = async(user:LoginType)=>{
    try{
        const login ={
            email: user.email,
            password: user.password,
            rememberMe:true
          }
        const res = await request.post(`/authentication/login`,login)
        const resultObj : ResponseLoginType = res.resultObj
        const resp: Result ={
            error :'',
            isSuccessed:res.isSuccessed,
            message:res.message,
            statusCode:200,
            resultObj : resultObj
        }
        return resp
    }catch(error:any){
        const resError: Result =error.response.data
        return resError
    }
}
export const refresh = async(token:string)=>{
    try{
        const refresh ={
            refreshToken: token
        }
        const option = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const res = await request.post(`/refresh`,refresh,option)
        const resultObj : ResponseLoginType = res.resultObj
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
export const logout = async(accessToken:string,refreshToken:string)=>{
    // try{
    //     const logout ={
    //         refreshToken: refreshToken
    //     }
    //     const option = {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${accessToken}`
    //         }
    //     }
    //     const res = await request.post(`/logout`,logout)
    //     const resp: Result ={
    //         error :'',
    //         message:'Success',
    //         statusCode:200,
    //         resultObj : res
    //     }
    //     return resp
    // }catch(error:any){
    //     console.log(error.response.data)
    //     const resError: Result =error.response.data
    //     return resError
    // }
}