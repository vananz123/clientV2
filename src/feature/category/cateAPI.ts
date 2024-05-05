
import { Category } from '@/type'
export const CateAPI = (cate:Category[]) => {
    return new Promise<{ data: Category[] }>(resolve =>
      setTimeout(() => resolve({ data: cate }), 300),
    )
}