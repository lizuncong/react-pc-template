import axios from 'axios';
import qs from 'qs';
import { notification } from 'antd';

let count = 0;
class Request {
  constructor() {
    count += 1;
    console.log(`axios实例被创建了${count}次`);
  }

  request(method, url, data, ...rest) {
    const config = Object.assign({
      method,
      url,
      baseURL: '/api',
      // `onUploadProgress` allows handling of progress events for uploads
      // onUploadProgress(progressEvent) {
      // console.log('上传进度。。', progressEvent, (progressEvent.loaded * 100) / progressEvent.total)
      // Do whatever you want with the native progress event
      // },

      // `onDownloadProgress` allows handling of progress events for downloads
      // onDownloadProgress(progressEvent) {
      // console.log('下载进度...', progressEvent, (progressEvent.loaded * 100) / progressEvent.total)
      // Do whatever you want with the native progress event
      // },
    }, ...rest);
    if (method === 'get') {
      // `params` are the URL parameters to be sent with the request
      // Must be a plain object or a URLSearchParams object
      config.params = data;
    } else if (method === 'post') {
      // `data` is the data to be sent as the request body
      // Only applicable for request methods 'PUT', 'POST', and 'PATCH'
      // When no `transformRequest` is set, must be of one of the following types:
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - Browser only: FormData, File, Blob
      config.data = data;
    }
    return new Promise((resolve) => {
      axios(config).then((res) => {
        if (res && res.status === 200) {
          resolve(res.data);
        } else {
          // 请求出错
          notification.open({
            message: '返回的状态码不是200',
          });
        }
      }).catch((error) => {
        console.log(`${url}-请求异常`, error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          notification.open({
            message: `请求异常-response-${error.response.status}`,
          });
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          notification.open({
            message: `请求异常-request-${JSON.stringify(error.request)}`,
          });
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          notification.open({
            message: `请求异常-${JSON.stringify(error.message)}`,
          });
        }
        console.log(error.config);
      });
    });
  }

  get(options) {
    return this.request('get', options.url, options.data);
  }

  post(options) {
    return this.request('post', options.url, options.data);
  }

  // application/x-www-form-urlencoded
  postForm(options) {
    const data = options.data || {};
    const headers = { 'content-type': 'application/x-www-form-urlencoded' };
    return this.request('post', options.url, qs.stringify(data), { headers });
  }

  // multipart/form-data
  upload(options) {
    const data = options.data || {};
    const param = new FormData();
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (value instanceof Array) {
        value.forEach((item) => {
          param.append(key, item);
        });
      } else {
        param.append(key, data[key]);
      }
    });
    const headers = { 'content-type': 'multipart/form-data' };
    return this.request('post', options.url, param, { headers });
  }

  // static ajax(options){
  //   let loading;
  //   if (options.data && options.data.isShowLoading !== false){
  //     loading = document.getElementById('ajaxLoading');
  //     loading.style.display = 'block';
  //   }
  //   let baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
  //   return new Promise((resolve,reject)=>{
  //     axios({
  //       url:options.url,
  //       method:'get',
  //       baseURL:baseApi,
  //       timeout:5000,
  //       params: (options.data && options.data.params) || ''
  //     }).then((response)=>{
  //       if (options.data && options.data.isShowLoading !== false) {
  //         loading = document.getElementById('ajaxLoading');
  //         loading.style.display = 'none';
  //       }
  //       if (response.status === '200'){
  //         let res = response.data;
  //         if (res.code === '0'){
  //           resolve(res);
  //         }else{
  //           Modal.info({
  //             title:"提示",
  //             content:res.msg
  //           })
  //         }
  //       }else{
  //         reject(response.data);
  //       }
  //     })
  //   });
  // }
}

export default new Request();
