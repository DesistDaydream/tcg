<script setup lang="ts">
import MySellProductsTable from "@/components/market/my_sell_products/MySellProductsTable.vue"
</script>

<template>
  <h1>我在卖的商品</h1>
  <h2>DTCG</h2>
  <el-row :gutter="20" justify="center" align="middle">
    <el-col :span="24">
      <MySellProductsTable></MySellProductsTable>
    </el-col>
  </el-row>
</template>

<style scoped></style>
