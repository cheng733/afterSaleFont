import React from "react";
import { Table, Space, Button, Input } from "antd";

import AddInfo from './AddInfo'
import Http from '../../http'

const ServiceInfo: React.FC = () => {
  let [isModalVisible,setIsModalVisible ] = React.useState(false);
  let [data, setData] = React.useState([]);
  const [searchContent,setSearchContent] = React.useState("")
  const [form,setForm] = React.useState(null) as any
  const [rowId,setRowId] = React.useState("")

  const handleCancel = () => {
    setIsModalVisible(false)

  };
  const repairhandle =(record:any)=>{
    setIsModalVisible(true)
    setRowId(record["id"])
    form&&form?.setFieldsValue({
      name:record["name"],
      repairNum:record["id"]
    })
  }
  const columns: any = [
    {title:"维修编号",dataIndex:"id"},
    {
      title: "车主姓名",
      dataIndex: "name",
    },
    {
      title: "求助时间",
      dataIndex: "helpTime",
    },
    {
      title: "故障地点",
      dataIndex: "faultArea",
    },
    {
      title: "故障描述",
      dataIndex: "faultDesc",
    },
    {
      title: "用户要求",
      dataIndex: "userRequire",
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
      render: (_text: any, _record: any) => {
        const { status } = _record ||{}
      return  status==="维修委托"?(
          <Space size="middle">
          <a onClick={()=>repairhandle(_record)}>委托单填写</a>
        </Space>):<></> 
      }
    },
  ];
  const handleSearch = (e:any)=>{
    const text = e.target.value
    setSearchContent(text)
  }
  const searchHandle = () => {
    const name = searchContent
    Http.reqGetCustomer("/getCarMaintenAppoint",{name,offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
     })
  };
  const getForm = (form:any)=>{
    setForm(form)
  }
  const onCreate = async(values: any) => {
    let { faultAnaly,faultDesc,managePrice,name,price,repairMan,repairNum,repairType,repireDate } = values
    repireDate = repireDate.format('YYYY-MM-DD')
    let status = "费用审核"
    await Http.reqAddMaintenDeatil("/insertMaintenDetailInfo",{faultAnaly,faultDesc,managePrice,name,price,repairMan,repairNum,repairType,repireDate,status})
    rowId&&Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint",{id:rowId,status:"费用审核"})
    setIsModalVisible(false)
    refreshTable()
  };
  React.useEffect(()=>{
    Http.reqGetCustomer("/getCarMaintenAppoint",{name:"",offset:0,size:10}).then((response:any)=>{
     const  result  = response?.data?.result ||[]
     setData(result)
 
    })
   },[])
   const refreshTable = (ifFirst?:boolean)=>{

    Http.reqGetCustomer("/getCarMaintenAppoint",{name:"",offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
  
     }) 
    if(ifFirst){
    
    }
    }
  return (
    <>
      <div>
        <Input placeholder="输入姓名" allowClear style={{ width: "400px" }} onChange={handleSearch}/>
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
      <AddInfo onCreate={onCreate} isModalVisible={isModalVisible} handleCancel={handleCancel} getForm={getForm}/>
    </>
  );
};

export default ServiceInfo;
