import React from "react"
import { Role } from "@/api/ResType";
import { useAppSelector } from "@/app/hooks";
import { selectUser } from "@/app/feature/user/reducer";
import {  Navigate } from "react-router-dom";
const RoleGuard: React.FC<{children:JSX.Element;role:Role[]}>=({children,role})=>{
    const {isAuthenticated ,data} = useAppSelector(selectUser)
    if(role.indexOf(data?.roles[0]) < 0 && isAuthenticated === true){
        return <Navigate to={"*"}/>
    }
    return <>{children}</>;
}
export default RoleGuard