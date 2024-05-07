/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from 'antd';
import { Product } from '@/type';
import { Link } from 'react-router-dom';
const styleTitle :  React.CSSProperties = {
    textAlign:'center',
     color:'#000000E0',
     fontSize:16,
     fontWeight:400,
     marginTop:10,
     marginBottom:10
}
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
    const baseUrl =import.meta.env.VITE_BASE_URL
    return (
        <Link to={`/product/detail/${product.id}`}>
            <Card bordered={false} hoverable style={{border:'none',backgroundColor:'#f5f5f5', width:'100%', maxWidth:'300px'}}  cover={<img alt={product.name} src={`${baseUrl+ product.urlThumbnailImage}`} />}>
                <h3 style={styleTitle}>{product.seoTitle}</h3>
                <p style={{color:'#f5222d',fontWeight:500,textAlign:'center'}}>{ChangeCurrence(product.price)}</p>
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