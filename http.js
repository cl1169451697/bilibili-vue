import axios from 'axios'
import router from './src/router'
import Vue from 'vue'

const http = axios.create({
    baseURL:'http://112.74.99.5:3000/web/api'
})

// 请求拦截 给 所有请求带token
http.interceptors.request.use(function (config) {
    if(localStorage.getItem('id') && localStorage.getItem('token')){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  // 响应拦截
http.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    //   console.dir(error);
     // 如果没有用户没有登录, 来访问一些页面,响应就要拦截用户, 让用户登录
      if(error.response.status === 401 || error.response.status === 402){
        router.push('/login')
        Vue.prototype.$msg.fail(error.response.data.message)// 因为访问的不是vue对象,所有没有this可以用
      }
    return Promise.reject(error);
  });

export default http