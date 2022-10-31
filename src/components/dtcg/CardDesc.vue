<template>
  <div>
    <h2>Vue3 + Element plus 动态表格</h2>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        :prop="index"
        :label="item"
        :key="index"
        v-for="(item, index) in tableHeader"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import type { CardDesc } from "./models/CardsDesc"

let resp: CardDesc = {
  count: 0,
  page_size: 0,
  page_current: 0,
  page_total: 0,
  data: [],
}

let TableItems: [] = []

let xhr = new XMLHttpRequest()
xhr.open("POST", "http://localhost:2205/api/v1/card/desc")
xhr.send(
  JSON.stringify({
    page_size: 10,
    page_num: 1,
  })
)

xhr.onload = function () {
  console.log(xhr.responseText)
  resp = JSON.parse(xhr.responseText)
  console.log(resp)
  resp.data.forEach((element) => {
    TableItems.push({
      sc_name: element.sc_name,
      serial: element.serial,
      alternative_art: element.alternative_art,
    })
  })
}

export default {
  name: "test",
  data() {
    return {
      tableHeader: {
        sc_name: "卡名",
        serial: "编号",
        alternative_art: "异画",
      },
      tableData: TableItems,
    }
  },
}
</script>
