import { onMounted, reactive, toRefs } from "vue"
import { ElMessage } from "element-plus"

import type { LoginReqBody } from "@/api/v1/models/LoginReq"
import { getMe, postLogin } from "@/api/v1/services"

export interface UserInfo {
  username: string
  password: string
  meResp: MeResp
}

export interface MeResp {
  create_at: string
  id: number
  jhs_token: string
  jhs_username: string
  moecard_password: string
  moecard_token: string
  moecard_username: string
  otp: boolean
  update_at: string
  user: string
}

export let useUserInfo = () => {
  // 声明响应式数据。用于存储用户数据
  const state = reactive<UserInfo>({
    username: "",
    password: "",
    meResp: {
      create_at: "",
      id: 0,
      jhs_token: "",
      jhs_username: "",
      moecard_password: "",
      moecard_token: "",
      moecard_username: "",
      otp: false,
      update_at: "",
      user: "",
    },
  })

  // 生成用户信息
  let genUserInfoData = () => {
    getMe().then((resp) => {
      state.meResp.user = resp.username.substring(0, 2)
    })
  }

  onMounted(() => {
    state.meResp.user = "XX"
    genUserInfoData()
  })

  let login = () => {
    const loginReq: LoginReqBody = {
      username: state.username,
      password: state.password,
    }
    postLogin(loginReq)
      .then((resp) => {
        if (resp.message == "success") {
          ElMessage({
            message: "登录成功",
            type: "success",
            duration: 1000,
          })
          localStorage.setItem("token", resp.data.token)
          // window.location.reload()
          genUserInfoData
        } else {
          ElMessage({
            message: "登录失败",
            type: "error",
            duration: 1000,
          })
        }
      })
      .catch((err) => {
        ElMessage({
          message: err,
          type: "error",
        })
        console.log(err)
      })
  }

  return {
    ...toRefs(state),
    genUserInfoData,
    login,
  }
}
