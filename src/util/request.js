import axios from 'axios'
import {getToken,getUserName} from './cookie'
let baseURL = process.env.NODE_ENV === 'production' ? '/api' : '/api'
let newAxios = axios.create({
  baseURL: baseURL,
  timeout: 10000
})

// 添加请求拦截器
newAxios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers["Tokey"]=getToken();  
  config.headers["UserName"]=getUserName();  
  return config;
}, function (error) {
  // 对请求错误做些什么

  return Promise.reject(error);
});

// 添加响应拦截器
newAxios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  let data = response.data;
  if (data.resCode !== 0) {
    return Promise.reject(data);
  } else {
    return response;
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default newAxios;


