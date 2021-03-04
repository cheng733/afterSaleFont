import React from "react";
import { Form, Input, Col, Row, DatePicker, Modal } from "antd";

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

const AddInfo: React.FC<any> = (props) => {
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
  const TimeChange = (_value: any, _dateString: any) => {};

  const TimeConfirm = (_value: any) => {};
  return (
    <Modal
      title="维修信息"
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
        <h2>派工信息</h2>
        <Row>
          <Col>
            <Form.Item
              name="repairMan"
              label="维修人员"
              rules={[
                {
                  required: true,
                  message: "输入维修人员",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="repairType"
              label="服务类型"
              rules={[
                {
                  required: true,
                  message: "选择服务类型",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <h2>总成信息</h2>
        <Row>
          <Col>
            <Form.Item
              name="repairNum"
              label="维修编号"
              rules={[
                {
                  required: true,
                  message: "输入维修编号",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="name"
              label="车主姓名"
              rules={[
                {
                  required: true,
                  message: "输入车主姓名",
                },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              name="price"
              label="总成价格"
              rules={[
                {
                  required: true,
                  message: "输入总成价格",
                },
              ]}
            >
              <Input suffix="元" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="managePrice"
              label="总成管理费用"
              labelCol={{ span: 10, offset: 0 }}
              wrapperCol={{ span: 10, offset: 0 }}
              rules={[
                {
                  required: true,
                  message: "输入总成管理费用",
                },
              ]}
              initialValue="0.0"
            >
              <Input suffix="元" />
            </Form.Item>
          </Col>
        </Row>
        <h2>维修信息</h2>
        <Row>
          <Col>
            <Form.Item
              name="repireDate"
              label="维修日期"
              rules={[
                {
                  required: true,
                  message: "选择维修日期",
                },
              ]}
            >
              <DatePicker showTime onChange={TimeChange} onOk={TimeConfirm} />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="faultDesc"
              label="故障简述"
              rules={[
                {
                  required: true,
                  message: "输入故障简述",
                },
              ]}
            >
              <TextArea rows={2} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Form.Item
            name="faultAnaly"
            label="故障现象及原因分析"
            labelCol={{ span: 12, offset: 0 }}
            wrapperCol={{ span: 12, offset: 0 }}
            rules={[
              {
                required: true,
                message: "输入故障现象及原因分析",
              },
            ]}
          >
            <TextArea rows={2} />
          </Form.Item>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddInfo;
