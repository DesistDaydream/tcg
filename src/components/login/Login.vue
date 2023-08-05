<script setup lang="ts">
import {} from "vue"
import { useUserInfo } from "@/components/user/use_user_info"

let { username, password, login } = useUserInfo()
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
