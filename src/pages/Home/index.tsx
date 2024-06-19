/* eslint-disable @typescript-eslint/no-unused-vars */
import Slider from '@ant-design/react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Product } from '@/type';
import React, { useCallback, useEffect } from 'react';
import * as productServices from '@/api/productServices';
import ProductDetailViewer from '../ProductDetail/ProductDetailViewer';
import { Filter } from '@/type';
import Container from '@/conponents/Container';
import SliderC from '@/conponents/SliderC';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { useQuery } from '@tanstack/react-query';
import HomeProductListShow from './HomeProductListShow';
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
function Home() {
    const { data: user } = useAppSelector(selectUser);
    const [productsNew, setProductsNew] = React.useState<Product[]>();
    const [productsHot, setProductsHot] = React.useState<Product[]>();
    const [products, setProducts] = React.useState<Product[]>();
    const { data: listProductByUser } = useQuery({
        queryKey: ['load-list-product-by-user'],
        queryFn: () => productServices.getAllProductByUser().then((data) => data.items),
        enabled: !!user,
    });
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
    useEffect(() => {
        const fetchData = async () => {
            try {
                getProductPaging(2);
                getProductPaging(3);
                getProductPagingWatch(2);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
    const handleScroll = useCallback(() => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
            getProductPaging(2);
            getProductPaging(3);
            getProductPagingWatch(2);
        }
    },[]);
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    return (
        <div>
            <div className="carouselHome">
                <Slider autoplay>
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
                </Slider>
            </div>
            <div className="flex justify-center mt-2">
                <div className="p-2">
                    <a href="/product/2">
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
                {user && listProductByUser && listProductByUser.length > 0 && (
                    <SliderC title="Dành riêng cho bạn" products={listProductByUser} />
                )}
                {productsHot && (
                    <HomeProductListShow products={productsHot} link="/product/hot" title="Có Thể Bạn Sẽ Thích" />
                )}
                {productsNew && <SliderC products={productsNew} title="Sản phẩm mới" />}
                {productsHot && (
                    <HomeProductListShow products={productsHot} link="/product/hot" title="Sản phẩm bán chạy" />
                )}
                {productsNew && <HomeProductListShow products={productsNew} link="/product/new" title="Sản phẩm mới" />}
            </Container>
            <div style={contentStyle}>
                <img style={imgStyles} src="./watch-t5-24-1200x450CTA.webp" alt="" />
            </div>
            <Container>
                {products && <HomeProductListShow products={products} link="/product/2" title="Đồng Hồ" />}
                <div>
                    <ProductDetailViewer />
                </div>
            </Container>
        </div>
    );
}

export default Home;
