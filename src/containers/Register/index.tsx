import React from "react";
import { Form, Input, Button, message } from "antd";
import { withRouter } from "react-router-dom";

import Http from "../../http";
import "./register.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

const Register: React.FC = (props: any) => {
  const onFinish = async (values: any) => {
    const { password, confirmpassword, username } = values;
    if (password !== confirmpassword) {
      message.error("两次的密码不同");
      return;
    }
    const response: any = await Http.reqRegister("/register", {
      username,
      password,
    });
    if (response?.status === 200) {
      message.success(response?.data?.info);
      props.history.push("/login");
    }
  };

  const onFinishFailed = (_errorInfo: any) => {};

  return (
    <div className="register">
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
          rules={[{ required: true, message: "输入用户名" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: "输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="确认密码"
          name="confirmpassword"
          rules={[{ required: true, message: "再输入密码" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" className="registerBtn">
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default withRouter(Register);
