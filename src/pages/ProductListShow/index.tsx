/* eslint-disable @typescript-eslint/no-unused-vars */
import {  useParams } from 'react-router-dom';
import * as productServices from '@/api/productServices';
import React, { useEffect } from 'react';
import { Product } from '@/type';
import { useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
import {
    Button,
    Col,
    Flex,
    Result,
    Row,
    Select,
    Skeleton,
    Spin,
    Switch,
    Pagination,
    PaginationProps,
} from 'antd';
import {  LoadingOutlined } from '@ant-design/icons';
import ProductCard from '@/conponents/ProductCard';
import { optionsPrice, optionsSort, optionsMaterial } from './FilterType';
import type { Filter } from './FilterType';
import { Space, Tooltip } from 'antd';
export type Sort = 'ascending' | 'descending';
function ProductListShow() {
    const { id } = useParams();
    const [products, setProducts] = React.useState<Product[]>();
    const [pageSize, setPageSize] = React.useState<number>(6);
    const cate = useAppSelector(selectCate);
    const [page, setPage] = React.useState<number>(1);
    //const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loadingPage, setLoadingPage] = React.useState<boolean>(false);
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);
    const [sortOder, setSortOder] = React.useState<Sort>('ascending');
    const [optionPrice, setOptionPrice] = React.useState<number[]>([]);
    const [optionMaterial, setOptionMaterial] = React.useState<string[]>([]);
    const [isPromotion, setIsPromotion] = React.useState<boolean>(false);
    const [titleContent, setTitleContent] = React.useState<string | undefined>('');
    const getProductPaging = async () => {
        const filter: Filter = {
            categoryId: Number(id),
            page: page,
            sortOder: sortOder,
            pageSize: pageSize,
            optionPrice: optionPrice,
            optionMaterial: optionMaterial,
            isPromotion: isPromotion,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
        }
    };
    const getProductPromotionPaging = async () => {
        const filter: Filter = {
            page: page,
            sortOder: sortOder,
            pageSize: pageSize,
            optionPrice: optionPrice,
            optionMaterial: optionMaterial,
            isPromotion: isPromotion,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
        }
    };
    const getProductPNPaging = async () => {
        const filter: Filter = {
            page: page,
            sortOder: sortOder,
            pageSize: pageSize,
            productName: id,
            optionPrice: optionPrice,
            optionMaterial: optionMaterial,
            isPromotion: isPromotion,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
        }
    };
    const getProductStatusPaging = async (status:number) => {
        const filter: Filter = {
            page: page,
            sortOder: sortOder,
            pageSize: pageSize,
            optionPrice: optionPrice,
            optionMaterial: optionMaterial,
            isPromotion: isPromotion,
            productStatus: status,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
        }
    };
    useEffect(() => {
        if (id != undefined) {
            if (id === 'promotion') {
                setIsPromotion(true);
                setTitleContent('Khuyến mãi');
                getProductPromotionPaging();
            } else if (id === 'new') {
                getProductStatusPaging(2);
            } else if (id === 'hot') {
                getProductStatusPaging(3);
            }else {
                try {
                    const a: number = Number(id);
                    if (!Number.isNaN(a)) {
                        if (typeof cate !== 'undefined') {
                            const name = cate.find((x) => x.id == a);
                            setTitleContent(name?.name);
                        }

                        getProductPaging();
                    } else {
                        setTitleContent('Tìm kiếm: ' + id);
                        getProductPNPaging();
                    }
                } catch {
                    console.log("dd")
                }
            }
        }
    }, [id, page, optionPrice, optionMaterial, sortOder, isPromotion]);
    // useEffect(() => {
    //     getProductPaging();
    // }, [page, optionPrice, optionMaterial, sortOder, isPromotion]);
    const handleChangeSort = (value: Sort) => {
        setSortOder(value);
    };
    const onChangeOpPrice = (value: number[]) => {
        if (typeof value !== 'undefined') {
            setOptionPrice(value);
        }
    };
    const onChangeOpSize = (value: string[]) => {
        if (typeof value !== 'undefined') {
            setOptionMaterial(value);
        }
    };
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current) => {
        setPage(current)
      };
    return (
        <>
            <div style={{ width: '100%' }}>
                <h3>{titleContent}</h3>
                <Flex justify="space-between" style={{ marginBottom: '10px' }}>
                    <Space>
                        <Select
                            mode="multiple"
                            style={{ width: 150 }}
                            options={optionsPrice}
                            onChange={onChangeOpPrice}
                            placeholder="Price"
                            maxTagCount="responsive"
                            maxTagPlaceholder={(omittedValues) => (
                                <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                                    <span>Hover Me</span>
                                </Tooltip>
                            )}
                        />
                        <Select
                            mode="multiple"
                            style={{ width: 150 }}
                            options={optionsMaterial}
                            onChange={onChangeOpSize}
                            placeholder="Brand"
                            maxTagCount="responsive"
                            maxTagPlaceholder={(omittedValues) => (
                                <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                                    <span>Hover Me</span>
                                </Tooltip>
                            )}
                        />
                        <Switch
                            checkedChildren="Khuyến mãi"
                            unCheckedChildren="Mặc định"
                            disabled={id === 'promotion'}
                            checked={isPromotion}
                            onChange={() => {
                                setIsPromotion(!isPromotion);
                            }}
                        />
                    </Space>
                    <Select
                        value={sortOder}
                        style={{ width: 100 }}
                        loading={loadingPage}
                        onChange={handleChangeSort}
                        options={optionsSort}
                    />
                </Flex>
                <Spin spinning={loadingSearch} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
                    {products != undefined ? (
                        <>
                            {products.length > 0 ? (
                                <Row gutter={[12, 12]}>
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
                            ) : (
                                <Result title="No resulf" extra={<Button type="primary">See more</Button>} />
                            )}
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
                <div style={{marginTop:24, textAlign:'center'}}>
                    <Pagination onShowSizeChange={onShowSizeChange} current={page} total={products?.length} />
                </div>
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
export default ProductListShow;
