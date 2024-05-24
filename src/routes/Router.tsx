import { lazy } from 'react';
import Dashboard from '@/pages/Admin/Dashboard';
import Home from '@/pages/Home';
import ProductListShow from '@/pages/ProductListShow';
import { ProductList, ProductEdit, ProductAdd } from '@/pages/Admin/Product';
import { CategoriesList, CategoryEdit, CategoryAdd } from '@/pages/Admin/Category';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ProductDetail from '@/pages/ProductDetail';
import { useRoutes } from 'react-router-dom';
import DefaultLayout from '@/conponents/Layout/DefaultLayout';
import AdminLayout from '@/conponents/Layout/AdminLayout';
import AuthGuard from './AuthGuard';
import GuestGuard from './GuestGuard';
import RoleGuard from './RoleGuard';
import Profile from '@/pages/Profile';
import Cart from '@/pages/Cart';
import Purchase from '@/pages/Purchase';
import Checkout from '@/pages/Pay/Checkout';
import CheckoutVnpay from '@/pages/Pay/CheckoutVnpay';
import { OrderConfirm, OrderList } from '@/pages/Admin/Order';
import UserOrderDetail from '@/pages/UserOrderDetail';
import { PromotionAdd, PromotionEdit, PromotionList } from '@/pages/Admin/Promotion';
const ForgotPassword = lazy(()=> import('@/pages/ForgotPassword'))
import UserList from '@/pages/Admin/User/UserList';
import { GuarantiesAdd, GuarantiesList, GuarantiesEdit } from '@/pages/Admin/Guaranty';
const Page404 = lazy(()=> import('@/pages/Page404/Page404'))
const Router: React.FC = () => {
    return useRoutes([
        {
            path: 'auth',
            children: [
                {
                    path: 'reset-password',
                    element: (
                        <GuestGuard>
                            <ForgotPassword />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'login',
                    element: (
                        <GuestGuard>
                            <Login />
                        </GuestGuard>
                    ),
                },
                {
                    path: 'register',
                    element: (
                        <GuestGuard>
                            <Register />
                        </GuestGuard>
                    ),
                },
            ],
        },
        {
            path: '*',
            element: <DefaultLayout />,
            children: [{ path: '*', element: <Page404/> }],
        },
        {
            path: '/',
            element: <DefaultLayout />,
            children: [
              
                {
                    path: '/',
                    element: <Home />,
                },
                {
                    path: 'cart',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Cart />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'purchase',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Purchase />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product/',
                    element: <ProductListShow />,
                },
                {
                    path: 'product/:id',
                    element: <ProductListShow />,
                },
                {
                    path: 'product/detail/:id',
                    element: <ProductDetail />,
                },
                {
                    path: 'profile',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <Profile />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'profile/order-detail/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['customer']}>
                                <UserOrderDetail />
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
        {
            path: 'admin',
            element: <AdminLayout />,
            children: [
                {
                    path: '/admin',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <Dashboard />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <ProductList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <ProductAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'product-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <ProductEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'categories',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <CategoriesList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <CategoryAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'category-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <CategoryEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <OrderList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'order/detail/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <OrderConfirm />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <PromotionList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <PromotionAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'promotion-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <PromotionEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranties',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <GuarantiesList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranties-add',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <GuarantiesAdd />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'guaranties-edit/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin']}>
                                <GuarantiesEdit />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'user',
                    element: (
                        <AuthGuard>
                            <RoleGuard role={['admin', 'sale']}>
                                <UserList />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
            ],
        },
    ]);
};
export default Router;
