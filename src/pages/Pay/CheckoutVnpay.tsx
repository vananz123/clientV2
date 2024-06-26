import queryString from 'query-string';
import React, { useEffect } from 'react';
import * as orderServices from '@/api/orderServices';
import { Button, Result } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { emptyCart } from '@/feature/cart/cartSlice';
function CheckoutVnpay() {
    let {id} = useParams()
    const [content,setContent] = React.useState<string>('')
    const [status,setStatus] = React.useState<boolean>(false)
    let p = queryString.parse(window.location.search);
    const dispatch = useAppDispatch()
    const paided = async () => {
        if (p != undefined) {
            const orderInfo = p.vnp_OrderInfo;
            if (typeof orderInfo === 'string') {
                const list = orderInfo.split(' ');
                const res = await orderServices.paided(Number(list[0]));
                console.log(res);
            }
        }
    };
    const canceled = async () => {
        if (p != undefined) {
            const orderInfo = p.vnp_OrderInfo;
            if (typeof orderInfo === 'string') {
                const list = orderInfo.split(' ');
                const res = await orderServices.canceled(Number(list[0]));
                console.log(res);
            }
        }
    };
    useEffect(() => {
        if (p != undefined) {
            dispatch(emptyCart())
            if (p.vnp_TransactionStatus == '00') {
                paided();
                setStatus(true)
                setContent('Bạn đã thanh toán thành công')
            } else {
                canceled();
                setContent('Thanh toán thất bại')
            }
        }
        if(id != undefined){
            setStatus(true)
            setContent("Bạn đã đặt hàng thành công, vui lòng kiểm trả hàng trước khi thanh toán!")
        }
    });
    return (
        <div>
            <Result
                status={status ? 'success' : 'warning'}
                title="Thông tin đơn hàng!"
                subTitle={content}
                extra={[
                    <Button type="primary" key="console">
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>,
                ]}
            />
        </div>
    );
}

export default CheckoutVnpay;
