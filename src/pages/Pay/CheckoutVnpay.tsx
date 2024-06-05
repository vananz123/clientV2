import queryString from 'query-string';
import React from 'react';
import * as orderServices from '@/api/orderServices';
import { Button, Result } from 'antd';
//import { useAppDispatch, useAppSelector } from '@/app/hooks';
//import { loadCartDetail } from '@/app/feature/cart/action';
//import { selectUser } from '@/app/feature/user/reducer';
//import { useMutation } from '@tanstack/react-query';
import Container from '@/conponents/Container';
import { useNavigate } from 'react-router-dom';
function CheckoutVnpay() {
    //const user = useAppSelector(selectUser).data
    const [content,setContent] = React.useState<string>('')
    const [status,setStatus] = React.useState<boolean>(false)
    const p = queryString.parse(window.location.search);
    //const dispatch = useAppDispatch()
    // const mutationPaided = useMutation({
    //     mutationKey:['paided'],
    //     mutationFn:(orderId:number)=> orderServices.paided(Number(orderId)),
    //     onSuccess:()=>{
    //         setStatus(true)
    //         setContent('Bạn đã thanh toán thành công')
    //     }   
    // })
    // const mutationCanceled = useMutation({
    //     mutationKey:['canceled'],
    //     mutationFn:(orderId:number)=> orderServices.canceled(Number(orderId)),
    //     onSuccess:()=>{
    //         setContent('Thanh toán thất bại')
    //     }   
    // })
    const paided = async(id:string)=>{
       setTimeout(async()=>{
        const res = await orderServices.paided(Number(id))
        if(res.isSuccessed === true){
            setStatus(true)
            setContent('Bạn đã thanh toán thành công')
        }
       },150)
    }
    const canceled = async(id:string)=>{
        setTimeout(async()=>{
         const res = await orderServices.canceled(Number(id))
         if(res.isSuccessed === true){
            setContent('Thanh toán thất bại')
         }
        },150)
     }
    // useEffect(()=>{
    //     if (p != undefined ) {
    //         console.log(p)
    //         if (p.vnp_TransactionStatus === '00') {
    //             const orderInfo = p.vnp_OrderInfo;
    //             if (typeof orderInfo === 'string') {
    //                 const list = orderInfo.split(' ');
    //                 console.log(list)
    //                 paided(list[0])
    //             }
    //         } else {
    //             const orderInfo = p.vnp_OrderInfo;
    //             if (typeof orderInfo === 'string') {
    //                 const list = orderInfo.split(' ');
    //                 canceled(list[0])
    //             }
    //         }
    //     }
    // },[p])
    const ssss =()=>{
        console.log('dfsdfddfsdf')
        if (p != undefined ) {
            console.log(p)
            if (p.vnp_TransactionStatus === '00') {
                const orderInfo = p.vnp_OrderInfo;
                if (typeof orderInfo === 'string') {
                    const list = orderInfo.split(' ');
                    console.log(list)
                    paided(list[0])
                }
            } else {
                const orderInfo = p.vnp_OrderInfo;
                if (typeof orderInfo === 'string') {
                    const list = orderInfo.split(' ');
                    canceled(list[0])
                }
            }
        }
    }
    const navigate = useNavigate()
    
    return (
        <Container>
            <div className='w-[200px] h-[400px]  text-red absolute top-0 left-0' onClick={()=>{
                    ssss()
                }} >Xác nhận</div>
            <Result
                status={status ? 'success' : 'warning'}
                title="Thông tin đơn hàng!"
                subTitle={content}
                extra={[
                    <Button type="primary" key="console" onClick={()=>{navigate('/order')}}>
                    Order detail
                </Button>,
                <Button key="buy" onClick={()=>{navigate('/home')}}>Buy Again</Button>,
                ]}
            />
        </Container>
    );
}

export default CheckoutVnpay;
