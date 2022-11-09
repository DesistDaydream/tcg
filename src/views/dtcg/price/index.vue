<script setup lang="ts">
import DeckPriceTable from "@/components/dtcg/DeckPriceTable.vue"
import CardPriceTable from "@/components/dtcg/CardPriceTable.vue"
</script>

<template>
  <h2>卡组价格查询</h2>
  <el-row :gutter="20">
    <el-col :span="12">
      <div class="grid-content ep-bg-purple" />
      <div><DeckPriceTable /></div>
    </el-col>
  </el-row>

  <div><CardPriceTable /></div>
</template>
