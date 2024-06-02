/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { ProductItem } from '@/type';
import React, { lazy, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as cartServices from '@/api/cartServices';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Col,Badge, Row, Image, Space, Button, notification, Flex, Divider, Segmented } from 'antd';
import {ArrowLeftOutlined } from '@ant-design/icons';
type NotificationType = 'success' | 'error';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductDetailLoading from './ProductDetailLoading';
import { loadCartDetail } from '@/app/feature/cart/action';
import Container from '@/conponents/Container';
import InputQuatity from '@/conponents/InputQuatity';
const ProductDetailReview =lazy(()=> import('./ProductDetailReview'));
const ProductDetailSimilarProduct =lazy(()=> import('./ProductDetailSimilarProduct'))
const ProductDetailInfo =lazy(()=> import('./ProductDetailInfo'));
interface OptionSize {
    label: string;
    value: number;
    disabled?: boolean;
}
function ProductDetail() {
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { data: user } = useAppSelector(selectUser);
    const { data, isLoading } = useQuery({
        queryKey: [`product-detail-${id}`],
        queryFn: () => productServices.getProductDetail(Number(id)),
    });
    const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const [quantity, setQuantity] = React.useState(1);
    const optionSize: OptionSize[] = [];
    const listImage: string[] = [];
    if (data) {
        const arr: string[] = data.urlImage.split('*');
        const arrFilter = arr.filter( s => s !== '')
        listImage.push(...arrFilter);
        if (data.items && data.items.length > 0) {
            data.items.forEach((element: ProductItem) => {
                const option: OptionSize = {
                    label: element.value,
                    value: element.id,
                };
                if (element.status == 2) {
                    option.disabled = true;
                }
                optionSize.push(option);
            });
        }
    }
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType, mess: string) => {
        api[type]({
            message: 'Notification Title',
            description: mess,
        });
    };
    useEffect(() => {
        if (data && data.items && data.items.length > 0) setCurrentProductItem(data.items[0]);
    }, [data]);
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
                if (res.isSuccessed === true) {
                    dispatch(loadCartDetail({ userId: user.id as string }));
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
        <section>
            {contextHolder}
            {isLoading ? (
                <ProductDetailLoading />
            ) : (
                data && (
                    <>
                        <Container>
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
                                                <Badge.Ribbon
                                                    text="New"
                                                    style={{ display: '' }}
                                                    color="red"
                                                ></Badge.Ribbon>
                                            ) : (
                                                <Badge.Ribbon text="New" style={{ display: 'none' }}></Badge.Ribbon>
                                            )}
                                            {data?.status == 3 ? (
                                                <Badge.Ribbon
                                                    text="Hot"
                                                    style={{ display: '' }}
                                                    color="yellow"
                                                ></Badge.Ribbon>
                                            ) : (
                                                <Badge.Ribbon text="New" style={{ display: 'none' }}></Badge.Ribbon>
                                            )}
                                        </span>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={4} xl={4}>
                                        <Space align="center" direction="vertical" style={{ padding: 20 }}>
                                            {listImage.map((e: string, index) => (
                                                <Image key={index} alt={`${data.seoTitle}`} src={`${baseUrl + e}`} />
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
                                                                {ChangeCurrence(
                                                                    currentProductItem?.priceBeforeDiscount,
                                                                )}
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
                                                                {ChangeCurrence(
                                                                    currentProductItem?.priceBeforeDiscount,
                                                                )}
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
                                                    <InputQuatity stock={currentProductItem.stock} setQuantity={setQuantity} quantity={quantity}/>
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
                                                <ProductDetailInfo product={data} guaranty={currentProductItem.guaranty} />
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <ProductDetailReview productId={data.id} />
                        <ProductDetailSimilarProduct similarProduct={data.similarProduct} />
                    </>
                )
            )}
        </section>
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
