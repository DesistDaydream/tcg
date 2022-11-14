<script setup lang="ts">
import { ref } from "vue"
import type { Data } from "@/api/v1/models/CardsPriceResp"
import { postCardsPrice } from "@/api/v1/services"
import SearchForm from "./SearchForm.vue"

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const cardsCount = ref<number>(0)

const tableData = ref<Data[]>()

let keyword = ref("")

function genTableData() {
  postCardsPrice(
    {
      page_size: pageSize.value,
      page_num: currentPage.value,
    },
    {
      keyword: keyword.value,
      language: "",
      class_input: false,
      card_pack: 0,
      type: "",
      color: [],
      rarity: [],
      tags: [],
      tags__logic: "",
      order_type: "",
      evo_cond: [],
      qField: [],
    }
  ).then((resp) => {
    tableData.value = resp.data
    cardsCount.value = resp.count
  })
}

genTableData()

const handleSizeChange = (val: number) => {
  genTableData()
}
const handleCurrentChange = (val: number) => {
  genTableData()
}

const handleSearch = () => {
  genTableData()
}
</script>

<template>
  <h2>卡牌价格列表</h2>
  <!-- 搜索表单 -->
  <SearchForm v-model:keyword="keyword" @handle-search="handleSearch"></SearchForm>

  <!-- 当一次性获取所有数据时，可以使用 :data="tableData?.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="sc_name" label="名称" />
      <el-table-column prop="serial" label="编号" />
      <el-table-column prop="alternative_art" label="异画" />
      <el-table-column prop="rarity" label="稀有度" />
      <el-table-column prop="min_price" label="最低价" />
      <el-table-column prop="avg_price" label="集换价" />
      <!-- <el-table-column prop="image_url" label="图片">
      <template #default="scope">
        <img
          :src="scope.row.image_url"
          referrerpolicy="no-referrer"
          min-width="70"
          height="70"
        />
      </template>
    </el-table-column> -->
    </el-table>
  </div>

  <div class="demo-pagination-block">
    <div class="demonstration"></div>
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
