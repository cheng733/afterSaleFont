import { message } from "antd";
import axios from "axios";
import PubSub from "pubsub-js";

const instance = axios.create({ baseURL: "/api" });

instance.interceptors.request.use(
  function (config) {
    let token = config?.headers?.token;
    const getToken = localStorage.getItem("token");
    if (!token && getToken) {
      config.headers["token"] = getToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const result = response?.data;
    if (response?.config?.url === "/login") {
      let { token } = result?.data;
      localStorage.setItem("token", token);
      PubSub.publish("token", token);
    }

    switch (result?.status) {
      case 400:
        message.error("token已过期，请重新登录");
        PubSub.publish("token", "");
        localStorage.removeItem("token");
        
        break;
      case 401:
        message.error("token已过期，请重新登录");
        PubSub.publish("token", "");
        localStorage.removeItem("token");
        break;
      case 500:
        message.error("服务器出错");
        break;
    }
    return response;
  },
  (error) => {
    console.log(error, "error");
    return Promise.reject(error);
  }
);
export default instance;
