/* eslint-disable @typescript-eslint/no-explicit-any */
export type Category = {
    id: number;
    name: string;
    parentId:number;
    subCategory:Category[];
    urlImage: string;
    status: number;
};
export type ProductItem = {
    id: number;
    productId: number;
    price: number;
    priceBeforeDiscount: number;
    discountRate: number;
    stock: number;
    sku: string;
    isCombo:boolean;
    viewCount: number;
    isMulti: boolean;
    urlImage: string;
    status: number;
    dateCreated: string;
    dateModify: string;
    name: string;
    value: string;
};
export type Variation = {
    id: number;
    name: string;
    value: string;
};
export type Product = {
    id: number;
    name: string;
    categoryId: number;
    seoDescription: string;
    discountRate: number;
    price: number;
    priceBeforeDiscount: number;
    seoTitle: string;
    file: any;
    urlThumbnailImage: string;
    viewCount: number;
    PromotionName?:string,
    status: number;
    dateCreated: string;
    dateModify: string;
    items: ProductItem[];
    variation: Variation[];
};
export interface Guaranty {
    id: number,
    sku: string,
    name: string,
    description: string,
    period: number,
    dateCreated: string,
    dateModify: string,
    status: number,
    arrDate: any[]
}