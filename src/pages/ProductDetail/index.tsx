import { useParams } from 'react-router';
import type { Product, ProductItem, Variation } from '../Admin/Product/ProductList';
import React, { useEffect } from 'react';
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
import { MinusOutlined, PlusOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse } from 'antd';
type NotificationType = 'success' | 'error';
import { useNavigate } from 'react-router-dom';
import Meta from 'antd/es/card/Meta';
import { Review } from '@/api/ResType';
import dayjs from 'dayjs';
interface OptionSize {
    label: string;
    value: number;
    disabled?: boolean;
}
function ProductDetail() {
    const Navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [data, setData] = React.useState<Product>();
    const user = useAppSelector(selectUser);
    const [listImage, setListImage] = React.useState<string[]>([]);
    const [listReview, setListReview] = React.useState<Review[]>([]);
    const dispatch = useAppDispatch();
    const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const [quantity, setQuantity] = React.useState(1);
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess!' : 'error',
        });
    };
    const increase = () => {
        let quan = quantity + 1;
        if (currentProductItem != undefined && quan <= currentProductItem?.stock) {
            setQuantity(quan);
        }
    };
    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Variation',
            children: (
                <Space direction="vertical">
                    {data?.variation.map((e: Variation) => (
                        <p>
                            {e.name}: {e.value}
                        </p>
                    ))}
                </Space>
            ),
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
    const [optionSize, setOptionSize] = React.useState<OptionSize[]>([]);
    const decline = () => {
        let newCount = quantity - 1;
        if (newCount < 1) {
            newCount = 1;
        }
        setQuantity(newCount);
    };
    const getData = async () => {
        const res = await productServices.getProductDetail(Number(id));
        if (res.isSuccessed == true) {
            let arr: string[] = res.resultObj.urlImage.split('*');
            const t = arr.pop();
            setListImage(arr);
            setData(res.resultObj);
            setCurrentProductItem(res.resultObj.items[0]);
            getReview(res.resultObj.id);
            let sizeOption: OptionSize[] = [];
            if (res.resultObj.items.length > 1) {
                res.resultObj.items.forEach((element: ProductItem) => {
                    let option: OptionSize = {
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
    };
    const getReview = async (id: number) => {
        const r = await reviewServices.getReivewByProductId(id, 1);
        console.log(r);
        if (r.isSuccessed == true) {
            setListReview(r.resultObj.items);
        }
    };
    const { id } = useParams();
    useEffect(() => {
        if (id != undefined) {
            getData();
        }
        if (typeof data !== 'undefined') {
        }
    }, [id]);
    const handleChangeColl = (key: string | string[]) => {
        console.log(key);
    };
    const GoBack = () => {
        Navigate(-1);
    };
    const onChangeSize = (value: any) => {
        if (data != undefined) {
            const item = data.items.find((x) => x.id == value);
            if (item != undefined) {
                setCurrentProductItem(item);
            }
        }
    };
    const handleAddToCart = async () => {
        if (typeof user !== 'undefined') {
            if (typeof currentProductItem !== 'undefined') {
                const res = await cartServices.addCart(user.id, currentProductItem.id, quantity);
                console.log(res);
                if (res.isSuccessed == true) {
                    dispatch(addToCart(res.resultObj));
                    openNotificationWithIcon('success');
                } else {
                    openNotificationWithIcon('error');
                }
            } else {
                openNotificationWithIcon('error');
            }
        } else {
            Navigate('/auth/login');
        }
    };
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
            {typeof data === 'undefined' ? (
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
                            <Col xs={16} sm={16} md={16} lg={10} xl={10} className="gutter-row">
                                <div style={{ padding: 20 }}>
                                    <Image width={'100%'} src={`${baseUrl + data.urlThumbnailImage}`} />
                                </div>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={4} xl={4}>
                                <Space align="center" direction="vertical" style={{ padding: 20 }}>
                                    {listImage.map((e: string) => (
                                        <Image src={`${baseUrl + e}`} />
                                    ))}
                                </Space>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={10} xl={10} className="gutter-row">
                                {data != undefined ? (
                                    <>
                                        <div style={{ marginBottom: 15 }}>
                                            <h1>{data.seoTitle}</h1>
                                            <p>{data.seoDescription}</p>
                                            <p>{ChangeCurrence(currentProductItem?.price)}</p>
                                            {data.items.length > 1 ? (
                                                <>
                                                    <p>Size</p>
                                                    <Segmented
                                                        options={optionSize}
                                                        value={currentProductItem?.id}
                                                        onChange={onChangeSize}
                                                        disabled={currentProductItem?.status == 2}
                                                    />
                                                </>
                                            ) : (
                                                ''
                                            )}
                                            <p>In Stock: {currentProductItem?.stock}</p>
                                        </div>
                                        <Flex justify="space-between">
                                            <Space.Compact>
                                                <Button
                                                    onClick={() => {
                                                        decline();
                                                    }}
                                                    icon={<MinusOutlined />}
                                                />
                                                <InputNumber min={1} max={currentProductItem?.stock} value={quantity} />

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
                                ) : (
                                    ''
                                )}
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={14}>
                                { listReview.length > 0 ? (
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
                                                {e.feelback != undefined ? (
                                                    <>
                                                        <Card
                                                            key={e.id}
                                                            type="inner"
                                                            style={{ width: '100%', marginTop: 16 }}
                                                        >
                                                            <Meta
                                                                avatar={
                                                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                                                                }
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
                                                ) : (
                                                    ''
                                                )}
                                            </Card>
                                        ))}
                                    </>
                                ) : (
                                    <Empty
                                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                                        imageStyle={{ height: 60 }}
                                        description={
                                            <span>
                                                Customize <a href="#API">Description</a>
                                            </span>
                                        }
                                    >
                                    </Empty>
                                )}
                            </Col>
                            <Col span={10}>
                                <Card style={{ width: '100%', marginTop: 16 }}>
                                    <Space align="start">
                                        <Image width={100} src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                                        <Meta title="Card title" description="This is the description" />
                                    </Space>
                                </Card>
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
