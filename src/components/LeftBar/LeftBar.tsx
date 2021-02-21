// 左边导航栏
import React from "react";

import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  PieChartOutlined,
  CalendarOutlined,
  ToolOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  WhatsAppOutlined,
  IdcardOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import Containers from "../../containers";
import Http from '../../http'

const { Sider } = Layout;
let routers = [
  {"path":"home","component":Containers.Home,"title":"首页",icon:<PieChartOutlined/>},
  {"path":"customerInfo","component":Containers.CustomerInfo,"title":"客户信息",icon:<TeamOutlined/>},
  {"path":"staffInfo","component":Containers.StaffInfo,"title":"员工信息",icon:<UsergroupAddOutlined/>},
  {"path":"carMaintenAppoint","component":Containers.CarMaintenAppoint,"title":"服务委托",icon:<CalendarOutlined/>},
  {"path":"serviceInfo","component":Containers.ServiceInfo,"title":"服务信息",icon:<FileTextOutlined/>},
  {"path":"maintenDetail","component":Containers.MaintenDetail,"title":"服务费用",icon:<ToolOutlined/>},
  {"path":"returnInfo","component":Containers.ReturnInfo,"title":"回访信息",icon:<WhatsAppOutlined/>},
  {"path":"permissionAssign","component":Containers.PermissionAssign,"title":"权限分配",icon:<IdcardOutlined/>}
]
let routersDisplay:any[]
const LeftBar: React.FC<any> = (props: boolean) => {
  const { collapsed } = (props as any) || {};
  const defaultKey = location.hash.slice(2);
  console.log('routers',routers);
  const username = localStorage.getItem("username")
  Http.reqAuthorityInfo("/getUserInfo",{username,offset:0,size:10}).then((response:any)=>{
    const  result  = response?.data?.result ||[]
    let { authorityInfo } = result[0] ||{}
    console.log('authorityInfo',authorityInfo);
    authorityInfo = String(authorityInfo).split(",") ||[]
    routersDisplay = routers.filter(item=> authorityInfo?.includes(item?.path))
    console.log('routers',routersDisplay);
   })
  return routersDisplay?(
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: document.body.scrollHeight }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultKey||"home"]}>
        {routersDisplay?.map(item=>{
          let path = `/${item?.path}`
          return(
 <Menu.Item key={item?.path} icon={item?.icon}>
 <Link to={path}>{item?.title}</Link>
  </Menu.Item>
        )})}
  
      </Menu>
    </Sider>
  ):<></>
};
export { routersDisplay,routers }
export default LeftBar;
