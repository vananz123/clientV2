import { Guaranty, Product, Variation } from '@/type';
import { Card, Space, Modal, Typography } from 'antd';
const { Paragraph } = Typography;
import React from 'react';
interface Props {
    product: Product | undefined;
    guaranty: Guaranty | undefined;
}
const ProductDetailInfo: React.FC<Props> = React.memo(({ product }) => {
    const [open, setOpenInfo] = React.useState(false);
    const handleCancel = () => {
        setOpenInfo(false);
    };
    return (
        <div>
            <Card
                bordered={true}
                className="border-gray-900"
                title="Thông số"
                extra={
                    <a
                        onClick={() => {
                            setOpenInfo(true);
                        }}
                    >
                        Xem chi tiết
                    </a>
                }
            >
                {product?.variation !== undefined && (
                    <>
                        {product?.variation.map((e: Variation) => (
                            <div>
                                <Paragraph
                                    ellipsis={{
                                        rows: 2,
                                    }}
                                    className="product-card__title"
                                >
                                    {e.name} {e.value}
                                </Paragraph>
                            </div>
                        ))}
                    </>
                )}
            </Card>
            <Modal title="Thông số chi tiết" open={open} onCancel={handleCancel} footer={''}>
                <Space className="block">
                    {product?.variation !== undefined && (
                        <>
                            {product?.variation.map((e: Variation) => (
                                <div>
                                    <Paragraph
                                        ellipsis={{
                                            rows: 2,
                                        }}
                                        className="product-card__title"
                                    >
                                        {e.name} {e.value}
                                    </Paragraph>
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
