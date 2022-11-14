<script setup lang="ts">
import {} from "vue"
import { Search } from "@element-plus/icons-vue"

interface ProTableProps {
  keyword: string
}

// 默认值
const props = withDefaults(defineProps<ProTableProps>(), {
  keyword: "",
})

const emit = defineEmits<{
  (event: "update:keyword", value: string): void
  (event: "handle-search"): void
}>()

const handleSearch = () => {
  emit("update:keyword", props.keyword)
  emit("handle-search")
}
</script>

<template>
  <el-input v-model="keyword" placeholder="关键字" class="input-with-select">
    <template #append>
      <el-button :icon="Search" @click="handleSearch" />
    </template>
  </el-input>
</template>

<style scoped></style>
