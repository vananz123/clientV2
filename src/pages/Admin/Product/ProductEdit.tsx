import ProductForm from '@/conponents/ProductForm';
import * as productServices from '@/api/productServices';
import React, { useEffect } from 'react';
import { notification } from 'antd';
type NotificationType = 'success' | 'error';
import { Product } from '@/type'
import { useParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { StatusForm } from '@/type';
function ProductEdit() {
    const { id } = useParams();
    const [product, setProduct] = React.useState<Product>();
    const [status,setStatus] = React.useState<StatusForm>('loading')
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description:type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    useEffect(() => {
        if (id != undefined && status == 'loading') {
            const getProduct = async () => {
                const res = await productServices.getProductDetail(Number(id));
                if (res.isSuccessed == true) {
                    setProduct(res.resultObj);
                }
            };
            getProduct()
        }
        if(status == 'success'){
            openNotificationWithIcon('success')
        }
        if(status == 'error'){
            openNotificationWithIcon('error')
        }
        setStatus('loading')
    }, [status]);
    return (
        <div>
            {contextHolder}
            {product != undefined ? <ProductForm product={product} onSetState={setProduct} onSetStatus={setStatus}/>:<Skeleton/>}
        </div>
    );
}

export default ProductEdit;
