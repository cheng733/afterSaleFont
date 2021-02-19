import React from "react";
import { Form, Input, Button, Col, Row,DatePicker, message } from "antd";
import Http from "../../http";

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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const { TextArea } = Input;
const CarMaintenAppoint: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = async(values: any) => {
    let { card,carNum,faultArea,faultDesc,helpTime,name,phone,userRequrie } = values
    helpTime = helpTime.format('YYYY-MM-DD')
    let status = "维修委托"
    const response:any = await Http.reqCarMaintenAppoint("/insertCarMaintenAppointInfo",{card,carNum,faultArea,faultDesc,helpTime,name,phone,userRequrie,status})
    if(response?.status===200){
      message.success("委托成功")
    }
    form.resetFields() 
  };
  const  TimeChange = (value: any, dateString: any)=> {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  }
  
  const  TimeConfirm = (value: any)=> {
    console.log('onOk: ', value);
  }
  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={onFinish}
      labelAlign="left"
      scrollToFirstError
    >
      <h2>用户信息</h2>
      <Row>
        <Col>
          <Form.Item
            name="card"
            label="保修卡号"
            rules={[
              {
                required: true,
                message: "请输入保修卡号",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="carNum"
            label="车牌号"
            rules={[
              {
                required: true,
                message: "请输入车牌号",
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
            name="name"
            label="车主姓名"
            rules={[
              {
                required: true,
                message: "请输入车主姓名",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="phone"
            label="车主电话"
            rules={[
              {
                required: true,
                message: "请输入车主电话",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <h2>求助信息</h2>
      <Row>
        <Col>
          <Form.Item
            name="helpTime"
            label="求助时间"
            rules={[
              {
                required: true,
                message: "请选择求助时间",
              },
            ]}
          >
            <DatePicker showTime onChange={TimeChange} onOk={TimeConfirm} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="faultArea"
            label="故障地点"
            rules={[
              {
                required: true,
                message: "请输入故障地点",
              },
            ]}
          >
           <Input/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        name="faultDesc"
        label="故障描述"
        labelCol={{ span: 2, offset: 0 }}
        wrapperCol={{ span: 8, offset: 0 }}
        rules={[
          {
            required: true,
            message: "请输入故障描述",
          },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        name="userRequrie"
        label="用户要求"
        labelCol={{ span: 2, offset: 0 }}
        wrapperCol={{ span: 8, offset: 0 }}
        rules={[
          {
            required: true,
            message: "请输入用户要求",
          },
        ]}
      >
                <TextArea rows={4} />
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          确定
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CarMaintenAppoint;
