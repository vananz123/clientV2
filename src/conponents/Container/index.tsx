import React from "react";
interface Props{
    children:React.ReactNode;
    marginTop?:number;
    marginBottom?:number;
}
const Container:React.FC<Props> =({children,marginTop=10,marginBottom=10}) =>{
    return <div className="container">
        <div className="content" style={{marginBottom:marginBottom,marginTop:marginTop}}>{children}</div>
    </div>;
}

export default Container;