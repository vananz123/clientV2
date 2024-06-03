import { ArrowLeftOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Descriptions, Flex, Modal, Row, Space } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as userServices from '@/api/userServices';
import { useAppSelector } from '@/app/hooks';
import { selectUser } from '@/app/feature/user/reducer';
import { Address } from '@/api/ResType';
import type { DescriptionsProps } from 'antd';
import { TypeFormAddress } from '../Purchase';
import AddressForm from '@/conponents/AddressForm';
import { StatusForm } from '@/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import ProfileLoading from './ProfileLoading';
import Container from '@/conponents/Container';
function Profile() {
    const Navigate = useNavigate();
    const user = useAppSelector(selectUser).data;
    //const [currentData, setCurrentData] = React.useState<Order>();
    const [currentAddress, setCurrentAddress] = React.useState<Address>();
    const [currentAddressForm, setCurrentAddressForm] = React.useState<Address>();
    const [open, setOpen] = React.useState(false);
    const [openDel, setOpenDel] = React.useState(false);
    const [status, setStatus] = React.useState<StatusForm>('loading');
    const [typeFormAddress, setTypeFormAddress] = React.useState<TypeFormAddress>('EDIT');
    const {
        data: addresses,
        isLoading,
        refetch,
    } = useQuery({
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
    const GoBack = () => {
        Navigate(-1);
    };
    const desUser: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Name',
            children: <p>{user?.fullName}</p>,
            span: 2,
        },
        {
            key: '2',
            label: 'Email',
            children: <p>{user?.email}</p>,
        },
        {
            key: '3',
            label: 'Phone number',
            children: <p>{user?.phoneNumber}</p>,
        },
    ];
    const handleDelOk = async () => {
        if (typeof currentAddress !== 'undefined') {
            await mutation.mutateAsync(currentAddress.id);
        }
    };
    const handleCancel = () => {
        setOpen(false);
    };
    return (
        <Container>
            <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                size="small"
                style={{ marginBottom: '10px' }}
                onClick={() => {
                    GoBack();
                }}
            >
                Go back
            </Button>
            {isLoading ? (
                <ProfileLoading />
            ) : (
                addresses && (
                    <>
                        <Row gutter={[24, 8]}>
                            <Col xs={24} lg={14}>
                                <Descriptions title="Thông tin tài khoản" size="middle" items={desUser} bordered />
                            </Col>
                            <Col xs={24} lg={10}>
                                <Card title="Thông tin địa chỉ">
                                    <div>
                                        {addresses &&
                                            addresses.map((e: Address) => (
                                                <>
                                                    <Flex key={e.id} align="center" justify="space-between">
                                                        <Space>
                                                            <div>
                                                                <p>{e?.phoneNumber}</p>
                                                                <p>
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
                                </Card>
                            </Col>
                        </Row>
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
                    </>
                )
            )}
        </Container>
    );
}
export default Profile;
