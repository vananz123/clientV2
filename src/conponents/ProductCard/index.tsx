import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import Flex from 'antd';
import { Product } from '@/type';
import { Link } from 'react-router-dom';
import { BaseUrl } from '@/utils/request';
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const baseUrl =import.meta.env.VITE_BASE_URL
    return (
        <Link to={`/product/detail/${product.id}`}>
            <Card bordered={false} hoverable style={{border:'none',backgroundColor:'#f5f5f5', width:'100%', maxWidth:'300px'}}  cover={<img alt="example" src={`${ product.urlThumbnailImage}`} />}>
                <h3 style={{textAlign:'center'}}>{product.seoTitle}</h3>
                <strong>{ChangeCurrence(product.price)}</strong>
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
