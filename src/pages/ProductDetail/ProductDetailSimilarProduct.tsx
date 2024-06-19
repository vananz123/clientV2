import Container from '@/conponents/Container';
import SliderC from '@/conponents/SliderC';
import { Product } from '@/type';
import React, { Suspense } from 'react';
interface Props {
    similarProduct: Product[];
}
const ProductDetailSimilarProduct: React.FC<Props> = React.memo( ({ similarProduct }) => {
    return (
        <Container>
            <Suspense><SliderC products={similarProduct} title='Sản phẩm tương tự'/></Suspense>
        </Container>
    );
});

export default ProductDetailSimilarProduct;
