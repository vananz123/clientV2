import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { Role } from "@/api/ResType";
import { selectUser } from "@/app/feature/user/reducer";
const useAuthStore =()=> {
    const dispatch = useAppDispatch();
    const {data} = useAppSelector(selectUser)
    const [isAuth, setIsAuth] = React.useState<boolean>(false)
    const [accessToken,setAccessToken]=React.useState<string>()
    useEffect(()=>{
        if(accessToken && accessToken != ''){
            localStorage.setItem('accessToken',accessToken);
            dispatch(loadUser());
            if(data){
                const roleAdmin: Role[] = ['admin', 'sale'];
                if (roleAdmin.indexOf(data.roles[0]) < 0) {
                    setIsAuth(true)
                }
            }
        }
    },[data,dispatch,accessToken ])
    return {isAuth:isAuth ,setAccessToken};
}

export default useAuthStore;