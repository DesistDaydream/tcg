<script setup lang="ts">
import { ref } from "vue"
import type { DeckPriceResp, Data } from "@/api/v1/models/DeckPriceResp"
import { NewDeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { postDeckPrice, getDeckPriceWithHID } from "@/api/v1/services"

// 表格中的数据
let tableDataForDeckPriceResp = ref<DeckPriceResp>(NewDeckPriceResp())

let deckJSON = ref<string>("")
// 示例JSON：
// ["Exported from http://digimon.card.moe","ST1-01","ST1-03","ST1-03","ST1-03","ST1-06","ST1-06","ST1-07","ST1-07","ST1-07","ST1-07","ST1-16","ST1-16","BT1-010","BT1-010","BT1-020","BT1-025","BT1-025","BT1-084","BT1-085","BT1-114","BT1-114","P-009","P-009","P-009","P-009","BT4-017","BT4-019","BT4-019","BT4-092","BT4-099","BT5-001","BT5-001","BT5-001","BT5-001","BT5-007","BT5-007","BT5-007","BT5-010","BT5-010","BT5-010","BT5-010","BT5-015","BT5-015","BT5-015","BT5-015","BT5-016","BT5-016","BT5-086","BT5-086","BT5-092","BT5-092","ST7-12","P-035","P-035","P-035"]
function commitWithDeckJSON(deckJSON: string) {
  let req = { deck: deckJSON, envir: "chs" }
  postDeckPrice(req).then((resp) => {
    tableDataForDeckPriceResp.value.data = resp.data
  })
}

let deckHID = ref<string>("")
// 示例HID: f078e7f43203337c507850c58ccd2d2312f135a3
function commitWithDeckHID(deckHID: string) {
  let req = deckHID
  getDeckPriceWithHID(req).then((resp) => {
    tableDataForDeckPriceResp.value.data = resp.data
  })
}

// 集换价和最低价这两列的排序逻辑
const sortAvgPrice = (a: Data, b: Data) => {
  return Number(a.avg_price) - Number(b.avg_price)
}
const sortMinPrice = (a: Data, b: Data) => {
  return Number(a.avg_price) - Number(b.avg_price)
}
</script>

<template>
  <div>
    卡组HID：
    <input v-model="deckHID" type="text" />
    <button @click="commitWithDeckHID(deckHID)">提交</button>
  </div>

  <div>
    卡组：
    <textarea v-model="deckJSON" cols="45" rows="5"></textarea>
    <button @click="commitWithDeckJSON(deckJSON)">提交</button>
  </div>

  <div>
    <el-table :data="tableDataForDeckPriceResp.data" show-summary border>
      <el-table-column prop="sc_name" label="名称" />
      <el-table-column prop="count" label="数量" width="70" />
      <el-table-column prop="serial" label="编号" width="100" />
      <el-table-column
        prop="alternative_art"
        label="异画"
        width="80"
        sortable
      />
      <el-table-column
        prop="min_price"
        label="最低价"
        width="100"
        sortable
        :sort-method="sortMinPrice"
      />
      <el-table-column
        prop="avg_price"
        label="集换价"
        width="100"
        sortable
        :sort-method="sortAvgPrice"
      />
    </el-table>
  </div>
</template>

<style scoped></style>
