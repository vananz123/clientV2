import CategoryForm from '@/conponents/CategoryForm';
import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';
type NotificationType = 'success' | 'error';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/pages/Admin/Product/ProductList';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectCate, selectStatus, updateCate, addCateAsync } from '@/feature/category/cateSlice';
import type { StatusForm } from './Type';
import { useNavigate } from 'react-router-dom';
function CategoryAdd() {
    const dispatch = useAppDispatch();
    const [category, setCategory] = React.useState<Category>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();
const Navigate =useNavigate()
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    useEffect(() => {
        if (status == 'success') {
            if (category != undefined) {
                const getAllCate = async () => {
                    const ref = await categoryServices.getAllCate();
                    if (ref.statusCode === 200) {
                        dispatch(addCateAsync(ref.resultObj));
                    }
                };
                getAllCate()
                openNotificationWithIcon('success');
                Navigate('/admin/categories')
            }
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading');
        setCategory(undefined)
    }, [status]);

    return (
        <>
            {contextHolder}
            <CategoryForm category={category} onSetState={setCategory} onSetStatus={setStatus} />
        </>
    );
}

export default CategoryAdd;
