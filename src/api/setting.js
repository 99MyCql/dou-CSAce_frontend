import axios from 'axios';

import app from "../main";
import rspDataFilter from "./utils";

var myAxios = axios.create();

// 添加请求拦截器
myAxios.interceptors.request.use(
  function(config) {
    console.info("===> request:", config.url, config);
    return config;
  },
  function(error) {
    console.error(error);
    return Promise.reject(error);
  }
);


// 添加响应拦截器，对响应信息作处理
myAxios.interceptors.response.use(
  resp => {
    let data = resp.data; // 获取后端返回的数据
    console.info("<=== response:", resp.config.url, resp.data);

    if (rspDataFilter(data) === true) {
      return resp; // 转由.then()接收
    } else {
      return Promise.reject(resp); // 转由.catch()接收
    }
  },
  error => {
    console.error(error);
    app.config.globalProperties.$message.error({
      message: "网络请求时发生了一些错误",
    });
    return Promise.reject(error);
  }
);

export default myAxios;