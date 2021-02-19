import http from "./interceptors";
interface Iparams {
  url: string;
  type?: string;
  params?: any;
}
const ajax = ({ url, type = "POST", params }: Iparams) => {
  return new Promise(async (resolve, reject) => {
    if (type == "POST") {
      try {
        const response = await http.request({ url, method: type, params });
        return resolve(response?.data);
      } catch (err) {
        return reject(err);
      }
    } else {
      try {
        const response = await http.request({ url, method: type } as any);
        return resolve(response?.data);
      } catch (err) {
        return reject(err);
      }
    }
  });
};
export default ajax;
