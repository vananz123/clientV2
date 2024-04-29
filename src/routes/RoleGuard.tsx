import React from "react"
type Role = 'admin' | 'customer' | undefined;
import { useAppSelector } from "@/app/hooks";
import { selectUser ,selectIsAuthenticated,selectIsInitialized} from "@/feature/user/userSlice";
import { Button, Result } from "antd";
const RoleGuard: React.FC<{children:JSX.Element;role:Role}>=({children,role})=>{
    const user = useAppSelector(selectUser)
    const isAuthenticated = useAppSelector(selectIsAuthenticated)
    const isInitialized = useAppSelector(selectIsInitialized)
    if(user?.roles[0] !== role && isAuthenticated === true){
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