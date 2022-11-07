<script setup lang="ts">
import { ref } from "vue"
import type { DeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { NewDeckPriceResp } from "@/api/v1/models/DeckPriceResp"
import { postDeckPrice, getDeckPriceWithHID } from "@/api/v1/services"

let deck = ref<string>("")
let hid = ref<string>("")
let tableDataForDeckPriceResp = ref<DeckPriceResp>(NewDeckPriceResp())

function commitForOfficialJSON(deck: string) {
  let req = { deck: deck, envir: "chs" }
  postDeckPrice(req).then((resp) => {
    tableDataForDeckPriceResp.value.data = resp.data
    tableDataForDeckPriceResp.value.min_price = resp.min_price
    tableDataForDeckPriceResp.value.avg_price = resp.avg_price
  })
}

function commitForHID(hid: string) {
  let req = hid
  getDeckPriceWithHID(req).then((resp) => {
    tableDataForDeckPriceResp.value.data = resp.data
    tableDataForDeckPriceResp.value.min_price = resp.min_price
    tableDataForDeckPriceResp.value.avg_price = resp.avg_price
  })
}
</script>

<template>
  <div>
    卡组HID：<input v-model="hid" type="text" />
    <button @click="commitForHID(hid)">提交</button>
  </div>

  <div>
    卡组：<textarea v-model="deck" cols="45" rows="5"></textarea>
    <button @click="commitForOfficialJSON(deck)">提交</button>
  </div>

  <div>
    <table border="1">
      <thead>
        <tr>
          <th>最低价</th>
          <th>集换价</th>
        </tr>
      </thead>
      <tr>
        <th>{{ tableDataForDeckPriceResp.min_price }}</th>
        <th>{{ tableDataForDeckPriceResp.avg_price }}</th>
      </tr>
    </table>
  </div>

  <div>
    <el-table :data="tableDataForDeckPriceResp.data" border>
      <el-table-column prop="sc_name" label="名称" width="200" />
      <el-table-column prop="count" label="数量" width="60" align="center" />
      <el-table-column prop="serial" label="编号" width="100" align="center" />
      <el-table-column
        prop="alternative_art"
        label="异画"
        sortable
        width="80"
        align="center"
      />
      <el-table-column
        prop="min_price"
        label="最低价"
        sortable
        width="100"
        align="center"
      />
      <el-table-column
        prop="avg_price"
        label="集换价"
        sortable
        width="100"
        align="center"
      />
    </el-table>
  </div>
</template>

<style scoped>
table {
  color: blue;
}
</style>
