<script setup lang="ts">
interface Props {
  pageSize: number
  pageNum: number
  cardsCount: number
}

const props = withDefaults(defineProps<Props>(), {
  pageSize: 10,
  pageNum: 1,
  totalCards: 100,
})

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <div class="flex items-center mb-4"></div>

  <hr class="my-4" />

  <div class="demo-pagination-block">
    <div class="demonstration">All combined</div>
    <el-pagination
      v-model:currentPage="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[10, 50, 100]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      :total="cardsCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
