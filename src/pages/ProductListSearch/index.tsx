import { Link, useParams,useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import * as productServices from '@/api/productServices';
import * as categoryServices from '@/api/categoryServices';
import React, { useEffect, useRef } from 'react';
import { Category, Product } from '../Admin/Product/ProductList';
import { Button, Card, Col, Flex, Result, Row, Select, SelectProps, Skeleton, Spin ,Breadcrumb } from 'antd';
import {  ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import ProductCard from '@/conponents/ProductCard';
import { useDebounce } from '@/hooks';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import type { InputRef } from 'antd';
const options: SelectProps['options'] = [
    {
        value: 6,
        label: '6',
    },
    {
        value: 8,
        label: '8',
    },
    {
        value: 12,
        label: '12',
    },
];
function ProductListSearch() {
    const { keyword } = useParams();
    const [products, setProducts] = React.useState<Product[]>();
    const [pageSize, setPageSize] = React.useState<number>(6);
    const [page, setPage] = React.useState<number>(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loadingPage, setLoadingPage] = React.useState<boolean>(false);
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);
    const getProductByNamePaging =async (name:any)=>{
        if(keyword != undefined){
            const result = await productServices.getProductPagingBySeoTitle(keyword, 1, 100);
            console.log(result);
            if (result.statusCode == 200) {
                setProducts(result.resultObj.items);
            }
        }
    }

    useEffect(() => {
        
        getProductByNamePaging('333')
    }, [keyword]);
    const handleChangePage = (value: number) => {
        const getProductPagingBegin = async () => {
            // const res = await productServices.getProductPaging(debounce, 1, value);
            // if (res.statusCode == 200) {
            //     setProducts(res.resultObj);
            // }
        };
        getProductPagingBegin();
        setPageSize(value);
    };

    return (
        <>
            <div style={{ width: '100%' }}>
            
                <Flex justify="space-between" style={{ marginBottom: '10px' }}>
                    
                    <Select
                        defaultValue={pageSize}
                        style={{ width: 120 }}
                        loading={loadingPage}
                        onChange={handleChangePage}
                        options={options}
                    />
                </Flex>
                <Spin spinning={loadingSearch} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
                    {products != undefined ? (
                        <>
                            {
                                    products.length > 0 ? <Row gutter={[12, 12]}>
                                    {products.map((e: Product) => (
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
                                : <Result
                                title="No resulf"
                                extra={
                                    <Button type="primary">
                                    See more
                                  </Button>
                                }
                              />}
                           
                        </>
                    ) : (
                        <Row gutter={[12, 12]}>
                            <Col
                                style={{ display: 'flex', justifyContent: 'center' }}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                                className="gutter-row"
                            >
                                <Skeleton />
                            </Col>
                            <Col
                                style={{ display: 'flex', justifyContent: 'center' }}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                                className="gutter-row"
                            >
                                <Skeleton />
                            </Col>
                            <Col
                                style={{ display: 'flex', justifyContent: 'center' }}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                                className="gutter-row"
                            >
                                <Skeleton />
                            </Col>
                            <Col
                                style={{ display: 'flex', justifyContent: 'center' }}
                                xs={12}
                                sm={12}
                                md={12}
                                lg={8}
                                xl={6}
                                className="gutter-row"
                            >
                                <Skeleton />
                            </Col>
                        </Row>
                    )}
                </Spin>
            </div>
        </>
    );
}
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default ProductListSearch;
