import { Col, Layout, Row, Space } from 'antd';
import { Flex } from 'antd';
import Container from '@/conponents/Container';
import React from 'react';
const { Footer } = Layout;
import Logo2 from '/logo.png';
import { useQuery } from '@tanstack/react-query';
import * as departmentServices from '@/api/departmentServices';
import { EnvironmentTwoTone, FacebookOutlined, MailOutlined, YoutubeOutlined } from '@ant-design/icons';
const time = new Date();
const FooterC = React.memo(() => {
    const { data: listDepartment } = useQuery({
        queryKey: [`list-department`],
        queryFn: () => departmentServices.getAllDepartment(),
    });
    return (
        <Container>
            <div>
                <div className="flex justify-start my-3">
                    <p className="text-[18px] font-bold text-[#003868] font-serif">Hệ thống cửa hàng</p>
                </div>
                {typeof listDepartment !== 'undefined' && (
                    <Row className="flex justify-around" gutter={[16, 16]}>
                        {listDepartment.length > 0 && (
                            <>
                                {listDepartment.map((e) => (
                                    <Col className="gutter-row" xs={24} md={12} lg={10} xl={10} key={e.id}>
                                        <div className="my-2 grid grid-cols-1 tablet:grid-cols-2 gap-2 bg-white p-2 rounded">
                                            <div className="flex p-2">
                                                <div className="m-2">
                                                    <p className="font-medium mb-1">{e.province}</p>
                                                    <p>{e.address}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-end justify-between">
                                                <div className="ml-4">
                                                    {time.getHours() >= 9 && time.getHours() <= 21 ? (
                                                        <div>
                                                            <span className="text-[#3bb346] font-medium">Mở cửa</span>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <span className="text-[#f93920] font-medium">Đóng cửa</span>
                                                        </div>
                                                    )}
                                                    <span>09:00-21:00</span>
                                                </div>
                                                <div className="font-semibold flex items-center">
                                                    <a className="text-blue-700" href={e.linkGoogleMap} target="_blank">
                                                        <EnvironmentTwoTone /> Chỉ đường
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </Col>
                                ))}
                            </>
                        )}
                    </Row>
                )}
            </div>
            <Footer className="text-center border-t-[1px] border-[#858585] p-2 md:p-5">
                <Row gutter={[8, 8]} align={'top'} justify={'start'}>
                    <Col xs={24} md={24} lg={8} xl={8}>
                        <div className="text-left w-full text-stone-500 bg-white p-2 rounded">
                            <img style={{ width: '100px', marginLeft: '0px', opacity: 1 }} src={Logo2} alt="la store" />
                            <p className="p-0 m-[4px] text-stone-500">
                                © 2017 Công Ty Cổ Phần Vàng Bạc Đá Quý Phú Nhuận
                            </p>
                            <div className="p-[5px] m-0 text-stone-500">
                                <p className="p-0 m-0 text-stone-500">
                                    170E Phan Đăng Lưu, P.3, Q.Phú Nhuận, TP.Hồ Chí Minh
                                </p>
                                ĐT:{' '}
                                <a href="tel:0356636960" style={{ color: 'blue' }}>
                                    0356636960
                                </a>{' '}
                                - Fax:{' '}
                                <a href="fax:02839951702" style={{ color: 'blue' }}>
                                    028 3995 1702
                                </a>
                                <p className="p-0 m-0 text-stone-500">
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
                            <div className="p-[5px] m-0 text-stone-500">
                                <p className="p-0 m-0 text-stone-500">
                                    Email:{' '}
                                    <a href="mailto: 2051052074linh@ou.edu.vn" style={{ color: 'blue' }}>
                                        2051052074linh@ou.edu.vn
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
                        <div className="flex justify-between w-full bg-white p-2 rounded">
                            <Space direction="vertical" align="start">
                                <h3 className="text-left font-bold">KẾT NỐI VỚI CHÚNG TÔI</h3>
                                <Flex gap="4px 4px" wrap="wrap">
                                    <div className="w-[35px] h-[35px] flex justify-center items-center bg-[#1677ff] rounded-full">
                                        <FacebookOutlined />
                                    </div>
                                    <div className="w-[35px] h-[35px] flex justify-center items-center bg-[#1677ff] rounded-full">
                                        <MailOutlined />
                                    </div>
                                    <div className="w-[35px] h-[35px] flex justify-center items-center bg-[#1677ff] rounded-full">
                                        <YoutubeOutlined />
                                    </div>
                                    <a href="https://zalo.me/0356636960" target="_blank">
                                        <i className="footer-tag__i">
                                            <img
                                                style={{ opacity: 1 }}
                                                className="img-lazyload"
                                                data-src=""
                                                alt="Instagram"
                                                src="https://file.hstatic.net/200000722513/file/icon_zalo__1__f5d6f273786c4db4a3157f494019ab1e.png"
                                            ></img>
                                        </i>
                                    </a>
                                </Flex>
                                <h3 className="text-left font-bold">QUAN TÂM THÌ HÃY KẾT NỐI ZALO</h3>
                                <p style={{ textAlign: 'left', padding: 0 }}>Nhận các thông tin khuyến mãi hấp dẫn</p>
                                <div style={{ textAlign: 'left', padding: 0, margin: 0 }}>
                                    <a href="mailto:2051052074linh@ou.edu.vn" target="_blank">
                                        <i style={{ display: 'inline-block', width: '100px' }}>
                                            <img
                                                style={{ opacity: 1 }}
                                                className="img-lazyload"
                                                data-src=""
                                                alt="Đã thông báo bộ công thương"
                                                src="https://theme.hstatic.net/200000722513/1001090675/14/logo-bct.png?v=5339"
                                            ></img>
                                        </i>
                                    </a>
                                </div>
                            </Space>
                        </div>
                    </Col>
                    <Col xs={24} md={24} lg={8} xl={8}>
                        <div className="flex justify-between text-center w-full bg-white p-2 rounded">
                            <Space direction="vertical" align="start">
                                <h3 className="text-left font-bold">PHẢN HỒI, GÓP Ý, KHIẾU NẠI</h3>
                                <div>
                                    <p className="text-left mt-[5px] text-stone-500">
                                        Phản hồi nóng về chất lượng sản phẩm và dịch vụ. Đội ngũ Kiểm Soát Chất Lượng
                                        của chúng tôi sẵn sàng lắng nghe quý khách.
                                    </p>
                                </div>
                            </Space>
                        </div>
                    </Col>
                </Row>
            </Footer>
        </Container>
    );
});

export default FooterC;
