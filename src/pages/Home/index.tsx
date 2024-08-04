/* eslint-disable @typescript-eslint/no-unused-vars */
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useCallback, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import ProductDetailViewer from '../ProductDetail/ProductDetailViewer';
import Container from '@/conponents/Container';
import SliderC from '@/conponents/SliderC';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { useQuery } from '@tanstack/react-query';
import HomeProductListShow from './HomeProductListShow';
import { Carousel } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import HomeLoadingListCard from './HomeLoadingListCard';
import { useImmer } from 'use-immer';
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
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
};
function Home() {
    const { data: user } = useAppSelector(selectUser);
    const [scroll, setScroll] = useImmer<number>(0);
    const { data: listProductByUser } = useQuery({
        queryKey: ['load-list-product-by-user'],
        queryFn: () => productServices.getAllProductByUser().then((data) => data.resultObj.items),
        enabled: !!user,
    });
    const { data: productsNew } = useQuery({
        queryKey: ['load-list-product-new'],
        queryFn: () =>
            productServices
                .getProductPagingByFilter({
                    page: 1,
                    sortOder: 'ascending',
                    productStatus: 2,
                    pageSize: 4,
                })
                .then((data) => data.resultObj.items),
        enabled: scroll >= 700,
    });
    const { data: productsHot } = useQuery({
        queryKey: ['load-list-product-hot'],
        queryFn: () =>
            productServices
                .getProductPagingByFilter({
                    page: 1,
                    sortOder: 'ascending',
                    productStatus: 3,
                    pageSize: 4,
                })
                .then((data) => data.resultObj.items),
        enabled: scroll >= 400,
    });
    const { data: productsSale } = useQuery({
        queryKey: ['load-list-product-sale'],
        queryFn: () =>
            productServices
                .getProductPagingByFilter({
                    page: 1,
                    sortOder: 'ascending',
                    productStatus: 4,
                    pageSize: 4,
                })
                .then((data) => data.resultObj.items),
        enabled: scroll >= 400,
    });
    const { data: productKM } = useQuery({
        queryKey: ['load-list-product-km'],
        queryFn: () =>
            productServices
                .getProductPagingByFilter({
                    page: 1,
                    sortOder: 'ascending',
                    isPromotion: true,
                    pageSize: 8,
                })
                .then((data) => data.resultObj.items),
        enabled: scroll >= 400,
    });
    const { data: productsWatch } = useQuery({
        queryKey: ['load-list-product-watch'],
        queryFn: () =>
            productServices
                .getProductPagingByFilter({
                    page: 1,
                    categoryId: 2,
                    pageSize: 4,
                    sortOder: 'ascending',
                })
                .then((data) => data.resultObj.items),
        enabled: scroll >= 3000,
    });
    const handleScroll = useCallback(() => {
        setScroll(window.innerHeight + document.documentElement.scrollTop + 1);
    }, [setScroll]);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    const [showAd, setShowAd] = React.useState(false);
    const handleCloseAd = () => {
        setShowAd(false);
        localStorage.setItem('showAd', 'false');
    };
    useEffect(() => {
        const storedShowAd = localStorage.getItem('showAd');
        if (storedShowAd === 'false') {
            setShowAd(false);
        } else {
            setShowAd(true);
            const timer = setTimeout(() => {
                setShowAd(false);
                localStorage.setItem('showAd', 'false');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);
    console.log('re');
    return (
        <div>
            {showAd && (
                <div className="ad-container" style={styleQC}>
                    <div className="relative max-w-[80%] md:max-w-[30%] lg:max-w-[70%] xl:max-w-[30%]  h-auto">
                        <img
                            src="https://st-media-template.antsomi.com/upload/2024/06/03/2a32c589-e58c-4128-8d66-4941cb4ffec7.png"
                            alt="alstore"
                        />
                        <button
                            className="absolute cursor-pointer top-[0px] xl:top-[0px] right-[0px] lg:right-[0px]"
                            onClick={handleCloseAd}
                        >
                            <CloseCircleOutlined className="text-[25px] bg-orange-300 rounded-full opacity-45" />
                        </button>
                    </div>
                </div>
            )}
            <div className="w-full overflow-hidden h-auto">
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
                    <a href="/product?category=2">
                        <img src="/fixbanner_Family.webp" alt="BST Family" />
                    </a>
                </div>
                <div className="p-2">
                    <a href="/product?category=2">
                        <img src="/fixbanner-euphoria.webp" alt="BST Family" />
                    </a>
                </div>
                <div className="p-2">
                    <a href="/product?category=2">
                        <img src="/catalog-duyendang-494x247CTA.webp" alt="BST Family" />
                    </a>
                </div>
            </div>
            <Container className="bg-cyan-50">
                {user && listProductByUser && listProductByUser.length > 0 && (
                    <SliderC title="Dành riêng cho bạn" products={listProductByUser} />
                )}
                {productsSale ? (
                    <HomeProductListShow
                        products={productsSale}
                        link="/product?productStatus=4"
                        title="Có Thể Bạn Sẽ Thích"
                    />
                ) : (
                    <HomeLoadingListCard />
                )}
                {productsNew && (
                    <HomeProductListShow products={productsNew} link="/product?productStatus=2" title="Sản phẩm mới" />
                )}
                {productsHot && (
                    <HomeProductListShow
                        products={productsHot}
                        link="/product?productStatus=3"
                        title="Sản phẩm bán chạy"
                    />
                )}
                <div className='mb-5'>{productKM && <SliderC products={productKM} title="Sản phẩm khuyến mãi" />}</div>
            </Container>
            <div style={contentStyle}>
                <img style={imgStyles} src="./watch-t5-24-1200x450CTA.webp" alt="" />
            </div>
            <Container>
                {productsWatch ? (
                    <HomeProductListShow products={productsWatch} link="/product?categoryId=2" title="Đồng Hồ" />
                ) : (
                    <HomeLoadingListCard />
                )}
                <div>
                    <ProductDetailViewer />
                </div>
            </Container>
        </div>
    );
}

export default Home;
