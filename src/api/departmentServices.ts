import { Department } from "@/type"
import * as request from '../utils/request'

export const getAllDepartment = async()=>{ 
    try{
        const res = await request.get(`/departments`)
        const resultObj : Department[]  =  res.resultObj
        return resultObj
    }catch{
        return undefined
    }
}