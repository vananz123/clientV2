/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from '@/hooks';
import {  Input, Popover } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, { memo, useEffect, useRef } from 'react';
import { Product } from '@/type';
import { Link, useNavigate } from 'react-router-dom';
import { Filter } from '@/type';
import ProductCard from '../ProductCard';
import { AlertFilled, SearchOutlined, ThunderboltFilled } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { useImmer } from 'use-immer';
const SearchC: React.FC = memo(() => {
    const { Search } = Input;
    const [searchValue, setSearchValue] = React.useState('');
    const [searchHistory, setSearchHistory] = useImmer<string[]>([]);
    const navigate = useNavigate();
    const [data, setData] = React.useState<Product[]>();
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 500 });
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            const searchHistory = localStorage.getItem('searchHistory');
            if (searchHistory != null) {
                const searchHistoryArr: string[] = JSON.parse(searchHistory);
                searchHistoryArr.push(searchValue);
                localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArr));
            } else {
                localStorage.setItem('searchHistory', JSON.stringify([searchValue]));
            }
            navigate(`/product?productName=${value}&page=1`);
        }
        if (info?.source == 'clear') {
            setData([]);
        }
    };
    const search = useMutation({
        mutationKey: ['search'],
        mutationFn: (filter: Filter) => productServices.getProductPagingByFilter(filter),
        onSuccess(data) {
            setData(data.resultObj.items);
        },
        onError:(()=>{
            setData([])
        })
    });
    const storedHistory = localStorage.getItem('searchHistory');
    useEffect(() => {
        if (storedHistory != null) {
            const s = JSON.parse(storedHistory) as string[];
            setSearchHistory(s.reverse().slice(0, 5));
        }
    }, [storedHistory, setSearchHistory]);
    useEffect(() => {
        if (!searchValue.trim()) {
            setData([]);
            return;
        }
        if (debounce != '') {
            const filter: Filter = {
                page: 1,
                pageSize: 5,
                sortOder: 'ascending',
                productName: debounce?.toString(),
            };
            search.mutateAsync(filter);
        }
    }, [debounce,searchValue]);
    const onChangeInput: SearchProps['onChange'] = (value) => {
        const searchValue = value.target.value;
        setSearchValue(searchValue);
    };
    return (
        <>
            <div>
                <Popover
                    content={
                        <div className="popover-search">
                            {data && data.length > 1 ? (
                                <>
                                    <span className="font-medium text-[16px]">Tìm kiếm</span>
                                    {data.map((e: Product) => (
                                        <div className="mb-2" key={e.id}>
                                            <ProductCard product={e} type="forList" />
                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="p-2">
                                    <span className="font-medium text-[16px]">Tìm kiếm gần đây</span>
                                    <ul>
                                        {searchHistory.map((e) => (
                                            <Link
                                                to={`/product?productName=${e}&page=1 `}
                                                className="text-sky-500 block"
                                            >
                                                <p>
                                                    {e} <SearchOutlined />
                                                </p>
                                            </Link>
                                        ))}
                                        <div className="flex items-center bg-cyan-50 mb-3 mt-3">
                                            <div>
                                                <AlertFilled className="text-cyan-400" />
                                            </div>
                                            <span className="pl-2 text-[12px]">
                                                Tăng thời gian phục vụ khách hàng đến 24h00, trở thành chuỗi cửa hàng
                                                bán lẻ Phục vụ khách hàng lâu nhất
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium text-base">Khuyến mãi nổi bật</span>
                                            <div className="m-2">
                                                <a
                                                    className="flex border-b-[1px] border-gray-300 p-3"
                                                    href="/product?categoryId=3&isPromotion=1"
                                                >
                                                    Khuyến Mãi Khi Mua Nhẫn <ThunderboltFilled className="text-[red]" />
                                                </a>
                                                <a
                                                    className="flex border-b-[1px] border-gray-300 p-3"
                                                    href="/product?categoryId=4&isPromotion=1"
                                                >
                                                    Khuyến Mãi Khi Mua Dây Chuyền{' '}
                                                    <ThunderboltFilled className="text-[red]" />
                                                </a>
                                                <a
                                                    className="flex border-b-[1px] border-gray-300 p-3"
                                                    href="/product?categoryId=9&isPromotion=1"
                                                >
                                                    Khuyến Mãi Bông Tai <ThunderboltFilled className="text-[red]" />
                                                </a>
                                                <a className="flex p-3" href="/product?categoryId=2&isPromotion=1">
                                                    Khuyến Mãi Đồng Hồ <ThunderboltFilled className="text-[red]" />
                                                </a>
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
                            loading={search.isPending}
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
