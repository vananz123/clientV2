import React, { useEffect } from 'react';
import {  notification } from 'antd';
type NotificationType = 'success' | 'error';
import { useParams } from 'react-router-dom';
import { StatusForm } from '../Category/Type';
import { Guaranty } from '@/type';
import GuarantyForm from '@/conponents/GuarantyForm';
import * as guarantyServices from '@/api/guarantyServices'
import dayjs, { Dayjs } from 'dayjs';
function GuarantiesEdit() {
    const { id } = useParams();
    const [guaranty, setGuaranty] = React.useState<Guaranty>();
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type: NotificationType) => {
        api[type]({
            message: 'Notification Title',
            description: type == 'success' ? 'Sucsess update!' : 'error',
        });
    };
    useEffect(() => {
        if (status == 'success') {
            if (guaranty != undefined) {
                const getGuaranty = async () => {
                    // lấy guaranty theo id
                    const res = await guarantyServices.getGuarantyById(Number(id));
                    if (res.isSuccessed === true) {
                        const arr: Dayjs[] = []
                        // arr.push(dayjs(res.resultObj?.startDate))
                        // arr.push(dayjs(res.resultObj?.endDate))
                        setGuaranty(res.resultObj);
                    }
                };
                getGuaranty()
                openNotificationWithIcon('success');
            }
        }
        if (status == 'success') {
            if (typeof guaranty !== 'undefined') openNotificationWithIcon('success');
        }
        if (status == 'error') {
            openNotificationWithIcon('error');
        }
        setStatus('loading')
    }, [status]);

    return (
        <>
            {contextHolder}
            <GuarantyForm guaranty={guaranty} onSetState={setGuaranty} onSetStatus={setStatus} />
        </>
    );
}

export default GuarantiesEdit;
