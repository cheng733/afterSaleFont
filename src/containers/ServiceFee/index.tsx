import React from "react";
import { Table, Button } from "antd";

import Http from '../../http'
import Fee from './Fee'

const ServiceFee: React.FC = () => {
  const [data,setData] = React.useState([])
  let [isModalVisible,setIsModalVisible ] = React.useState(false); 
  const [form,setForm] = React.useState(null) as any
const handleDetail = (record:any)=>{
  form&&form?.setFieldsValue({
    repairNum:record["repairNum"],
    serviceMethod:record["serviceMethod"],
    hours:record["hours"],
    price:record["price"],
    manageFee:record["manageFee"],
    otherFee:record["otherFee"],
    feeTotal:record["feeTotal"],
    opinions:record["opinions"],
  })
  setIsModalVisible(true)
}
  const columns: any = [
    {
      title: "序号",
      render: (_text: any, _record: any, index: any) => {
        return ++index;
      },
    },
    {
      title: "维修编号",
      dataIndex: "repairNum",
    },
    {
      title: "工时",
      dataIndex: "hours",
    },
    {
      title: "工时单价",
      dataIndex: "price",
    },
    {
      title: "费用总计",
      dataIndex: "feeTotal",
    },
    {
      title: "操作",
      render:(_text: any,_record: any,_index: any)=>{
        return <Button type="primary" onClick={()=>handleDetail(_record)}>详情</Button>
      }
    },
  ];
  React.useEffect(()=>{
    Http.reqServiceFeeInfo("/getServiceFee",{offset:0,size:10}).then((response:any)=>{
     const  result  = response?.data?.result ||[]
     setData(result)
    })
   },[])
  const onCreate = (values:any)=>{
    console.log('values',values);
    setIsModalVisible(false)  
  }
  const handleCancel = () => {
    setIsModalVisible(false)

  };
  const getForm = (form:any)=>{
    setForm(form)
  }
  return (
    <>
      <div style={{ margin: "40px 0  10px 0 " }}></div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Fee onCreate={onCreate} isModalVisible={isModalVisible} handleCancel={handleCancel} getForm={getForm}/>
    </>
  );
};

export default ServiceFee;
