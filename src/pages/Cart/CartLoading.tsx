import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Row } from 'antd';

function CartLoading() {
    return (
        <Row gutter={24}>
            <Col className="gutter-row" xs={24} md={24} lg={16} xl={16}>
                
                    <SkeletonCard style={{ width: '100%', height: 200 ,marginBottom:10}} />
                    <SkeletonCard style={{ width: '100%', height: 200 }} />
            </Col>
            <Col className="gutter-row" xs={24} md={24} lg={8} xl={8}>
                <SkeletonCard style={{ width: '100%', height: 250,marginBottom:10 }} />
                <SkeletonCard style={{ width: '100%', height: 70 }} />
            </Col>
        </Row>
    );
}

export default CartLoading;
