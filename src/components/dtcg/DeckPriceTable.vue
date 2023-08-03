<script setup lang="ts">
import { Plus, Minus, Delete } from "@element-plus/icons-vue"

import type { DeckPriceResp, DeckPriceRespData } from "@/api/v1/models/DeckPriceResp"

const props = defineProps<{
  tableDataForDeckPriceResp: DeckPriceResp
  tableLoading: { loading: boolean }
}>()

// 最低单价和集换单价这两列的排序逻辑
const sortAvgUnitPrice = (a: DeckPriceRespData, b: DeckPriceRespData) => {
  return Number(a.avg_unit_price) - Number(b.avg_unit_price)
}
const sortMinUnitPrice = (a: DeckPriceRespData, b: DeckPriceRespData) => {
  return Number(a.min_unit_price) - Number(b.min_unit_price)
}

// 集换价和最低价这两列的排序逻辑
const sortAvgPrice = (a: DeckPriceRespData, b: DeckPriceRespData) => {
  return Number(a.avg_price) - Number(b.avg_price)
}
const sortMinPrice = (a: DeckPriceRespData, b: DeckPriceRespData) => {
  return Number(a.min_price) - Number(b.min_price)
}

// 添加表格中一个卡牌的数量
const handlePlus = (row: DeckPriceRespData) => {
  row.count += 1
  // 更新最低价和集换价，保留小数点后两位
  row.avg_price = (Number(row.avg_price) + Number(row.avg_unit_price)).toFixed(2).toString()
  row.min_price = (Number(row.min_price) + Number(row.min_unit_price)).toFixed(2).toString()
  console.log(row)
}
// 减少表中一个卡牌的数量，降到0时删除该卡
const handleMinus = (row: DeckPriceRespData) => {
  row.count -= 1
  // 更新最低价和集换价
  row.avg_price = (Number(row.avg_price) - Number(row.avg_unit_price)).toFixed(2).toString()
  row.min_price = (Number(row.min_price) - Number(row.min_unit_price)).toFixed(2).toString()

  // 若卡牌数量为0，则删除该行
  if (row.count === 0) {
    props.tableDataForDeckPriceResp.data = props.tableDataForDeckPriceResp.data.filter((item) => item !== row)
  }

  console.log(row)
}
// 删除表中一个卡牌
const handleDel = (row: DeckPriceRespData) => {
  // 直接从表数据中删除该行
  props.tableDataForDeckPriceResp.data = props.tableDataForDeckPriceResp.data.filter((item) => item !== row)
  console.log(row)
}
</script>

<template>
  <el-table
    v-loading="tableLoading.loading"
    class="tableBox"
    :data="tableDataForDeckPriceResp.data"
    show-summary
    border
    :cell-style="{ 'text-align': 'center', padding: '0px' }"
    :header-cell-style="{ 'text-align': 'center' }"
    :row-style="{ height: '30px' }">
    <el-table-column fixed="left" label="操作" width="121" sortable>
      <template #default="scope">
        <el-button size="small" type="danger" :icon="Delete" circle @click="handleDel(scope.row)" />
        <el-button size="small" type="success" :icon="Plus" circle @click="handlePlus(scope.row)" />
        <el-button size="small" type="danger" :icon="Minus" circle @click="handleMinus(scope.row)" />
      </template>
    </el-table-column>
    <el-table-column prop="image" label="图片" width="80">
      <template #default="slotProps">
        <img :src="slotProps.row.image" referrerpolicy="no-referrer" min-width="30" height="30" v-viewer />
      </template>
    </el-table-column>
    <el-table-column prop="sc_name" label="名称" />
    <el-table-column prop="count" label="数量" width="70" />
    <el-table-column prop="serial" label="编号" width="100" />
    <el-table-column prop="rarity" label="稀有度" width="100" />
    <el-table-column prop="alternative_art" label="异画" width="80" sortable />
    <el-table-column prop="avg_unit_price" label="集换单价" width="110" sortable :sort-method="sortAvgUnitPrice" />
    <el-table-column prop="avg_price" label="集换价" width="100" sortable :sort-method="sortAvgPrice" />
    <el-table-column prop="min_unit_price" label="最低单价" width="110" sortable :sort-method="sortMinUnitPrice" />
    <el-table-column prop="min_price" label="最低价" width="100" sortable :sort-method="sortMinPrice" />
  </el-table>
</template>

<style scoped></style>
