<script setup lang="ts">
import { ref } from "vue"
import axios from "axios"

import type { ProductsListReqQuery } from "@/api/jhs/models/ProductsListReq"
import { getProductsList } from "@/api/jhs/services"

let token = ref<string>("")
let tableData = ref()
let currentPage = ref<number>(1)
let pageSize = ref<number>(5)
let cardsCount = ref<number>(0)

function genTableData() {
  const productsListReqQuery: ProductsListReqQuery = {
    gaem_key: "dgm",
    game_sub_key: "sc",
    keyword: "",
    on_sale: "1",
    page: "1",
    sorting: "published_at_desc",
  }

  getProductsList(productsListReqQuery, token.value).then((resp) => {
    tableData.value = resp.data
    cardsCount.value = resp.count
  })
}

const handleSizeChange = (val: number) => {
  genTableData()
}
const handleCurrentChange = (val: number) => {
  genTableData()
}
const getTableData = () => {
  genTableData()
}
</script>

<template>
  <h1>我在卖的商品</h1>
  <h2>DTCG</h2>
  <el-input v-model="token" placeholder="token" class="input-with-select"></el-input>
  <el-button type="primary" @click="getTableData">获取数据</el-button>

  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="product_id" label="商品编号"></el-table-column>
    <el-table-column prop="card_version_number" label="卡牌编号"></el-table-column>
    <el-table-column prop="card_name_cn" label="卡牌名称"></el-table-column>
    <el-table-column prop="price" label="商品价格"></el-table-column>
  </el-table>
  <div class="demo-pagination-block">
    <div class="demonstration">All combined</div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[5, 10, 20, 50, 100]"
      :total="cardsCount"
      :background="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" />
  </div>
</template>

<style scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
