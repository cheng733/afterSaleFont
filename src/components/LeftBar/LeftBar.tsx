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
  DollarCircleOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import PubSub from "pubsub-js";

import Containers from "../../containers";
import Http from "../../http";

const { Sider } = Layout;
let routers = [
  {
    path: "home",
    component: Containers.Home,
    title: "首页",
    icon: <PieChartOutlined />,
  },
  {
    path: "customerInfo",
    component: Containers.CustomerInfo,
    title: "客户信息",
    icon: <TeamOutlined />,
  },
  {
    path: "staffInfo",
    component: Containers.StaffInfo,
    title: "员工信息",
    icon: <UsergroupAddOutlined />,
  },
  {
    path: "carMaintenAppoint",
    component: Containers.CarMaintenAppoint,
    title: "服务委托",
    icon: <CalendarOutlined />,
  },
  {
    path: "serviceInfo",
    component: Containers.ServiceInfo,
    title: "服务信息",
    icon: <FileTextOutlined />,
  },
  {
    path: "maintenDetail",
    component: Containers.MaintenDetail,
    title: "维修报告",
    icon: <ToolOutlined />,
  },
  {
    path: "returnInfo",
    component: Containers.ReturnInfo,
    title: "回访信息",
    icon: <WhatsAppOutlined />,
  },
  {
    path: "serviceFee",
    component: Containers.ServiceFee,
    title: "服务费用",
    icon: <DollarCircleOutlined />,
  },
  {
    path: "serviceAudit",
    component: Containers.ServiceAudit,
    title: "服务稽查  ",
    icon: <FolderViewOutlined />,
  },
  {
    path: "permissionAssign",
    component: Containers.PermissionAssign,
    title: "权限分配",
    icon: <IdcardOutlined />,
  },
];
let routersDisplay: any[];
const LeftBar: React.FC<any> = (props: boolean) => {
  const { collapsed } = (props as any) || {};
  const defaultKey = location.hash.slice(2);
  let [authRouters, setAuthRouters] = React.useState([]) as any;
  React.useEffect(() => {
    const username = localStorage.getItem("username");
    Http.reqAuthorityInfo("/getUserInfo", {
      username,
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      let authorityInfo: any = result[0]?.authorityInfo;
      authorityInfo = String(authorityInfo).split(",") || [];
      routersDisplay = routers.filter((item) =>
        authorityInfo?.includes(item?.path)
      );
      PubSub.publish("routers", routersDisplay);
      setAuthRouters(routersDisplay);
    });
  }, []);

  return authRouters ? (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: document.body.scrollHeight }}
    >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[defaultKey || "home"]}
      >
        {authRouters?.map((item: any) => {
          let path = `/${item?.path}`;
          return (
            <Menu.Item key={item?.path} icon={item?.icon}>
              <Link to={path}>{item?.title}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </Sider>
  ) : (
    <></>
  );
};
export { routersDisplay, routers };
export default LeftBar;
