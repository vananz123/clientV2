/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError, HttpStatusCode, isAxiosError } from "axios";

export function isAxiosBadRequestError<BadRequestError>(
    error: unknown,
  ): error is AxiosError<BadRequestError> {
    return (
      isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
    );
  }
  
  export function isAxiosUnauthoriedError<UnauthoriedError>(
    error: unknown,
  ): error is AxiosError<UnauthoriedError> {
    return (
      isAxiosError(error) &&
      error.response?.status === HttpStatusCode.Unauthorized
    );
  }

export  const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formattedNumber;
    }
    return 0;
};
export const ArrayToString=(value:string[] | number[])=>{
  let result = ''
  for(let i =0;i< value.length;i++){
    if(i == value.length -1){
      result = result + value[i].toString();
    }else{
      result = result + value[i].toString()+',';
    }
  }
  return result
}