import ajax from "./ajax";

// 登录
const reqLogin = (url: string, params: any) => ajax({ url, params });
//注册
const reqRegister = (url: string, params: any) => ajax({ url, params });
//获取客户信息
const reqGetCustomer = (url: string, params?: any) => ajax({ url, params });
//删除客户信息
const reqDelCustomer = (url: string, params: any) => ajax({ url, params });
//编辑客户信息
const reqDeitCustomer = (url: string, params: any) => ajax({ url, params });
//新增客户信息
const reqAddCustomer = (url: string, params: any) => ajax({ url, params });
//获取员工信息
const reqGetStaff = (url: string, params: any) => ajax({ url, params });
//删除员工信息
const reqDelStaff = (url: string, params: any) => ajax({ url, params });
//编辑员工信息
const reqDeitStaff = (url: string, params: any) => ajax({ url, params });
//新增员工信息
const reqAddStaff = (url: string, params: any) => ajax({ url, params });
//服务委托
const reqAddCarMaintenAppoint = (url: string, params: any) =>
  ajax({ url, params });
//委托单查询
const reqCarMaintenAppoint = (url: string, params: any) =>
  ajax({ url, params });
//修改委托单状态
const reqEditStatusMaintenAppoint = (url: string, params: any) =>
  ajax({ url, params });
//维修信息
const reqAddMaintenDeatil = (url: string, params: any) => ajax({ url, params });
//维修信息查询
const reqMaintenDeatil = (url: string, params: any) => ajax({ url, params });
//维修信息状态修改
const reqEditStatusMaintenDetail = (url: string, params: any) =>
  ajax({ url, params });
//删除维修信息
const reqDelMaintenDetail = (url: string, params: any) => ajax({ url, params });
//维修信息插入问题描述
const reqEditProblemDescMaintenDetail = (url: string, params: any) =>
  ajax({ url, params });
//获取用户信息
const reqAuthorityInfo = (url: string, params: any) => ajax({ url, params });
//修改用户信息--权限分配
const reqEditAuthorityInfo = (url: string, params: any) =>
  ajax({ url, params });
//新增服务费用
const reqAddServiceFee = (url: string, params: any) => ajax({ url, params });
//获取服务费用
const reqServiceFeeInfo = (url: string, params: any) => ajax({ url, params });
//新增服务稽查
const reqAddServiceAudit = (url: string, params: any) => ajax({ url, params });
//获取服务稽查
const reqServiceAuditInfo = (url: string, params: any) => ajax({ url, params });
//修改服务稽查状态
const reqEditStatusServiceAudit = (url: string, params: any) =>
  ajax({ url, params });

const Http = {
  reqLogin,
  reqRegister,
  reqGetCustomer,
  reqDelCustomer,
  reqDeitCustomer,
  reqGetStaff,
  reqDelStaff,
  reqDeitStaff,
  reqAddCustomer,
  reqAddStaff,
  reqAddCarMaintenAppoint,
  reqCarMaintenAppoint,
  reqAddMaintenDeatil,
  reqMaintenDeatil,
  reqEditStatusMaintenAppoint,
  reqEditStatusMaintenDetail,
  reqDelMaintenDetail,
  reqEditProblemDescMaintenDetail,
  reqEditAuthorityInfo,
  reqAuthorityInfo,
  reqAddServiceFee,
  reqServiceFeeInfo,
  reqAddServiceAudit,
  reqServiceAuditInfo,
  reqEditStatusServiceAudit,
};
export default Http;
