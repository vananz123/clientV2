import { ResponseUser } from "@/api/ResType"
export const UserAPI = (user:ResponseUser) => {
    return new Promise<{ data: ResponseUser }>(resolve =>
      setTimeout(() => resolve({ data: user }), 300),
    )
}