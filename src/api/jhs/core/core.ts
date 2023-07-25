import axios from "axios"
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios"

const instance = axios.create({
  baseURL: "https://api.jihuanshe.com/api",
  timeout: 30000,
})

// 拦截器
instance.interceptors.request.use(
  (config) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 拦截器
instance.interceptors.response.use(
  (result) => {
    return result
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
