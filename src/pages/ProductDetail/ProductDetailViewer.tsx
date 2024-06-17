import Slider from 'react-slick';
import ProductCard from '@/conponents/ProductCard';
import useProductViewerStore from '@/hooks/useProductViewerStore';
function SampleNextArrowCustomer(props: any) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: 'black' }} onClick={onClick} />;
}
function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return <div className={className} style={{ ...style, display: 'block', background: 'black' }} onClick={onClick} />;
}

const settings = {
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrowCustomer />,
    prevArrow: <SamplePrevArrow />,
};
function ProductDetailViewer() {
    const { products } = useProductViewerStore();
    console.log(products);
    return (
        <div>
            <div className="flex justify-start my-3">
                <p className="text-[18px] font-bold text-[#003868] font-serif">Sản phẩm đã xem</p>
            </div>
            <div>
                <Slider className="gap-3" {...settings}>
                    {products?.map((e) => (
                        // <div
                        //     key={e.id}
                        //     className="flex flex-col gap-4 shadow-lg py-8 px-6 mx-4 rounded-xl dark:bg-lime-50 bg-lime-100 relative"
                        // >
                        //     <div className='mb-4 flex justify-center'>
                        //         <img
                        //             src={`${baseUrl + e?.urlThumbnailImage}`}
                        //             alt={e.seoTitle}
                        //             className="rounded-full w-24 h-24"
                        //         />
                        //     </div>
                        //     <div className='flex flex-col items-center gap-4'>
                        //         <div className='space-y-3'>
                        //             <p className='text-xs text-gray-500'>{e.seoTitle}</p>
                        //             <h2 className='text-xl text-black/80 dark:text-light'>{e.price}</h2>
                        //         </div>
                        //     </div>
                        // </div>
                        <ProductCard product={e} />
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default ProductDetailViewer;
