import { useDebounce } from '@/hooks';
import { Input, Popover, Space } from 'antd';
import { useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, { SetStateAction, useEffect, useRef } from 'react';
import { Product } from '@/pages/Admin/Product/ProductList';
import { BaseUrl } from '@/utils/request';
import { Link, Navigate, useNavigate } from 'react-router-dom';
enum status {
    productName = 1,
    categoryName = 2,
}
const SearchC: React.FC<{
    typeSearch: number;
    onSetState: SetStateAction<any>;
}> = ({ typeSearch, onSetState }) => {
    const { Search } = Input;
    const baseUrl: BaseUrl = 'https://localhost:7005';
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();
    const [data, setData] = React.useState<Product[]>([]);
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
                const result = await productServices.getProductPagingBySeoTitle(debounce, 1, 100);
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
                    <>
                        {data.length > 0 ? (
                            data?.map((e: Product) => (
                                <div>
                                    <Link to={`product/detail/${e.id}`}>
                                        <Space>
                                            <div>
                                                <img style={{ width: 70 }} src={baseUrl + e.urlThumbnailImage} />
                                            </div>
                                            <div>
                                                <p>{e.seoTitle}</p>
                                                <p>{ChangeCurrence(e.price)}</p>
                                            </div>
                                        </Space>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div style={{ width: 350, height: 70, textAlign: 'center' }}>Not found</div>
                        )}
                        {searchValue != '' ? (
                            <div style={{ width: 350, textAlign: 'center' }}>
                                <Link to={`/product/${searchValue}`}>Hiển thị tất cả</Link>
                            </div>
                        ) : (
                            ''
                        )}
                    </>
                }
                title={'search'}
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
