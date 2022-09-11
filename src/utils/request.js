import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    const {
      getters: { isLogin },
      state: { tokenObject }
    } = store
    if (isLogin) {
      config.headers.Authorization = `Bearer ${tokenObject.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

export default request
