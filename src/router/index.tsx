import React from "react";
import { Route } from "react-router-dom";

import {routersDisplay} from '../components/LeftBar/LeftBar'



const router: React.FC = () => { 
  //先获取登录用户的信息
  

  //然后在根据角色权限显示内容
  return String(routersDisplay)?(
    <>
      {routersDisplay?.map((item:any)=>{
        let path = `/${item?.path}`
        let Component  = item?.component
         return (<Route path={path}>
        <Component/>
      </Route>)
      })} 
    </>
  ):<></>
};
export default router;
