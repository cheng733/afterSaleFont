import React from "react";
import { Form, Input, Col, Row, Modal } from "antd";

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
const { TextArea } = Input;

const Fee: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const { onCreate, isModalVisible, handleCancel, getForm } = props;
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

  return (
    <Modal
      title="服务费用"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      width="700px"
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
              name="repairNum"
              label="维修编号"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="serviceMethod"
              label="服务方式"
              rules={[
                {
                  required: true,
                  message: "输入服务方式",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <h2>修理工时费</h2>
        <Row>
          <Col>
            <Form.Item
              name="hours"
              label="工时"
              rules={[
                {
                  required: true,
                  message: "输入工时",
                },
              ]}
            >
              <Input suffix="小时" disabled />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="price"
              label="工时单价"
              rules={[
                {
                  required: true,
                  message: "输入工时单价",
                },
              ]}
            >
              <Input suffix="元" disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="manageFee"
              label="零件管理费"
              rules={[
                {
                  message: "输入管理费",
                },
              ]}
            >
              <Input suffix="元" disabled />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="otherFee"
              label="其他费用"
              rules={[
                {
                  message: "输入其他费用",
                },
              ]}
            >
              <Input suffix="元" disabled />
            </Form.Item>
          </Col>
        </Row>
        <h2>费用总计</h2>
        <Row>
          <Form.Item
            name="feeTotal"
            label="费用总计"
            rules={[
              {
                required: true,
                message: "输入费用总计",
              },
            ]}
          >
            <Input suffix="元" disabled />
          </Form.Item>
        </Row>
        <h2>审核意见</h2>
        <Row>
          <Col>
            <Form.Item
              name="opinions"
              label="办事处意见"
              rules={[
                {
                  required: true,
                  message: "输入办事处意见",
                },
              ]}
            >
              <TextArea disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default Fee;
