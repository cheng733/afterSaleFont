import React from "react";
import { Table, Button, Popconfirm, message } from "antd";

import Http from "../../http";
import ServiceAuditDatail from "./ServiceAudit";

const ServiceAudit: React.FC = () => {
  const [data, setData] = React.useState([]);
  let [isModalVisible, setIsModalVisible] = React.useState(false);
  const [form, setForm] = React.useState(null) as any;
  const handleDetail = (record: any) => {
    form &&
      form?.setFieldsValue({
        repairNum: record["repairNum"],
        verfiDepart: record["verfiDepart"],
        returnMethod: record["returnMethod"],
        interviewee: record["interviewee"],
        visitor: record["visitor"],
        userRequireAndSuggest: record["userRequireAndSuggest"],
        returnConclusion: record["returnConclusion"],
      });
    setIsModalVisible(true);
  };
  const handleAudit = async (record: any) => {
    await Http.reqEditStatusMaintenAppoint("/editStatusMaintenAppoint", {
      id: record["repairNum"],
      status: "服务完结",
    });
    await Http.reqEditStatusMaintenDetail("/editStatusMaintenDetail", {
      repairNum: record["repairNum"],
      status: "服务完结",
    });
    await Http.reqEditStatusServiceAudit("/editStatusServiceAudit", {
      id: record["id"],
      status: "服务完结",
    });
    await Http.reqServiceAuditInfo("/getServiceAudit", {
      offset: 0,
      size: 10,
    }).then((response: any) => {
      const result = response?.data?.result || [];
      setData(result);
    });
  };
  const cancel = () => {
    message.warn("请转告有关部门重新核实情况");
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
      title: "核查部门",
      dataIndex: "verfiDepart",
    },
    {
      title: "回访方式",
      dataIndex: "returnMethod",
    },
    {
      title: "被访问人",
      dataIndex: "interviewee",
    },
    {
      title: "操作",
      render: (_text: any, _record: any, _index: any) => {
        return (
          <>
            <Button type="primary" onClick={() => handleDetail(_record)}>
              详情
            </Button>
            &nbsp;&nbsp;
            {_record["status"] === "稽查单审核" ? (
              <Popconfirm
                title="维修报告单是否情况属实"
                onConfirm={() => handleAudit(_record)}
                onCancel={cancel}
                okText="是"
                cancelText="否"
              >
                <Button type="primary">审核</Button>
              </Popconfirm>
            ) : (
              <></>
            )}
          </>
        );
      },
    },
  ];
  React.useEffect(() => {
    Http.reqServiceAuditInfo("/getServiceAudit", { offset: 0, size: 10 }).then(
      (response: any) => {
        const result = response?.data?.result || [];
        setData(result);
      }
    );
  }, []);
  const onCreate = (_values: any) => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getForm = (form: any) => {
    setForm(form);
  };
  return (
    <>
      <div style={{ margin: "40px 0  10px 0 " }}></div>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <ServiceAuditDatail
        onCreate={onCreate}
        isModalVisible={isModalVisible}
        handleCancel={handleCancel}
        getForm={getForm}
      />
    </>
  );
};

export default ServiceAudit;
