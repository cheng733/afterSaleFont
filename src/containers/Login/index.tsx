import React from "react";

import { Form, Input, Button, Checkbox, message } from "antd";
import { withRouter } from "react-router-dom";

import Http from "../../http";
import "./login.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const Login: React.FC<any> = (props) => {
  const onFinish = async (values: any) => {
    const response: any = (await Http.reqLogin("/login", values)) || {};
    localStorage.setItem("username", values["username"]);
    if (response?.status === 200) {
      message.success(response?.data?.info);
      props?.history.replace("/home");
    }
  };

  const onFinishFailed = (_errorInfo: any) => {};
  const handleRegister = () => {
    props?.history.push("/register");
  };
  return (
    <div className="login">
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="用户名"
          name="username"
          initialValue="admin"
          rules={[{ required: true, message: "输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          initialValue="123456"
          rules={[{ required: true, message: "输入密码" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} valuePropName="checked">
          <Checkbox checked={true}>记住我</Checkbox>Or{" "}
          <a onClick={handleRegister}>注册</a>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="loginBtn">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withRouter(Login);
