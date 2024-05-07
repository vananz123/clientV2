import { Menu, MenuProps } from "antd";
import { useAppSelector } from "@/app/hooks";
import { selectCate } from "@/feature/category/cateSlice";
import { useLocation, useNavigate  } from "react-router-dom";
import { Category } from "@/type";
import React from "react";
import Logo from '/L.png'
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
            const item = getItem(element.name,`product/${element.id}`)
            arr.push(item)
        });
        return arr
    }
    function renderCateItem () {
        const arr:MenuItem[] =[]
        cate.forEach((element:Category) => {
            const item = getItem(element.name,`product/${element.id}`,'',renderSubCateItem(element.subCategory))
            arr.push(item)
        });
        return arr
    }
    //const item:MenuProps['items'] = [getItem('Trang chủ','/home'),getItem('Khuyến mãi','/product/promotion'),getItem('Danh mục','cate','',renderSubItem())]
    const item:MenuProps['items'] = [...renderCateItem(),getItem('Khuyến mãi','/product/promotion')]
    const handleClick: MenuProps['onClick'] = (e) =>{
        Navigate(`${e.key}`)
    }
    return (
        <>
            <div className="demo-logo" style={{width:100,height:64}}>
                <a href="/home">
                    <img style={{width:'100%',height:'100%'}} src={Logo}/>    
                </a>    
            </div>
            <Menu
              theme='light'
              mode="horizontal"
              selectedKeys={arr}
              items={item}
              style={{ flex: 1, minWidth: 0 }}
              onClick={handleClick}
            />
        </>
    );
}
export default NavC;