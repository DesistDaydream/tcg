<script setup lang="ts">
import { ref } from "vue"
import { Search } from "@element-plus/icons-vue"

import { postDeckPriceWithJSON, getDeckPriceWithHID, getDeckPriceWithCDID, getDeckPriceWithWLID } from "@/api/v1/services"
import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"

const props = defineProps<{
  tableDataForDeckPriceResp: DeckPriceResp
  tableLoading: { loading: boolean }
}>()

let deckHID = ref<string>("")
// 示例HID: f078e7f43203337c507850c58ccd2d2312f135a3
function commitWithDeckHID(deckHID: string) {
  props.tableLoading.loading = true

  getDeckPriceWithHID(deckHID)
    .then((resp) => {
      props.tableDataForDeckPriceResp.data = resp.data
      props.tableLoading.loading = false
    })
    .catch((err) => {
      props.tableLoading.loading = false
    })
}

let deckCDID = ref<string>("")
// 示例CDID: 106981
function commitWithDeckCDID(deckCDID: string) {
  props.tableLoading.loading = true

  getDeckPriceWithCDID(deckCDID)
    .then((resp) => {
      props.tableDataForDeckPriceResp.data = resp.data
      props.tableLoading.loading = false
    })
    .catch((err) => {
      props.tableLoading.loading = false
    })
}

let deckJSON = ref<string>("")
// 示例JSON：
// ["Exported from http://digimon.card.moe","ST1-01","ST1-03","ST1-03","ST1-03","ST1-06","ST1-06","ST1-07","ST1-07","ST1-07","ST1-07","ST1-16","ST1-16","BT1-010","BT1-010","BT1-020","BT1-025","BT1-025","BT1-084","BT1-085","BT1-114","BT1-114","P-009","P-009","P-009","P-009","BT4-017","BT4-019","BT4-019","BT4-092","BT4-099","BT5-001","BT5-001","BT5-001","BT5-001","BT5-007","BT5-007","BT5-007","BT5-010","BT5-010","BT5-010","BT5-010","BT5-015","BT5-015","BT5-015","BT5-015","BT5-016","BT5-016","BT5-086","BT5-086","BT5-092","BT5-092","ST7-12","P-035","P-035","P-035"]
function commitWithDeckJSON(deckJSON: string) {
  props.tableLoading.loading = true

  let req = { deck: deckJSON, envir: "chs" }
  postDeckPriceWithJSON(req)
    .then((resp) => {
      props.tableDataForDeckPriceResp.data = resp.data
      props.tableLoading.loading = false
    })
    .catch((err) => {
      props.tableLoading.loading = false
    })
}

let jhsWishListID = ref<string>("")
function commitWithJhsWishListID(jhsWishListID: string) {
  props.tableLoading.loading = true
  getDeckPriceWithWLID(jhsWishListID)
    .then((resp) => {
      props.tableDataForDeckPriceResp.data = resp.data
      props.tableLoading.loading = false
    })
    .catch((err) => {
      props.tableLoading.loading = false
    })
}
</script>

<template>
  <el-form :inline="true">
    <el-form-item label="卡组HID">
      <el-input v-model="deckHID" placeholder="卡组广场的url中的ID" @keyup.enter.native="commitWithDeckHID(deckHID)">
        <template #append>
          <el-button :icon="Search" @click="commitWithDeckHID(deckHID)"></el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="卡组CDID">
      <el-input v-model="deckCDID" placeholder="个人云卡组url中的ID" @keyup.enter.native="commitWithDeckCDID(deckCDID)">
        <template #append>
          <el-button :icon="Search" @click="commitWithDeckCDID(deckCDID)"></el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="卡组JSON">
      <el-input v-model="deckJSON" placeholder="卡组JSON" @keyup.enter.native="commitWithDeckJSON(deckJSON)">
        <template #append>
          <el-button :icon="Search" @click="commitWithDeckJSON(deckJSON)"></el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item label="集换社心愿单ID">
      <el-input v-model="jhsWishListID" placeholder="集换社心愿单ID" @keyup.enter.native="commitWithJhsWishListID(jhsWishListID)">
        <template #append>
          <el-button :icon="Search" @click="commitWithJhsWishListID(jhsWishListID)"></el-button>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<style scoped></style>
