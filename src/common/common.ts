import { OptionPrice ,OptionBase,OptionSort} from "@/type";
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


import { Autoformat } from '@ckeditor/ckeditor5-autoformat';
import { BlockQuote } from '@ckeditor/ckeditor5-block-quote';
import { CloudServices } from '@ckeditor/ckeditor5-cloud-services';
import { Heading } from '@ckeditor/ckeditor5-heading';
import { Image, ImageCaption, ImageStyle } from '@ckeditor/ckeditor5-image';
import { Indent } from '@ckeditor/ckeditor5-indent';
import { Link } from '@ckeditor/ckeditor5-link';
import { List } from '@ckeditor/ckeditor5-list';
import { PasteFromOffice } from '@ckeditor/ckeditor5-paste-from-office';
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import { TextTransformation } from '@ckeditor/ckeditor5-typing';
import { Undo } from '@ckeditor/ckeditor5-undo';
import { Essentials } from '@ckeditor/ckeditor5-essentials';
import { Bold, Italic } from '@ckeditor/ckeditor5-basic-styles';
import { Paragraph } from '@ckeditor/ckeditor5-paragraph';
export const editorConfiguration = {
    plugins: [
        Autoformat,
        BlockQuote,
        Bold,
        CloudServices,
        Essentials,
        Heading,
        Image,
        ImageCaption,
        ImageStyle,
        Indent,
        Italic,
        Link,
        List,
        Paragraph,
        PasteFromOffice,
        Table,
        TableToolbar,
        TextTransformation,
        Undo,
    ],
    toolbar: {
        items: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
        ],
    },
    language: 'en',
    table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
    },
};
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
export const OPTIONS_PROMOTION_TYPE = [{ label: 'percentage', value: 'percentage' },{ label: 'fixed', value: 'fixed' }];