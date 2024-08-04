
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { selectUser } from "@/app/feature/user/reducer";
const useAuthStore =()=> {
    const dispatch = useAppDispatch();
    const { isAuthenticated , isLoading} = useAppSelector(selectUser)
    const setAccessToken = (accessToken:string)=>{
        localStorage.setItem('accessToken',accessToken);
        dispatch(loadUser());
    }
    const accessToken = localStorage.getItem('accessToken')
    const isToken = accessToken == null ? false : true
    return {isAuth:isAuthenticated,isLoading:isLoading, isToken:isToken ,setAccessToken};
}

export default useAuthStore;