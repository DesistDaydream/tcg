<script setup lang="ts">
import Paging from "./Paging.vue"
import type { CardsDescResp } from "./models/CardsDesc"
import axios from "axios"
import type { AxiosResponse } from "axios"

let respData: CardsDescResp = {
  count: 0,
  page_size: 0,
  page_current: 0,
  page_total: 0,
  data: [],
}

interface tb {
  serial: string
  scname: string
  alternative_art: string
}

let TableItems: tb[] = new Array<tb>()

// 为什么要手动赋值之后，再改变浏览器大小才能在页面显示数据？
// TableItems = [
//   {
//     scname: "XXX",
//     serial: "ABC-001",
//     alternative_art: "是",
//   },
// ]

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
    let t: tb = {
      scname: element.sc_name,
      serial: element.serial,
      alternative_art: element.alternative_art,
    }
    TableItems.push(t)
  })
})

let tableData = TableItems

console.log("push 数据", TableItems)
// console.log("需要渲染的数据", tableData)
</script>

<template>
  <h2>Vue3 + Element plus 动态表格</h2>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="scname" label="名称" />
    <el-table-column prop="serial" label="编号" />
    <el-table-column prop="alternative_art" label="异画" />
  </el-table>

  <div>
    <Paging />
  </div>
</template>

<style scoped></style>
