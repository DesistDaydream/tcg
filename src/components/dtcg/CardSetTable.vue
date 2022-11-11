<script setup lang="ts">
import { ref } from "vue"
import type { Data } from "@/api/v1/models/CardSetResp"
import { postCardSet } from "@/api/v1/services"

const currentPage = ref<number>(1)
const pageSize = ref<number>(20)
const cardsCount = ref<number>(0)
const tableData = ref<Data[]>()

function genTableData() {
  postCardSet({
    page_size: pageSize.value,
    page_num: currentPage.value,
  }).then((resp) => {
    tableData.value = resp.data
    cardsCount.value = resp.count
  })
}

genTableData()

const handleSizeChange = (val: number) => {
  genTableData()
}
const handleCurrentChange = (val: number) => {
  genTableData()
}
</script>

<template>
  <h2>卡集详情</h2>
  <!-- 当一次性获取所有数据时，可以使用 :data="tableData?.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="set_name" label="名称" />
    <el-table-column prop="set_prefix" label="编号" />
  </el-table>

  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50, 100]"
      :total="cardsCount"
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped></style>
