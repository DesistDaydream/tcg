<script setup lang="ts">
import { ref } from "vue"
import type { DeckPriceResp, DeckPriceRespData } from "@/api/v1/models/DeckPriceResp"
import { postDeckPrice, getDeckPriceWithHID, getDeckPriceWithCDID } from "@/api/v1/services"

const props = defineProps<{
  tableDataForDeckPriceResp: DeckPriceResp
}>()

let deckHID = ref<string>("")
// 示例HID: f078e7f43203337c507850c58ccd2d2312f135a3
function commitWithDeckHID(deckHID: string) {
  let req = deckHID
  getDeckPriceWithHID(req).then((resp) => {
    props.tableDataForDeckPriceResp.data = resp.data
  })
}

let deckJSON = ref<string>("")
// 示例JSON：
// ["Exported from http://digimon.card.moe","ST1-01","ST1-03","ST1-03","ST1-03","ST1-06","ST1-06","ST1-07","ST1-07","ST1-07","ST1-07","ST1-16","ST1-16","BT1-010","BT1-010","BT1-020","BT1-025","BT1-025","BT1-084","BT1-085","BT1-114","BT1-114","P-009","P-009","P-009","P-009","BT4-017","BT4-019","BT4-019","BT4-092","BT4-099","BT5-001","BT5-001","BT5-001","BT5-001","BT5-007","BT5-007","BT5-007","BT5-010","BT5-010","BT5-010","BT5-010","BT5-015","BT5-015","BT5-015","BT5-015","BT5-016","BT5-016","BT5-086","BT5-086","BT5-092","BT5-092","ST7-12","P-035","P-035","P-035"]
function commitWithDeckJSON(deckJSON: string) {
  let req = { deck: deckJSON, envir: "chs" }
  postDeckPrice(req).then((resp) => {
    props.tableDataForDeckPriceResp.data = resp.data
  })
}

let deckCDID = ref<string>("")
// 示例CDID: 106981
function commitWithDeckCDID(deckCDID: string) {
  let req = deckCDID
  getDeckPriceWithCDID(req).then((resp) => {
    props.tableDataForDeckPriceResp.data = resp.data
  })
}

// 集换价和最低价这两列的排序逻辑
const sortAvgPrice = (a: DeckPriceRespData, b: DeckPriceRespData) => {
  return Number(a.avg_price) - Number(b.avg_price)
}
const sortMinPrice = (a: DeckPriceRespData, b: DeckPriceRespData) => {
  return Number(a.min_price) - Number(b.min_price)
}

// 添加表格中一个卡牌的数量
const handleAdd = (row: DeckPriceRespData) => {
  row.count += 1
  // 更新最低价和集换价，保留小数点后两位
  row.avg_price = (Number(row.avg_price) + Number(row.avg_unit_price)).toFixed(2).toString()
  row.min_price = (Number(row.min_price) + Number(row.min_unit_price)).toFixed(2).toString()
  console.log(row)
}
// 减少表中一个卡牌的数量，降到0时删除该卡
const handleDel = (row: DeckPriceRespData) => {
  row.count -= 1
  // 更新最低价和集换价
  row.avg_price = (Number(row.avg_price) - Number(row.avg_unit_price)).toFixed(2).toString()
  row.min_price = (Number(row.min_price) - Number(row.min_unit_price)).toFixed(2).toString()

  // 若卡牌数量为0，则删除该行
  if (row.count === 0) {
    props.tableDataForDeckPriceResp.data = props.tableDataForDeckPriceResp.data.filter((item) => item !== row)
  }

  console.log(row)
}
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <textarea v-model="deckHID" cols="33" rows="5" placeholder="卡组HID"></textarea>
      <button @click="commitWithDeckHID(deckHID)">提交</button>
    </el-col>

    <el-col :span="8">
      <textarea v-model="deckJSON" cols="33" rows="5" placeholder="卡组JSON"></textarea>
      <button @click="commitWithDeckJSON(deckJSON)">提交</button>
    </el-col>

    <el-col :span="8">
      <textarea v-model="deckCDID" cols="33" rows="5" placeholder="卡组CDID"></textarea>
      <button @click="commitWithDeckCDID(deckCDID)">提交</button>
    </el-col>
  </el-row>

  <div>
    <el-table :data="tableDataForDeckPriceResp.data" show-summary border>
      <el-table-column prop="sc_name" label="名称" />
      <el-table-column prop="count" label="数量" width="70" />
      <el-table-column prop="serial" label="编号" width="100" />
      <el-table-column prop="alternative_art" label="异画" width="80" sortable />
      <el-table-column prop="min_unit_price" label="最低单价" width="110" sortable />
      <el-table-column prop="avg_unit_price" label="集换单价" width="110" sortable />
      <el-table-column prop="min_price" label="最低价" width="100" sortable :sort-method="sortMinPrice" />
      <el-table-column prop="avg_price" label="集换价" width="100" sortable :sort-method="sortAvgPrice" />
      <el-table-column fixed="right" label="操作" width="120" sortable>
        <template #default="scope">
          <el-button link type="primary" @click="handleAdd(scope.row)">添加</el-button>
          <el-button link type="primary" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
