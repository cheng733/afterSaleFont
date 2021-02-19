import React from "react";
import { Route } from "react-router-dom";

import Containers from "../containers";
import Http from '../http'

let routers:any[]
const router: React.FC = () => {
  routers = [
    {"path":"home","component":Containers.Home,"title":"首页"},
    {"path":"customerInfo","component":Containers.CustomerInfo,"title":"客户信息"},
    {"path":"staffInfo","component":Containers.StaffInfo,"title":"员工信息"},
    {"path":"carMaintenAppoint","component":Containers.CarMaintenAppoint,"title":"服务委托"},
    {"path":"serviceInfo","component":Containers.ServiceInfo,"title":"服务信息"},
    {"path":"maintenDetail","component":Containers.MaintenDetail,"title":"服务费用"},
    {"path":"returnInfo","component":Containers.ReturnInfo,"title":"回访信息"},
    {"path":"permissionAssign","component":Containers.PermissionAssign,"title":"权限分配"}
  ]
  //先获取登录用户的信息

  const username = localStorage.getItem("username")
  Http.reqAuthorityInfo("/getUserInfo",{username,offset:0,size:10}).then((response:any)=>{
    const  result  = response?.data?.result ||[]
    let { authorityInfo } = result[0] ||{}
    console.log('authorityInfo',authorityInfo);
    authorityInfo = String(authorityInfo).split(",") ||[]
    routers = routers.filter(item=> authorityInfo?.includes(item?.path))
    console.log('routers',routers);
   })

  //然后在根据角色权限显示内容
  
  return (
    <>
      {routers?.map((item:any)=>{
        let path = `/${item?.path}`
        let Component  = item?.component
         return (<Route path={path}>
        <Component/>
      </Route>)
      })} 
    </>
  );
};
export { routers }
export default router;
