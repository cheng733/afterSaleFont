import React from "react";
import { Table, Space, Button, Input,Popconfirm,message } from "antd";
import moment from "moment";

import Http from '../../http'
import AddOrEditCustomer from "./AddOrEditCustomer";



const CustomerInfo: React.FC = () => {
  const [data,setData] = React.useState([])
  const [searchContent,setSearchContent] = React.useState("")
  const [ModalName,setModalName] = React.useState("新增客户信息");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form,setForm] = React.useState(null) as any
  const [rowData,setRowData] = React.useState({}) as any
  const handleCancel = () => {
    setIsModalVisible(false)

  };
  const Addhandle = () => { 
    setModalName("新增客户信息")
    form&&form.resetFields()
    setIsModalVisible(true)
  };
  const getForm = (form:any)=>{
    setForm(form)
  }
  const handleEdit =(record:any)=>{  
    console.log('record',record);
    setRowData(record)
    setModalName("编辑客户信息")
    console.log('getForm',form);
    form&&form?.setFieldsValue({
      name:record["name"],
      registerDate:moment(record["registerDate"]),
      status:record["status"],
      phone:record["phone"]
    })
    
    setIsModalVisible(true)
  }
  const handleSearch = (e:any)=>{
    const text = e.target.value
    setSearchContent(text)
  }
  const searchHandle = () => {
    const name = searchContent
    Http.reqGetCustomer("/getCustomerInfo",{name,offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
     })
  };
  React.useEffect(()=>{
   Http.reqGetCustomer("/getCustomerInfo",{name:"",offset:0,size:10}).then((response:any)=>{
    const  result  = response?.data?.result ||[]
    setData(result)
   })
  },[])
  const refreshTable = (ifFirst?:boolean)=>{

    Http.reqGetCustomer("/getCustomerInfo",{name:"",offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
  
     }) 
    if(ifFirst){
    
    }
    }
    const onCreate = async(values: any) => {
      console.log('Received values of form: ', values);
      let { name,registerDate,status,phone } = values
      registerDate = registerDate.format('YYYY-MM-DD')
      console.log(registerDate,name,status,phone);
      console.log('rowData',rowData);
      if(rowData["id"]){
        let id = rowData["id"]
        const response = await Http.reqDeitCustomer("/updateCustomerInfo",{registerDate,name,status,phone,id})
        console.log('response',response);
        
      }else{
        await Http.reqAddCustomer("/insertCustomerInfo",{registerDate,name,status,phone})
      }
      setIsModalVisible(false)
      refreshTable()
    };
    const handleDelConfirm = async(record:any)=> {
      const { id } = record ||{}
      await Http.reqDelCustomer("/deleteCustomerInfo",{id})
      message.success('删除成功');
      await refreshTable()
    }
    
    const HandleDelcancel = (e:any)=> {
      console.log(e);
    }
    
    const columns: any = [
      {title:"序号",render:(_text: any,_record: any,index: number)=>{
        return ++index
      }},
      {
        title: "客户姓名",
        dataIndex: "name",
      },
      {
        title: "登记日期",
        dataIndex: "registerDate",
      },
      {
        title: "状态",
        dataIndex: "status",
        render:(text:any,_record:any,_index:any)=>{
          return <Button shape="round" type="primary" ghost>{text}</Button>
        }
      },
      {
        title: "电话",
        dataIndex: "phone",
      },
      {
        title: "操作",
        render: (_text: any, _record: any) => (
          <Space size="middle">
            <a onClick={()=>handleEdit(_record)}>编辑</a>
            <Popconfirm
        title="你确定删除吗?"
        onConfirm={()=>handleDelConfirm(_record)}
        onCancel={HandleDelcancel}
        okText="确定"
        cancelText="取消"
      >
            <a>删除</a>
            </Popconfirm>
          </Space>
        ),
        fixed: "right",
      },
    ];
  return (
    <>
      <div>
        <Input placeholder="输入用户名" allowClear style={{ width: "400px" }} onChange={handleSearch}/>
        <Button
          onClick={searchHandle}
          style={{ marginLeft: "40px" }}
          type="primary"
        >
          搜索
        </Button>
      </div>
      <Button
        onClick={Addhandle}
        type="primary"
        style={{ margin: "40px 0  10px 0 " }}
      >
        添加
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <AddOrEditCustomer ModalName={ModalName} onCreate={onCreate} isModalVisible={isModalVisible} handleCancel={handleCancel} getForm={getForm}/>
    </>
  );
};

export default CustomerInfo;
