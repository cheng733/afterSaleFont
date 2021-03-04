import React from "react";
import { Form, Input, Col, Row, DatePicker, Select, Modal } from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 8,
    },
    sm: {
      span: 14,
    },
  },
};
const { Option } = Select;
const AddOrEditStaff: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const { onCreate, isModalVisible, handleCancel, ModalName, getForm } = props;

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((_info) => {});
  };
  React.useEffect(() => {
    getForm(form);
  }, []);

  const handleSelect = (_value: any) => {};
  return (
    <Modal
      title={ModalName}
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...formItemLayout}
        form={form}
        labelAlign="left"
        scrollToFirstError
      >
        <Row>
          <Col>
            <Form.Item
              name="name"
              label="姓名"
              rules={[
                {
                  required: true,
                  message: "请输入姓名",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="phone"
              label="联系电话"
              rules={[
                {
                  required: true,
                  message: "输入联系电话",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="status"
              label="状态"
              rules={[
                {
                  required: true,
                  message: "请选择状态",
                },
              ]}
              initialValue="在职"
            >
              <Select
                defaultValue="在职"
                style={{ width: 120 }}
                onChange={handleSelect}
              >
                <Option value="在职">在职</Option>
                <Option value="离职">离职</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="hireDate"
              label="聘用日期"
              rules={[
                {
                  required: true,
                  message: "选择聘用日期",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="username"
              label="登录名"
              rules={[
                {
                  required: true,
                  message: "输入登录名",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="password"
              label="登录密码"
              rules={[
                {
                  required: true,
                  message: "输入登录密码",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            name="role"
            label="角色"
            rules={[
              {
                required: true,
                message: "选择角色",
              },
            ]}
            initialValue="前台"
          >
            <Select
              defaultValue="前台"
              style={{ width: 120 }}
              onChange={handleSelect}
            >
              <Option value="前台">前台</Option>
              <Option value="经理">经理</Option>
              <Option value="老板">老板</Option>
            </Select>
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditStaff;
