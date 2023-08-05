<script setup lang="ts">
import { ref } from "vue"

import DeckPriceTable from "@/components/dtcg/DeckPriceTable.vue"
import CardPriceTable from "@/components/dtcg/CardPriceTable.vue"
import DeckInput from "@/components/dtcg/DeckInput.vue"

import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { NewDeckPriceResp } from "@/api/v1/models/DeckPriceResp"

// 卡组价格表格数据
let tableDataFromDeckPriceResp = ref<DeckPriceResp>(NewDeckPriceResp())
// 表格遮罩层。当表格数据正在加载时，显示遮罩层
let tableLoading = ref({ loading: false })
</script>

<template>
  <h1>卡牌价格列表</h1>
  <el-collapse>
    <el-collapse-item title="卡牌价格列表" name="1">
      <el-row :gutter="20">
        <el-col :span="24">
          <CardPriceTable :tableDataFromDeckPriceResp="tableDataFromDeckPriceResp"></CardPriceTable>
        </el-col>
      </el-row>
    </el-collapse-item>
  </el-collapse>

  <h1>卡组价格查询</h1>
  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="24">
      <DeckInput :tableDataFromDeckPriceResp="tableDataFromDeckPriceResp" :tableLoading="tableLoading" />
    </el-col>
  </el-row>

  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="24">
      <DeckPriceTable :tableDataFromDeckPriceResp="tableDataFromDeckPriceResp" :tableLoading="tableLoading"></DeckPriceTable>
    </el-col>
  </el-row>
</template>

<style scoped></style>
