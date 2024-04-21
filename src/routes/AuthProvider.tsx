import React, { useEffect } from "react"
import { useAppDispatch } from '@/app/hooks';
import { addToCart,emptyCart } from "@/feature/cart/cartSlice";
import { signIn ,initialize,initializeActive} from '@/feature/user/userSlice';
import * as userServices from '@/api/userServices'
import * as cartServices from '@/api/cartServices'
function AuthProvider ({children}:any){
    const dispatch = useAppDispatch()
    useEffect(()=>{
        const loadData = async ()=>{
            const accessToken = localStorage.getItem('accessToken')
            if(accessToken == undefined){
                dispatch(initialize())
                dispatch(emptyCart())
            }else{
                const user = await userServices.getUser()
                if(user.isSuccessed ==true){
                    dispatch(initializeActive(user.resultObj))
                    const cartApi = await cartServices.getCart(user.resultObj.id)
                    if(cartApi.isSuccessed == true){
                        dispatch(addToCart(cartApi.resultObj))
                    }
                }
            }
        }
        loadData()
    },[])
    return <>{children}</>
}
export default AuthProvider