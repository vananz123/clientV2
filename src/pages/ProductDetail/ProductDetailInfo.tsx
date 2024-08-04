import { Product, ProductItem, Variation } from '@/type';
import { PhoneTwoTone } from '@ant-design/icons';
import { Space, Modal, Typography } from 'antd';
const { Paragraph } = Typography;
import React, { useEffect } from 'react';
interface Props {
    product: Product | undefined;
}
const ProductDetailInfo: React.FC<Props> = React.memo(({ product }) => {
    const [open, setOpenInfo] = React.useState(false);
    const handleCancel = () => {
        setOpenInfo(false);
    };
    const [productItem, setCurrentProductItem] = React.useState<ProductItem>();
    useEffect(() => {
        if (product && product.items && product.items.length > 0) setCurrentProductItem(product.items[0]);
    }, [product]);
    return (
        <div>
            {productItem && productItem.stock > 0 ? (
                <p className="m-[6px] text-[#003468] text-1xl sm:text-1xl">Còn hàng - <span className='font-medium'>Gọi <span className='text-red-600'><PhoneTwoTone /> Hotline 1800545457 1800 5454 57 (Free)</span> Ưu đãi độc quyền</span></p>
            ) : (
                <p className="m-[6px] text-[#003468] text-1xl sm:text-1xl">Hết hàng - <span className='font-medium'>Gọi <span className='text-red-600'><PhoneTwoTone /> Hotline 1800545457 1800 5454 57 (Free)</span> Ưu đãi độc quyền</span></p>
            )}
            <div className="border-[1px] border-[#003468] rounded pb-2">
                <div className="flex justify-between p-2 bg-[#fafafa] rounded">
                    <p className="text-base font-bold">Thông số:</p>
                    <p
                        onClick={() => {
                            setOpenInfo(true);
                        }}
                        className="underline cursor-pointer"
                    >
                        Xem chi tiết
                    </p>
                </div>
                <div className="p-3 rounded">
                    {product?.variation !== undefined && (
                        <>
                            <div>
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                    className="product-card__title"
                                >
                                    {product?.variation.map((e: Variation) => (
                                        <p>
                                            {e.name} {e.value}
                                        </p>
                                    ))}
                                </Paragraph>
                            </div>
                            <div className="h-[40px]">
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                >
                                    <p dangerouslySetInnerHTML={{ __html: product.seoDescription }}></p>
                                </Paragraph>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Modal title="Thông số chi tiết" open={open} onCancel={handleCancel} footer={''}>
                <Space direction="vertical">
                    {product?.variation !== undefined && (
                        <>
                            {product?.variation.map((e: Variation) => (
                                <div>
                                    <p className="product-card__title">
                                        {e.name} {e.value}
                                    </p>
                                </div>
                            ))}
                            <p dangerouslySetInnerHTML={{ __html: product.seoDescription }}></p>
                        </>
                    )}
                </Space>
            </Modal>
        </div>
    );
});

export default ProductDetailInfo;
