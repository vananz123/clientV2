import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/app/hooks"
import { selectUser } from "@/app/feature/user/reducer"
import Loading from "@/pages/Loading"
const AuthGuard: React.FC<{children:JSX.Element}> = ({children})=>{
    const {isAuthenticated, isInitialized,isLoading} = useAppSelector(selectUser)
    console.log(isInitialized,isAuthenticated , isLoading)
    if (isLoading === true)  return <Loading/>
    if(isAuthenticated === false && isInitialized ===false && isLoading === false) return <Navigate to={'/auth/login'} replace/>
    return <>{children}</>
}
export default AuthGuard