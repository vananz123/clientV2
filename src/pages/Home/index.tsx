import { Button, Card, Carousel, Col, Row } from 'antd';
import { Product } from '../Admin/Product/ProductList';
import ProductCard from '@/conponents/ProductCard';
import React, { useEffect } from 'react';
import * as productServices from '@/api/productServices';
import { Filter } from '../ProductListShow/FilterType';
import { Link } from 'react-router-dom';
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
function Home() {
    const [productsNew, setProductsNew] = React.useState<Product[]>();
    const [productsHot, setProductsHot] = React.useState<Product[]>();
    const getProductPaging = async (status:number) => {
        const filter: Filter = {
            page: 1,
            sortOder: 'ascending',
            productStatus: status,
            pageSize: 4,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            if(status ===2){
                setProductsNew(res.resultObj.items);
            }
            if(status ===3){
                setProductsHot(res.resultObj.items);
            }
        }
    };

    useEffect(() => {
        getProductPaging(2);
        getProductPaging(3);
    }, []);
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    return (
        <div>
            <div>
                <Carousel afterChange={onChange}>
                    <div>
                        <h3 style={contentStyle}>1</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>2</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>3</h3>
                    </div>
                    <div>
                        <h3 style={contentStyle}>4</h3>
                    </div>
                </Carousel>
                <Card title="Sản phẩm bán chạy" style={{marginTop:24}} extra={<Link to={'/product/hot'}>Xem thêm</Link>}>
                    {typeof productsHot !== 'undefined' ? (
                        <Row gutter={[12, 12]}>
                            {productsHot.map((e: Product) => (
                                <Col
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={8}
                                    xl={6}
                                    className="gutter-row"
                                    key={e.id}
                                >
                                    <ProductCard product={e} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        ''
                    )}
                </Card>
                <Card title="Sản phẩm mới" style={{marginTop:24}} extra={<Link to={'/product/new'}>Xem thêm</Link>}>
                    {typeof productsNew !== 'undefined' ? (
                        <Row gutter={[12, 12]}>
                            {productsNew.map((e: Product) => (
                                <Col
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                    xs={12}
                                    sm={12}
                                    md={12}
                                    lg={8}
                                    xl={6}
                                    className="gutter-row"
                                    key={e.id}
                                >
                                    <ProductCard product={e} />
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        ''
                    )}
                </Card>
            </div>
        </div>
    );
}

export default Home;
