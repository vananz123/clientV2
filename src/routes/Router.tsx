import Dashboard from '@/pages/Admin/Dashboard';
import Home from '@/pages/Home';
import ProductListShow from '@/pages/ProductListShow';
import { ProductList, ProductEdit, ProductAdd } from '@/pages/Admin/Product';
import { CategoriesList, CategoryEdit, CategoryAdd } from '@/pages/Admin/Category';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ProductDetail from '@/pages/ProductDetail';
import { useRoutes, Navigate } from 'react-router-dom';
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
import ProductListSearch from '@/pages/ProductListSearch';
import UserOrderDetail from '@/pages/UserOrderDetail';
import { PromotionAdd, PromotionEdit, PromotionList } from '@/pages/Admin/Promotion';
import ForgotPassword from '@/pages/ForgotPassword';
import UserList from '@/pages/Admin/User/UserList';
const Router: React.FC<{}> = () => {
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
            path: '/',
            element: <DefaultLayout />,
            children: [
                {
                    index: true,
                    element: <Navigate to={'/'} replace />,
                },
                {
                    path: "/home",
                    element: <Home />,
                },
                {
                    path: 'cart',
                    element: (
                        <AuthGuard>
                            <RoleGuard role="customer">
                                <Cart />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'purchase',
                    element: (
                        <AuthGuard>
                            <RoleGuard role="customer">
                                <Purchase />
                            </RoleGuard>
                        </AuthGuard>
                    ),
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
                    path: 'product/search/:keyword',
                    element: <ProductListSearch />,
                },
                {
                    path: 'profile',
                    element: (
                        <AuthGuard>
                            <RoleGuard role="customer">
                                <Profile />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },{
                    path: 'profile/order-detail/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role="customer">
                                <UserOrderDetail />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'checkout/:id',
                    element: (
                        <AuthGuard>
                            <RoleGuard role="customer">
                                <Checkout />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                },
                {
                    path: 'checkout-vnpay',
                    element: (
                        <AuthGuard>
                            <RoleGuard role="customer">
                                <CheckoutVnpay />
                            </RoleGuard>
                        </AuthGuard>
                    ),
                }
            ],
        },
        {
            path: 'admin',
            element: (
                <AuthGuard>
                    <RoleGuard role="admin">
                        <AdminLayout />
                    </RoleGuard>
                </AuthGuard>
            ),
            children: [
                {
                    index: true,
                    element: <Navigate to={'/admin'} replace />,
                },
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                },
                {
                    path: 'product',
                    element: <ProductList />,
                },
                {
                    path: 'product-add',
                    element: <ProductAdd />,
                },
                {
                    path: 'product-edit/:id',
                    element: <ProductEdit />,
                },
                {
                    path: 'categories',
                    element: <CategoriesList />,
                },
                {
                    path: 'category-add',
                    element: <CategoryAdd />,
                },
                {
                    path: 'category-edit/:id',
                    element: <CategoryEdit />,
                },
                {
                    path: 'order',
                    element: <OrderList />,
                },
                {
                    path: 'order/detail/:id',
                    element: <OrderConfirm />,
                },{
                    path: 'promotion',
                    element: <PromotionList />,
                },{
                    path: 'promotion-add',
                    element: <PromotionAdd />,
                },{
                    path: 'promotion-edit/:id',
                    element: <PromotionEdit />,
                },{
                    path: 'user',
                    element: <UserList />,
                }
            ],
        },
    ]);
};
export default Router;
