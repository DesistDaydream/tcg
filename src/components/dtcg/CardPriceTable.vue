<script setup lang="ts">
import { ref, toRefs, reactive } from "vue"
import { Search } from "@element-plus/icons-vue"
import type { CardsPriceReqQuery, CardsPriceReqBody } from "@/api/v1/models/CardsPriceReq"
import type { CardsPriceRespData } from "@/api/v1/models/CardsPriceResp"
import { NewTableState } from "@/components/dtcg/interface/models/card_price_table"
import { postCardsPrice, postCardsPriceWithDtcgDBImg } from "@/api/v1/services"

import type { DeckPriceResp, DeckPriceRespData } from "@/api/v1/models/DeckPriceResp"

let props = defineProps<{
  tableDataForDeckPriceResp: DeckPriceResp
}>()

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

  postCardsPriceWithDtcgDBImg(cardsPriceReqQuery, cardsPriceReqBody).then((resp) => {
    tableData.value = resp.data
    cardsCount.value = resp.count
  })
  // postCardsPrice(cardsPriceReqQuery, cardsPriceReqBody).then((resp) => {
  //   tableData.value = resp.data
  //   cardsCount.value = resp.count
  // })
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

const handleAdd = (row: CardsPriceRespData) => {
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
  <el-input v-model="keyword" placeholder="关键字、编号" class="input-with-select" @keyup.enter.native="handleSearch"></el-input>
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
