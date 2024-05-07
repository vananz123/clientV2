import React from "react"
import { Role } from "@/api/ResType";
import { useAppSelector } from "@/app/hooks";
import { selectUser ,selectIsAuthenticated} from "@/feature/user/userSlice";
import { Button, Result } from "antd";
const RoleGuard: React.FC<{children:JSX.Element;role:Role[]}>=({children,role})=>{
    const user = useAppSelector(selectUser)
    console.log(role.indexOf(user?.roles[0]))
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    if(role.indexOf(user?.roles[0]) < 0 && isAuthenticated === true){
        return <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    }
    return <>{children}</>;
}
export default RoleGuard