<script setup lang="ts">
import DeckPriceTable from "@/views/dtcg/price/deck_price/DeckPriceTable.vue"
import CardPriceTable from "@/views/dtcg/price/card_price/CardPriceTable.vue"
</script>

<template>
  <h2>卡组价格查询</h2>
  <el-row :gutter="20">
    <el-col :span="12">
      <div><DeckPriceTable /></div>
    </el-col>
  </el-row>

  <div><CardPriceTable /></div>
</template>
