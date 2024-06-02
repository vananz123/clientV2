import { Guaranty, Product, Variation } from '@/type';
import { Button, Collapse, CollapseProps, Space, Modal } from 'antd';
import { Suspense } from 'react';
import React, {  createContext } from 'react';
// const DescriptionForm = lazy(() => import('@/conponents/DescrtiptionForm'));
const ReachableContext = createContext<string | null>(null);
const UnreachableContext = createContext<string | null>(null);
interface Props {
    product: Product | undefined;
    guaranty: Guaranty | undefined;
}
export type TypeFormAddress = 'ADD' | 'EDIT';
const ProductDetailInfo: React.FC<Props> = React.memo(({ product, guaranty }) => {
    const [open, setOpen] = React.useState(false);
    const handleCancel = () => {
        setOpen(false);
    };
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Thông số và mô tả',
            children: (
                <Space direction="vertical">
                    {product?.variation !== undefined && (
                        <>
                            {product?.variation.map((e: Variation) => (
                                <p>
                                    {e.name} {e.value}
                                </p>
                            ))}
                            <p dangerouslySetInnerHTML={{ __html: product.seoDescription }}></p>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setOpen(true);
                                }}
                            >
                                Xem chi tiết
                            </Button>
                        </>
                    )}
                </Space>
            ),
        },
        {
            key: '2',
            label: 'Dịch vụ sau mua',
            children: (
                <>
                    {guaranty && (
                        <>
                            <Space direction="vertical">
                                <div key={guaranty.id}>
                                    <p>Loại bảo hành: {guaranty.name}</p>
                                    <p>Thời gian: {guaranty.period + ' ' + guaranty.sku}</p>
                                    <p
                                        dangerouslySetInnerHTML={{
                                            __html: guaranty.description || '<p></p>',
                                        }}
                                    ></p>
                                </div>
                            </Space>
                        </>
                    )}
                </>
            ),
        },
    ];
    const handleChangeColl = (key: string | string[]) => {
        console.log(key);
    };
    return (
        <div>
            <Collapse items={items} defaultActiveKey={['1']} onChange={handleChangeColl} />
            <Modal title="Notification" open={open} onCancel={handleCancel} footer={''}>
                <Suspense>
                    <ReachableContext.Provider value="Light">
                        <Space className="block">
                            {product?.variation !== undefined && (
                                <>
                                    {product?.variation.map((e: Variation) => (
                                        <div>
                                            <p>
                                                {e.name} {e.value}
                                            </p>
                                        </div>
                                    ))}
                                    <p dangerouslySetInnerHTML={{ __html: product.seoDescription }}></p>
                                </>
                            )}
                        </Space>
                        <UnreachableContext.Provider value="Bamboo" />
                    </ReachableContext.Provider>
                </Suspense>
            </Modal>
        </div>
    );
});

export default ProductDetailInfo;
