/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import type { StatisticProps } from 'antd';
import { Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
import * as statisticServices from '@/api/statisticServices';
import { Area } from '@ant-design/plots';
const formatter: StatisticProps['formatter'] = (value) => <CountUp end={value as number} separator="," />;
function Dashboard() {
    const [analysis, setAnalysis] = React.useState<any>();
    const [data, setData] = React.useState<any[]>([]);
    const getData = async () => {
        const res = await statisticServices.getSaleOfDate();
        const res1 = await statisticServices.getAnalysis();
        console.log(res);
        setData(res.resultObj);
        setAnalysis(res1.resultObj);
    };
    useEffect(() => {
        getData();
    }, []);
    const config = {
        data,
        xField: 'day',
        yField: 'sales',
    };
    return (
        <div>
            <Row gutter={16}>
                <Col span={8}>
                    <Statistic title="Tổng Doanh Thu" value={analysis?.totalSales} formatter={formatter} />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Tổng Số Đơn"
                        value={analysis?.totalOrder}
                        precision={2}
                        formatter={formatter}
                    />
                </Col>
                <Col span={8}>
                    <Statistic
                        title="Tổng Sản Phẩm"
                        value={analysis?.totalProduct}
                        precision={2}
                        formatter={formatter}
                    />
                </Col>
            </Row>
            <Area {...config} />
        </div>
    );
}

export default Dashboard;
