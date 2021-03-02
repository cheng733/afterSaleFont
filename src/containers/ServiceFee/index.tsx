import React from "react";
import { Table, Button, Input } from "antd";

import Http from '../../http'
import Fee from './Fee'

const ServiceFee: React.FC = () => {
  const [data,setData] = React.useState([])
  const [searchContent,setSearchContent] = React.useState("")
  let [isModalVisible,setIsModalVisible ] = React.useState(false); 
  const [form,setForm] = React.useState(null) as any
const handleDetail = (record:any)=>{
  console.log('record',record,'form',form);
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
  const handleSearch = (e:any)=>{
    const text = e.target.value
    setSearchContent(text)
  }
  const searchHandle = () => {
    const repairMan = searchContent
    Http.reqGetCustomer("/getMaintenDetail",{repairMan,offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
     })
  };
  React.useEffect(()=>{
    Http.reqGetCustomer("/getMaintenDetail",{repairMan:"",offset:0,size:10}).then((response:any)=>{
     const  result  = response?.data?.result ||[]
     setData(result)
    })
   },[])
  //  const refreshTable = (ifFirst?:boolean)=>{

  //   Http.reqGetCustomer("/getMaintenDetail",{repairMan:"",offset:0,size:10}).then((response:any)=>{
  //     const  result  = response?.data?.result ||[]
  //     setData(result)
  
  //    }) 
  //   if(ifFirst){
    
  //   }
  //   }
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
      <div>
        <Input placeholder="输入员工姓名" allowClear style={{ width: "400px" }} onChange={ handleSearch }/>
        <Button
          onClick={searchHandle}
          style={{ marginLeft: "40px" }}
          type="primary"
        >
          搜索
        </Button>
      </div>
      <div style={{ margin: "40px 0  10px 0 " }}></div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Fee onCreate={onCreate} isModalVisible={isModalVisible} handleCancel={handleCancel} getForm={getForm}/>
    </>
  );
};

export default ServiceFee;
