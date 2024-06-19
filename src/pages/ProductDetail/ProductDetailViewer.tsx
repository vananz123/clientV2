/* eslint-disable @typescript-eslint/no-explicit-any */
import useProductViewerStore from '@/hooks/useProductViewerStore';
import React, { Suspense } from 'react';
import SliderC from '@/conponents/SliderC';
const ProductDetailViewer: React.FC = () => {
    const { products } = useProductViewerStore();
    return (
        <>
            {products.length > 0 && (
                <Suspense> <SliderC title='Sản phẩm đã xem' products={products} /></Suspense>
            )}
        </>
    );
};

export default ProductDetailViewer;
