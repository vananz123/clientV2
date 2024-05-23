/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { Product, ProductItem, Variation } from '@/type';
import React, { useCallback, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as reviewServices from '@/api/reviewServices';
import * as cartServices from '@/api/cartServices';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { addToCart } from '@/feature/cart/cartSlice';
import { selectUser } from '@/feature/user/userSlice';
import {
    Col,
    Row,
    Skeleton,
    Image,
    Space,
    InputNumber,
    Button,
    notification,
    Flex,
    Divider,
    Segmented,
    Card,
    Avatar,
    Rate,
    Empty,
} from 'antd';
import { MinusOutlined, PlusOutlined, ArrowLeftOutlined, UserOutlined } from '@ant-design/icons';
import { CollapseProps, Badge } from 'antd';
import { Collapse } from 'antd';
type NotificationType = 'success' | 'error';
import { useNavigate } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { Review } from '@/api/ResType';
import dayjs from 'dayjs';
import ProductCard from '@/conponents/ProductCard';
interface OptionSize {
    label: string;
    value: number;
    disabled?: boolean;
}
function ProductDetail() {
    const Navigate = useNavigate();
    const { id } = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [data, setData] = React.useState<Product | undefined>();
    const user = useAppSelector(selectUser);
    const [listImage, setListImage] = React.useState<string[]>([]);
    const [listReview, setListReview] = React.useState<Review[]>([]);
    const dispatch = useAppDispatch();
    const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const [quantity, setQuantity] = React.useState(1);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    const increase = () => {
        const quan = quantity + 1;
        if (currentProductItem != undefined && quan <= currentProductItem?.stock) {
            setQuantity(quan);
        }
    };
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Thông số và mô tả',
            children: (
                <Space direction="vertical">
                    {data?.variation !== undefined  && (
                        <>
                            {data?.variation.map((e: Variation) => (
                                <p>
                                    {e.name} {e.value}
                                </p>
                            ))}
                            <p dangerouslySetInnerHTML={{__html:data.seoDescription}}></p>
                        </>
                    )}
                </Space>
            ),
        },
        {
            key: '2',
            label: 'Dịch vụ sau mua',
            children: (
                <>
                    <Space direction="vertical">
                        <div key={currentProductItem?.guaranty.id}>
                            <p>Loại bảo hành: {currentProductItem?.guaranty.name}</p>
                            <p>Thời gian: {currentProductItem?.guaranty.period + ' ' + currentProductItem?.guaranty.sku}</p>
                            <p dangerouslySetInnerHTML={{__html:currentProductItem?.guaranty.description || '<p></p>'}}></p>
                        </div>
                    </Space>
                </>
            ),
        },
    ];
    const [optionSize, setOptionSize] = React.useState<OptionSize[]>([]);
    const decline = () => {
        let newCount = quantity - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setQuantity(newCount);
    };
    const getData = useCallback(async () => {
        const res = await productServices.getProductDetail(Number(id));
        if (res.isSuccessed == true) {
            const arr: string[] = res.resultObj.urlImage.split('*');
            const t = arr.pop();
            console.log(t);
            setListImage(arr);
            setData(res.resultObj);
            setCurrentProductItem(res.resultObj.items[0]);
            getReview(res.resultObj.id);
            const sizeOption: OptionSize[] = [];
            if (res.resultObj.items.length > 1) {
                res.resultObj.items.forEach((element: ProductItem) => {
                    const option: OptionSize = {
                        label: element.value,
                        value: element.id,
                    };
                    if (element.status == 2) {
                        option.disabled = true;
                    }
                    sizeOption.push(option);
                });
                setOptionSize(sizeOption);
            }
        }
    },[id]);
    const getReview = async (id: number) => {
        const r = await reviewServices.getReivewByProductId(id, 1);
        if (r.isSuccessed === true) {
            setListReview(r.resultObj.items);
        }
    };

    useEffect(() => {
        if (id != undefined) {
            getData();
        }
    }, [id,getData]);
    const handleChangeColl = (key: string | string[]) => {
        console.log(key);
    };
    const GoBack = () => {
        Navigate(-1);
    };
    const onChangeSize = async (value: any) => {
        if (data != undefined) {
            const item = data.items?.find((x) => x.id == value);
            if (item != undefined) {
                setCurrentProductItem(item);
                await productServices.productItemViewCount(item.id);
            }
        }
    };
    const handleAddToCart = async () => {
        if (typeof user !== 'undefined') {
            if (typeof currentProductItem !== 'undefined') {
                const res = await cartServices.addCart(user.id, currentProductItem.id, quantity);
                if (res.isSuccessed == true) {
                    dispatch(addToCart(res.resultObj));
                    openNotificationWithIcon('success', 'Thêm thành công!');
                } else {
                    openNotificationWithIcon('error', res.message);
                }
            } else {
                openNotificationWithIcon('error', 'error');
            }
        } else {
            Navigate('/auth/login');
        }
    };
    return (
        <div className="container">
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
            {typeof data === 'undefined' ? (
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={14} className="gutter-row">
                        <Flex justify="space-between">
                            <Skeleton.Image style={{ width: 400, height: 400 }} />
                            <Space direction="vertical">
                                <Skeleton.Image />
                                <Skeleton.Image />
                            </Space>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10} className="gutter-row">
                        <Space direction="vertical">
                            <Skeleton.Input size="large" />
                            <Skeleton.Input size="large" />
                            <Skeleton.Input size="large" />
                        </Space>
                        <Flex justify="space-between" style={{ marginTop: 10 }}>
                            <Skeleton.Button size="large" />
                            <Skeleton.Button size="large" />
                        </Flex>
                    </Col>
                </Row>
            ) : (
                <>
                    <div>
                        <Row gutter={[8, 8]}>
                            <Col
                                style={{ position: 'relative' }}
                                xs={16}
                                sm={16}
                                md={16}
                                lg={10}
                                xl={10}
                                className="gutter-row"
                            >
                                <div style={{ padding: 20 }}>
                                    <Image width={'100%'} src={`${baseUrl + data.urlThumbnailImage}`} />
                                </div>
                                <span style={{ position: 'absolute', top: '5px', right: '5px' }}>
                                    {data?.status == 2 ? (
                                        <Badge.Ribbon text="New" style={{ display: '' }} color="red"></Badge.Ribbon>
                                    ) : (
                                        <Badge.Ribbon text="New" style={{ display: 'none' }}></Badge.Ribbon>
                                    )}
                                    {data?.status == 3 ? (
                                        <Badge.Ribbon text="Hot" style={{ display: '' }} color="yellow"></Badge.Ribbon>
                                    ) : (
                                        <Badge.Ribbon text="New" style={{ display: 'none' }}></Badge.Ribbon>
                                    )}
                                </span>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={4} xl={4}>
                                <Space align="center" direction="vertical" style={{ padding: 20 }}>
                                    {listImage.map((e: string) => (
                                        <Image src={`${baseUrl + e}`} />
                                    ))}
                                </Space>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={10} xl={10} className="gutter-row">
                                <h2>{data.seoTitle}</h2>
                                {typeof currentProductItem !== 'undefined' && (
                                    <>
                                        <div style={{ marginBottom: 15 }}>
                                            {currentProductItem.type == undefined ? (
                                                <>
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontSize: 18,
                                                            fontWeight: 500,
                                                            marginRight: 5,
                                                            display: '',
                                                        }}
                                                    >
                                                        {ChangeCurrence(currentProductItem?.priceBeforeDiscount)}
                                                    </span>
                                                </>
                                            ) : (
                                                <div>
                                                    <span
                                                        style={{
                                                            color: 'red',
                                                            fontSize: 18,
                                                            fontWeight: 500,
                                                            marginRight: 5,
                                                        }}
                                                    >
                                                        {ChangeCurrence(currentProductItem?.price)}
                                                    </span>
                                                    <span style={{ textDecorationLine: 'line-through' }}>
                                                        {ChangeCurrence(currentProductItem?.priceBeforeDiscount)}
                                                    </span>
                                                </div>
                                            )}

                                            {typeof data.items !== 'undefined' && (
                                                <>
                                                    {data.items.length > 1 && (
                                                        <div>
                                                            <p>Size</p>
                                                            <Segmented
                                                                options={optionSize}
                                                                value={currentProductItem.id}
                                                                onChange={onChangeSize}
                                                                disabled={currentProductItem.status == 2}
                                                            />
                                                        </div>
                                                    )}
                                                    <Flex justify="space-between">
                                                        <p>Số Tồn: {currentProductItem.stock}</p>
                                                        <p>Lượt xem: {currentProductItem.viewCount}</p>
                                                    </Flex>
                                                </>
                                            )}
                                        </div>
                                        <Flex justify="space-between">
                                            <Space.Compact>
                                                <Button
                                                    onClick={() => {
                                                        decline();
                                                    }}
                                                    icon={<MinusOutlined />}
                                                />
                                                <InputNumber
                                                    style={{ width: '70px' }}
                                                    min={1}
                                                    max={currentProductItem?.stock}
                                                    value={quantity}
                                                />

                                                <Button
                                                    onClick={() => {
                                                        increase();
                                                    }}
                                                    icon={<PlusOutlined />}
                                                />
                                            </Space.Compact>
                                            <Button
                                                type="primary"
                                                onClick={() => {
                                                    handleAddToCart();
                                                }}
                                                disabled={currentProductItem?.status == 2}
                                                style={{ width: '200px' }}
                                            >
                                                Add to cart
                                            </Button>
                                        </Flex>
                                        <Divider dashed />
                                        <Collapse items={items} defaultActiveKey={['1']} onChange={handleChangeColl} />
                                    </>
                                )}
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col xs={24} lg={14}>
                                {listReview.length > 0 ? (
                                    <>
                                        {listReview.map((e: Review) => (
                                            <Card key={e.id} style={{ width: '100%', marginTop: 16 }}>
                                                <Meta
                                                    avatar={
                                                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                                                    }
                                                    title={e.user.userName}
                                                    description={
                                                        <>
                                                            <Space align="baseline" direction="vertical">
                                                                <Rate value={e.rate} disabled />
                                                                <p>{e.comment}</p>
                                                                <p>{dayjs(e.createAt).format('YYYY-MM-DD')}</p>
                                                            </Space>
                                                        </>
                                                    }
                                                />
                                                {e.feelback !== null && (
                                                    <>
                                                        <Card
                                                            key={e.id}
                                                            type="inner"
                                                            style={{ width: '100%', marginTop: 16 }}
                                                        >
                                                            <Meta
                                                                avatar={<Avatar icon={<UserOutlined />} />}
                                                                title={'Feedback of admin'}
                                                                description={
                                                                    <>
                                                                        <Space align="baseline" direction="vertical">
                                                                            <p>{e.feelback}</p>
                                                                            <p>
                                                                                {dayjs(e.feelbackAt).format(
                                                                                    'YYYY-MM-DD',
                                                                                )}
                                                                            </p>
                                                                        </Space>
                                                                    </>
                                                                }
                                                            />
                                                        </Card>
                                                    </>
                                                )}
                                            </Card>
                                        ))}
                                    </>
                                ) : (
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 60 }}
                                        description={<span>Chưa có bình luận nào</span>}
                                    ></Empty>
                                )}
                            </Col>
                            <Col xs={24} lg={10}>
                                {data.similarProduct && data.similarProduct.length > 0 ? (
                                    <>
                                        <div style={{marginTop:15}}></div>
                                        {data.similarProduct.map((item: Product) => (
                                            <ProductCard key={item.id} product={item} type="forList" />
                                        ))}
                                    </>
                                ) : (
                                    <Card type="inner">
                                        <Space align="start">
                                            <Meta description="Không có sản phẩm tương tự" />
                                        </Space>
                                    </Card>
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
