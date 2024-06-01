import { Review } from '@/api/ResType';
import { UserOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Empty, Rate, Space } from 'antd';
import Meta from 'antd/es/card/Meta';
import dayjs from 'dayjs';
import React from 'react';
import * as reviewServices from '@/api/reviewServices';
import Container from '@/conponents/Container';
interface Props {
    productId: number;
}
const ProductDetailReview: React.FC<Props> = React.memo(({ productId }) => {
    const { data: listReview } = useQuery({
        queryKey: [`product-detail-review-${productId}`],
        queryFn: () => reviewServices.getReivewByProductId(productId, 1).then((data) => data?.items),
    });
    return (

        <section>
            <Container>
                <div className='flex justify-start'>
                    <p className='text-base'>Bình luận từ khách hàng</p>
                </div>
            </Container>
            <Container className="mt-5 mb-5 max-w-[800px]">
                <div>
                    {listReview && listReview.length > 0 ? (
                        <>
                            {listReview.map((e: Review) => (
                                <Card key={e.id} style={{ width: '100%', marginTop: 16 }}>
                                    <Meta
                                        avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />}
                                        title={e.user.userName}
                                        description={
                                            <>
                                                <Space align="baseline" direction="vertical">
                                                    <Rate value={e.rate} disabled />
                                                    <p>{e.comment}</p>
                                                    <p>{dayjs(e.createAt).format('YYYY-MM-DD')}</p>
                                                </Space>
                                            </>
                                        }
                                    />
                                    {e.feelback !== null && (
                                        <>
                                            <Card key={e.id} type="inner" style={{ width: '100%', marginTop: 16 }}>
                                                <Meta
                                                    avatar={<Avatar icon={<UserOutlined />} />}
                                                    title={'Feedback of admin'}
                                                    description={
                                                        <>
                                                            <Space align="baseline" direction="vertical">
                                                                <p>{e.feelback}</p>
                                                                <p>{dayjs(e.feelbackAt).format('YYYY-MM-DD')}</p>
                                                            </Space>
                                                        </>
                                                    }
                                                />
                                            </Card>
                                        </>
                                    )}
                                </Card>
                            ))}
                        </>
                    ) : (
                        <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 60 }}
                            description={<span>Chưa có bình luận nào</span>}
                        ></Empty>
                    )}
                </div>
            </Container>
        </section>
    );
});

export default ProductDetailReview;
