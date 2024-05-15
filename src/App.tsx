import * as categoryServices from '@/api/categoryServices';
import { useEffect } from 'react';
import { useAppDispatch } from '@/app/hooks';
import { addCateAsync } from '@/feature/category/cateSlice';
import './App.css';
import Router from './routes/Router';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyCMapSsR9QpGVR6a5GdfF68hiaxJ5onXZE",
        authDomain: "lastore-9375d.firebaseapp.com",
        projectId: "lastore-9375d",
        storageBucket: "lastore-9375d.appspot.com",
        messagingSenderId: "669308501551",
        appId: "1:669308501551:web:1ec428fa704ab577c590da",
        measurementId: "G-BGEQBG6XQY"
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
        getAnalytics(app);
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
