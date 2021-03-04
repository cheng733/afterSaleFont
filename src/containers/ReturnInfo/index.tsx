import React from "react";
import { Table, Button, Input } from "antd";

import Http from "../../http";

const ReturnInfo: React.FC = () => {
  const [data, setData] = React.useState([]);
  const [searchContent, setSearchContent] = React.useState("");

  const editInputHandle = async (e: any, _record: any) => {
    const value = e.target.value;
    await Http.reqEditProblemDescMaintenDetail(
      "/editProblemDescMaintenDetail",
      { id: _record["id"], problemDesc: value }
    );
    refreshTable();
  };
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
      title: "回访时间",
      dataIndex: "repireDate",
    },
    {
      title: "员工",
      dataIndex: "repairMan",
    },
    {
      title: "问题描述",
      dataIndex: "problemDesc",
      render: (text: any, _record: any, _index: any) => {
        return text ? (
          <span>{text}</span>
        ) : (
          <Input
            onPressEnter={(event) => editInputHandle(event, _record)}
            allowClear
          />
        );
      },
    },
  ];
  const handleSearch = (e: any) => {
    const text = e.target.value;
    setSearchContent(text);
  };
  const searchHandle = () => {
    const repairMan = searchContent;
    Http.reqGetCustomer("/getMaintenDetail", {
      repairMan,
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      setData(result);
    });
  };
  React.useEffect(() => {
    Http.reqGetCustomer("/getMaintenDetail", {
      repairMan: "",
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      setData(result);
    });
  }, []);
  const refreshTable = (ifFirst?: boolean) => {
    Http.reqGetCustomer("/getMaintenDetail", {
      repairMan: "",
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      setData(result);
    });
    if (ifFirst) {
    }
  };
  return (
    <>
      <div>
        <Input
          placeholder="输入员工姓名"
          allowClear
          style={{ width: "400px" }}
          onChange={handleSearch}
        />
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

export default ReturnInfo;
