import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { selectUser } from "@/app/feature/user/reducer";
const useAuthStore =()=> {
    const dispatch = useAppDispatch();
    const { isAuthenticated} = useAppSelector(selectUser)
    const [accessToken,setAccessToken]=React.useState<string>()
    useEffect(()=>{

        if(accessToken && accessToken != ''){
            localStorage.setItem('accessToken',accessToken);
            dispatch(loadUser());
        }
    },[dispatch,accessToken ])
    return {isAuth:isAuthenticated ,setAccessToken};
}

export default useAuthStore;