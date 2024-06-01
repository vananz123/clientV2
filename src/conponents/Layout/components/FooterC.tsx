import { Col, Layout, Row, Space } from 'antd';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Flex, Tag } from 'antd';
import Container from '@/conponents/Container';
const { Footer } = Layout;
const footerStyle: React.CSSProperties = {
    color: '#282828',
    fontSize: '11.5px',
    padding: 0,
    margin: 0,
};
function FooterC() {
    return (
        <Container>
            <Footer style={{ textAlign: 'center',borderTop: '1px solid #858585', paddingTop: '20px' } }>
                <Row gutter={[8, 8]} align={'top'} justify={'start'}>
                    <Col xs={24} md={24} lg={8} xl={8}>
                        <div style={{ textAlign: 'left', width: '80%' }}>
                            <img
                                style={{ width: '100px', marginLeft: '0px', opacity: 1 }}
                                src="../logo.png"
                                alt="logo"
                            />
                            <p style={{ padding: 0, margin: '5px' }}>
                                © 2017 Công Ty Cổ Phần Vàng Bạc Đá Quý Phú Nhuận
                            </p>
                            <div style={{ padding: '5px', margin: 0 }}>
                                <p style={footerStyle}>170E Phan Đăng Lưu, P.3, Q.Phú Nhuận, TP.Hồ Chí Minh</p>
                                ĐT:{' '}
                                <a href="tel:02839951703" style={{ color: 'blue' }}>
                                    039 3946693
                                </a>{' '}
                                - Fax:{' '}
                                <a href="fax:02839951702" style={{ color: 'blue' }}>
                                    028 3995 1702
                                </a>
                                <p style={footerStyle}>
                                    <a
                                        style={{ color: 'blue' }}
                                        href="https://cdn.pnj.io/images/quan-he-co-dong/2024/8c-20240131-PNJ-GCNDKDN-lan-36-CBTT.pdf"
                                        rel="nofollow noopener"
                                    >
                                        Giấy chứng nhận đăng ký doanh nghiệp: 0300521758
                                    </a>{' '}
                                    do Sở Kế hoạch &amp; Đầu tư TP.HCM cấp lần đầu ngày 02/01/2004.{' '}
                                    <a
                                        href="https://cdn.pnj.io/images/quan-he-co-dong/2022/1d-Nganh-nghe-kinh-doanh-tai-ngay-06012022-CBTT.pdf"
                                        rel="nofollow noopener"
                                        style={{ color: 'blue' }}
                                    >
                                        Ngành, nghề kinh doanh
                                    </a>
                                </p>
                            </div>
                            <div style={{ padding: '5px', margin: 0 }}>
                                <p style={footerStyle}>
                                    Email:{' '}
                                    <a href="mailto: shop@pnj.com.vn" style={{ color: 'blue' }}>
                                        shop@pnj.com.vn
                                    </a>
                                    Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi) Gọi mua:{' '}
                                    <a href="tel:1800545457" style={{ color: 'blue' }}>
                                        1800545457
                                    </a>{' '}
                                    (phím 1) Khiếu nại:{' '}
                                    <a href="tel:1800545457" style={{ color: 'blue' }}>
                                        1800545457
                                    </a>{' '}
                                    (phím 2)
                                </p>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={8}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Space className='spaceFooter' direction="vertical" align="start">
                                <p>Về LA</p>
                                <p>Câu chuyện</p>
                                <p>Tuyển dụng</p>
                                <p>Xuất khẩu</p>
                            </Space>
                            <Space direction="vertical" align="start">
                                <h3 style={{ textAlign: 'left', marginTop: 0 }}>KẾT NỐI VỚI CHÚNG TÔI</h3>
                                <Flex gap="4px 0" wrap="wrap">
                                    <Tag icon={<TwitterOutlined />} color="#55acee">
                                        Twitter
                                    </Tag>
                                    <Tag icon={<YoutubeOutlined />} color="#cd201f">
                                        <a href="https://www.youtube.com/@HoChiMinhCityOpenUniversity" target="_blank">
                                            Youtube
                                        </a>
                                    </Tag>
                                    <Tag icon={<FacebookOutlined />} color="#3b5999">
                                        <a
                                            href="https://www.facebook.com/profile.php?id=100027662470361"
                                            target="_blank"
                                        >
                                            Facebook
                                        </a>
                                    </Tag>
                                    <Tag icon={<LinkedinOutlined />} color="#55acee">
                                        LinkedIn
                                    </Tag>
                                </Flex>
                                <h3 style={{ textAlign: 'left', padding: 0, margin: 5 }}>
                                    QUAN TÂM THÌ HÃY KẾT NỐI ZALO
                                </h3>
                                <p style={{ textAlign: 'left', padding: 0, margin: 5 }}>
                                    Nhận các thông tin khuyến mãi hấp dẫn
                                </p>
                                <div style={{ textAlign: 'left', padding: 0, margin: 5 }}>
                                    <a href="https://zalo.me/trangsucpnjofficial" target="_blank">
                                        <Tag icon={<LinkedinOutlined />} color="#55acee">
                                            Zalo
                                        </Tag>
                                    </a>
                                </div>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={8}>
                        <iframe
                            width="350"
                            height="300"
                            style={{border:0}}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.133333259392!2d106.67948837593282!3d10.801098589349179!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317528da01ab9bbd%3A0xb58371e9e12a0df4!2zQ1RDUCBWw6BuZyBC4bqhYyDEkMOhIFF1w70gUE5KIFBow7ogTmh14bqtbg!5e0!3m2!1svi!2s!4v1716720996583!5m2!1svi!2s"
                        ></iframe>
                    </Col>
                </Row>
            </Footer>
        </Container>
    );
}

export default FooterC;
