
import {  Col, Layout, Row, Space } from 'antd';
import { FacebookOutlined, LinkedinOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import { Flex, Tag } from 'antd';
const { Footer } = Layout;
const footerStyle: React.CSSProperties = {
    color:'#282828',
    fontSize:'11.5px',
    padding:0,
    margin:0,
};
function FooterC() {
    return (
        <div style={{borderTop:'1px solid #858585', paddingTop:'20px'}}>
            <Footer style={{ textAlign: 'center' }}>
                <Row gutter={[8,8]} align={'top'} justify={'start'}>
                    <Col xs={24} md={24} lg={6} xl={6}>
                        <div style={{textAlign:'left'}}>
                            <img style={{width:'100px', marginLeft:'0px', opacity:1}} src="../logo.png" alt="logo" />
                            <p style={{padding:0, margin:'5px'}}>© 2017 Công Ty Cổ Phần Vàng Bạc Đá Quý Phú Nhuận</p>
                            <div style={{padding:'5px', margin:0}}>
                                <p style={footerStyle}>170E Phan Đăng Lưu, P.3, Q.Phú Nhuận, TP.Hồ Chí Minh</p>
                                ĐT: <a href="tel:02839951703" style={{color: 'blue'}}>028 39951703</a> - Fax: <a href="fax:02839951702" style={{color: 'blue'}}>028 3995 1702</a> 
                                <p style={footerStyle}>
                                    <a style={{color: 'blue'}} href="https://cdn.pnj.io/images/quan-he-co-dong/2024/8c-20240131-PNJ-GCNDKDN-lan-36-CBTT.pdf" rel="nofollow noopener">Giấy chứng nhận đăng ký doanh nghiệp: 0300521758</a> do Sở Kế hoạch &amp; Đầu tư TP.HCM cấp lần đầu ngày 02/01/2004. <a href="https://cdn.pnj.io/images/quan-he-co-dong/2022/1d-Nganh-nghe-kinh-doanh-tai-ngay-06012022-CBTT.pdf" rel="nofollow noopener" style={{color:'blue'}}>Ngành, nghề kinh doanh</a> 
                                </p>
                            </div>
                            <div style={{padding:'5px', margin:0}} >
                                <p style={footerStyle}>
                                    Email: <a href="mailto: shop@pnj.com.vn" style={{color: 'blue'}}>shop@pnj.com.vn</a>
                                    Tổng đài hỗ trợ (08:00-21:00, miễn phí gọi) Gọi mua: <a href="tel:1800545457" style={{color:'blue'}}>1800545457</a> (phím 1) 
                                    Khiếu nại: <a href="tel:1800545457" style={{color: 'blue'}}>1800545457</a> (phím 2) 
                                </p> 
                            </div>
                        </div>
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
                        <h3 style={{textAlign:'left'}}>KẾT NỐI VỚI CHÚNG TÔI</h3>
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
                        <h3 style={{textAlign:'left', padding:0, margin:5}}>QUAN TÂM THÌ HÃY KẾT NỐI ZALO</h3>
                        <p style={{textAlign:'left',padding:0, margin:5}}>Nhận các thông tin khuyến mãi hấp dẫn</p>
                        <div style={{textAlign:'left',padding:0, margin:5}}>
                            <a href="https://zalo.me/trangsucpnjofficial" target='_blank'>
                                <Tag icon={<LinkedinOutlined />} color="#55acee">
                                    Zalo
                                </Tag>    
                            </a>
                        </div>
                    </Col>
                </Row>
                
            </Footer>
        </div>
    );
}

export default FooterC;
