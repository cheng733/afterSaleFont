// 左边导航栏
import React from "react";
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
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

const LeftBar: React.FC<any> = (props: boolean) => {
  const { collapsed } = (props as any) || {};
  const defaultKey = location.hash.slice(2);
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: document.body.scrollHeight }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[defaultKey||"home"]}>
        <Menu.Item key="home" icon={<PieChartOutlined />}>
          <Link to="/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="customerInfo" icon={<TeamOutlined />}>
          <Link to="/customerInfo">客户信息</Link>
        </Menu.Item>
        <Menu.Item key="staffInfo" icon={<UsergroupAddOutlined />}>
          <Link to="/staffInfo">员工信息</Link>
        </Menu.Item>
        <Menu.Item key="carMaintenAppoint" icon={<CalendarOutlined />}>
          <Link to="/carMaintenAppoint">服务委托</Link>
        </Menu.Item>
        <Menu.Item key="serviceInfo" icon={<FileTextOutlined />}>
          <Link to="/serviceInfo">服务信息</Link>
        </Menu.Item>
        <Menu.Item key="maintenDetail" icon={<ToolOutlined />}>
          <Link to="/maintenDetail">服务费用</Link>
        </Menu.Item>
        <Menu.Item key="returnInfo" icon={<WhatsAppOutlined />}>
          <Link to="/returnInfo">回访信息</Link>
        </Menu.Item>
        <Menu.Item key="permissionAssign" icon={<IdcardOutlined />}>
          <Link to="/permissionAssign">权限分配</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default LeftBar;
