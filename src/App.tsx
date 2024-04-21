import * as categoryServices from '@/api/categoryServices';
import React, { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addCateAsync } from '@/feature/category/cateSlice';
import './App.css';
import Router from './routes/Router';
function App() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        const loadAllCate = async () => {
            const res = await categoryServices.getAllCate();
            if (res.isSuccessed == true) {
                dispatch(addCateAsync(res.resultObj));
            }
        };
        loadAllCate();
    }, []);
    return <Router />;
}

export default App;
