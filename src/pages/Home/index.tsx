/* eslint-disable @typescript-eslint/no-unused-vars */
import { Carousel, Col, Row } from 'antd';
import { Product } from '@/type';
import ProductCard from '@/conponents/ProductCard';
import React, { lazy, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as departmentServices from '@/api/departmentServices';
import ProductDetailViewer from '../ProductDetail/ProductDetailViewer';
import { Filter } from '@/type';
import { Link } from 'react-router-dom';
import Container from '@/conponents/Container';
import { GoogleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
const HomeLoadingListCard = lazy(() => import('./HomeLoadingListCard'));
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
    height: '100%',
};
function Home() {
    const [productsNew, setProductsNew] = React.useState<Product[]>();
    const [productsHot, setProductsHot] = React.useState<Product[]>();
    const [products, setProducts] = React.useState<Product[]>();
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
    const getProductPagingWatch = async (id: number) => {
        const filter: Filter = {
            page: 1,
            categoryId: id,
            pageSize: 4,
            sortOder: 'ascending',
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
        }
    };
    const { data: listDepartment } = useQuery({
        queryKey: [`list-department`],
        queryFn: () => departmentServices.getAllDepartment(),
    });

    useEffect(() => {
        getProductPaging(2);
        getProductPaging(3);
        getProductPagingWatch(2);
    }, []);
    const onChange = (currentSlide: number) => {
        console.log(currentSlide);
    };
    let time = new Date()
    return (
        <div>
            <div className="carouselHome">
                <Carousel afterChange={onChange}>
                    <div style={contentStyle}>
                        <img
                            style={imgStyles}
                            src="/gold-ncm-2024-1972x640_CTA_.webp"
                            alt="ƯU ĐÃI NGÀY CỦA MẸ - QUÀ THƯƠNG CÀI ÁO THỜI TRANG"
                        />
                    </div>
                    <div style={contentStyle}>
                        <img
                            //style={imgStyles}
                            className="w-full h-full"
                            src="/ngaydoi-05-05-24-1972x640CTA.webp"
                            alt="Ngày đôi 5.5 - Chào hè bất tận"
                        />
                    </div>
                    <div style={contentStyle}>
                        <img
                            style={imgStyles}
                            src="/pnjfast-t1-24-1972x640CTA.webp"
                            alt="Sở hữu trang sức yêu thích chỉ trong 3h"
                        />
                    </div>
                </Carousel>
            </div>
            <Container>
                <div>
                    <div>
                        <ProductDetailViewer />
                    </div>
                    <div className="flex justify-start my-3">
                        <p className="text-[18px] font-bold">Xu hướng</p>
                    </div>
                    {typeof productsNew !== 'undefined' && (
                        <Row gutter={[16, 16]}>
                            {productsNew.map((e: Product) => (
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
                <div>
                    <div className="flex justify-between my-5 items-center">
                        <p className="text-[18px] font-bold">Sản phẩm bán chạy</p>
                        <div>
                            <Link to={'/product/hot'} className="underline">
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                    {typeof productsHot !== 'undefined' && (
                        <Row gutter={[16, 16]}>
                            {productsHot.map((e: Product) => (
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
                <div>
                    <div className="flex justify-between my-5 items-center">
                        <p className="text-[18px] font-bold">Sản phẩm mới</p>
                        <div>
                            <Link to={'/product/new'} className="underline">
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                    {typeof productsNew !== 'undefined' ? (
                        <Row gutter={[16, 16]}>
                            {productsNew.map((e: Product) => (
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
                    ) : (
                        <HomeLoadingListCard />
                    )}
                </div>
            </Container>
            <div style={contentStyle}>
                <img style={imgStyles} src="./watch-t5-24-1200x450CTA.webp" alt="" />
            </div>
            <Container>
                <div>
                    <div className="flex justify-between my-5 items-center">
                        <p className="text-[18px] font-bold">Đồng hồ</p>
                        <div>
                            <Link to={'/product/2'} className="underline">
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                    {typeof products !== 'undefined' ? (
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
                    ) : (
                        <HomeLoadingListCard />
                    )}
                </div>
                <div>
                    <div className="flex justify-between my-5 items-center">
                        <p className="text-[18px] font-bold">Có Thể Bạn Sẽ Thích</p>
                        <div>
                            <Link to={'/product/hot'} className="underline">
                                Xem thêm
                            </Link>
                        </div>
                    </div>
                    {typeof productsHot !== 'undefined' ? (
                        <Row gutter={[16, 16]}>
                            {productsHot.map((e: Product) => (
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
                    ) : (
                        <HomeLoadingListCard />
                    )}
                </div>
                <div className="p-5">
                    <div className="flex justify-start my-3">
                        <p className="text-[18px] font-bold">Hệ thống cửa hàng</p>
                    </div>
                    {typeof listDepartment !== 'undefined' && (
                        <Row gutter={[16, 16]}>
                            {listDepartment.length > 0 && (
                                <>
                                    {listDepartment.map((e) => (
                                        <Col className="gutter-row" xs={24} lg={6} xl={6} key={e.id}>
                                            <div className="mt-4 grid grid-cols-1 tablet:grid-cols-2 gap-2">
                                                <div className="flex p-2">
                                                    <div className="m-2">
                                                        <p className="font-medium mb-1">{e.province}</p>
                                                        <p>{e.address}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-end justify-between">
                                                    <div className="ml-4">
                                                        {time.getHours() >= 9 && time.getHours() <= 21 ? (
                                                            <div>
                                                                <span className="text-[#3bb346] font-medium">
                                                                    Mở cửa
                                                                </span>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span className="text-[#f93920] font-medium">
                                                                    Đóng cửa
                                                                </span>
                                                            </div>
                                                        )}
                                                        <span>09:00-21:00</span>
                                                    </div>
                                                    <div className="font-semibold flex items-center">
                                                        <a
                                                            className="text-blue-700"
                                                            href={e.linkGoogleMap}
                                                            target="_blank"
                                                        >
                                                            <GoogleOutlined /> Chỉ đường
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    ))}
                                </>
                            )}
                        </Row>
                    )}
                </div>
            </Container>
        </div>
    );
}

export default Home;
