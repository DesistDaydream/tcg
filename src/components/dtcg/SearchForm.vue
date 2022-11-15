<script setup lang="ts">
import {} from "vue"
import { Search } from "@element-plus/icons-vue"

interface ProTableProps {
  keyword: string
}

// 默认值
let props = withDefaults(defineProps<ProTableProps>(), {
  keyword: "",
})

let emit = defineEmits<{
  (event: "update:keyword", value: string): void
  (event: "handle-search"): void
}>()

let k = props.keyword

let handleSearch = () => {
  console.log("子组件中的关键字", k)

  emit("update:keyword", k)
  emit("handle-search")
}
</script>

<template>
  <el-input v-model="keyword" placeholder="关键字" class="input-with-select"></el-input>

  <el-button :icon="Search" @click="handleSearch">搜索</el-button>
</template>

<style scoped></style>
