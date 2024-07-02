/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from '@/hooks';
import { Button, Input, Popover } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import { Product } from '@/type';
import { Link, useNavigate } from 'react-router-dom';
import { Filter } from '@/type';
import ProductCard from '../ProductCard';
import { AlertFilled, ThunderboltFilled } from '@ant-design/icons';
const SearchC: React.FC = memo(() => {
    const { Search } = Input;
    const [searchValue, setSearchValue] = React.useState('');
    const [searchHistory, setSearchHistory] = React.useState<string[]>([]);
    const lastE = searchHistory[searchHistory.length - 1];
    const navigate = useNavigate();
    const [data, setData] = React.useState<Product[]>();
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 500 });
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            navigate(`/product?productName=${value}&page=1`);
        }
        if (info?.source == 'clear') {
            setData([]);
        }
    };
    useEffect(() => {
        if (!searchValue.trim()) {
            setData([]);
            return;
        }
        const storedHistory = localStorage.getItem('searchHistory');
        if (storedHistory) {
            setSearchHistory(JSON.parse(storedHistory));
        }
        const Search = async () => {
            if (debounce != '') {
                const filter: Filter = {
                    page: 1,
                    pageSize: 5,
                    sortOder: 'ascending',
                    productName: debounce?.toString(),
                };
                const result = await productServices.getProductPagingByFilter(filter);
                if (result.isSuccessed === true) {
                    setData(result.resultObj.items);
                }
            }
        };
        Search();
    }, [debounce]);
    const onChangeInput: SearchProps['onChange'] = (value) => {
        const searchValue = value.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
            updateSearchHistory(searchValue);
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    };
    const updateSearchHistory = (searchTerm: string) => {
        if (searchTerm) {
            setSearchHistory((prevHistory) => [...prevHistory, searchTerm]);
        }
    };
    return (
        <>
            <div>
                <Popover
                    content={
                        <div className="popover-search">
                            <span className='font-medium text-[16px]'>Tìm kiếm gần đây</span>
                            {data && data.length > 1 ? (
                                <>
                                    {data.map((e: Product) => (
                                        <div className="mb-2" key={e.id}>
                                            <ProductCard product={e} type="forList" />
                                        </div>
                                    ))}
                                    <div className="w-full text-center">
                                        <Button>
                                            <Link to={`/product/${searchValue}`}>Hiển thị tất cả</Link>
                                        </Button>
                                    </div>
                                </>
                            ) : (
                                <div className="p-2">
                                    <ul>
                                        <span className='text-sky-500'>{lastE}</span>
                                        <div className="flex items-center bg-cyan-50 mb-3 mt-3">
                                            <div>
                                                <AlertFilled className='text-cyan-400' />
                                            </div>
                                            <span className="pl-2 text-[12px]">
                                                Tăng thời gian phục vụ khách hàng đến 24h00, trở thành chuỗi cửa hàng
                                                bán lẻ Phục vụ khách hàng lâu nhất
                                            </span>
                                        </div>
                                        <div>
                                            <span className='font-medium text-base'>Khuyến mãi nổi bật</span>
                                            <div className='m-2'>
                                                <a className='flex border-b-[1px] border-gray-300 p-3' href="/product?categoryId=3&isPromotion=1">Khuyến Mãi Khi Mua Nhẫn <ThunderboltFilled className='text-[red]' /></a>
                                                <a className='flex border-b-[1px] border-gray-300 p-3' href="/product?categoryId=4&isPromotion=1">Khuyến Mãi Khi Mua Dây Chuyền <ThunderboltFilled className='text-[red]' /></a>
                                                <a className='flex border-b-[1px] border-gray-300 p-3' href="/product?categoryId=9&isPromotion=1">Khuyến Mãi Bông Tai <ThunderboltFilled className='text-[red]' /></a>
                                                <a className='flex p-3' href="/product?categoryId=2&isPromotion=1">Khuyến Mãi Đồng Hồ <ThunderboltFilled className='text-[red]' /></a>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            )}
                        </div>
                    }
                    trigger={'click'}
                    placement="bottom"
                >
                    <div className="mt-1 w-auto">
                        <Search
                            placeholder="Tên sản phẩm"
                            className="block"
                            allowClear
                            autoFocus={false}
                            ref={inputRef}
                            size="middle"
                            onSearch={onSearch}
                            onChange={onChangeInput}
                        />
                    </div>
                </Popover>
            </div>
        </>
    );
});
export default SearchC;
