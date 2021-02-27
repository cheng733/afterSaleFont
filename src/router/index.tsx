import React from "react";
import { Route } from "react-router-dom";
import PubSub from "pubsub-js";




const router: React.FC = () => { 
  //先获取登录用户的信息
  const [routers,setRouters]= React.useState([]) as any
React.useEffect(()=>{
PubSub.subscribe("routers",function (_msg:any,data:any) {
    setRouters(data)
  })
},[])
  //然后在根据角色权限显示内容
  return String(routers)?(
    <>
      {routers?.map((item:any)=>{
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
