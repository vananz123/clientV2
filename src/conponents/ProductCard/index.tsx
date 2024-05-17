/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card,Typography } from 'antd';
import { Product } from '@/type';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';
import * as productServices from '@/api/productServices';
const {  Paragraph } = Typography;
const ProductCard: React.FC<{ product: Product | undefined }> = ({ product }) => {
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const viewConut = async () => {
        if (typeof product !== 'undefined') {
            await productServices.productViewCount(product?.id);
        }
    };
    return (
        <Link to={`/product/detail/${product?.id}`} onClick={() => viewConut()}>
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
