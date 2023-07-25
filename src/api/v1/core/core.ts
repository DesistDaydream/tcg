import axios from "axios"
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios"

const instance = axios.create({
  baseURL: "https://tcg.102205.xyz:10443/api/v1",
  // baseURL: "http://localhost:52205/api/v1",
  timeout: 30000,
})

// 拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

// 拦截器
instance.interceptors.response.use(
  (result: AxiosResponse) => {
    return result
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default instance
