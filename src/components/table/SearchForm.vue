<script setup lang="ts">
import { ref } from "vue"
import type { FormInstance } from "element-plus"
import { Search } from "@element-plus/icons-vue"
import type { SearchParam } from "@/components/dtcg/interface/models/card_price_table"

interface ProTableProps {
  searchParam: SearchParam
  handleSearch: () => void
}
defineProps<ProTableProps>()

// 搜索表单控制
const formInstance = ref<FormInstance>()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <el-form ref="formInstance" :model="searchParam" :inline="true">
    <el-form-item label="关键字" prop="keyword">
      <!-- @keyup.enter.native 输入回车时执行的操作 -->
      <el-input v-model="searchParam.keyword" placeholder="关键字、编号" @keyup.enter.native="handleSearch" />
    </el-form-item>

    <el-form-item label="是否是异画" prop="alternativeArt">
      <el-select v-model="searchParam.alternativeArt" placeholder="异画/原画">
        <el-option label="异画" value="是" />
        <el-option label="原画" value="否" />
      </el-select>
    </el-form-item>

    <el-form-item>
      <el-button :icon="Search" @click="handleSearch">搜索</el-button>
      <el-button @click="resetForm(formInstance)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
