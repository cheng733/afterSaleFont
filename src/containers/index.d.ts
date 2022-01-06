/// <reference types="react" />
declare const Containers: {
    Login: import("react").ComponentClass<Pick<any, string | number | symbol>, any> & import("react-router").WithRouterStatics<import("react").FC<any>>;
    Home: import("react").FC<{}>;
    CarMaintenAppoint: import("react").FC<{}>;
    CustomerInfo: import("react").FC<{}>;
    MaintenDetail: import("react").FC<{}>;
    ReturnInfo: import("react").FC<{}>;
    StaffInfo: import("react").FC<{}>;
    Register: import("react").ComponentClass<Pick<import("react-router").RouteComponentProps<any, import("react-router").StaticContext, unknown>, never>, any> & import("react-router").WithRouterStatics<import("react").FC<{}>>;
    ServiceInfo: import("react").FC<{}>;
    PermissionAssign: import("react").FC<{}>;
    ServiceAudit: import("react").FC<{}>;
    ServiceFee: import("react").FC<{}>;
};
export default Containers;
