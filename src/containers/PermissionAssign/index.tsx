import React from "react";
import { Table, Button, Input } from "antd";

import AuthorityEdit from './AuthorityEdit'
import Http from '../../http'


const PermissionAssign: React.FC = () => {
  let [isModalVisible,setIsModalVisible ] = React.useState(false);
  let [data, setData] = React.useState([]);
  let [rowData,setRowData] = React.useState({}) as any
  const [searchContent,setSearchContent] = React.useState("")

  const handleSearch = (e:any)=>{
    const text = e.target.value
    setSearchContent(text)
  }
  const searchHandle = () => {
    const username = searchContent
    Http.reqAuthorityInfo("/getUserInfo",{username,offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
     })
  };
  const handleCancel = () => {
    setIsModalVisible(false)

  };
  const authorityEdit =(record:any)=>{
    setRowData(record) 
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
      title: "用户名",
      dataIndex: "username",
    },
    {
      title: "密码",
      dataIndex: "password",
    },
    {
      title: "所属角色",
      dataIndex: "role",
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "操作",
      render:(_text:any,record:any,_index:any)=>{
          return <Button type="primary" onClick={()=>authorityEdit(record)}>编辑权限</Button>
      }
    },
  ];
  React.useEffect(()=>{
    Http.reqAuthorityInfo("/getUserInfo",{username:"",offset:0,size:10}).then((response:any)=>{
     const  result  = response?.data?.result ||[]
     setData(result)
    })
   },[])
   const editAuthority = async(checkedKeys:any)=>{
    let id = rowData?.id
    
    await Http.reqEditAuthorityInfo("/editAuthorityInfo",{id,authorityInfo:checkedKeys.join()})
    refreshTable()
    setIsModalVisible(false)
   }
   const refreshTable = (ifFirst?:boolean)=>{

    Http.reqGetCustomer("/getUserInfo",{username:"",offset:0,size:10}).then((response:any)=>{
      const  result  = response?.data?.result ||[]
      setData(result)
  
     }) 
    if(ifFirst){
    
    }
    }
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
      <div style={{ margin: "40px 0  10px 0 " }}></div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <AuthorityEdit isModalVisible={isModalVisible} handleCancel={handleCancel} rowData={rowData} editAuthority={editAuthority}/>
    </>
  );
};

export default PermissionAssign;
