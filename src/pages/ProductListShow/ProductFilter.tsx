/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter, Sort } from '@/type';
import { Checkbox, Flex, Select, Space, Tooltip } from 'antd';
import { OPTIONS_PRICE, OPTIONS_MATERIAL, OPTIONS_SORT } from '@/common/common';
import React from 'react';
import { ArrayToString } from '@/utils/utils';
interface Props {
    filter: Filter;
    setQueryString: (name: string, alue: string) => void;
    removeQueryString:(name: string) => void;
}
const ProductFilter: React.FC<Props> = ({ filter, setQueryString,removeQueryString }) => {
    const handleChangeSort = (value: Sort) => {
        setQueryString('sortOder', value);
    };
    const onChangeOpPrice = (value: number[]) => {
        if (typeof value !== 'undefined') {
            removeQueryString('page')
            const valueQuery = ArrayToString(value);
            setQueryString('optionPrice', valueQuery);
        }
    };
    const onChangeOpSize = (value: string[]) => {
        if (typeof value !== 'undefined') {
            removeQueryString('page')
            const valueQuery = ArrayToString(value);
            setQueryString('optionMaterial', valueQuery);
        }
    };
    const onChangePromotion = () => {
        if (filter.isPromotion) {
            const isPromotion: string = filter.isPromotion ? '0' : '1';
            removeQueryString('page')
            setQueryString('isPromotion', isPromotion);
        } else {
            removeQueryString('page')
            setQueryString('isPromotion', '1');
        }
    };
    return (
        <Flex justify="space-between" gap={16} style={{ marginBottom: '10px' }}>
            <Space wrap>
                <Select
                    mode="multiple"
                    style={{ width: 150 }}
                    options={OPTIONS_PRICE}
                    autoFocus={false}
                    showSearch={false}
                    value={filter.optionPrice}
                    onChange={onChangeOpPrice}
                    placeholder="Price"
                    maxTagCount="responsive"
                    maxTagPlaceholder={(omittedValues) => (
                        <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                            <span>Hover Me</span>
                        </Tooltip>
                    )}
                />
                <Select
                    mode="multiple"
                    style={{ width: 150 }}
                    autoFocus={false}
                    showSearch={false}
                    options={OPTIONS_MATERIAL}
                    value={filter.optionMaterial}
                    onChange={onChangeOpSize}
                    placeholder="Brand"
                    maxTagCount="responsive"
                    maxTagPlaceholder={(omittedValues) => (
                        <Tooltip title={omittedValues.map(({ label }) => label).join(', ')}>
                            <span>Hover Me</span>
                        </Tooltip>
                    )}
                />
                <Checkbox checked={filter.isPromotion} style={{ width: 120 }} onChange={onChangePromotion}>
                    Có khuyến mãi
                </Checkbox>
            </Space>
            <Select
                value={filter.sortOder}
                autoFocus={false}
                style={{ width: 125 }}
                onChange={handleChangeSort}
                options={OPTIONS_SORT}
            />
        </Flex>
    );
};

export default ProductFilter;
