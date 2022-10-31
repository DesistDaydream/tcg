<script setup lang="ts">
import { ref } from "vue"
import Paging from "./Paging.vue"
import type { CardsDescResp } from "./models/CardsDescResp"
import axios from "axios"
import type { AxiosResponse } from "axios"

let respData: CardsDescResp = {
  count: 0,
  page_size: 0,
  page_current: 0,
  page_total: 0,
  data: [],
}

interface tableRow {
  serial: string
  sc_name: string
  alternative_art: string
}

let TableItems: tableRow[] = new Array<tableRow>()
let tableData = ref<tableRow[]>()
let tableHeader = ref({
  serial: "编号",
  sc_name: "名称",
  alternative_art: "异画",
})

let req = axios({
  method: "POST",
  url: "https://tcg.102205.xyz:8443/api/v1/card/desc",
  data: JSON.stringify({
    page_size: 4,
    page_num: 1,
  }),
})

req.then((resp: AxiosResponse) => {
  console.log(resp.data)
  respData = resp.data
  respData.data.forEach((element, index) => {
    TableItems.push({
      sc_name: element.sc_name,
      serial: element.serial,
      alternative_art: element.alternative_art,
    })
  })
  tableData.value = TableItems
})
</script>

<template>
  <h2>Vue3 + Element plus 动态表格</h2>
  <!-- 卡拉云表格 -->
  <el-table :data="tableData" style="width: 100%">
    <el-table-column
      :prop="index"
      :label="item"
      v-for="(item, index) in tableHeader"
      :key="index"
    >
    </el-table-column>
  </el-table>
  <!-- 官网表格 -->
  <!-- <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="scname" label="名称" />
    <el-table-column prop="serial" label="编号" />
    <el-table-column prop="alternative_art" label="异画" />
  </el-table> -->

  <div>
    <Paging />
  </div>
</template>

<style scoped></style>
