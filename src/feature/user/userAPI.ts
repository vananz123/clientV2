import type { ResponseUser } from "@/api/userServices"
export const UserAPI = (user:ResponseUser) => {
    return new Promise<{ data: ResponseUser }>(resolve =>
      setTimeout(() => resolve({ data: user }), 300),
    )
}