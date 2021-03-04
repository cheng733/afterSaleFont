import React from "react";
import { Table, Space, Input, Button,Popconfirm,message } from "antd";

import Http from '../../http'
import ServiceFee from './ServiceFee'
import ServiceAudit from './ServiceAudit'

const MaintenDetail: React.FC = () => {
  let [data, setData] = React.useState([]);
  const [searchContent,setSearchContent] = React.useState("")
  let [isModalVisible,setIsModalVisible ] = React.useState(false); 
  const [form,setForm] = React.useState(null) as any
  const [auditform,setAuditForm] = React.useState(null) as any
  let [isAuditModalVisible,setIsAuditModalVisible ] = React.useState(false); 

  const handleCancel = () => {
    setIsModalVisible(false)

  };
  const handleAuditCancel = ()=>{
    setIsAuditModalVisible(false)
  }
  const refreshTable = async(ifFirst?:boolean)=>{
    try{
      await Http.reqGetCustomer("/getMaintenDetail",{repairMan:"",offset:0,size:10}).then((response:any)=>{
        const  result  = response?.data?.result ||[]
        setData(result)
       }) 
    }catch(err){
      setData([])
    }
    
    if(ifFirst){
    
    }
    }
  const  approveConfirm = async(_record:any)=> {
    await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:_record["repairNum"],status:"服务结算"})
    await Http.reqEditStatusMaintenDetail("/editStatusMaintenDetail",{repairNum:_record["repairNum"],status:"服务结算"})
    await refreshTable()
    message.success('审核成功');
  }
  
  const approveCancel = async(_record:any)=> {
  await Http.reqDelMaintenDetail("/delMaintenDetail",{id:_record["id"]})
  await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:_record["repairNum"],status:"维修委托"})
  await refreshTable()
  message.error('不通过，请重新填写维修信息');
  }
  const handleServiceFee = (record:any)=>{
    setIsModalVisible(true)
    form&&form?.setFieldsValue({
      repairNum:record["repairNum"]
    })
    
  }
  const handleServiceAudit = (record:any)=>{
    setIsAuditModalVisible(true)
    auditform&&auditform?.setFieldsValue({
      repairNum:record["repairNum"],
      interviewee:record["name"]
    })
  }
  const columns: any = [
    {title:"序号",render:(_text: any,_record: any,index: number)=>{
      return ++index
    }},
    {
      title: "维修编号",
      dataIndex:"repairNum"
    },
    {
      title: "维修人员",
      dataIndex: "repairMan",
    },
    {
      title: "总成价格",
      dataIndex: "price",
    },
    {
      title: "服务类型",
      dataIndex: "repairType",
    },
    {
      title: "状态",
      dataIndex: "status",
      render:(text:any)=>{
        return <Button shape="round" type="primary" ghost>{text}</Button>
      }
    },
    {
      title: "操作",
      key: "action",
      render: (_text: any, _record: any) => {
        const { status,problemDesc } = _record ||{}
        return  status==="费用审核"&&problemDesc?(
          <Space size="middle">
          <Popconfirm
     title="你觉得该服务费用是否合理"
     onConfirm={()=>approveConfirm(_record)}
     onCancel={()=>approveCancel(_record)}
     okText="合理"
     cancelText="不合理"
   >
         <Button type="primary">审核</Button>
         </Popconfirm>
       </Space>
        ):(status=="服务结算"?(
        <Button type="primary" onClick={()=>handleServiceFee(_record)}>服务费用</Button>):(
        status=="服务稽查"?(<Button type="primary" onClick={()=>handleServiceAudit(_record)}>服务稽查</Button>):<></>
        ))
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
  const onCreate = async(values:any)=>{
    await Http.reqAddServiceFee("/insertServiceFee",values)  
    await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:values["repairNum"],status:"服务稽查"})
    await Http.reqEditStatusMaintenDetail("/editStatusMaintenDetail",{repairNum:values["repairNum"],status:"服务稽查"})
    await refreshTable()
    setIsModalVisible(false)  
  }
  const onAuditCreate = async(values:any)=>{
    let result:any = {}
    Object.keys(values).forEach(item=>{
      result[item] = values[item].toString()
    })
    result["status"] = "稽查单审核"
    await Http.reqAddServiceAudit("/insertServiceAudit",result)
    await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:values["repairNum"],status:"稽查单审核"})
    await Http.reqEditStatusMaintenDetail("/editStatusMaintenDetail",{repairNum:values["repairNum"],status:"稽查单审核"})
    await refreshTable()
    setIsAuditModalVisible(false)
  }
  const getForm = (form:any)=>{
    setForm(form)
  }
  const getAuditForm = (form:any)=>{
    setAuditForm(form)
  }
  return (
    <>
      <div>
        <Input placeholder="输入维修人" allowClear style={{ width: "400px" }} onChange={handleSearch}/>
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
      <ServiceFee onCreate={onCreate} isModalVisible={isModalVisible} handleCancel={handleCancel} getForm={getForm}/>
      <ServiceAudit onAuditCreate={onAuditCreate} isAuditModalVisible={isAuditModalVisible} handleAuditCancel={handleAuditCancel} getAuditForm={getAuditForm}/>
    </>
  );
};

export default MaintenDetail;
