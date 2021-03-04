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
const AddOrEditCustomer: React.FC<any> = (props) => {
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
              label="客户姓名"
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
              name="registerDate"
              label="登记日期"
              rules={[
                {
                  required: true,
                  message: "输入登记日期",
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
              name="phone"
              label="电话"
              rules={[
                {
                  required: true,
                  message: "输入电话号码",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddOrEditCustomer;
