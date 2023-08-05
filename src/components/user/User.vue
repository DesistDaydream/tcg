<script setup lang="ts">
import { useUserInfo } from "@/components/user/use_user_info"

let { meResp } = useUserInfo()
</script>

<template>
  <el-avatar class="avatar" v-model="meResp.user">
    {{ meResp.user }}
  </el-avatar>
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
