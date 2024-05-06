import React from "react"
import Loading from "@/pages/Loading";
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/app/hooks"

import {  selectIsAuthenticated,selectIsInitialized} from "@/feature/user/userSlice"
const AuthGuard: React.FC<{children:JSX.Element}> = ({children})=>{
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isInitialized = useAppSelector(selectIsInitialized)
    if(isInitialized == false) return <Loading/>
    if(isAuthenticated == false) return <Navigate to={'/auth/login'} replace/>
    return <>{children}</>
}
export default AuthGuard