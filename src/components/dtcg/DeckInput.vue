<script setup lang="ts">
import { ref } from "vue"
import { postDeckPriceWithJSON, getDeckPriceWithHID, getDeckPriceWithCDID } from "@/api/v1/services"
import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"

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
  postDeckPriceWithJSON(req).then((resp) => {
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
</template>

<style scoped></style>
