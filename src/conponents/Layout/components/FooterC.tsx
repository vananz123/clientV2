import { InstagramOutlined, PhoneOutlined } from '@ant-design/icons';
import { Avatar, Col, Layout, Row, Space } from 'antd';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Flex, Tag } from 'antd';
const { Footer } = Layout;
function FooterC() {
    return (
        <div>
            <Footer style={{ textAlign: 'center' }}>
                <Row gutter={[8,8]} align={'top'} justify={'start'}>
                    <Col xs={24} md={24} lg={6} xl={6}>
                        <h1>LA store</h1>
                    </Col>
                    <Col xs={12} md={8} lg={6}  xl={6}>
                        <Space direction="vertical" align='start'>
                            <p>Về LA</p>
                            <p>Câu chuyện</p>
                            <p>Tuyển dụng</p>
                            <p>Xuất khẩu</p>
                        </Space>
                    </Col>
                    <Col xs={12} md={8} lg={6}  xl={6}>
                        <Space direction="vertical" align='start'>
                            <p>Dịch vụ khách hàng</p>
                            <p>Câu chuyện</p>
                            <p>Tuyển dụng</p>
                            <p>Xuất khẩu</p>
                        </Space>
                    </Col>
                    <Col xs={24} md={8} lg={6}  xl={6}>
                        <Flex gap="4px 0" wrap="wrap">
                            <Tag icon={<TwitterOutlined />} color="#55acee">
                                Twitter
                            </Tag>
                            <Tag icon={<YoutubeOutlined />} color="#cd201f">
                                Youtube
                            </Tag>
                            <Tag icon={<FacebookOutlined />} color="#3b5999">
                                Facebook
                            </Tag>
                            <Tag icon={<LinkedinOutlined />} color="#55acee">
                                LinkedIn
                            </Tag>
                        </Flex>
                    </Col>
                </Row>
                
            </Footer>
        </div>
    );
}

export default FooterC;
