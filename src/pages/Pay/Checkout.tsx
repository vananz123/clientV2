
import React, { useEffect } from 'react';
import { Button, Result } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import { emptyCart } from '@/feature/cart/cartSlice';
function Checkout() {
    const {id} = useParams()
    const [content,setContent] = React.useState<string>('')
    const [status,setStatus] = React.useState<boolean>(false)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if(id != undefined){
            dispatch(emptyCart())
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
                    <Button type="primary" key="console" onClick={()=>{navigate('/profile')}}>
                        Order detail
                    </Button>,
                    <Button key="buy" onClick={()=>{navigate('/home')}}>Buy Again</Button>,
                ]}
            />
        </div>
    );
}

export default Checkout;
