<script setup lang="ts">
import { ref } from "vue"

import DeckPriceTable from "@/views/dtcg/price/deck_price/DeckPriceTable.vue"
import CardPriceTable from "@/views/dtcg/price/card_price/CardPriceTable.vue"

import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { NewDeckPriceResp } from "@/api/v1/models/DeckPriceResp"

// 卡组价格表格数据
let tableDataForDeckPriceResp = ref<DeckPriceResp>(NewDeckPriceResp())
</script>

<template>
  <h1>卡组价格查询</h1>
  <el-row></el-row>

  <el-row :gutter="20">
    <el-col :span="12">
      <div><DeckPriceTable :tableDataForDeckPriceResp="tableDataForDeckPriceResp"></DeckPriceTable></div>
    </el-col>
  </el-row>

  <div><CardPriceTable :tableDataForDeckPriceResp="tableDataForDeckPriceResp"></CardPriceTable></div>
</template>
