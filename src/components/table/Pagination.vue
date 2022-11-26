<script setup lang="ts">
interface PaginationProps {
  pageSize: number
  pageNum: number
  cardsCount: number
  handlePageSizeChange: (pageSize: number) => void
  handlePageNumChange: (pageNum: number) => void
}

defineProps<PaginationProps>()
</script>

<template>
  <el-pagination
    v-model:current-page="pageNum"
    v-model:page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :page-sizes="[5, 10, 20, 50, 100]"
    :total="cardsCount"
    :background="true"
    @sizeChange="handlePageSizeChange"
    @currentChange="handlePageNumChange"></el-pagination>
</template>

<style scoped></style>
