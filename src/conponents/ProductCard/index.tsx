/* eslint-disable @typescript-eslint/no-unused-vars */
import { Product, ProductItem } from '@/type';
import { Link } from 'react-router-dom';
import { Badge, Space } from 'antd';
import * as productServices from '@/api/productServices';
import { Card, Typography } from 'antd';
import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
const { Paragraph } = Typography;
type ProductCardType = 'forCard' | 'forList';
interface Props {
    product: Product | undefined;
    type?: ProductCardType;
    height?: number;
}
const ProductCard: React.FC<Props> = ({ product, type = 'forCard', height = 100 }) => {
    // const [currentProductItem, setCurrentProductItem] = React.useState<ProductItem>();
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const viewConut = async () => {
        if (typeof product !== 'undefined') {
            await productServices.productViewCount(product?.id);
        }
    };
    // const { id } = useParams();
    // console.log(id)
    // const { data } = useQuery({
    //     queryKey: [`product-detail-${id}`],
    //     queryFn: () => productServices.getProductDetail(Number(id)),
    // });
    // console.log(data)
    // useEffect(() => {
    //     if (data && data.items && data.items.length > 0) setCurrentProductItem(data.items[0]);
    // }, [data]);
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
                        <p className="product-card__price">{ChangeCurrence(product?.price)}</p>
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
                            <img
                                style={{ width: height - 10, height: height - 10 }}
                                src={baseUrl + product?.urlThumbnailImage}
                            />
                            <div>
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                    className="product-card__title"
                                >
                                    {product?.seoTitle}
                                </Paragraph>
                                <p>{ChangeCurrence(product?.price)}</p>  
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
