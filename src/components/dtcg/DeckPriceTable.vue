<script setup lang="ts">
import { ref } from "vue"
import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { NewDeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { postDeckPrice, getDeckPriceWithHID } from "@/api/v1/services"

let deck = ref<string>("")
let hid = ref<string>("")
let tableDataForDeckPriceResp = ref<DeckPriceResp>(NewDeckPriceResp())

// 示例JSON：
// ["Exported from http://digimon.card.moe","ST1-01","ST1-03","ST1-03","ST1-03","ST1-06","ST1-06","ST1-07","ST1-07","ST1-07","ST1-07","ST1-16","ST1-16","BT1-010","BT1-010","BT1-020","BT1-025","BT1-025","BT1-084","BT1-085","BT1-114","BT1-114","P-009","P-009","P-009","P-009","BT4-017","BT4-019","BT4-019","BT4-092","BT4-099","BT5-001","BT5-001","BT5-001","BT5-001","BT5-007","BT5-007","BT5-007","BT5-010","BT5-010","BT5-010","BT5-010","BT5-015","BT5-015","BT5-015","BT5-015","BT5-016","BT5-016","BT5-086","BT5-086","BT5-092","BT5-092","ST7-12","P-035","P-035","P-035"]
function commitWithOfficialJSON(deck: string) {
  let req = { deck: deck, envir: "chs" }
  postDeckPrice(req).then((resp) => {
    tableDataForDeckPriceResp.value.data = resp.data
    tableDataForDeckPriceResp.value.min_price = resp.min_price
    tableDataForDeckPriceResp.value.avg_price = resp.avg_price
  })
}

// 示例HID: 6cea907f6a001007281eaa8f52feb517a811a5bd
function commitWithHID(hid: string) {
  let req = hid
  getDeckPriceWithHID(req).then((resp) => {
    tableDataForDeckPriceResp.value.data = resp.data
    tableDataForDeckPriceResp.value.min_price = resp.min_price
    tableDataForDeckPriceResp.value.avg_price = resp.avg_price
  })
}
</script>

<template>
  <div>
    卡组HID：<input v-model="hid" type="text" />
    <button @click="commitWithHID(hid)">提交</button>
  </div>

  <div>
    卡组：<textarea v-model="deck" cols="45" rows="5"></textarea>
    <button @click="commitWithOfficialJSON(deck)">提交</button>
  </div>

  <div>
    <table border="1">
      <thead>
        <tr>
          <th>最低价</th>
          <th>集换价</th>
        </tr>
      </thead>
      <tr>
        <th>{{ tableDataForDeckPriceResp.min_price }}</th>
        <th>{{ tableDataForDeckPriceResp.avg_price }}</th>
      </tr>
    </table>
  </div>

  <div>
    <el-table :data="tableDataForDeckPriceResp.data" border>
      <el-table-column prop="sc_name" label="名称" />
      <el-table-column prop="count" label="数量" />
      <el-table-column prop="serial" label="编号" />
      <el-table-column prop="alternative_art" label="异画" sortable />
      <el-table-column prop="min_price" label="最低价" sortable />
      <el-table-column prop="avg_price" label="集换价" sortable />
    </el-table>
  </div>
</template>

<style scoped>
table {
  color: blue;
}
</style>
