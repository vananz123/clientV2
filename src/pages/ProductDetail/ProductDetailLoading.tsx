import Container from '@/conponents/Container';
import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Flex, Row, Space } from 'antd';
function ProductDetailLoading() {
    return (
        <>
            <Container>
                <SkeletonCard style={{ width: 100, height: 40, marginBottom: 10 }} />
                <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={14} className="gutter-row">
                        <Flex justify="space-between" gap={5}>
                            <SkeletonCard style={{ width: 400, height: 400 }} />
                            <Space direction="vertical">
                                <SkeletonCard style={{ width: 150, height: 150 }} />
                                <SkeletonCard style={{ width: 150, height: 150 }} />
                            </Space>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={10} className="gutter-row">
                        <Space direction="vertical">
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                        </Space>
                        <Flex justify="space-between" style={{ marginTop: 10 }}>
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                            <SkeletonCard style={{ width: 200, height: 40 }} />
                        </Flex>
                    </Col>
                </Row>
            </Container>
            <Container>
                <div className='w-full flex justify-center md:p-5'><SkeletonCard className="w-full h-[200px]" /></div>
            </Container>
            <Container>
                <Row gutter={[24, 24]}>
                    {Array.from({ length: 4 }).map((_, index) => (
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
                            <SkeletonCard style={{ width: '100%', height: 350 }} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
}

export default ProductDetailLoading;
