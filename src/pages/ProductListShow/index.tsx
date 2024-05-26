/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom';
import * as productServices from '@/api/productServices';
import React, { useCallback, useEffect } from 'react';
import { Product,Filter,Sort } from '@/type';
import { useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/app/feature/category/reducer';
import { Button, Col, Flex, Result, Row, Select, Spin, Switch, Pagination, PaginationProps , Space, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import ProductCard from '@/conponents/ProductCard';
import { OPTIONS_PRICE,OPTIONS_MATERIAL,OPTIONS_SORT } from '@/common/common';
import SkeletonCard from '@/conponents/SkeletonCard';
const pageSize: number = 8;
function ProductListShow() {
    const { id } = useParams();
    const [products, setProducts] = React.useState<Product[]>();
    const cate = useAppSelector(selectCategories).data;
    const [page, setPage] = React.useState<number>(1);
    const [sortOder, setSortOder] = React.useState<Sort>('ascending');
    const [optionPrice, setOptionPrice] = React.useState<number[]>([]);
    const [optionMaterial, setOptionMaterial] = React.useState<string[]>([]);
    const [totalRecord,setTotalRecord] = React.useState<number>(0)
    const [isPromotion, setIsPromotion] = React.useState<boolean>(false);
    const [titleContent, setTitleContent] = React.useState<string | undefined>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const getProductPaging = useCallback(async () => {
        setIsLoading(true);
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
            console.log(res)
            setProducts(res.resultObj.items);
            setIsLoading(false);
            setTotalRecord(res.resultObj.totalRecords)
        }
    },[id,page, optionPrice, optionMaterial, sortOder, isPromotion]);
    const getProductPromotionPaging = useCallback(async () => {
        setIsLoading(true);
        const filter: Filter = {
            page: page,
            sortOder: sortOder,
            pageSize: pageSize,
            optionPrice: optionPrice,
            optionMaterial: optionMaterial,
            isPromotion: isPromotion,
        };
        const res = await productServices.getProductPagingByFilter(filter);
        console.log(res);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
            setIsLoading(false);setTotalRecord(res.resultObj.totalRecords)
        }
    },[page, optionPrice, optionMaterial, sortOder, isPromotion]);
    const getProductPNPaging = useCallback(async () => {
        setIsLoading(true);
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
            setIsLoading(false);
            setTotalRecord(res.resultObj.totalRecords)
        }
    },[id, page, optionPrice, optionMaterial, sortOder, isPromotion]);
    const getProductStatusPaging = useCallback(
        async (status: number) => {
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
                setProducts(res.resultObj.items);setTotalRecord(res.resultObj.totalRecords)
            }
        },
        [page, optionPrice, optionMaterial, sortOder, isPromotion],
    );
    useEffect(() => {
        if (id != undefined) {
            if (id === 'promotion') {
                setIsPromotion(true);
                setTitleContent('Khuyến mãi');
                getProductPromotionPaging();
            } else if (id === 'new') {
                setTitleContent(id);
                getProductStatusPaging(2);
            } else if (id === 'hot') {
                setTitleContent(id);
                getProductStatusPaging(3);
            } else {
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
                    console.log('dd');
                }
            }
        }
    }, [
        id,
        page,
        optionPrice,
        optionMaterial,
        sortOder,
        isPromotion,
        cate,
        getProductPNPaging,
        getProductPromotionPaging,
        getProductPaging,
        getProductStatusPaging,
    ]);
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
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setPage(pageNumber)
      };
    return (
        <>
            <div className="container">
                <h3>{titleContent}</h3>
                <Flex justify="space-between" gap={16} style={{ marginBottom: '10px' }}>
                    <Space wrap>
                        <Select
                            mode="multiple"
                            style={{ width: 150 }}
                            options={OPTIONS_PRICE}
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
                            options={OPTIONS_MATERIAL}
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
                    <Select value={sortOder} style={{ width: 120 }} onChange={handleChangeSort} options={OPTIONS_SORT} />
                </Flex>
                <Spin spinning={isLoading} indicator={<LoadingOutlined style={{ fontSize: 24 }} />}>
                    {products != undefined ? (
                        <>
                            {products.length > 0 ? (
                                <Row gutter={[24, 24]}>
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
                                <Result title="No resulf" extra={<Button type="primary">See more</Button>} />
                            )}
                        </>
                    ) : (
                        <Row gutter={[24, 24]}>
                            {Array.from({length:8}).map((_,index)=>(
                                <Col key={index}
                                    style={{ display: 'flex', justifyContent: 'center' }}
                                                xs={12}
                                                sm={8}
                                                md={8}
                                                lg={8}
                                                xl={6}
                                    className="gutter-row"
                                    >
                                    <SkeletonCard style={{width:'100%',height:350}}/>
                                </Col>
                            ))}
                        </Row>
                    )}
                </Spin>
                <div style={{ marginTop: 24, marginBottom:24,textAlign: 'center' }}>
                    <Pagination onChange={onChange} current={page} pageSize={pageSize} total={totalRecord} />
                </div>
            </div>
        </>
    );
}
export default ProductListShow;
