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
    id: number,
    seoTitle: string,
    urlThumbnailImage: string,
    productItemId: number,
    quantity: number,
    price: number,
    priceBeforeDiscount: number,
    discountRate?: number,
    stock: number,
    sku: string,
    total: number,
    totalDiscount: number,
    name?: string,
    value?: string
}
export type CartResult = {
    totalPrice:number;
    totalPriceBeforeDiscount:number;
    totalDiscount:number;
    items:Cart[];
}
