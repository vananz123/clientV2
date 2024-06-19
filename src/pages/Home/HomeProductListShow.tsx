import ProductCard from '@/conponents/ProductCard';
import { Product } from '@/type';
import { Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
interface Props {
    title: string;
    link?: string;
    products: Product[];
}
const HomeProductListShow: React.FC<Props> = React.memo(({ title, link, products }) => {
    return (
        <div>
            <div className="flex justify-between my-5 items-center">
                <p className="text-[18px] font-bold text-[#003868] font-serif">{title}</p>
                {link && (
                    <div>
                        <Link to={link} className="underline">
                            Xem thêm
                        </Link>
                    </div>
                )}
            </div>
            {typeof products !== 'undefined' && (
                <Row gutter={[16, 16]}>
                    {products.map((e: Product) => (
                        <Col
                            style={{ display: 'flex', justifyContent: 'center' }}
                            xs={12}
                            sm={8}
                            md={8}
                            lg={8}
                            xl={6}
                            className="gutter-row"
                            key={e.id}
                        >
                            <ProductCard product={e} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
});

export default HomeProductListShow;
