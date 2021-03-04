import React from "react";
import { Modal, Tree } from "antd";

import { routers } from "../../components/LeftBar/LeftBar";

const AuthorityEdit: React.FC<any> = (props) => {
  const { isModalVisible, editAuthority, handleCancel, rowData } = props;

  let [checkedKeys, setCheckedKeys] = React.useState([]);

  let treeData =
    routers.map((item: any) => {
      return {
        key: item?.path,
        title: item?.title,
      };
    }) || [];
  React.useEffect(() => {
    let { authorityInfo } = rowData || ({} as any);
    authorityInfo = String(authorityInfo)?.split(",") || [];
    rowData["authorityInfo"] && setCheckedKeys(authorityInfo);
  }, rowData["id"]);

  const handleCheck = (checkedKeys: any) => {
    setCheckedKeys(checkedKeys);
  };
  const handleOk = () => {
    editAuthority(checkedKeys);
  };

  return (
    <Modal
      title="权限编辑"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Tree
        treeData={treeData}
        checkable
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
      />
    </Modal>
  );
};
export default AuthorityEdit;
