import { ClockCircleTwoTone, CustomerServiceTwoTone, LikeTwoTone, MailTwoTone } from '@ant-design/icons';
import Slider from '@ant-design/react-slick';
import { Modal, Space } from 'antd';
import { memo } from 'react';
import { useImmer } from 'use-immer';
const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
};
const ProductdetailPolicy = memo(() => {
    const [openModal, setOpen] = useImmer(false);
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <div className="mt-3">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="text-[20px] font-semibold">LAStore</span>
                    <span className="text-[12px] xl:text-base from-stone-500">
                        Là nơi để bạn và người thân tin tưởng lựa chọn
                    </span>
                </div>
                <div
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    <Slider
                        {...settings}
                        className="cursor-pointer flex space-x-3 text-[10px] xl:text-[14px] w-[310px] xl:w-[500px]"
                    >
                        <div className="space-x-2">
                            <LikeTwoTone />
                            <span className=" ml-2">Trải nghiệm</span>
                        </div>
                        <div className="space-x-2">
                            <CustomerServiceTwoTone />
                            <span className=" ml-2">Tận tâm tư vấn</span>
                        </div>
                        <div className="space-x-2">
                            <MailTwoTone />
                            <span className="ml-2">Trung tâm bảo vệ</span>
                        </div>
                        <div className="space-x-2">
                            <ClockCircleTwoTone />
                            <span className="ml-2">Phục vụ 24/7</span>
                        </div>
                    </Slider>
                </div>
            </div>
            <Modal title="Tự tin mua sắm cùng LAStore" open={openModal} onCancel={handleCancel} footer={''}>
                <Space className="block">
                    <div className="flex space-x-2 py-4">
                        <div>
                            <LikeTwoTone />
                        </div>
                        <div className="flex-1">
                            <span className="font-medium">Được trải nghiệm thực tế sản phẩm, lựa chọn đúng hơn.</span>
                            <p className="mt-2 text-sm">
                                Không còn bọc nilon, hạn chế quyền được trải nghiệm trước mua hàng của người dùng.
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <div>
                            <CustomerServiceTwoTone />
                        </div>
                        <div className="flex-1">
                            <span className="font-medium">
                                Bạn lo lắng khi không biết sản phẩm nào phù hợp? LAStore có đội ngũ tư vấn tận tâm và có
                                chuyên môn.
                            </span>
                            <p className="mt-2 text-sm">
                                Giúp khách hàng lựa chọn sản phẩm đúng nhu cầu là trách nhiệm đầu tiên của Nhân viên tư
                                vấn tại LAStore.
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <div>
                            <MailTwoTone />
                        </div>
                        <div className="flex-1">
                            <span className="font-medium">
                                Bạn gặp khó khi gặp lỗi hỏng, LAStore có Trung tâm bảo vệ quyền lợi khách hàng
                            </span>
                            <p className="mt-2 text-sm">
                                Để không bỏ sót bất kỳ một trải nghiệm không tốt nào của khách hàng, Ban Lãnh Đạo Tập
                                đoàn có chuyên trang bảo vệ quyền lợi khách hàng.
                            </p>
                        </div>
                    </div>
                    <div className="flex space-x-2 py-4">
                        <div className="text-[15px]">
                            <ClockCircleTwoTone />
                        </div>
                        <div className="flex-1">
                            <span className="font-medium">Bạn bận, LAStore phục vụ từ sáng tới khuya.</span>
                            <p className="mt-2 text-sm">
                                Khách hàng bận bịu. Cán bộ, nhân viên LAStore càng phải phục vụ ngoài giờ để trải nghiệm
                                của khách hàng được thông suốt.
                            </p>
                        </div>
                    </div>
                </Space>
            </Modal>
        </div>
    );
});
export default ProductdetailPolicy;
