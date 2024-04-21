import { useParams } from 'react-router';
import type { Product, ProductItem } from '../Admin/Product/ProductList';
import React, { useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as cartServices from '@/api/cartServices';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart, selectCart, selectStatus } from '@/feature/cart/cartSlice';
import { selectUser } from '@/feature/user/userSlice';
import { Col, Row, Skeleton, Image, Space, InputNumber, Button,notification, Flex, Divider, Segmented } from 'antd';
import { MinusOutlined, PlusOutlined, HeartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
type NotificationType = 'success' | 'error';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl } from '@/utils/request';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
    {
        key: '1',
        label: 'This is panel header 1',
        children: <p>{text}</p>,
    },
    {
        key: '2',
        label: 'This is panel header 2',
        children: <p>{text}</p>,
    },
    {
        key: '3',
        label: 'This is panel header 3',
        children: <p>{text}</p>,
    },
];
interface OptionSize{
    label:string,
    value:number,
    disabled?:boolean
}
function ProductDetail() {
    const Navigate = useNavigate();
    const baseUrl: BaseUrl = 'https://localhost:7005';
    const [data, setData] = React.useState<Product>();
    const user = useAppSelector(selectUser)
    const dispatch = useAppDispatch()
    const [currentProductItem,setCurrentProductItem] = React.useState<ProductItem>()
    const [quantity, setQuantity] = React.useState(1);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description:type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    const increase = () => {
        setQuantity(quantity + 1);
    };
    const [optionSize, setOptionSize] = React.useState<OptionSize[]>([])
    const decline = () => {
        let newCount = quantity - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setQuantity(newCount);
    };
    const { id } = useParams();
    useEffect(() => {
        if (id != undefined) {
            const getData = async () => {
                const res = await productServices.getProductDetail(Number(id));
                if (res.isSuccessed == true) {
                    console.log(res.resultObj)
                    setData(res.resultObj);
                    setCurrentProductItem(res.resultObj.items[0])
                    let sizeOption:OptionSize[]= []
                    if(res.resultObj.items.length > 1){
                        res.resultObj.items.forEach((element:ProductItem) => {
                            let option:OptionSize ={
                                label:element.value,
                                value:element.id
                            }
                            if(element.status ==2){
                                option.disabled = true
                            }
                            sizeOption.push(option)
                        });
                        setOptionSize(sizeOption)
                    }
                }
            };
            getData();
        }
    }, [id]);
    const handleChangeColl = (key: string | string[]) => {
        console.log(key);
    };
    const GoBack = () => {
        Navigate(-1);
    };
    const onChangeSize = (value:any)=>{
        console.log(value)
        if(data != undefined){
            const item = data.items.find( x => x.id == value)
            if(item != undefined){
                setCurrentProductItem(item)
            }
        }
    }
    const handleAddToCart = async()=>{
        if(currentProductItem != undefined && user != undefined){
            const res = await cartServices.addCart(user.id,currentProductItem.id,quantity)
            if(res.isSuccessed == true){
                dispatch(addToCart(res.resultObj))
                openNotificationWithIcon('success')
            }else{
            openNotificationWithIcon('error')
            }
        }else{
        openNotificationWithIcon('error')
        }
    }
    return (
        <div>
            {contextHolder}
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    GoBack();
                }}
            >
                Go back
            </Button>
            {data == undefined ? (
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={14} className="gutter-row">
                        <div style={{ padding: '24px' }}>
                            <Skeleton.Image />
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10} className="gutter-row">
                        <Skeleton />
                    </Col>
                </Row>
            ) : (
                <>
                    <div>
                        <Row gutter={[8, 8]}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={14} className="gutter-row">
                                <div style={{ padding: '24px' }}>
                                    <Image width={'100%'} src={`${baseUrl + data.urlThumbnailImage}`} />
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={10} className="gutter-row">
                                {data != undefined ? (
                                    <>
                                        <div>
                                            <h1>{data.seoTitle}</h1>
                                            <p>{data.seoDescription}</p>
                                            <p>{ChangeCurrence(currentProductItem?.price)}</p>
                                           {data.items.length > 1? <>
                                            <p>Size</p>
                                            <Segmented options={optionSize} value={currentProductItem?.id} onChange={onChangeSize}/></>:''}
                                        </div>
                                        <Flex justify="space-between">
                                            <Space.Compact>
                                                <Button
                                                    onClick={() => {
                                                        decline();
                                                    }}
                                                    icon={<MinusOutlined />}
                                                />
                                                <InputNumber min={1} max={100000} value={quantity} />

                                                <Button
                                                    onClick={() => {
                                                        increase();
                                                    }}
                                                    icon={<PlusOutlined />}
                                                />
                                            </Space.Compact>
                                            <Button type="primary" onClick={()=>{handleAddToCart()}} style={{ width: '200px' }}>
                                                    Add to cart
                                                </Button>
                                            <Button icon={<HeartOutlined />} />
                                        </Flex>
                                        <Divider dashed />
                                        <Collapse items={items} defaultActiveKey={['1']} onChange={handleChangeColl} />
                                    </>
                                ) : (
                                    ''
                                )}
                            </Col>
                        </Row>
                    </div>
                </>
            )}
        </div>
    );
}
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default ProductDetail;
