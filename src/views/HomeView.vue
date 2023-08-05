<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"

import { postLogin } from "@/api/v1/services"
import type { LoginReqBody } from "@/api/v1/models/LoginReq"

let username = ref<string>("")
let password = ref<string>("")
const login = () => {
  const loginReq: LoginReqBody = {
    username: username.value,
    password: password.value,
  }
  postLogin(loginReq)
    .then((resp) => {
      if (resp.message == "success") {
        console.log(resp)
        ElMessage({
          message: "登录成功",
          type: "success",
          duration: 1000,
        })
        localStorage.setItem("token", resp.data.token)
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
</script>

<template>
  <h1>TCG</h1>
  我也不知道这网页能不能做得完。。。前端的东西好多要学啊。。。
  <div class="Login">
    <label>用户名：</label>
    <input type="text" v-model="username" placeholder="请输入您的用户名" />
    <br />
    <label>密码：</label>
    <input type="password" v-model="password" placeholder="请输入您的密码" />
    <br />
    <button type="button" @click="login">登录</button>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
