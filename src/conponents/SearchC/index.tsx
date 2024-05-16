/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from '@/hooks';
import { Input, Popover, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, { SetStateAction, useEffect, useRef } from 'react';
import { Product } from '@/type';
import { Link, useNavigate } from 'react-router-dom';
import { Filter } from '@/pages/ProductListShow/FilterType';
const SearchC: React.FC<{
    typeSearch: number;
    onSetState: SetStateAction<any>;
}> = ({ onSetState }) => {
    const { Search } = Input;
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();
    const [data, setData] = React.useState<Product[]>();
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 1000 });
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            navigate(`/product/${value}`);
        }
        if (info?.source == 'clear') {
            setData([]);
            onSetState([]);
        }
    };
    const onChangeInput: SearchProps['onChange'] = (value) => {
        setSearchValue(value.target.value);
    };
    useEffect(() => {
        const Search = async () => {
            if (debounce != '') {
                const filter: Filter = {
                    page: 1,
                    pageSize: 5,
                    sortOder: 'ascending',
                    productName: debounce?.toString(),
                };
                const result = await productServices.getProductPagingByFilter(filter);
                if (result.statusCode == 200) {
                    setData(result.resultObj.items);
                    onSetState(result.resultObj.items);
                }
            }
        };
        Search();
    }, [debounce]);
    return (
        <>
            <Popover
                content={
                    <div style={{ height: 300, width: 300, overflowX: 'hidden' }}>
                        {data && data.length > 1 ? (
                            <>
                                {data.map((e: Product) => (
                                    <div>
                                        <Link to={`product/detail/${e.id}`}>
                                            <Space>
                                                <div>
                                                    <img style={{ width: 70 }} src={baseUrl + e.urlThumbnailImage} />
                                                </div>
                                                <div style={{ width: 200 }}>
                                                    <p>{e.seoTitle}</p>
                                                    <p>{ChangeCurrence(e.price)}</p>
                                                </div>
                                            </Space>
                                        </Link>
                                        <hr />
                                    </div>
                                ))}
                                <div style={{ textAlign: 'center' }}>
                                    <Link to={`/product/${searchValue}`}>Hiển thị tất cả</Link>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>Not found</div>
                        )}
                    </div>
                }
                title={'Tìm kiếm'}
                trigger={'click'}
            >
                <Search
                    placeholder="Tên sản phẩm"
                    style={{ display: 'block' }}
                    allowClear
                    //enterButton="Search"
                    ref={inputRef}
                    size="middle"
                    onSearch={onSearch}
                    onChange={onChangeInput}
                />
            </Popover>
        </>
    );
};
const ChangeCurrence = (number: number | undefined) => {
    if (number) {
        const formattedNumber = number.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            currencyDisplay: 'code',
        });
        return formattedNumber;
    }
    return 0;
};
export default SearchC;
