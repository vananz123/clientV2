import { ResponseUser } from "./userServices";

export type Result = {
    error: string;
    isSuccessed: boolean;
    message: string;
    statusCode: number;
    resultObj: any;
};
export type PagingResult = {
    items: any;
    pageIndex: number;
    pageSize: number;
    pageCount: number;
    totalRecords: number;
};
export type Cart = {
    id: number;
    seoTitle: string;
    urlThumbnailImage: string;
    productId:number;
    productItemId: number;
    quantity: number;
    price: number;
    priceBeforeDiscount: number;
    discountRate?: number;
    stock: number;
    sku: string;
    total: number;
    totalDiscount: number;
    name?: string;
    value?: string;
};
export type CartResult = {
    totalPrice: number;
    totalPriceBeforeDiscount: number;
    totalDiscount: number;
    items: Cart[];
};
export type Address = {
    id: number;
    userId: string;
    phoneNumber: string;
    streetNumber: string;
    wardCommune: string;
    urbanDistrict: string;
    city: string;
    province: string;
    country: string;
    isDefault: boolean;
};
export type PaymentType = {
    id: number;
    name: string;
};
export type PaymentMethod = {
    id: number;
    userId: string;
    paymentTypeId: number;
    privoder: string;
    accountNumber: string;
    isDefault: boolean;
    name: string;
};
export type PurchaseResult ={
    orderId?:number,
    paymentTypeName?:string,
    returnUrl?:string
}
export type OrderStatus ={
    id:number;
    orderId:number;
    name:string;
    description:string;
    createAt:string;
    status: number
}
export type Review ={
    id: number,
    userId: string,
    orderDetailId: number,
    createAt: string,
    rate?: number,
    comment: string,
    feelback?: string,
    feelbackAt?: string
}
export type OrderDetail={
    id: number;
    seoTitle: string;
    orderId:string,
    urlThumbnailImage: string;
    productId:number;
    productItemId: number;
    quantity: number;
    price: number;
    priceBeforeDiscount: number;
    discountRate?: number;
    sku: string;
    total: number;
    totalDiscount: number;
    name?: string;
    value?: string;
    review?:Review;
}
export type OrderPayment = {
    id:number,
    orderId:number,
    paymentDate:string,
    paymentType:string,
    privoder:string,
    accountNumber:string
}
export type Order={
    id:number;
    userId:string;
    user:ResponseUser
    orderDate:string;
    orderTotal:number,
    totalProduct:number,
    orderDiscount:number;
    status?:OrderStatus[],
    address?:Address,
    paymentMethod?:OrderPayment,
    orderDetail?:OrderDetail[],
    
}
export type Promotion = {
    id: number,
      name: string,
      seoDescription: string,
      seoTitle: string,
      seoAlias: string,
      discountRate?: number,
      discountAmount?: number,
      condition?:number,
      type:string,
      urlImage: string,
      startDate: string,
      endDate: string,
      status: number,
      arrDate:any[],
}
