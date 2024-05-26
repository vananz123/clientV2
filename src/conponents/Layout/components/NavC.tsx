/* eslint-disable @typescript-eslint/no-explicit-any */
import { Menu, MenuProps } from 'antd';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectCategories } from '@/app/feature/category/reducer';
import { useLocation, useNavigate } from 'react-router-dom';
import { Category } from '@/type';
import React, { SetStateAction, useCallback, useEffect } from 'react';
import { loadCategories } from '@/app/feature/category/action';
import SkeletonCard from '@/conponents/SkeletonCard';
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}
type ResponsiveType = 'forMobile' | 'forDesktop';
interface Props {
    type?: ResponsiveType;
    closeDrawer?: SetStateAction<any>;
}
const NavC: React.FC<Props> = ({ type = 'forDesktop', closeDrawer }) => {
    const loca = useLocation();
    const arr = [loca.pathname];
    const Navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { isLoading, data } = useAppSelector(selectCategories);
    useEffect(() => {
        dispatch(loadCategories());
    }, [dispatch]);
    const renderSubCateItem = (_cate: Category[]) => {
        const arr: MenuItem[] = [];
        _cate.forEach((element: Category) => {
            const item = getItem(element.name, `/product/${element.id}`);
            arr.push(item);
        });
        return arr;
    };
    const renderCateItem = () => {
        const arr: MenuItem[] = [];
        if (data) {
            data.forEach((element: Category) => {
                const item = getItem(
                    <>
                        <a
                            onClick={() => {
                                Navigate(`/product/${element.id}`);
                                handleCloseDrawer();
                            }}
                            style={{ color: 'black' }}
                        >
                            {element.name}
                        </a>
                    </>,
                    `/product/${element.id}`,
                    '',
                    renderSubCateItem(element.subCategory),
                );
                arr.push(item);
            });
        }

        return arr;
    };
    const item: MenuProps['items'] = [...renderCateItem(), getItem('Khuyến mãi', '/product/promotion')];
    const handleCloseDrawer = useCallback(() => {
        closeDrawer(false);
    }, [closeDrawer]);
    const handleClick: MenuProps['onClick'] = (e) => {
        Navigate(`${e.key}`);
        handleCloseDrawer();
    };
    return (
        <>
            {isLoading ? (
                <div style={{ width: 70, display: 'flex', justifyContent: 'start', alignItems: 'center', gap: 10 }}>
                    <SkeletonCard style={{ width: 150, height: 50 }} />
                    <SkeletonCard style={{ width: 150, height: 50 }} />
                    <SkeletonCard style={{ width: 150, height: 50 }} />
                </div>
            ) : (
                data && (
                    <Menu
                        theme="light"
                        mode={type === 'forDesktop' ? 'horizontal' : 'inline'}
                        selectedKeys={arr}
                        items={item}
                        style={{ flex: 1, minWidth: 0 ,marginLeft:0}}
                        onClick={handleClick}
                    />
                )
            )}
        </>
    );
};
export default NavC;
