import { Link, useParams, useNavigate } from 'react-router-dom';
import * as productServices from '@/api/productServices';
import React, { useEffect, useRef } from 'react';
import { Category, Product } from '../Admin/Product/ProductList';
import {
    Button,
    Card,
    Col,
    Flex,
    Result,
    Row,
    Select,
    SelectProps,
    Skeleton,
    Spin,
    Breadcrumb,
    Slider,
    InputNumber,
} from 'antd';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import ProductCard from '@/conponents/ProductCard';
import { optionsPrice ,optionsSort,optionsMaterial} from './FilterType';
import type { Filter } from './FilterType';
import { Space, Tooltip } from 'antd';
export type Sort = 'ascending' | 'descending'
function ProductListShow() {
    const { id } = useParams();
    const [products, setProducts] = React.useState<Product[]>();
    const [pageSize, setPageSize] = React.useState<number>(6);
    const [page, setPage] = React.useState<number>(1);
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [loadingPage, setLoadingPage] = React.useState<boolean>(false);
    const [loadingSearch, setLoadingSearch] = React.useState<boolean>(false);
    const [sortOder,setSortOder]  =React.useState<Sort>('ascending')
    const [optionPrice,setOptionPrice] = React.useState<number[]>([])
    const [optionMaterial,setOptionMaterial] = React.useState<string[]>([])
    const getProductPaging = async () => {
        const filter:Filter = {
            page:page,
            sortOder:sortOder,
            optionPrice:optionPrice,
            optionMaterial:optionMaterial
        }
        const res = await productServices.getProductByCategoryIdPaging(Number(id),filter);
        if (res.statusCode == 200) {
            setProducts(res.resultObj.items);
        }
    };
    useEffect(() => {
        if (id != 'all' && id != undefined) {
            getProductPaging();
        } else {
        }
    }, [id]);
    useEffect(() => {
        getProductPaging();
    }, [page,optionPrice,optionMaterial,sortOder]);
    const handleChangeSort = (value: Sort) => {
        setSortOder(value);
    };
    const onChangeOpPrice =(value:number[])=>{
        if(typeof value !== 'undefined'){
            setOptionPrice(value)
        }
    }
    const onChangeOpSize =(value:string[])=>{
        if(typeof value !== 'undefined'){
            setOptionMaterial(value)
        }
    }
    return (
        <>
            <div style={{ width: '100%' }}>
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
