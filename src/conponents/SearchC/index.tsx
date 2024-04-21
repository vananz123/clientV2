import { useDebounce } from '@/hooks';
import { Input } from 'antd';
import { useAppSelector } from '@/app/hooks';
import { selectCate } from '@/feature/category/cateSlice';
import type { SearchProps } from 'antd/es/input/Search';
import * as productServices from '@/api/productServices';
import type { InputRef } from 'antd';
import React, { SetStateAction, useEffect, useRef } from 'react';
enum status {
    productName = 1,
    categoryName = 2,
}
const SearchC: React.FC<{
    typeSearch: number;
    onSetState: SetStateAction<any>;
    
}> = ({ typeSearch, onSetState }) => {
    const { Search } = Input;
    const [searchValue, setSearchValue] = React.useState('');
    const cate = useAppSelector(selectCate);
    const inputRef = useRef<InputRef>(null);
    const debounce = useDebounce({ value: searchValue, deplay: 1000 });
    const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
        if (info?.source == 'input') {
            if (status.productName == typeSearch) {
                const result = await productServices.productSearch(value);
                if (result.statusCode == 200) {
                    onSetState(result.resultObj);
                }
            }
            if (status.categoryName == typeSearch) {
                console.log(cate);
                const result = cate.filter((x) => x.name.includes(value) == true);
                onSetState(result);
            }
        }
        if (info?.source == 'clear') {
            if (status.productName == typeSearch) {
                const result = await productServices.getAllProduct();
                if (result.statusCode == 200) {
                    onSetState(result.resultObj);
                }
            }
        }
    };
    const onChangeInput: SearchProps['onChange'] = (value) => {
        setSearchValue(value.target.value);
    };
    useEffect(() => {
        const Search = async () => {
            if (debounce != '') {
                if (status.productName == typeSearch) {
                    const result = await productServices.productSearch(debounce);
                    if (result.statusCode == 200) {
                        onSetState(result.resultObj);
                    }
                }
            } else {
                if (status.productName == typeSearch) {
                    const result = await productServices.getAllProduct();
                    if (result.statusCode == 200) {
                        onSetState(result.resultObj);
                    }
                }
            }
        };
        Search();
    }, [debounce]);
    return (
        <>
            <Search
                placeholder="name"
                style={{ width: '400px' }}
                allowClear
                //enterButton="Search"
                ref={inputRef}
                size="large"
                onSearch={onSearch}
                onChange={onChangeInput}
            />
        </>
    );
};
export default SearchC;
