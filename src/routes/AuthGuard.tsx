import React from "react"
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/app/hooks"
import { selectUser } from "@/app/feature/user/reducer"
import Loading from "@/pages/Loading"
const AuthGuard: React.FC<{children:JSX.Element}> = ({children})=>{
    const {isAuthenticated, isInitialized} = useAppSelector(selectUser)
    if(isAuthenticated === false) return <Navigate to={'/auth/login'} replace/>
    if (isInitialized === false)  return <Loading/>
    
    return <>{children}</>
}
export default AuthGuard