import { OptionPrice ,OptionBase,OptionSort} from "@/type";
import { SelectProps } from "antd";
export const FORM_ITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

export const TAIL_FORM_ITEM_LAYOUT = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};
export const OPTIONS_STATUS: SelectProps['options'] = [
    {
        value: 0,
        label: 'InActive',
    },
    {
        value: 1,
        label: 'Active',
    },
    {
        value: 2,
        label: 'UnActive'
    }
];
export const OPTIONS_PRODUCT_STATUS: SelectProps['options'] = [
    {
        value: 0,
        label: 'InActive',
    },
    {
        value: 1,
        label: 'Active',
    },
    {
        value: 2,
        label: 'New',
    },
    {
        value: 3,
        label: 'Hot',
    },
    {
        value: 4,
        label: 'Sale',
        disabled: true,
    },
    {
        value: 5,
        label: 'UnActive',
    },
];

export const OPTIONS_PRICE: OptionPrice[] = [
    {label:"Dưới 2 triệu",value:1},
    {label:"2 triệu đến 6 triệu",value:2},
    {label:"6 triệu đến 10 triệu",value:3},
    {label:"Trên 10 triệu",value:4},
];
export const OPTIONS_MATERIAL :OptionBase[]= [
    {label:"AL",value:"AL"},
    {label:"ROLEX",value:"ROLEX"},
    {label:"PNJ",value:"PNJ"},
    {label:"Seiko",value:"Seiko"}
]
export const OPTIONS_SORT : OptionSort[]=[
    {
        value: 'ascending',
        label: 'Acending',
    },
    {
        value: 'descending',
        label: 'Decrease',
    }
]