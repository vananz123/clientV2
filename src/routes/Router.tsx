import React, { Suspense, lazy } from 'react';
const Home = lazy(() => import('@/pages/Home'));
const ProductListShow = lazy(() => import('@/pages/ProductListShow'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const ProductDetail = lazy(() => import('@/pages/ProductDetail'));
import { useRoutes } from 'react-router-dom';
import DefaultLayout from '@/conponents/Layout/DefaultLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import RoleGuard from './RoleGuard';
const Profile = lazy(() => import('@/pages/Profile'));
const Cart = lazy(() => import('@/pages/Cart'));
const Purchase = lazy(()=> import('@/pages/Purchase'));
import Checkout from '@/pages/Pay/Checkout';
import CheckoutVnpay from '@/pages/Pay/CheckoutVnpay';
const UserOrderDetail = lazy(() => import('@/pages/UserOrderDetail'));
const UserOrderList = lazy(() => import('@/pages/UserOrderList'));
const ForgotPassword = lazy(() => import('@/pages/ForgotPassword'));
const Page404 = lazy(() => import('@/pages/Page404/Page404'));
const Router: React.FC = () => {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'reset-password',
                    element: (
                        <GuestGuard>
                            <Suspense>
                                {' '}
                                <ForgotPassword />
                            </Suspense>
                        </GuestGuard>
                    ),
                },
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Suspense>
                                {' '}
                                <Login />
                            </Suspense>
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <Suspense>
                                {' '}
                                <Register />
                            </Suspense>
                        </GuestGuard>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: <DefaultLayout />,
            children: [{ path: '*', element: <Page404 /> }],
        },
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    path: '/',
                    element: (
                        <Suspense>
                            <Home />
                        </Suspense>
                    ),
                },
                {
                    path: 'cart',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    <Cart />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'purchase',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                               <Suspense> <Purchase /></Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product/',
                    element: (
                        <Suspense>
                            <ProductListShow />
                        </Suspense>
                    ),
                },
                {
                    path: 'product/:id',
                    element: (
                        <Suspense>
                            <ProductListShow />
                        </Suspense>
                    ),
                },
                {
                    path: 'product/detail/:id',
                    element: (
                        <Suspense>
                            <ProductDetail />
                        </Suspense>
                    ),
                },
                {
                    path: 'profile',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    {' '}
                                    <Profile />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    {' '}
                                    <UserOrderList />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order/detail/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Suspense>
                                    {' '}
                                    <UserOrderDetail />
                                </Suspense>
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'checkout/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Checkout />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'checkout-vnpay',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <CheckoutVnpay />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
            ],
        },
    ]);
};
export default Router;
