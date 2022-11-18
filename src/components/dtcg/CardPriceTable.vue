<script setup lang="ts">
import { ref, toRefs, reactive } from "vue"
import { Search } from "@element-plus/icons-vue"
import type { CardsPriceReqQuery, CardsPriceReqBody } from "@/api/v1/models/CardsPriceReq"
import { NewTableState } from "./interface/models/card_price_table"
import { postCardsPrice } from "@/api/v1/services"

let objRef = reactive(NewTableState())

let { currentPage, pageSize, cardsCount, tableData } = toRefs(objRef)

let keyword = ref("")

function genTableData() {
  const cardsPriceReqQuery: CardsPriceReqQuery = {
    page_size: pageSize.value,
    page_num: currentPage.value,
  }
  const cardsPriceReqBody: CardsPriceReqBody = {
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

  postCardsPrice(cardsPriceReqQuery, cardsPriceReqBody).then((resp) => {
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

const handleAdd = (index: number) => {
  // TODO: 将选中的卡牌添加到卡组价格的列表中
  // 这涉及到多个组件之间的数据传递，待研究
  console.log(
    "添加：cardIDFromDB %s; cardVersionID %s",
    tableData.value[index].card_id_from_db,
    tableData.value[index].card_version_id
  )
}

const handleDel = (index: number) => {
  // TODO: 从卡组价格的列表中删除选中的卡牌
  // 这涉及到多个组件之间的数据传递，待研究
  console.log(
    "删除：cardIDFromDB %s; cardVersionID %s",
    tableData.value[index].card_id_from_db,
    tableData.value[index].card_version_id
  )
}
</script>

<template>
  <h2>卡牌价格列表</h2>
  <!-- 搜索表单 -->
  <!-- <SearchForm v-model:keyword="keyword" @handle-search="handleSearch"></SearchForm> -->
  <el-input v-model="keyword" placeholder="关键字" class="input-with-select"></el-input>
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
        <template #default="scope">
          <el-button link type="primary" @click="handleAdd(scope.$index)">添加</el-button>
          <el-button link type="primary" @click="handleDel(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
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
