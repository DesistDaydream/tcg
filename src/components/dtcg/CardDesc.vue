<script setup lang="ts">
import { ref } from "vue"
import Paging from "./Paging.vue"
import type { CardsDescResp } from "./api/v1/models/CardsDescResp"
import { postCardsDesc } from "./api/v1/api"
import type { AxiosResponse } from "axios"
import axios from "axios"

let respData: CardsDescResp

interface tableRow {
  serial: string
  sc_name: string
  alternative_art: string
}

const TableItems: tableRow[] = new Array<tableRow>()
const tableData = ref<tableRow[]>()
const tableHeader = ref({
  sc_name: "名称",
  serial: "编号",
  alternative_art: "异画",
})
const cardsCount = ref<number>(0)
const pageSize = ref<number>(4)
const pageNum = ref<number>(1)

let req = axios({
  method: "POST",
  url: "https://tcg.102205.xyz:8443/api/v1/card/desc",
  data: JSON.stringify({
    page_size: pageSize.value,
    page_num: pageNum.value,
  }),
})

req.then((resp: AxiosResponse) => {
  console.log(resp.data)
  respData = resp.data

  // 处理响应体数据
  cardsCount.value = respData.count
  respData.data.forEach((element, index) => {
    TableItems.push({
      sc_name: element.sc_name,
      serial: element.serial,
      alternative_art: element.alternative_art,
    })
  })
  tableData.value = TableItems
})

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}
</script>

<template>
  <h2>Vue3 + Element plus 动态表格</h2>
  <!-- 卡拉云表格 -->
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
