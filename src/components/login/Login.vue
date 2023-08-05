<script setup lang="ts">
import { ref } from "vue"

// TODO: 如何在把相关逻辑放到单独 .ts 文件中之后，还可以将事件传递到父组件并更新值？
// import { useUserInfo } from "@/components/user/use_user_info"
// let { username, password, login } = useUserInfo()

import { ElMessage } from "element-plus"

import type { LoginReqBody } from "@/api/v1/models/LoginReq"
import { getMe, postLogin } from "@/api/v1/services"

// 不声明 props，父组件也能更新到值？这是为啥？
// let props = withDefaults(defineProps<{ user: string }>(), {
//   user: "XX",
// })

const emit = defineEmits<{
  // update 事件，用于更新父组件中的 num 值
  (event: "update:user", value: string): void
}>()

let username = ref<string>("")
let password = ref<string>("")
let login = () => {
  const loginReq: LoginReqBody = {
    username: username.value,
    password: password.value,
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
        emit("update:user", username.value.substring(0, 2))
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
  <el-form>
    <el-form-item label="用户名：">
      <el-input type="text" v-model="username" placeholder="请输入您的用户名" max="20" />
    </el-form-item>
    <el-form-item label="用户名：">
      <el-input type="password" v-model="password" placeholder="请输入您的用户名" max="20" />
    </el-form-item>
    <el-form-item>
      <el-button @click="login">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
