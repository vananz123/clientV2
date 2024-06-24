/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { ProductItem } from '@/type';
import React, { lazy, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as cartServices from '@/api/cartServices';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Col, Badge, Row, Image, Button, notification, Flex, Segmented, Modal, Space } from 'antd';
import {
    ArrowLeftOutlined,
    ClockCircleTwoTone,
    CustomerServiceTwoTone,
    LikeTwoTone,
    MailTwoTone,
} from '@ant-design/icons';
type NotificationType = 'success' | 'error';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import ProductDetailLoading from './ProductDetailLoading';
import { loadCartDetail } from '@/app/feature/cart/action';
import Container from '@/conponents/Container';
import InputQuatity from '@/conponents/InputQuatity';
import ProductDetailGuaranty from './ProductDetailGuaranty';
import ProductDetailViewer from './ProductDetailViewer';
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const ProductDetailImage = lazy(() => import('./ProductDetailImage'));
const ProductDetailReview = lazy(() => import('./ProductDetailReview'));
const ProductDetailSimilarProduct = lazy(() => import('./ProductDetailSimilarProduct'));
const ProductDetailInfo = lazy(() => import('./ProductDetailInfo'));
import { ChangeCurrence } from '@/utils/utils';
interface OptionSize {
    label: string;
    value: number;
    disabled?: boolean;
}
const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
};

