import React from "react";
import { Form, Input, Col, Row,Modal,Checkbox } from "antd";

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

const ServiceAudit: React.FC<any> = (props) => {
  const [form] = Form.useForm();
  const { onAuditCreate,isAuditModalVisible,handleAuditCancel,getAuditForm } = props
  const handleOk = () => {
    form
    .validateFields()
    .then(values => {
      form.resetFields();
      onAuditCreate(values);
    })
    .catch(info => {
      console.log('Validate Failed:', info);
    });
}
React.useEffect(()=>{
  getAuditForm(form)
},[])

  return (
    <Modal title="服务稽查" visible={isAuditModalVisible} onOk={handleOk} onCancel={handleAuditCancel} width="700px">
    <Form
      {...formItemLayout}
      form={form}
      labelAlign="left"
      scrollToFirstError
    >
    <Row>
      <Form.Item
            name="repairNum"
            label="维修编号"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
    </Row>
      <Row>
        <Col>
          <Form.Item
            name="verfiDepart"
            label="核查部门"
            rules={[
              {
                required: true,
                message: "输入核查部门",
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="returnMethod"
            label="回访方式"
            rules={[
              {
                required: true,
                message: "输入回访方式",
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            name="interviewee"
            label="被访问人"
            rules={[
              {
                message: "输入被访问人",
              },
            ]}
          >
            <Input disabled/>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="visitor"
            label="访问人"
            rules={[
              {
                message: "输入访问人",
              },
            ]}
          >
            <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
          <Form.Item
            name="userRequireAndSuggest"
            label="用户要求和建议"
            rules={[
              {
                required: true,
                message: "输入用户要求和建议",
              },
            ]}
          >
            <Input/>
          </Form.Item>
      </Row>
      <Row>
          <Form.Item
        name="returnConclusion"
        label="回访结论"
        rules={[
          {
            required: true,
          },
        ]}
      >
      <Checkbox.Group style={{ width: '100%' }}>
    <Row>
      <Col span={8}>
        <Checkbox value="满意">满意</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="差">差</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="非常满意">非常满意</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="比较满意">比较满意</Checkbox>
      </Col>
      <Col span={8}>
        <Checkbox value="虚假服务">虚假服务</Checkbox>
      </Col>
    </Row>
  </Checkbox.Group>
      </Form.Item>
      </Row>
    </Form>
    </Modal>
  );
};

export default ServiceAudit;
