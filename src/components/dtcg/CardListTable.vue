<script setup lang="ts">
import { ref } from "vue"
import type { Data, CardsDescResp } from "@/api/v1/models/CardsDescResp"
import { getCardsDesc, postCardsDesc } from "@/api/v1/services"

const currentPage = ref<number>(1)
const pageSize = ref<number>(5)
const cardsCount = ref<number>(0)

const tableData = ref<Data[]>()

// function genTableData() {
//   getCardsDesc({
//     // postCardsDesc({
//     page_size: pageSize.value,
//     page_num: currentPage.value,
//   }).then((resp) => {
//     tableData.value = resp.data
//     cardsCount.value = resp.count
//   })
// }

// TODO: 根据条件获取卡牌描述
// postCardsDesc

function genTableData() {
  postCardsDesc(
    {
      page_size: pageSize.value,
      page_num: currentPage.value,
    },
    {
      keyword: "",
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

let inputQuery = ref("")
const searchClick = () => {}
</script>

<template>
  <h2>卡牌详情</h2>
  <!-- <el-input v-model="input3" placeholder="Please input" class="input-with-select">
    <template #prepend>
      <el-select v-model="select" placeholder="Select" style="width: 115px">
        <el-option label="Restaurant" value="1" />
        <el-option label="Order No." value="2" />
        <el-option label="Tel" value="3" />
      </el-select>
    </template>
    <template #append>
      <el-button :icon="Search" />
    </template>
  </el-input> -->

  <!-- 当一次性获取所有数据时，可以使用 :data="tableData?.slice((currentPage - 1) * pageSize, currentPage * pageSize)" -->
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <p m="t-0 b-2">效果：{{ props.row.effect }}</p>
          <p m="t-0 b-2">进化源效果：{{ props.row.evo_cover_effect }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="sc_name" label="名称" />
    <el-table-column prop="serial" label="编号" />
    <el-table-column prop="alternative_art" label="异画" />
    <el-table-column prop="image" label="图片">
      <template #default="scope">
        <img :src="scope.row.image" referrerpolicy="no-referrer" min-width="70" height="70" />
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
