import CategoryForm from '@/conponents/CategoryForm';
import React, { useEffect } from 'react';
import { Button, notification, Space } from 'antd';
import * as categoryServices from '@/api/categoryServices';
import { Category } from '@/pages/Admin/Product/ProductList';
type NotificationType = 'success' | 'error';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/app/hooks';
import { selectCate, selectStatus, updateCate } from '@/feature/category/cateSlice';
import type { StatusForm } from './Type';
function CategoryEdit() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const [category, setCategory] = React.useState<Category>();
    const categoryGlobal = useAppSelector(selectCate).find((x) => x.id == id);
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess update!' : 'error',
        });
    };
    useEffect(() => {
        if (status == 'success') {
            if (category != undefined) {
                dispatch(updateCate(category));
                openNotificationWithIcon('success');
            }
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading')
    }, [status]);

    return (
        <>
            {contextHolder}
            <CategoryForm category={categoryGlobal} onSetState={setCategory} onSetStatus={setStatus} />
        </>
    );
}

export default CategoryEdit;
