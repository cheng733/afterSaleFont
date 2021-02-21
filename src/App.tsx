import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { Layout, Avatar, Badge, Menu, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Router from "./router";
import PubSub from "pubsub-js";

import components from "./components";
import containers from "./containers";
import "./App.scss";


const { Header, Content } = Layout;

const handleSelect = async({ key }:any)=>{
if(key==="3"){
  localStorage.removeItem("token")
  await PubSub.publish("token","")
}
}
const menu = (
  <Menu onClick={handleSelect}>
    <Menu.Item key="0">
      <a href="http://www.alipay.com/">个人信息</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="http://www.taobao.com/">车辆信息</a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key="3">退出</Menu.Item>
  </Menu>
);

const App: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [token, setToken] = React.useState("");
  const toggle = () => {
    setCollapsed(!collapsed);
  };
  PubSub.subscribe("token", (msg: any, data: any) => {
    console.log("msg", msg,data);
    setToken(data);
  });
  var realToken = localStorage.getItem("token");
  return (
    <HashRouter>
      {(realToken && realToken !== "undefined") || token ? (
        <Layout>
          <components.LeftBar collapsed={collapsed} />
          <Layout className="site-layout">
            <Header
              className="site-layout-background"
              style={{ padding: 0, position: "relative" }}
            >
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: "trigger",
                  onClick: toggle,
                }
              )}
              <div style={{ position: "absolute", right: "40px", top: "1px" }}>
                <Dropdown overlay={menu} trigger={["click"]}  >
                  <Badge count={1} >
                    <Avatar
                      shape="square"
                      size="large"
                      icon={<UserOutlined />}
                    />
                  </Badge>
                </Dropdown>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 600,
              }}
            >
              <Switch>
              <Router/>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      ) : (
        <div className="topPage">
          <Switch>
            <Route path="/register">
              <containers.Register />
            </Route>
            <Route path="/">
              <containers.Login />
            </Route>
          </Switch>
          <Redirect to="/login"></Redirect>
        </div>
      )}
    </HashRouter>
  );
};
export default App;
