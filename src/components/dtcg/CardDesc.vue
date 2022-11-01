<script setup lang="ts">
import { ref } from "vue"
import type { Data } from "./api/v1/models/tableData"
import { getCardsDesc } from "./api/v1/api"

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const cardsCount = ref<number>(0)

const tableData = ref<Data[]>()
const tableHeader = ref({
  sc_name: "名称",
  serial: "编号",
  alternative_art: "异画",
})

function genTableData() {
  getCardsDesc(pageSize.value, currentPage.value).then((resp) => {
    console.log(resp)
    tableData.value = resp.data
    cardsCount.value = resp.count
  })
}

genTableData()

const handleSizeChange = (val: number) => {
  console.log(`${val} 条/页`)

  genTableData()
}
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`)

  genTableData()
}
</script>

<template>
  <h2>Vue3 + Element plus 动态表格</h2>
  <!-- 卡拉云表格 -->
  <!-- 当一次性获取所有数据时，可以使用 :data="tableData?.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
    如何使用 :data="tableData" 的时候，在点击页面后再渲染后面的数据呢？ -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      v-for="(item, index) in tableHeader"
      :prop="index"
      :label="item"
      :key="index"
    >
    </el-table-column>
  </el-table>
  <!-- 官网表格 -->
  <!-- <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="sc_name" label="名称" />
    <el-table-column prop="serial" label="编号" />
    <el-table-column prop="alternative_art" label="异画" />
  </el-table> -->
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

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
