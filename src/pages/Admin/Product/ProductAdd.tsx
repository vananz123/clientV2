import ProductForm from '@/conponents/ProductForm';
import React, { useEffect } from 'react';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import { Product } from '@/type'
import { useNavigate } from 'react-router-dom';
import { StatusForm } from '@/type';
function ProductAdd() {
    const [product, setProduct] = React.useState<Product>();
    const [status,setStatus] = React.useState<StatusForm>('loading')
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate()
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description:type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    useEffect(() => {
        if(status == 'success'){
            openNotificationWithIcon('success')
            navigate(`/admin/product-edit/${product?.id}`)
            
        }
        if(status == 'error'){
            openNotificationWithIcon('error')
        }
        setStatus('loading')
    }, [status]);
    return (
        <div>
            {contextHolder}
            <ProductForm product={product} onSetState={setProduct} onSetStatus={setStatus}/>
        </div>
    );
}

export default ProductAdd;