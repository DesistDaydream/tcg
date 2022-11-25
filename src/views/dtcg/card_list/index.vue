<script setup lang="ts">
import { ref } from "vue"
import type { CardsDescRespData } from "@/api/v1/models/CardsDescResp"
import type { CardsDescReqQuery, CardsDescReqBody } from "@/api/v1/models/CardsDescReq"
import { postCardsDesc } from "@/api/v1/services"
import { Search } from "@element-plus/icons-vue"

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const cardsCount = ref<number>(0)

const tableData = ref<CardsDescRespData[]>()

let keyword = ref<string>("")

function genTableData() {
  const cardsDescReqQuery: CardsDescReqQuery = {
    page_size: pageSize.value,
    page_num: currentPage.value,
  }
  const cardsDescReqBody: CardsDescReqBody = {
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

  postCardsDesc(cardsDescReqQuery, cardsDescReqBody).then((resp) => {
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
  <h2>卡牌详情</h2>
  <!-- 搜索表单 -->
  <!-- <SearchForm v-model:keyword="keyword" @handle-search="handleSearch"></SearchForm> -->
  <el-input v-model="keyword" placeholder="关键字" class="input-with-select"></el-input>
  <el-button :icon="Search" @click="handleSearch">搜索</el-button>

  <!-- 当一次性获取所有数据时，可以使用 :data="tableData?.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="expand">
      <template #default="slotProps">
        <div m="4">
          <p m="t-0 b-2">效果：{{ slotProps.row.effect }}</p>
          <p m="t-0 b-2">进化源效果：{{ slotProps.row.evo_cover_effect }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="sc_name" label="名称" />
    <el-table-column prop="serial" label="编号" />
    <el-table-column prop="alternative_art" label="异画" />
    <el-table-column prop="image" label="图片">
      <template #default="slotProps">
        <img :src="slotProps.row.image" referrerpolicy="no-referrer" min-width="70" height="70" v-viewer />
      </template>
    </el-table-column>
  </el-table>

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
