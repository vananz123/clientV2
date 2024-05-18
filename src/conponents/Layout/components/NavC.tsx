import { Menu, MenuProps } from "antd";
import { useAppSelector } from "@/app/hooks";
import { selectCate } from "@/feature/category/cateSlice";
import { Link, useLocation, useNavigate  } from "react-router-dom";
import { Category } from "@/type";
import React from "react";
type MenuItem = Required<MenuProps>['items'][number];
function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const NavC:React.FC = ()=>{
    const cate = useAppSelector(selectCate)
    const loca = useLocation()
    const arr = [loca.pathname]
    const Navigate  =useNavigate()
    function renderSubCateItem (_cate: Category[]){
        const arr:MenuItem[] =[]
        _cate.forEach((element:Category) => {
            const item = getItem(element.name,`/product/${element.id}`)
            arr.push(item)
        });
        return arr
    }
    function renderCateItem () {
        const arr:MenuItem[] =[]
        cate.forEach((element:Category) => {
            const item = getItem(<><Link style={{color:'black'}} to={`/product/${element.id}`}>{element.name}</Link></>,`/product/${element.id}`,'',renderSubCateItem(element.subCategory))
            arr.push(item)
        });
        return arr
    }
   
    const item:MenuProps['items'] = [...renderCateItem(),getItem('Khuyến mãi','/product/promotion')]
    const handleClick: MenuProps['onClick'] = (e) =>{
        Navigate(`${e.key}`)
    }
    return (
        <>
            <Menu
                theme='light'
                mode="horizontal"
                selectedKeys={arr}
                items={item}
                style={{ flex: 1, minWidth: 0 ,marginLeft:0}}
                onClick={handleClick}
            />
        </>
    );
}
export default NavC;