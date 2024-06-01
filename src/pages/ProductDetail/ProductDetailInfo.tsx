import { Guaranty, Product, Variation } from '@/type';
import { Collapse, CollapseProps, Space } from 'antd';
import React from 'react';
interface Props {
    product: Product | undefined;
    guaranty: Guaranty | undefined;
}
const ProductDetailInfo: React.FC<Props> = React.memo( ({ product, guaranty }) => {
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
        </div>
    );
});

export default ProductDetailInfo;
