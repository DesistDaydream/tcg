<script setup lang="ts">
import {} from "vue"
import { Search } from "@element-plus/icons-vue"
import type { SearchParam } from "@/components/dtcg/interface/models/card_price_table"

interface ProTableProps {
  searchParam: SearchParam
  handleSearch: () => void
}

defineProps<ProTableProps>()
</script>

<template>
  <el-input v-model="searchParam.keyword" placeholder="关键字、编号" class="input-with-select" @keyup.enter.native="handleSearch"></el-input>
  <el-button :icon="Search" @click="handleSearch">搜索</el-button>
</template>

<style scoped></style>
