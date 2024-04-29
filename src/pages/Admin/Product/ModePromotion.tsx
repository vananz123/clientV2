import { Alert, Modal, Select, SelectProps } from 'antd';
import { Product } from './ProductList';
import React, { SetStateAction, useEffect } from 'react';
import * as promotionServices from '@/api/promotionServices';
import * as productServices from '@/api/productServices';
import { Promotion } from '@/api/ResType';
export type ModePromotionType = 'EDIT' | 'DEL';
import { Button, notification, Skeleton, Space } from 'antd';
import dayjs from 'dayjs';
type NotificationType = 'success' | 'error';
const ModePromotion: React.FC<{
    open: boolean;
    setStateOpen: SetStateAction<any>;
    setStateData: SetStateAction<any>;
    modePromotion: ModePromotionType;
    listSelectRow: Product[] | [];
}> = ({ open, setStateOpen, modePromotion, listSelectRow ,setStateData}) => {
    const [confirmLoading, setConfirmLoading] = React.useState(false);
    const [option, setOption] = React.useState<SelectProps['options']>([]);
    const [currentId,setCurrentId] =React.useState<number>(0)
    const [data, setData] = React.useState<Promotion[]>([]);
    const [modalText, setModalText] = React.useState('Do you want delete!');
    const [api, contextHolder] = notification.useNotification();
    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess update!' : 'error',
        });
    };
    const loadAllProduct = async () => {
        const res = await productServices.getAllProduct();
        if (res.isSuccessed == true) {
            const arrSort: Product[] = res.resultObj.sort((a: Product, b: Product) => {
                let aa = new Date(a.dateCreated).getTime();
                let bb = new Date(b.dateCreated).getTime();
                return bb - aa;
            });
            setStateData(arrSort)
        }
    };
    const getPromotion = async () => {
        const res = await promotionServices.getAllPromotionByType('promotion');
        if (res.isSuccessed === true) {
            let arr: SelectProps['options'] = [];
            res.resultObj.forEach((element: Promotion) => {
                var item = {
                    label: `${element.name}, ${dayjs(element.startDate).format('MM-DD-YYYY')}, ${dayjs(element.endDate).format('MM-DD-YYYY')}`,
                    value: element.id,
                };
                arr.push(item);
            });
            setOption(arr);
        }
    };
    
    useEffect(() => {
        getPromotion();
    }, [modePromotion]);
    const handleChange = (value:string)=>{
        setCurrentId(Number(value))
    }
    const handleOk = async () => {
        setConfirmLoading(true)
        if(modePromotion =='EDIT'){
            if(currentId != 0){
                const res = await promotionServices.AssginPromotionForProduct(currentId,listSelectRow)
                if(res.isSuccessed ===true){
                    setStateOpen(false)
                    loadAllProduct()
                    setConfirmLoading(false)
                    openNotificationWithIcon('success')
                }else{
                    setConfirmLoading(false)
                    openNotificationWithIcon('error')
                }
            }else{
                openNotificationWithIcon('error')
                setConfirmLoading(false)
            }
            
        }else{
            const res = await promotionServices.AssginPromotionForProduct(0,listSelectRow)
            if(res.isSuccessed ===true){
                setStateOpen(false)
                    loadAllProduct()
                openNotificationWithIcon('success')
            }else{
                openNotificationWithIcon('error')
            }
            setConfirmLoading(false)
        }
    };
    return (
        <div>
            {contextHolder}
            <Modal
                title="Delete"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => setStateOpen(false)}
            >
                {modePromotion == 'EDIT' ? (
                    <>
                        <Select onChange={handleChange} style={{ width: '100%' }} options={option} />
                    </>
                ) : (
                    'del'
                )}
            </Modal>
        </div>
    );
};
export default ModePromotion;