function ProductDetail() {
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const { data: user } = useAppSelector(selectUser);
    const { data, isLoading } = useQuery({
        queryKey: [`product-detail`,id],
        queryFn: () => productServices.getProductDetail(Number(id)),
    });
    const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const [quantity, setQuantity] = React.useState(1);
    const optionSize: OptionSize[] = [];
    const listImage: string[] = [];
    if (data) {
        const arr: string[] = data.urlImage.split('*');
        const arrFilter = arr.filter((s) => s !== '');
        listImage.push(...arrFilter);
        if (data.items && data.items.length > 0) {
            data.items.forEach((element: ProductItem) => {
                const option: OptionSize = {
                    label: element.value + ' ' + (element.sku !== 'size' ? element.sku : ''),
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
            message: 'Thông báo',
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
    const [openModal, setOpen] = React.useState(false);
    const handleCancel = () => {
        setOpen(false);
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
                                Trở lại
                            </Button>
                            <div>
                                <Row gutter={[12, 12]}>
                                    <Col
                                        style={{ position: 'relative' }}
                                        xs={16}
                                        sm={16}
                                        md={16}
                                        lg={10}
                                        xl={10}
                                        className="gutter-row "
                                    >
                                        <div className="bg-[#fafafa] rounded">
                                            <Image width={'100%'} src={`${baseUrl + data.urlThumbnailImage}`} />
                                        </div>
                                        <div className="mt-3">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className="text-[20px] font-semibold">LAStore</span>
                                                <span className="text-[12px] xl:text-base from-stone-500">
                                                    Là nơi để bạn và người thân tin tưởng lựa chọn
                                                </span>
                                            </div>
                                            <div
                                                onClick={() => {
                                                    setOpen(true);
                                                }}
                                            >
                                                <Slider
                                                    {...settings}
                                                    className="cursor-pointer flex space-x-3 text-[10px] xl:text-[14px] w-[310px] xl:w-[500px]"
                                                >
                                                    <div className="space-x-2">
                                                        <LikeTwoTone />
                                                        <span className=" ml-2">Trải nghiệm</span>
                                                    </div>
                                                    <div className="space-x-2">
                                                        <CustomerServiceTwoTone />
                                                        <span className=" ml-2">Tận tâm tư vấn</span>
                                                    </div>
                                                    <div className="space-x-2">
                                                        <MailTwoTone />
                                                        <span className="ml-2">Trung tâm bảo vệ</span>
                                                    </div>
                                                    <div className="space-x-2">
                                                        <ClockCircleTwoTone />
                                                        <span className="ml-2">Phục vụ 24/7</span>
                                                    </div>
                                                </Slider>
                                            </div>
                                        </div>
                                        <Modal
                                            title="Tự tin mua sắm cùng LAStore"
                                            open={openModal}
                                            onCancel={handleCancel}
                                            footer={''}
                                        >
                                            <Space className="block">
                                                <div className="flex space-x-2 py-4">
                                                    <div>
                                                        <LikeTwoTone />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-medium">
                                                            Được trải nghiệm thực tế sản phẩm, lựa chọn đúng hơn.
                                                        </span>
                                                        <p className="mt-2 text-sm">
                                                            Không còn bọc nilon, hạn chế quyền được trải nghiệm trước
                                                            mua hàng của người dùng.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 py-4">
                                                    <div>
                                                        <CustomerServiceTwoTone />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-medium">
                                                            Bạn lo lắng khi không biết sản phẩm nào phù hợp? LAStore có
                                                            đội ngũ tư vấn tận tâm và có chuyên môn.
                                                        </span>
                                                        <p className="mt-2 text-sm">
                                                            Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách
                                                            nhiệm đầu tiên của Nhân viên tư vấn tại LAStore.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 py-4">
                                                    <div>
                                                        <MailTwoTone />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-medium">
                                                            Bạn gặp khó khi gặp lỗi hỏng, LAStore có Trung tâm bảo vệ
                                                            quyền lợi khách hàng
                                                        </span>
                                                        <p className="mt-2 text-sm">
                                                            Để không bỏ sót bất kỳ một trải nghiệm không tốt nào của
                                                            khách hàng, Ban Lãnh Đạo Tập đoàn có chuyên trang bảo vệ
                                                            quyền lợi khách hàng.
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex space-x-2 py-4">
                                                    <div className="text-[15px]">
                                                        <ClockCircleTwoTone />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-medium">
                                                            Bạn bận, LAStore phục vụ từ sáng tới khuya.
                                                        </span>
                                                        <p className="mt-2 text-sm">
                                                            Khách hàng bận bịu. Cán bộ, nhân viên LAStore càng phải phục
                                                            vụ ngoài giờ để trải nghiệm của khách hàng được thông suốt.
                                                        </p>
                                                    </div>
                                                </div>
                                            </Space>
                                        </Modal>
                                        <span style={{ position: 'absolute', top: '5px', right: '5px' }}>
                                            {data?.status === 2 && <Badge.Ribbon text="New" color="red"></Badge.Ribbon>}
                                            {data?.status === 3 && (
                                                <Badge.Ribbon text="Hot" color="yellow"></Badge.Ribbon>
                                            )}
                                        </span>
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={4} xl={4}>
                                        <ProductDetailImage listImage={listImage} seo={data.seoTitle} />
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={8} xl={8} className="gutter-row">
                                        <div className="flex items-center">
                                            <div className="border-r-[1px] border-black mr-2 pr-2">
                                                <span>
                                                    <img className="h-auto max-h-11" src="/logo.png" alt="logo" />
                                                </span>
                                            </div>
                                            <p className="mb-0 text-[#4c4c4c] text-base w-auto">{data.seoTitle}</p>
                                        </div>
                                        {typeof currentProductItem !== 'undefined' && (
                                            <>
                                                <div className="mb-5">
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
                                                            <span className="text-[red] text-lg font-medium mr-[5px]">
                                                                {ChangeCurrence(currentProductItem?.price)}
                                                            </span>
                                                            <span className="line-through text-[#6D6E72] font-medium">
                                                                {ChangeCurrence(
                                                                    currentProductItem?.priceBeforeDiscount,
                                                                )}
                                                            </span>
                                                            {currentProductItem.type === 'fixed' ? (
                                                                <span className="pro-percent ml-1">
                                                                    {' '}
                                                                    -{currentProductItem.valuePromotion}
                                                                </span>
                                                            ) : (
                                                                <span className="text-[#E30019] text-[10px] sm:text-[12px] text-center rounded border-[1px] border-[#E30019] px-1 ml-1">
                                                                    -{currentProductItem.valuePromotion}%
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    {typeof data.items !== 'undefined' && (
                                                        <>
                                                            {data.items.length > 1 && (
                                                                <div>
                                                                    <p className="text-[#595959] font-medium">
                                                                        Kích thước
                                                                    </p>
                                                                    <Segmented
                                                                        options={optionSize}
                                                                        value={currentProductItem.id}
                                                                        onChange={onChangeSize}
                                                                        disabled={currentProductItem.status == 2}
                                                                    />
                                                                </div>
                                                            )}
                                                            <Flex justify="space-between">
                                                                <p className="text-[#595959] font-medium">
                                                                    Số Tồn: {currentProductItem.stock}
                                                                </p>
                                                                <p className="text-[#595959] font-medium">
                                                                    Lượt xem: {currentProductItem.viewCount}
                                                                </p>
                                                            </Flex>
                                                        </>
                                                    )}
                                                </div>
                                                <Flex justify="space-between">
                                                    <InputQuatity
                                                        stock={currentProductItem.stock}
                                                        setQuantity={setQuantity}
                                                        quantity={quantity}
                                                    />
                                                    <Button
                                                        type="primary"
                                                        danger
                                                        onClick={() => {
                                                            handleAddToCart();
                                                        }}
                                                        disabled={
                                                            currentProductItem.status == 2 ||
                                                            currentProductItem.stock <= 0
                                                        }
                                                        style={{ width: '150px' }}
                                                    >
                                                        Thêm vào giỏ
                                                    </Button>
                                                </Flex>
                                                <ProductDetailInfo product={data} />
                                                <br />
                                                <ProductDetailGuaranty guaranty={currentProductItem.guaranty} />
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                        <ProductDetailReview productId={data.id} />
                        {data.similarProduct && data.similarProduct?.length > 0 && (
                            <ProductDetailSimilarProduct similarProduct={data.similarProduct} />
                        )}

                        <Container>
                            <ProductDetailViewer />
                        </Container>
                    </>
                )
            )}
        </section>
    );
}
export default ProductDetail;
