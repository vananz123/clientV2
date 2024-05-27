import SkeletonCard from '@/conponents/SkeletonCard';
import { Col, Row } from 'antd';

function UserOrderDatailLoading() {
    return (
        <div>
            <SkeletonCard style={{ width: 30, height: 20, marginBottom: 10, marginTop: 10 }} />
            <Row gutter={16}>
                <Col xs={24} md={24} lg={8} xl={8}>
                <SkeletonCard  style={{ width: '100%', height: 400, marginBottom: 10}} />
                    {Array.from({length:3}).map((_,index)=>(
                         <SkeletonCard key={index} style={{ width: '100%', height: 32, marginBottom: 10}} />
                    ))}
                </Col>
                <Col xs={24} md={24} lg={16} xl={16}>
                {Array.from({length:3}).map((_,index)=>(
                         <SkeletonCard key={index} style={{ width: '100%', height: 160, marginBottom: 10}} />
                    ))}
                </Col>
            </Row>
        </div>
    );
}

export default UserOrderDatailLoading;
