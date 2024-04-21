import { CartResult } from "@/api/ResType"


export const CartAPI = (cart:CartResult) => {
    return new Promise<{ data: CartResult }>(resolve =>
      setTimeout(() => resolve({ data: cart }), 300),
    )
}