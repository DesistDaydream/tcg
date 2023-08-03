<script setup lang="ts">
import { Search } from "@element-plus/icons-vue"
import { ElMessage } from "element-plus"

import type { ProductsListRespData } from "@/api/jhs/models/ProductsListResp"
import { putProduct } from "@/api/jhs/services"
import { useProductsTable } from "@/components/market/interface/use_sell_products_table"

let { searchParam, tableData, pagination, genSellProductsTableData, userInfo } = useProductsTable()

const handleRowSubmit = (row: ProductsListRespData) => {
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
    userInfo.jhs_token
  ).then((resp) => {
    if (resp.message == "success") {
      ElMessage({
        message: "更新成功",
        type: "success",
      })
    } else {
      console.log(resp)
      ElMessage({
        message: "更新失败",
        type: "error",
      })
    }
  })
}
</script>

<template>
  <div>
    <!-- 提交表单 -->
    <el-form ref="formInstance" :model="searchParam" :inline="true">
      <!-- <el-input v-model="searchParam.userID" placeholder="userID" class="input-with-select" @keyup.enter.native="genSellProductsTableData"></el-input> -->
      <el-button type="primary" @click="genSellProductsTableData">获取数据</el-button>

      <el-form-item label="关键字" prop="keyword">
        <el-input v-model="searchParam.keyword" placeholder="关键字、编号" @keyup.enter.native="genSellProductsTableData" />
      </el-form-item>

      <el-form-item>
        <el-button :icon="Search" @click="genSellProductsTableData">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>

  <div>
    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      style="width: 100%"
      border
      :cell-style="{ 'text-align': 'center' }"
      :header-cell-style="{ 'text-align': 'center', padding: '5px' }">
      <!-- TODO: 对已多选的行执行一些操作 -->
      <el-table-column type="selection" />
      <el-table-column prop="product_id" label="商品ID" width="100" />
      <el-table-column prop="card_version_image" label="图片" width="120">
        <template #default="slotProps">
          <img :src="slotProps.row.card_version_image" referrerpolicy="no-referrer" min-width="70" height="70" v-viewer />
        </template>
      </el-table-column>

      <el-table-column label="编号-稀有度/名称" width="250">
        <template #default="slotProps">
          <span>{{ slotProps.row.card_version_number }}</span>
          -
          <span>{{ slotProps.row.card_version_rarity }}</span>
          <br />
          <span>{{ slotProps.row.card_name_cn }}</span>
        </template>
      </el-table-column>

      <el-table-column label="市场价" width="140">
        <template #default="slotProps">
          最低价:
          <span>{{ slotProps.row.min_price }}</span>
          <br />
          集换价:
          <span>{{ slotProps.row.avg_price }}</span>
        </template>
      </el-table-column>

      <el-table-column label="售卖价格/数量" width="250">
        <template #default="slotProps">
          价格:
          <el-input-number v-model="slotProps.row.price" :min="0" :step="0.1" />
          <br />
          数量:
          <el-input-number v-model="slotProps.row.quantity" :min="1" :step="1" />
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
      v-model:current-page="pagination.pageNum"
      v-model:page-size="pagination.pageSize"
      v-model:total="pagination.cardsCount"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[15]"
      :background="true"
      @size-change="genSellProductsTableData"
      @current-change="genSellProductsTableData" />
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
@/components/market/interface/use_sell_products_table
