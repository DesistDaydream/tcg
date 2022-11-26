<script setup lang="ts">
import { Search } from "@element-plus/icons-vue"

import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import type { DeckPriceResp, DeckPriceRespData } from "@/api/v1/models/DeckPriceResp"

import { usePriceTable } from "@/components/dtcg/interface/use_price_table"

import Pagination from "@/components/table/Pagination.vue"

let props = defineProps<{
  tableDataForDeckPriceResp: DeckPriceResp
}>()

let { pageNum, pageSize, cardsCount, tableData, searchParam, handleSearch, handlePageSizeChange, handlePageNumChange } = usePriceTable()

let handleAdd = (row: CardsPriceRespData) => {
  console.log("添加：cardIDFromDB %s; cardVersionID %s", row.card_id_from_db, row.card_version_id)

  let newData: DeckPriceRespData = {
    count: 1,
    serial: row.serial,
    sc_name: row.sc_name,
    alternative_art: row.alternative_art,
    min_price: row.min_price.toString(),
    avg_price: row.avg_price.toString(),
    min_unit_price: row.min_price.toString(),
    avg_unit_price: row.avg_price.toString(),
  }

  props.tableDataForDeckPriceResp.data.push(newData)
}
</script>

<template>
  <h2>卡牌价格列表</h2>
  <!-- 搜索表单 -->
  <el-input v-model="searchParam.keyword" placeholder="关键字、编号" class="input-with-select" @keyup.enter.native="handleSearch"></el-input>
  <el-button :icon="Search" @click="handleSearch">搜索</el-button>

  <!-- 当一次性获取所有数据时，可以使用 :data="tableData?.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="sc_name" label="名称" />
      <el-table-column prop="serial" label="编号" />
      <el-table-column prop="alternative_art" label="异画" />
      <el-table-column prop="rarity" label="稀有度" />
      <el-table-column prop="min_price" label="最低价" />
      <el-table-column prop="avg_price" label="集换价" />
      <el-table-column fixed="right" label="操作" width="120">
        <template #default="slotProps">
          <el-button link type="primary" @click="handleAdd(slotProps.row)">添加</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="图片">
        <template #default="slotProps">
          <img :src="slotProps.row.image" referrerpolicy="no-referrer" min-width="70" height="70" v-viewer />
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 分页组件 -->
  <Pagination
    :pageNum="pageNum"
    :pageSize="pageSize"
    :cardsCount="cardsCount"
    :handlePageSizeChange="handlePageSizeChange"
    :handlePageNumChange="handlePageNumChange"></Pagination>
</template>

<style scoped></style>
