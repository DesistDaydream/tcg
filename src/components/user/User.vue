<script setup lang="ts">
import { ref } from "vue"
import Login from "@/components/login/Login.vue"
import { getMe } from "@/api/v1/services"

let user = ref("XX")

getMe().then((resp) => {
  user.value = resp.username.substring(0, 2)
})

const drawer = ref(false)
</script>

<template>
  <el-avatar class="avatar" v-model:user="user">
    <el-button type="primary" circle size="large" @click="drawer = true">
      {{ user }}
    </el-button>
  </el-avatar>

  <el-drawer v-model="drawer" title="登录">
    <!-- TODO: 除了用父子组件调用的方式以外，有没有可能让登录框在主页的时候，也能在登录后，让 el-avatar 中显示的值同步更新？
      用这种父子组件调用，就要使用抽屉方式隐藏，个人比较想把登录内容放在主页~~0.0顺便也巩固一下，这些值的传递到底是怎么才能过来。
      之前研究半天，登录功能放首页的话，登录后始终没法同步更新 {{ user }} 的值 -->
    <Login v-model:user="user" />
  </el-drawer>
</template>

<style>
.avatar {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 15px;
  margin-right: 20px;
}
</style>
