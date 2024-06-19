/* eslint-disable @typescript-eslint/no-unused-vars */
import { Carousel, Col, Row } from 'antd';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '@/type';
import ProductCard from '@/conponents/ProductCard';
import React, { lazy, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import * as departmentServices from '@/api/departmentServices';
import ProductDetailViewer from '../ProductDetail/ProductDetailViewer';
import { Filter } from '@/type';
import { Link } from 'react-router-dom';
import Container from '@/conponents/Container';
import { CloseCircleOutlined, GoogleOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
const HomeLoadingListCard = lazy(() => import('./HomeLoadingListCard'));
function SampleNextArrowCustomer(props: any) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: 'gray' }} onClick={onClick} />;
}
function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: 'gray' }} onClick={onClick} />;
}

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrowCustomer />,
    prevArrow: <SamplePrevArrow />,
};
const contentStyle: React.CSSProperties = {
    margin: 0,
    height: 'auto',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
};
const imgStyles: React.CSSProperties = {
    margin: 0,
    width: '100%',
    height: '100%',
};
const styleQC: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex:100,
    display: 'flex',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
}
function Home() {
    const [productsNew, setProductsNew] = React.useState<Product[]>();
    const [productsHot, setProductsHot] = React.useState<Product[]>();
    const [products, setProducts] = React.useState<Product[]>();
    const [showAd, setShowAd] = React.useState(true);
    const handleCloseAd = () => {
        setShowAd(false);
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(false);
        }, 5000);

        return () => clearTimeout(timer); 
    }, []);

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
    });

    let time = new Date();
    return (
        <div>
            {showAd && (
                <div className="ad-container" style={styleQC}>
                    <img className='max-w-[80%] xl:max-w-[30%] h-auto' src="https://st-media-template.antsomi.com/upload/2024/06/03/2a32c589-e58c-4128-8d66-4941cb4ffec7.png" alt="Bìa quảng cáo" />
                    <button className='cursor-pointer fixed top-[170px] xl:top-[200px] right-[30px] xl:right-[650px]' onClick={handleCloseAd}><CloseCircleOutlined className='text-[25px] bg-orange-300 rounded-full opacity-45' /></button>
                </div>
            )}
            <div className="carouselHome">
                <Carousel autoplay>
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
            <div className="flex justify-center mt-2">
                <div className="p-2">
                    <a href="/product">
                        <img src="/fixbanner_Family.jpg" alt="BST Family" />
                    </a>
                </div>
                <div className="p-2">
                    <a href="/product">
                        <img src="/fixbanner-euphoria.jpg" alt="BST Family" />
                    </a>
                </div>
                <div className="p-2">
                    <a href="/product">
                        <img src="/catalog-duyendang-494x247CTA.jpg" alt="BST Family" />
                    </a>
                </div>
            </div>
            <Container>
                <div>
                    <div>
                        <div className="flex justify-between my-5 items-center">
                            <p className="text-[18px] font-bold text-[#ea3131] font-serif">Có Thể Bạn Sẽ Thích</p>
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
                    <div className="flex justify-start my-3">
                        <p className="text-[18px] text-[#003868] font-bold font-serif">Xu hướng</p>
                    </div>
                    <div>
                        <div className="container">
                            <div>
                                <Slider arrows className="gap-3" {...settings}>
                                    {productsNew?.map((e: Product) => <ProductCard product={e} />)}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex justify-between my-5 items-center">
                        <p className="text-[18px] font-bold text-[#003868] font-serif">Sản phẩm bán chạy</p>
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
                        <p className="text-[18px] font-bold text-[#003868] font-serif">Sản phẩm mới</p>
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
                        <p className="text-[18px] font-bold text-[#003868] font-sans">Đồng Hồ</p>
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
                    <ProductDetailViewer />
                </div>
                <div>
                    <div className="flex justify-start my-3">
                        <p className="text-[18px] font-bold text-[#003868] font-serif">Hệ thống cửa hàng</p>
                    </div>
                    {typeof listDepartment !== 'undefined' && (
                        <Row className="flex justify-around" gutter={[16, 16]}>
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
