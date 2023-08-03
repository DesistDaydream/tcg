import axios from "axios"
import type { InternalAxiosRequestConfig, AxiosResponse } from "axios"

const instance = axios.create({
  // baseURL: "https://tcg.102205.xyz:10443/api/v1",
  baseURL: "/api/v1/",
  timeout: 30000,
})

axios.defaults.withCredentials = true

// 拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token = localStorage.getItem("token")
    console.log("token 为: ", token)
    config.headers["Authorization"] = token
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
