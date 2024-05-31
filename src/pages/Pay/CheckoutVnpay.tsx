import queryString from 'query-string';
import React, { useEffect, useMemo } from 'react';
import * as orderServices from '@/api/orderServices';
import { Button, Result } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { loadCartDetail } from '@/app/feature/cart/action';
import { selectUser } from '@/app/feature/user/reducer';
import { useMutation } from '@tanstack/react-query';
import Container from '@/conponents/Container';
function CheckoutVnpay() {
    const user = useAppSelector(selectUser).data
    const [content,setContent] = React.useState<string>('')
    const [status,setStatus] = React.useState<boolean>(false)
    const p = queryString.parse(window.location.search);
    const dispatch = useAppDispatch()
    const mutationPaided = useMutation({
        mutationKey:['paided'],
        mutationFn:(orderId:number)=> orderServices.paided(Number(orderId)),
        onSuccess:()=>{
            setStatus(true)
            setContent('Bạn đã thanh toán thành công')
        }   
    })
    const mutationCanceled = useMutation({
        mutationKey:['canceled'],
        mutationFn:(orderId:number)=> orderServices.canceled(Number(orderId)),
        onSuccess:()=>{
            setContent('Thanh toán thất bại')
        }   
    })
    useEffect(()=>{
        if(user) dispatch(loadCartDetail({userId:user.id}))
    },[dispatch,user])
    
    useMemo(()=>{
        if (p != undefined) {
            if (p.vnp_TransactionStatus == '00') {
                const orderInfo = p.vnp_OrderInfo;
                if (typeof orderInfo === 'string') {
                    const list = orderInfo.split(' ');
                    mutationPaided.mutate(Number(list[0]))
                }
            } else {
                const orderInfo = p.vnp_OrderInfo;
                if (typeof orderInfo === 'string') {
                    const list = orderInfo.split(' ');
                    mutationCanceled.mutate(Number(list[0]))
                }
            }
        }
    },[p,mutationCanceled,mutationPaided])
    return (
        <Container>
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
        </Container>
    );
}

export default CheckoutVnpay;
