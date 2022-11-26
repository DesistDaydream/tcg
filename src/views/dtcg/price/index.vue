<script setup lang="ts">
import { ref } from "vue"

import DeckPriceTable from "@/components/dtcg/DeckPriceTable.vue"
import CardPriceTable from "@/components/dtcg/CardPriceTable.vue"
import DeckInput from "@/components/dtcg/DeckInput.vue"

import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { NewDeckPriceResp } from "@/api/v1/models/DeckPriceResp"

// 卡组价格表格数据
let tableDataForDeckPriceResp = ref<DeckPriceResp>(NewDeckPriceResp())
</script>

<template>
  <h1>卡组价格查询</h1>
  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="24">
      <div><DeckPriceTable :tableDataForDeckPriceResp="tableDataForDeckPriceResp"></DeckPriceTable></div>
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="24">
      <DeckInput :tableDataForDeckPriceResp="tableDataForDeckPriceResp" />
    </el-col>
  </el-row>

  <el-row :gutter="20">
    <el-col :span="24">
      <CardPriceTable :tableDataForDeckPriceResp="tableDataForDeckPriceResp"></CardPriceTable>
    </el-col>
  </el-row>
</template>
