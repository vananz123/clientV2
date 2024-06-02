/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product } from '@/type';
import { Link } from 'react-router-dom';
import { Badge, Space } from 'antd';
import * as productServices from '@/api/productServices';
import { Card, Typography } from 'antd';
import React from 'react';
const { Paragraph } = Typography;
type ProductCardType = 'forCard' | 'forList';
interface Props {
    product: Product | undefined;
    type?: ProductCardType;
    height?: number;
}
const ProductCard: React.FC<Props> = ({ product, type = 'forCard', height = 100 }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const viewConut = async () => {
        if (typeof product !== 'undefined') {
            await productServices.productViewCount(product?.id);
        }
    };
    return (
        <Link to={`/product/detail/${product?.id}`} onClick={() => viewConut()}>
            {type == 'forCard' ? (
                <>
                    <Card
                        className="product-card"
                        bordered={false}
                        hoverable
                        size="small"
                        cover={<img alt={product?.name} src={`${baseUrl + product?.urlThumbnailImage}`} />}
                    >
                        <Paragraph
                            ellipsis={{
                                rows: 2,
                            }}
                            className="product-card__title"
                        >
                            {product?.seoTitle}
                        </Paragraph>
                        {product?.type == undefined ? (
                            <>
                                <span
                                    className="text-[18px] sm:text-[16px] text-[red] mr-[3px]"
                                    style={{
                                        color: 'red',
                                        fontSize: 18,
                                        fontWeight: 500,
                                        marginRight: 5,
                                        display: '',
                                    }}
                                >
                                    <p className="product-card__price">
                                        {ChangeCurrence(product?.priceBeforeDiscount)}
                                    </p>
                                </span>
                            </>
                        ) : (
                            <div className="flex justify-center text-center flex-col md:flex-row">
                                <div>
                                    <span
                                        className='text-[14px] sm:text-[17px] text-red-500 font-medium mr-[5px]'
                                    >
                                        {ChangeCurrence(product?.price)}
                                    </span>
                                </div>
                                <div>
                                    <span
                                        className='text-[10px] sm:text-[12px] text-[#6D6E72] font-medium mr-[5px] line-through'
                                    >
                                        {ChangeCurrence(product?.priceBeforeDiscount)}
                                    </span>
                                    <span className="pro-percent"> -{product.valuePromotion}%</span>
                                </div>
                            </div>
                        )}
                        <span style={{ position: 'absolute', top: '5px', right: '5px' }}>
                            {product?.status == 2 ? (
                                <Badge.Ribbon text="New" style={{ display: '' }} color="red"></Badge.Ribbon>
                            ) : (
                                <Badge.Ribbon text="New" style={{ display: 'none' }}></Badge.Ribbon>
                            )}
                            {product?.status == 3 ? (
                                <Badge.Ribbon text="Hot" style={{ display: '' }} color="yellow"></Badge.Ribbon>
                            ) : (
                                <Badge.Ribbon text="New" style={{ display: 'none' }}></Badge.Ribbon>
                            )}
                        </span>
                    </Card>
                </>
            ) : (
                <>
                    <Card type="inner" style={{ marginBottom: 10 }}>
                        <Space align="center" style={{ height: height }}>
                            <div style={{ width: '50px' }}>
                                <img
                                    style={{ width: '100%', height: height - 10 }}
                                    src={baseUrl + product?.urlThumbnailImage}
                                />
                            </div>
                            <div>
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                    className="product-card__title"
                                >
                                    {product?.seoTitle}
                                </Paragraph>
                                {product?.type == undefined ? (
                                    <>
                                        <span
                                            style={{
                                                color: 'red',
                                                fontSize: 12,
                                                fontWeight: 500,
                                                marginRight: 5,
                                                display: '',
                                            }}
                                        >
                                            <p>{ChangeCurrence(product?.priceBeforeDiscount)}</p>
                                        </span>
                                    </>
                                ) : (
                                    <div className="product-card__price-search">
                                        <span className="text-[12px] sm:text-[16px] text-red mr-[3px]">
                                            {ChangeCurrence(product?.price)}
                                        </span>
                                        <span className="text-red mr-[2px] text-[#6D6E72] line-through">
                                            {ChangeCurrence(product?.priceBeforeDiscount)}
                                        </span>
                                        <span className="pro-percent"> -{product.valuePromotion}%</span>
                                    </div>
                                )}
                            </div>
                        </Space>
                    </Card>
                </>
            )}
        </Link>
    );
};
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
export default ProductCard;
