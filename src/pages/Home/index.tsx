/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, Carousel, Col, Row } from 'antd';
import { Product } from '@/type';
import ProductCard from '@/conponents/ProductCard';
import React, { useEffect } from 'react';
import * as productServices from '@/api/productServices';
import { Filter } from '../ProductListShow/FilterType';
import { Link } from 'react-router-dom';
import './style.css';
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: 'auto',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
};
const imgStyles: React.CSSProperties = {
    margin: 0,
    width: '100%',
    height: '500px',
};
function Home() {
    const [productsNew, setProductsNew] = React.useState<Product[]>();
    const [productsHot, setProductsHot] = React.useState<Product[]>();
    const getProductPaging = async (status: number) => {
        const filter: Filter = {
            page: 1,
            sortOder: 'ascending',
            productStatus: status,
            pageSize: 4,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            if (status === 2) {
                setProductsNew(res.resultObj.items);
            }
            if (status === 3) {
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
                <div className='carouselHome'>
                    <Carousel  autoplay  afterChange={onChange}>
                        <div>
                            <h3 style={contentStyle}>
                                <img
                                    style={imgStyles}
                                    src="/gold-ncm-2024-1972x640_CTA_.png"
                                    alt="ƯU ĐÃI NGÀY CỦA MẸ - QUÀ THƯƠNG CÀI ÁO THỜI TRANG"
                                />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img
                                    style={imgStyles}
                                    src="/ngaydoi-05-05-24-1972x640CTA.jpg"
                                    alt="Ngày đôi 5.5 - Chào hè bất tận"
                                />
                            </h3>
                        </div>
                        <div>
                            <h3 style={contentStyle}>
                                <img
                                    style={imgStyles}
                                    src="/pnjfast-t1-24-1972x640CTA.jpg"
                                    alt="Sở hữu trang sức yêu thích chỉ trong 3h"
                                />
                            </h3>
                        </div>
                    </Carousel>
                </div>
                <div>
                    <Card bordered={false}
                        title="Xu Hướng"
                        style={{marginTop: 20,borderRadius:'50%' }}
                    >
                        {typeof productsNew !== 'undefined' ? (
                            <Row gutter={[12, 12]}>
                                {productsNew.map((e: Product) => (
                                    <Col
                                        style={{ display: 'flex', justifyContent: 'center'}}
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
                <div>
                    <Card bordered={false}
                        title="Sản phẩm bán chạy"
                        style={{marginTop: 24 }}
                        extra={<Link to={'/product/hot'}>Xem thêm</Link>
                        }
                    >
                        {typeof productsHot !== 'undefined' ? (
                            <Row gutter={[12, 12]}>
                                {productsHot.map((e: Product) => (
                                    <Col
                                        style={{ display: 'flex', justifyContent: 'center'}}
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
                    <Card bordered={false} title="Sản phẩm mới" style={{ marginTop: 24 }} extra={<Link to={'/product/new'}>Xem thêm</Link>}>
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
                <div style={contentStyle}>
                    <img style={imgStyles} src="./watch-t5-24-1200x450CTA.jpg" alt="" />
                </div>
                <div>
                    <Card bordered={false}
                        title="Đồng Hồ"
                        style={{marginTop: -50 }}
                        extra={<Link to={'/product/hot'}>Xem thêm</Link>
                        }
                    >
                        {typeof productsHot !== 'undefined' ? (
                            <Row gutter={[12, 12]}>
                                {productsHot.map((e: Product) => (
                                    <Col
                                        style={{ display: 'flex', justifyContent: 'center'}}
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
                <div>
                    <Card bordered={false}
                        title="Có Thể Bạn Sẽ Thích"
                        style={{marginTop: 20 }}
                        extra={<Link to={'/product/hot'}>Xem thêm</Link>
                        }
                    >
                        {typeof productsHot !== 'undefined' ? (
                            <Row gutter={[12, 12]}>
                                {productsHot.map((e: Product) => (
                                    <Col
                                        style={{ display: 'flex', justifyContent: 'center'}}
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
        </div>
    );
}

export default Home;
