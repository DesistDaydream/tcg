<script setup lang="ts">
import { ref } from "vue"

import type { ProductsListReqQuery } from "@/api/jhs/models/ProductsListReq"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"
import { getProductsList } from "@/api/jhs/services"

const currentPage = ref<number>(1)
const pageSize = ref<number>(15)
const cardsCount = ref<number>(0)

const tableData = ref<ProductsListRespData[]>()

let token = ref<string>("")
let keyword = ref<string>("")

function genTableData(page: string) {
  const productsListReqQuery: ProductsListReqQuery = {
    game_key: "dgm",
    game_sub_key: "sc",
    keyword: keyword.value,
    on_sale: "1",
    page: page,
    sorting: "published_at_desc",
  }

  getProductsList(productsListReqQuery, token.value).then((resp) => {
    tableData.value = resp.data
    cardsCount.value = resp.total
  })
}

const handleSizeChange = (val: number) => {
  genTableData(currentPage.value.toString())
}
const handleCurrentChange = (currentPage: number) => {
  genTableData(currentPage.toString())
}
const getTableData = () => {
  genTableData(currentPage.value.toString())
}
</script>

<template>
  <el-input v-model="token" placeholder="token" class="input-with-select"></el-input>
  <el-button type="primary" @click="getTableData">获取数据</el-button>

  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="selection" />
    <el-table-column prop="product_id" label="商品编号" />
    <el-table-column prop="card_version_number" label="卡牌编号" />
    <el-table-column prop="card_name_cn" label="卡牌名称" />
    <el-table-column prop="price" label="商品价格" />
    <el-table-column prop="quantity" label="售卖数量" />
  </el-table>

  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[15]"
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
