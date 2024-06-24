/* eslint-disable @typescript-eslint/no-unused-vars */
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