import { OptionPrice ,OptionBase,OptionSort, OptionTime} from "@/type";
import { SelectProps } from "antd";
export const FORM_ITEM_LAYOUT = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
    },
};

export const TAIL_FORM_ITEM_LAYOUT = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 18,
            offset: 6,
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
    {label:"Seiko",value:"Seiko"},
    {label:"PNJSilver",value:"PNJSilver"}
]
export const OPTIONS_SORT : OptionSort[]=[
    {
        value: 'ascending',
        label: 'Giá tăng dần',
    },
    {
        value: 'descending',
        label: 'Giá giảm dần',
    }
]
export const OPTIONS_TIME : OptionTime[] = [
    {
        value:9,
        label:'from'
    },
    {
        value:21,
        label:'to'
    }
]
export const OPTIONS_SKU: SelectProps['options'] = [
    {
        value: 'cm',
        label: 'CM',
    },
    {
        value: 'size',
        label: 'Size',
    },
];
export const STATUS_ORDER = [
    {
        key: 'Đang xử lý',
        label: 'Đang xử lý',
    },
    {
        key: 'Đã tiếp nhận',
        label: 'Đã tiếp nhận',
    },
    {
        key: 'Đã hoàn thành',
        label: 'Đã hoàn thành',
    },
    {
        key: 'Đã hủy',
        label: 'Đã hủy',
    },
    {
        key: 'Trả hàng',
        label: 'Trả hàng',
    },
];