/* eslint-disable @typescript-eslint/no-explicit-any */
import { Filter, Sort } from '@/type';
import { Checkbox, Flex, Select, Space, Tooltip } from 'antd';
import { OPTIONS_PRICE, OPTIONS_MATERIAL, OPTIONS_SORT } from '@/common/common';
import React from 'react';
import { ArrayToString } from '@/utils/utils';
interface Props {
    filter: Filter;
    setQueryString: (name: string, value: string) => void;
    removeQueryString: (name: string) => void;
}
const ProductFilter: React.FC<Props> = ({ filter, setQueryString, removeQueryString }) => {
    const handleChangeSort = (value: Sort) => {
        setQueryString('sortOder', value);
    };
    const onChangeOpPrice = (value: any[]) => {
        if (typeof value !== 'undefined') {
            removeQueryString('page');
            const valueQuery = ArrayToString(value);
            setQueryString('optionPrice', valueQuery);
        }
    };
    const onChangeOpSize = (value: string[]) => {
        if (typeof value !== 'undefined') {
            removeQueryString('page');
            const valueQuery = ArrayToString(value);
            setQueryString('optionMaterial', valueQuery);
        }
    };
    const onChangePromotion = () => {
        if (filter.isPromotion) {
            const isPromotion: string = filter.isPromotion ? '0' : '1';
            removeQueryString('page');
            setQueryString('isPromotion', isPromotion);
        } else {
            removeQueryString('page');
            setQueryString('isPromotion', '1');
        }
    };
    interface ItemProps {
        label: string;
        value: string;
    }
    const options: ItemProps[] = [];
    if (filter.optionPrice && filter.optionMaterial) {
        const combinedArray = filter.optionPrice.map((number) => number.toString()).concat(filter.optionMaterial);
        options.push({
            label: `${combinedArray}`,
            value: `${combinedArray}`,
        });
    } else if (filter.optionPrice) {
        options.push({
            label: `${filter.optionPrice}`,
            value: `${filter.optionPrice}`,
        });
    } else {
        if (filter.optionMaterial) {
            options.push({
                label: `${filter.optionMaterial}`,
                value: `${filter.optionMaterial}`,
            });
        }
    }
    console.log(options);
    return (
        <div>
            {filter.optionPrice || filter.optionMaterial ? (
                <Space>
                    <Select mode="multiple" className="w-full mb-1" value={options} options={options} onChange={onChangeOpPrice} />
                </Space>
            ) : (
                ''
            )}
            <Flex justify="space-between" gap={16} style={{ marginBottom: '20px' }}>
                <Space wrap style={{ width: '100%' }}>
                    <Select
                        mode="multiple"
                        style={{ width: 250 }}
                        options={OPTIONS_PRICE}
                        value={filter.optionPrice}
                        placeholder="Price"
                        maxTagCount="responsive"
                        onChange={onChangeOpPrice}
                    />
                    {/* <Select
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
                    /> */}
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
                    <Checkbox checked={filter.isPromotion} style={{ width: 150 }} onChange={onChangePromotion}>
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
        </div>
    );
};

export default ProductFilter;
