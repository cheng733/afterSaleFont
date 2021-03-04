import React from "react";
import { Table, Space, Button, Input, Popconfirm, message } from "antd";

import Http from "../../http";
import AddOrEditStaff from "./AddOrEditStaff";
import moment from "moment";

const StaffInfo: React.FC = () => {
  let [data, setData] = React.useState([]);
  const [searchContent, setSearchContent] = React.useState("");
  const [ModalName, setModalName] = React.useState("新增员工信息");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form, setForm] = React.useState(null) as any;
  const [rowData, setRowData] = React.useState({}) as any;
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const Addhandle = () => {
    setModalName("新增员工信息");
    setRowData({});
    form && form.resetFields();
    setIsModalVisible(true);
  };
  const getForm = (form: any) => {
    setForm(form);
  };
  const handleEdit = (record: any) => {
    setRowData(record);
    setModalName("编辑员工信息");
    form &&
      form?.setFieldsValue({
        name: record["name"],
        hireDate: moment(record["hireDate"]),
        status: record["status"],
        phone: record["phone"],
        username: record["username"],
        password: record["password"],
        role: record["role"],
      });

    setIsModalVisible(true);
  };
  const onCreate = async (values: any) => {
    let { name, status, phone, hireDate, username, password, role } = values;
    hireDate = hireDate.format("YYYY-MM-DD");
    if (rowData["id"]) {
      let id = rowData["id"];
      await Http.reqDeitCustomer("/updateStaffInfo", {
        hireDate,
        name,
        status,
        phone,
        id,
        username,
        password,
        role,
      });
    } else {
      await Http.reqAddCustomer("/insertStaffInfo", {
        hireDate,
        name,
        status,
        phone,
        username,
        password,
        role,
      });
    }
    setIsModalVisible(false);
    refreshTable();
  };
  React.useEffect(() => {
    Http.reqGetCustomer("/getStaffInfo", {
      name: "",
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      setData(result);
    });
  }, []);
  const refreshTable = (ifFirst?: boolean) => {
    Http.reqGetCustomer("/getStaffInfo", {
      name: "",
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      setData(result);
    });
    if (ifFirst) {
    }
  };
  const handleDelConfirm = async (record: any) => {
    const { id } = record || {};
    await Http.reqDelCustomer("/deleteStaffInfo", { id });
    message.success("删除成功");
    await refreshTable();
  };

  const HandleDelcancel = (_e: any) => {};
  const columns: any = [
    {
      title: "序号",
      render: (_text: any, _record: any, index: number) => {
        return ++index;
      },
    },
    {
      title: "姓名",
      dataIndex: "name",
    },
    {
      title: "登录名",
      dataIndex: "username",
    },
    {
      title: "登录密码",
      dataIndex: "password",
    },
    {
      title: "角色",
      dataIndex: "role",
    },
    {
      title: "联系电话",
      dataIndex: "phone",
    },
    {
      title: "聘用日期",
      dataIndex: "hireDate",
    },
    {
      title: "状态",
      dataIndex: "status",
      render: (text: any, _record: any, _index: any) => {
        return (
          <Button shape="round" type="primary" ghost>
            {text}
          </Button>
        );
      },
    },
    {
      title: "操作",
      render: (_text: any, _record: any) => (
        <Space size="middle">
          <a onClick={() => handleEdit(_record)}>编辑</a>
          <Popconfirm
            title="你确定删除吗?"
            onConfirm={() => handleDelConfirm(_record)}
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

  const handleSearch = (e: any) => {
    const text = e.target.value;
    setSearchContent(text);
  };
  const searchHandle = () => {
    const name = searchContent;
    Http.reqGetCustomer("/getStaffInfo", { name, offset: 0, size: 10 }).then(
      (response: any) => {
        const result = response?.data?.result || [];
        setData(result);
      }
    );
  };

  return (
    <>
      <div>
        <Input
          placeholder="输入姓名"
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
      <Button
        onClick={Addhandle}
        type="primary"
        style={{ margin: "40px 0  10px 0 " }}
      >
        添加
      </Button>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <AddOrEditStaff
        ModalName={ModalName}
        onCreate={onCreate}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        getForm={getForm}
      />
    </>
  );
};

export default StaffInfo;
