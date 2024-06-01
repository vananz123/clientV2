import React from "react";
interface Props{
    children:React.ReactNode;
    className?:string;
}
const Container:React.FC<Props> =({children,className="mt-5 mb-5"}) =>{
    return <div className='w-[100%] grid grid-cols-1 justify-items-center'>
<<<<<<< HEAD
        <div className={`max-w-screen-2xl pt-0 p-[16px] sm:px-[24px] ${className}`}>{children}</div>
=======
        <div className={`max-w-screen-xl w-full pt-0 p-[16px] sm:px-[24px] ${className}`}>{children}</div>
>>>>>>> 7620d1c63fa3bb03c5e962f9fa196f189c180b2b
    </div>;
}

export default Container;