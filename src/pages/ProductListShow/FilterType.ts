import { Sort } from ".";

type OptionPrice = {
    label: string;
    value: number;
}
type OptionBase ={
    label: string;
    value: string;
}
export type Filter={
    categoryId?:number,
    productName?:string,
    optionPrice?:number[],
    page:number,
    pageSize:number,
    optionMaterial?:string[],
    sortOder:string,
    isPromotion?:boolean,
    productStatus?:number
}
type OptionSort ={
    label: string;
    value: Sort;
}
export const optionsPrice: OptionPrice[] = [
    {label:"Dưới 2 triệu",value:1},
    {label:"2 triệu đến 6 triệu",value:2},
    {label:"6 triệu đến 10 triệu",value:3},
    {label:"Trên 10 triệu",value:4},
];
export const optionsMaterial :OptionBase[]= [
    {label:"VA",value:"VA"},
    {label:"ROLEX",value:"ROLEX"},
    {label:"PNJ",value:"PNJ"},
    {label:"Seiko",value:"Seiko"}
]
export const optionsSort : OptionSort[]=[
    {
        value: 'ascending',
        label: 'Acending',
    },
    {
        value: 'descending',
        label: 'Decrease',
    }
]