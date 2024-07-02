/* eslint-disable @typescript-eslint/no-unused-vars */
import * as productServices from '@/api/productServices';
import { Product, Filter, Sort, Category } from '@/type';
import { useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/app/feature/category/reducer';
import { Button, Col, Result, Row, Pagination, PaginationProps, Breadcrumb } from 'antd';
import ProductCard from '@/conponents/ProductCard';
import SkeletonCard from '@/conponents/SkeletonCard';
import Container from '@/conponents/Container';
import {  HomeOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import useQueryString from '@/hooks/useQueryString';
import ProductFilter from './ProductFilter';
const pageSize: number = 12;
function ProductListShow() {
    const cate = useAppSelector(selectCategories).data;
    console.log(cate);
    const { queryString, setQueryString, removeQueryString } = useQueryString();
    const filter: Filter = {
        categoryId: Number(queryString.categoryId) || undefined,
        page: Number(queryString.page) || 1,
        sortOder: (queryString.sortOder as Sort) || 'ascending',
        pageSize: pageSize,
        optionPrice: queryString.optionPrice ? queryString.optionPrice.split(',').map(Number) : undefined,
        optionMaterial: queryString.optionMaterial ? queryString.optionMaterial.split(',') : undefined,
        isPromotion: queryString.isPromotion ? (queryString.isPromotion === '1' ? true : false) : undefined,
        productStatus: Number(queryString.productStatus) || undefined,
        productName: queryString.productName || undefined,
    };
    const { data: resulf } = useQuery({
        queryKey: ['load-list-product', filter, filter.categoryId],
        queryFn: () => productServices.getProductPagingByFilter(filter),
    });
    const products = resulf?.resultObj.items;
    const totalRecord = resulf?.resultObj.totalRecords;
    const onChange: PaginationProps['onChange'] = (pageNumber) => {
        setQueryString('page', pageNumber.toString());
    };
    console.log(queryString.isPromotion)
    const getCategoryName = (id: number, cate:Category[]) => {
        if (!id || !cate) return '';
        for (const category of cate) {
            if (category.id === id) {
                return category.name;
            } else{
                for (const sub of category.subCategory) {
                    if (sub.id === id) {
                        return sub.name;
                    }
                }
            }
        }
        return '';
    };
    return (
        <>
            <Container>
                <Breadcrumb
                    className="mb-2"
                    items={[
                        {
                            href: '/',
                            title: <HomeOutlined />,
                        },
                        {
                            title: (
                                <>
                                    {getCategoryName(Number(filter.categoryId), cate)}
                                    {queryString.productName}
                                </>
                            ),
                        },
                    ]}
                />
                <ProductFilter filter={filter} setQueryString={setQueryString} removeQueryString={removeQueryString} />
                {products != undefined ? (
                    <>
                        {products.length > 0 ? (
                            <>
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
                                <div style={{ marginTop: 24, marginBottom: 24, textAlign: 'center' }}>
                                    <Pagination
                                        onChange={onChange}
                                        current={filter.page}
                                        pageSize={pageSize}
                                        total={totalRecord}
                                    />
                                </div>
                            </>
                        ) : (
                            <Result title="No resulf" extra={<Button type="primary">See more</Button>} />
                        )}
                    </>
                ) : (
                    <Row gutter={[24, 24]}>
                        {Array.from({ length: 12 }).map((_, index) => (
                            <Col
                                key={index}
                                style={{ display: 'flex', justifyContent: 'center' }}
                                xs={12}
                                sm={8}
                                md={8}
                                lg={8}
                                xl={6}
                                className="gutter-row"
                            >
                                <SkeletonCard className="w-full h-[260px] md:h-[350px]" />
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
        </>
    );
}

export default ProductListShow;
