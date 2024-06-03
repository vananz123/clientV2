import { ResponseUser } from '@/api/ResType';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Modal, Space } from 'antd';
import React, { useEffect } from 'react';
import * as userServices from '@/api/userServices';
import { Address } from '@/api/ResType';
import { TypeFormAddress } from '../Purchase';
import AddressForm from '@/conponents/AddressForm';
import { StatusForm } from '@/type';
import { useMutation, useQuery } from '@tanstack/react-query';
interface Props {
    user: ResponseUser;
}
const ProfileAddress: React.FC<Props> = ({ user }) => {
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [open, setOpen] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const { data: addresses, refetch } = useQuery({
        queryKey: [`list-addresses`],
        queryFn: () => userServices.getAddressByUserId(user !== undefined ? user.id : ''),
        enabled: !!user,
    });
    const mutation = useMutation({
        mutationKey: ['del-address'],
        mutationFn: (userId: number) => userServices.deleteAddress(userId),
        onSuccess: () => {
            refetch();
            setOpenDel(false);
        },
    });
    useEffect(() => {
        if (status != 'loading') {
            refetch();
            setOpen(false);
        }
    }, [refetch, status]);
    const handleDelOk = async () => {
        if (typeof currentAddress !== 'undefined') {
            await mutation.mutateAsync(currentAddress.id);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <div>
            <div>
            <p className='font-bold text-base mb-3'>Thông tin địa chỉ</p>
                <div className= 'p-4 rounded bg-[#fafafa] mb-3'>
                    {addresses &&
                        addresses.map((e: Address) => (
                            <>
                                <Flex key={e.id} align="center" justify="space-between">
                                    <Space className='mr-[3px]'>
                                        <div>
                                            <p className='text-[14px] md:text-base'>{e?.phoneNumber}</p>
                                            <p className='text-[14px] md:text-base'>
                                                {e?.streetNumber +
                                                    ', ' +
                                                    e?.wardCommune +
                                                    ', ' +
                                                    e?.urbanDistrict +
                                                    ', ' +
                                                    e.province}
                                            </p>
                                        </div>
                                    </Space>
                                    <Space direction="vertical">
                                        <Button
                                            icon={<EditOutlined />}
                                            onClick={() => {
                                                setCurrentAddressForm(e);
                                                setTypeFormAddress('EDIT');
                                                setOpen(true);
                                            }}
                                        ></Button>
                                        <Button
                                            icon={<DeleteOutlined />}
                                            onClick={() => {
                                                setCurrentAddress(e);
                                                setOpenDel(true);
                                            }}
                                        ></Button>
                                    </Space>
                                </Flex>
                            </>
                        ))}
                </div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    shape="round"
                    size="large"
                    onClick={() => {
                        setCurrentAddressForm(undefined);
                        setTypeFormAddress('ADD');
                        setOpen(true);
                    }}
                ></Button>
            </div>
            <Modal
                title="Notification"
                open={open}
                //onOk={handleOk}
                confirmLoading={mutation.isPending}
                onCancel={handleCancel}
                footer={''}
            >
                <AddressForm
                    typeForm={typeFormAddress}
                    address={currentAddressForm}
                    onSetState={setCurrentAddress}
                    onSetStatus={setStatus}
                />
            </Modal>
            <Modal
                title="Notification"
                open={openDel}
                onOk={handleDelOk}
                confirmLoading={mutation.isPending}
                onCancel={() => {
                    setOpenDel(false);
                }}
            >
                Do you want to detele!
            </Modal>
        </div>
    );
};

export default ProfileAddress;
