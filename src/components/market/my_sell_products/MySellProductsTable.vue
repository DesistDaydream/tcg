<script setup lang="ts">
import { ref } from "vue"

import { Search } from "@element-plus/icons-vue"

import type { ProductsListReqQuery } from "@/api/jhs/models/ProductsListReq"
import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"
import { getProductsList, putProduct } from "@/api/jhs/services"

const currentPage = ref<number>(1)
const pageSize = ref<number>(15)
const cardsCount = ref<number>(0)

const tableData = ref<ProductsListRespData[]>()

let token = ref<string>("")
let keyword = ref<string>("")

function genTableData() {
  let page = currentPage.value.toString()
  const productsListReqQuery: ProductsListReqQuery = {
    game_key: "dgm",
    game_sub_key: "sc",
    keyword: keyword.value,
    on_sale: "1",
    page: page,
    sorting: "published_at_desc",
  }

  getProductsList(productsListReqQuery, token.value).then((resp) => {
    // 由于表格中那个可以改变数值的 input 只能接收 number，所以转换一下
    const { data } = resp
    data.forEach((item: any) => {
      item.price = Number(item.price)
      item.quantity = Number(item.quantity)
    })
    // TODO: 如果数据量大，这么转换是不是不太好？~尝试使用 computed() 来监听 tableData 的变化

    tableData.value = resp.data
    cardsCount.value = resp.total
  })
}

const handleSizeChange = (val: number) => {
  genTableData()
}
const handleCurrentChange = (currentPage: number) => {
  genTableData()
}
const getTableData = () => {
  genTableData()
}

const handleSearch = (keyword: string) => {
  genTableData()
}

// 提交按钮点击后输出当前行数据
const handleRowSubmit = (row: ProductsListRespData) => {
  console.log("检查当前要更新的商品信息", row)

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
    token.value
  ).then((resp) => {
    console.log(resp)
  })
}
</script>

<template>
  <el-input v-model="token" placeholder="token" class="input-with-select"></el-input>
  <el-button type="primary" @click="getTableData">获取数据</el-button>

  <div>
    <el-form ref="formInstance" :inline="true">
      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="keyword" placeholder="关键字、编号" @keyup.enter.native="handleSearch" />
      </el-form-item>

      <el-form-item>
        <el-button :icon="Search" @click="handleSearch">搜索</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="selection" />
      <el-table-column prop="product_id" label="商品编号" />
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
          <el-button type="primary" @click="handleRowSubmit(row)">提交</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      v-model:total="cardsCount"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[15]"
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
