/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { ProductItem } from '@/type';
import React, { useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as cartServices from '@/api/cartServices';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Col,Badge, Row, Image, Space, InputNumber, Button, notification, Flex, Divider, Segmented } from 'antd';
import { MinusOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
type NotificationType = 'success' | 'error';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductDetailLoading from './ProductDetailLoading';
import { loadCartDetail } from '@/app/feature/cart/action';
<<<<<<< HEAD
=======
import Container from '@/conponents/Container';
import ProductDetailReview from './ProductDetailReview';
import ProductDetailSimilarProduct from './ProductDetailSimilarProduct';
import ProductDetailInfo from './ProductDetailInfo';
>>>>>>> 7620d1c63fa3bb03c5e962f9fa196f189c180b2b
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
    const increase = () => {
        const quan = quantity + 1;
        if (currentProductItem != undefined && quan <= currentProductItem?.stock) {
            setQuantity(quan);
        }
    };
    const decline = () => {
        let newCount = quantity - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setQuantity(newCount);
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
<<<<<<< HEAD
        <div className="container">
=======
        <section>
>>>>>>> 7620d1c63fa3bb03c5e962f9fa196f189c180b2b
            {contextHolder}
            {isLoading ? (
                <ProductDetailLoading />
            ) : (
                data && (
                    <>
<<<<<<< HEAD
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
                                                        <span style={{ textDecorationLine: 'line-through', color:'#6D6E72' }}>
                                                            {ChangeCurrence(currentProductItem?.priceBeforeDiscount)}
                                                        </span>
                                                        <span className='pro-percent'>-{currentProductItem.valuePromotion}%</span>
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
                                            <Collapse
                                                items={items}
                                                defaultActiveKey={['1']}
                                                onChange={handleChangeColl}
                                            />
                                        </>
                                    )}
                                    {/* {data.items &&(
                                        <><SelectProductItem options={data.items}/></>
                                    )} */}
                                    
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col xs={24} lg={14}>
                                    {listReview && (
                                        <>
                                            {listReview.items.length > 0 ? (
                                                <>
                                                    {listReview.items.map((e: Review) => (
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
                                                                            <p>
                                                                                {dayjs(e.createAt).format('YYYY-MM-DD')}
                                                                            </p>
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
                                                                                    <Space
                                                                                        align="baseline"
                                                                                        direction="vertical"
                                                                                    >
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
=======
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
>>>>>>> 7620d1c63fa3bb03c5e962f9fa196f189c180b2b
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
<<<<<<< HEAD
        </div>
=======
        </section>
>>>>>>> 7620d1c63fa3bb03c5e962f9fa196f189c180b2b
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
