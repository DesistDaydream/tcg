<script setup lang="ts">
import { ref } from "vue"

interface DeckPrice {
  min_price: string
  avg_price: string
  data: Data[]
}

interface Data {
  count: number
  serial: string
  sc_name: string
  alternative_art: string
  min_price: string
  avg_price: string
}

let deck = ref<string>("")
let resp = ref<DeckPrice>({
  min_price: "",
  avg_price: "",
  data: [],
})

function commit(params: string) {
  console.log(params)
  let xhr = new XMLHttpRequest()
  xhr.open("POST", "https://www.102205.xyz:8443/api/v1/deck/price")
  xhr.send(
    JSON.stringify({
      deck: params,
      envir: "chs",
    })
  )

  xhr.onload = function () {
    resp.value = JSON.parse(xhr.responseText)
    console.log(resp.value)
  }
}
</script>

<template>
  <div>
    <p>卡组：</p>
    <textarea
      v-model="deck"
      placeholder="输入卡组"
      cols="45"
      rows="5"
    ></textarea>
    <button @click="commit(deck)">提交</button>

    <table border="1">
      <thead>
        <tr>
          <th>最低价</th>
          <th>集换价</th>
        </tr>
      </thead>
      <tr>
        <th>{{ resp.min_price }}</th>
        <th>{{ resp.avg_price }}</th>
      </tr>
    </table>

    <table border="1">
      <thead>
        <tr>
          <th>名称</th>
          <th>数量</th>
          <th>编号</th>
          <th>最低价</th>
          <th>集换价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in resp.data">
          <th>{{ item.sc_name }}</th>
          <th>{{ item.count }}</th>
          <th>{{ item.serial }}</th>
          <th>{{ item.min_price }}</th>
          <th>{{ item.avg_price }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  color: blue;
}
</style>
