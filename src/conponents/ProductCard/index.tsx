import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Flex from 'antd';
import type { Product } from '@/pages/Admin/Product/ProductList';
import { Link } from 'react-router-dom';
import { BaseUrl } from '@/utils/request';
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const baseUrl: BaseUrl = 'https://localhost:7005';
    return (
        <Link to={`/product/detail/${product.id}`}>
            <Card hoverable style={{ width:'100%', maxWidth:'300px' }}  cover={<img alt="example" src={`${baseUrl+ product.urlThumbnailImage}`} />}>
                {/* <Meta title={product.name} description={product.basePrice} /> */}
                <h3>{product.seoTitle}</h3>
                {product.discountRate == null ? 
                <>
                <strong>{ChangeCurrence(product.price)}</strong>
                </>:<strong>{ChangeCurrence(product.price)}<sup>-{product.discountRate}</sup></strong>}
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
