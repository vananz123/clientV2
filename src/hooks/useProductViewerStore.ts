import { Product } from "@/type";
import { useEffect, useState } from "react";

function useProductViewerStore() {
    const [products, setProducts] = useState<Product[]>([])
    const setProductViewer = (product:Product)=>{
        const productsOldStore = localStorage.getItem('viewer')
        if(productsOldStore != null && productsOldStore != ''){
            const arrProductsOldJSON:string[] = JSON.parse(productsOldStore)
            const item = JSON.stringify(product).toString()
            arrProductsOldJSON.push(item)
            console.log(arrProductsOldJSON)
            localStorage.setItem('viewer',JSON.stringify(arrProductsOldJSON))
        }else{
            const arr : string[] = []
            const item = JSON.stringify(product).toString()
            arr.push(item)
            localStorage.setItem('viewer',JSON.stringify(arr))
        }
    }
    useEffect(()=>{
        const store = localStorage.getItem('viewer')
        if(store != null && store != ''){
            const arrProductsOldJSON:string[] = JSON.parse(store)
            const productList : Product[] = []
            arrProductsOldJSON.forEach((element) => {
                if(element){
                    const productParse : Product = JSON.parse(element)
                    productList.push(productParse)
                }
            });
            setProducts(productList)
        }
    },[])
    return {products:products, setProductViewer};
}

export default useProductViewerStore;