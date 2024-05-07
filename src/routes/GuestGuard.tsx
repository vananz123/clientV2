import React from "react"
import Loading from "@/pages/Loading";
import { Navigate } from "react-router-dom"
import { useAppSelector } from "@/app/hooks"

import { selectUser ,selectIsAuthenticated,selectIsInitialized} from "@/feature/user/userSlice"
const GuestGuard: React.FC<{children:JSX.Element}> = ({children})=>{
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isInitialized = useAppSelector(selectIsInitialized)
    const user = useAppSelector(selectUser)
    if (isInitialized == false) return <Loading/>
    if(isAuthenticated == true && user != undefined){
        if(user.roles != undefined){
            if(user.roles[0] == 'admin'){
                return <Navigate to={'/admin/product'}/>
            }
            if(user.roles[0] == 'customer'){
                return <Navigate to={'/home'}/>
            }
        }
        
    }
    return <>{children}</>
}
export default GuestGuard