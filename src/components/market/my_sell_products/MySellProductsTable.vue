<script setup lang="ts">
import { ref } from "vue"

import { Search } from "@element-plus/icons-vue"

import type { ProductsListReqQuery } from "@/api/jhs/models/ProductsListReq"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"
import { getProductsList, putProduct } from "@/api/jhs/services"
import type { SearchParam } from "@/components/market/interface/models/card_price_table"

const searchParam = ref<SearchParam>({
  token: "",
  keyword: "",
})
const currentPage = ref<number>(1)
const pageSize = ref<number>(15)
const cardsCount = ref<number>(0)

const tableData = ref<ProductsListRespData[]>()

function genTableData() {
  let page = currentPage.value.toString()
  const productsListReqQuery: ProductsListReqQuery = {
    game_key: "dgm",
    game_sub_key: "sc",
    keyword: searchParam.value.keyword,
    on_sale: "1",
    page: page,
    sorting: "",
    rarity: "",
  }

  getProductsList(productsListReqQuery, searchParam.value.token).then((resp) => {
    // 由于表格中那个可以改变数值的 input 只能接收 number，所以转换一下
    resp.data.forEach((item: any) => {
      item.price = Number(item.price)
    })
    // TODO: 如果数据量大，这么转换是不是不太好？~尝试使用 computed() 来监听 tableData 的变化

    tableData.value = resp.data
    cardsCount.value = resp.total
  })
}
const handleRowSubmit = (row: ProductsListRespData) => {
  console.log("检查当前要更新的商品信息", row.product_id, row.price, row.quantity)

  putProduct(
    {
      authenticator_id: "",
      grading: "",
      condition: row.condition.toString(),
      on_sale: row.on_sale.toString(),
      price: row.price,
      quantity: row.quantity.toString(),
      remark: row.remark,
      user_card_version_image: row.card_version_image,
    },
    row.product_id.toString(),
    searchParam.value.token
  ).then((resp) => {
    console.log(resp)
  })
}
</script>

<template>
  <div>
    <!-- 提交表单 -->
    <el-form ref="formInstance" :model="searchParam" :inline="true">
      <el-input v-model="searchParam.token" placeholder="token" class="input-with-select" @keyup.enter.native="genTableData"></el-input>
      <el-button type="primary" @click="genTableData">获取数据</el-button>

      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="searchParam.keyword" placeholder="关键字、编号" @keyup.enter.native="genTableData" />
      </el-form-item>

      <el-form-item>
        <el-button :icon="Search" @click="genTableData">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" border>
      <!-- TODO: 对已多选的行执行一些操作 -->
      <el-table-column type="selection" />
      <el-table-column prop="product_id" label="商品ID" />
      <el-table-column prop="card_version_number" label="卡牌编号" />
      <el-table-column prop="card_name_cn" label="卡牌名称" />

      <el-table-column label="商品价格">
        <template #default="scope">
          <el-input-number v-model="scope.row.price" :min="0.1" :step="0.1"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column label="售卖数量">
        <template #default="scope">
          <el-input-number v-model="scope.row.quantity" :min="1" :step="1"></el-input-number>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <!-- 两种获取行信息的方式，这里不是用的 scope，而是 {row} -->
        <template #default="{ row }">
          <el-button type="primary" @click="handleRowSubmit(row)">更新</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 分页 -->
  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:total="cardsCount"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[15]"
      :background="true"
      @size-change="genTableData"
      @current-change="genTableData" />
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
