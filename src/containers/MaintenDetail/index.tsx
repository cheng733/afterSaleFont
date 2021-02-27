import React from "react";
import { Table, Space, Input, Button,Popconfirm,message } from "antd";
import Http from '../../http'


const MaintenDetail: React.FC = () => {
  let [data, setData] = React.useState([]);
  const [searchContent,setSearchContent] = React.useState("")

  const  approveConfirm = async(_record:any)=> {
    await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:_record["repairNum"],status:"服务结算"})
    await Http.reqEditStatusMaintenDetail("/editStatusMaintenDetail",{id:_record["id"],status:"服务结算"})
    refreshTable()
    message.success('审核成功');
  }
  
  const approveCancel = async(_record:any)=> {
  await Http.reqDelMaintenDetail("/delMaintenDetail",{id:_record["id"]})
  await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:_record["repairNum"],status:"维修委托"})
  refreshTable()
  message.error('不通过，请重新填写维修信息');
  }
  const columns: any = [
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
        ):<></>
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
   const refreshTable = (ifFirst?:boolean)=>{

    Http.reqGetCustomer("/getMaintenDetail",{repairMan:"",offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
  
     }) 
    if(ifFirst){
    
    }
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
    </>
  );
};

export default MaintenDetail;
