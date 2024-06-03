import { Guaranty } from '@/type';
import { Card, Modal, Space } from 'antd';
import React from 'react';
interface Props {
    guaranty: Guaranty | undefined;
}

const ProductDetailGuaranty: React.FC<Props> = React.memo(({ guaranty }) => {
    const [OpenGuaranty, setOpenGuaranty] = React.useState(false);
    const handleCancel = () => {
        setOpenGuaranty(false);
    };
    return (
        <div>
            <div className="flex flex-col gap-2">
                <Card
                    bordered={true}
                    className="border-gray-900"
                    title="Bảo Hành"
                    extra={
                        <a
                            onClick={() => {
                                setOpenGuaranty(true);
                            }}
                        >
                            Xem chi tiết
                        </a>
                    }
                >
                    {guaranty !== undefined && (
                        <>
                            {guaranty && (
                                <div className="product-card__title">
                                    Tên bảo hành: {guaranty.name} <br />
                                    Loại bảo hành: {guaranty.sku} <br />
                                    Thời hạn: {guaranty.period}
                                </div>
                            )}
                        </>
                    )}
                </Card>
                <Modal title="Thông số chi tiết" open={OpenGuaranty} onCancel={handleCancel} footer={''}>
                    <Space className="block">
                        {guaranty !== undefined && (
                            <>
                                {guaranty && (
                                    <div className="product-card__title">
                                        Tên bảo hành:{guaranty.name} <br />
                                        Loại bảo hành: {guaranty.sku} <br />
                                        Thời hạn: {guaranty.period}
                                    </div>
                                )}
                                <p dangerouslySetInnerHTML={{ __html: guaranty.description }}></p>
                            </>
                        )}
                    </Space>
                </Modal>
            </div>
        </div>
    );
});

export default ProductDetailGuaranty;
