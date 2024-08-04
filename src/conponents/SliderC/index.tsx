/* eslint-disable @typescript-eslint/no-explicit-any */
import { Product } from '@/type';
import React from 'react';
import Slider from '@ant-design/react-slick';
import ProductCard from '../ProductCard';
import { Col, Row } from 'antd';
const SliderC: React.FC<{ products: Product[]; title: string }> = ({ products, title }) => {
    const settings = {
        dots: true,
        infinite: false,
        focusOnSelect: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1,
    };
    const [numberItem, setNumberItem] = React.useState(4);
    const lenthProduct = products.length;
    const numberSiler = Number((lenthProduct / numberItem).toFixed());
    const re: Array<Product[]> = [];
    for (let i = 0; i <= numberSiler; i++) {
        if (i === numberSiler) {
            const arr = products.slice(numberItem + i);
            re.push(arr);
        } else {
            const arr = products.slice(i * numberItem, i * numberItem + numberItem);
            re.push(arr);
        }
    }
    re.pop();
    React.useEffect(() => {
        window.addEventListener('resize', () => {
            if (window.innerWidth > 1200) {
                setNumberItem(4);
            } else if (window.innerWidth <= 1200 && window.innerWidth >= 585) {
                setNumberItem(3);
            } else {
                setNumberItem(2);
            }
        });
    }, []);
    return (
        <div>
            <div className="flex justify-start my-3">
                <p className="text-[18px] font-bold text-[#003868] font-serif ">{title}</p>
            </div>
            <div>
                {products && products.length > 0 && (
                    <Slider {...settings}>
                        {re.map((item) => (
                            <div>
                                <Row gutter={[16, 16]}>
                                    {item.map((e: Product) => (
                                        <Col
                                            style={{ display: 'flex', justifyContent: 'center' }}
                                            span={24 / numberItem}
                                            className="gutter-row"
                                            key={e.id}
                                        >
                                            <ProductCard product={e} />
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        ))}
                    </Slider>
                )}
            </div>
        </div>
    );
};

export default SliderC;
