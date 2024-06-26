/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from 'react-router';
import { ProductItem } from '@/type';
import { lazy, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as cartServices from '@/api/cartServices';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Col, Badge, Row, Image, Button, Flex, Segmented } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProductDetailLoading from './ProductDetailLoading';
import { loadCartDetail } from '@/app/feature/cart/action';
import Container from '@/conponents/Container';
import InputQuatity from '@/conponents/InputQuatity';
import ProductDetailGuaranty from './ProductDetailGuaranty';
import ProductDetailViewer from './ProductDetailViewer';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const ProductDetailImage = lazy(() => import('./ProductDetailImage'));
const ProductDetailReview = lazy(() => import('./ProductDetailReview'));
const ProductDetailSimilarProduct = lazy(() => import('./ProductDetailSimilarProduct'));
const ProductDetailInfo = lazy(() => import('./ProductDetailInfo'));
const ProductdetailPolicy = lazy(() => import('./ProductdetailPolicy'));
import { ChangeCurrence } from '@/utils/utils';
import { useImmer } from 'use-immer';
import { AxiosError } from 'axios';
import { Result } from '@/api/ResType';
import { useNotification } from '@/hooks';
interface OptionSize {
    label: string;
    value: number;
    disabled?: boolean;
}
interface Body {
    userId: string;
    productItemId: number;
    quantity: number;
}
const baseUrl = import.meta.env.VITE_BASE_URL;
function ProductDetail() {
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { contextHolder, openNotification } = useNotification();
    const { id } = useParams();

    const { data: user } = useAppSelector(selectUser);
    const [currentProductItem, setCurrentProductItem] = useImmer<ProductItem | undefined>(undefined);
    const [quantity, setQuantity] = useImmer(1);
    const optionSize: OptionSize[] = [];
    const listImage: string[] = [];
    const { data, isLoading } = useQuery({
        queryKey: [`product-detail`, id],
        queryFn: () => productServices.getProductDetail(Number(id)),
    });
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
    useEffect(() => {
        if (data && data.items && data.items.length > 0) setCurrentProductItem(data.items[0]);
    }, [data, setCurrentProductItem]);
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
    const addToCart = useMutation({
        mutationKey: ['add-to-cart', currentProductItem?.id],
        mutationFn: (body: Body) => cartServices.addCart(body.userId, body.productItemId, body.quantity),
        onSuccess: (data) => {
            if (data.isSuccessed === true && user) {
                dispatch(loadCartDetail({ userId: user.id as string }));
                openNotification('success', 'Thêm thành công!');
            }
        },
        onError: (error: AxiosError<Result>) => {
            openNotification('error', error.response?.data.message);
        },
    });
    const handleAddToCart = async () => {
        if (typeof user !== 'undefined') {
            if (typeof currentProductItem !== 'undefined' && user) {
                const body: Body = {
                    userId: user.id,
                    productItemId: currentProductItem.id,
                    quantity: quantity,
                };
                addToCart.mutateAsync(body);
            } else {
                openNotification('error', 'không có sản phẩm nào được chọn');
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
                                        <span style={{ position: 'absolute', top: '5px', right: '5px' }}>
                                            {data?.status === 2 && <Badge.Ribbon text="New" color="red"></Badge.Ribbon>}
                                            {data?.status === 3 && (
                                                <Badge.Ribbon text="Hot" color="yellow"></Badge.Ribbon>
                                            )}
                                        </span>
                                        <ProductdetailPolicy />
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
                                                <div className="mb-2">
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
                                                        loading={addToCart.isPending}
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
