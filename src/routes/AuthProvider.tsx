/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadUser } from '@/app/feature/user/action';
import { selectUser } from '@/app/feature/user/reducer';
import Loading from '@/pages/Loading';
function AuthProvider({ children }: any) {
    const dispatch = useAppDispatch();
    const { isLoading } = useAppSelector(selectUser);
    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken != null) dispatch(loadUser());
    }, [dispatch]);
    return <>{isLoading ? <Loading /> : children}</>;
}
export default AuthProvider;
