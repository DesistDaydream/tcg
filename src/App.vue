<script setup lang="ts">
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"
const activeIndex = ref("index")
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
    :default-active="activeIndex"
    router
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="index" route="/">首页</el-menu-item>

    <el-menu-item index="wowtcg" route="/wowtcg">WOWTCG</el-menu-item>

    <el-sub-menu index="dtcg">
      <template #title>
        <RouterLink to="/dtcg">DTCG</RouterLink>
      </template>
      <el-menu-item index="dtcg-price" route="/dtcg/price">
        卡牌与卡组价格
      </el-menu-item>
      <el-menu-item index="dtcg-cardset" route="/dtcg/cardset">
        卡集列表
      </el-menu-item>
      <el-menu-item index="dtcg-carddesc" route="/dtcg/carddesc">
        卡牌列表
      </el-menu-item>
      <el-sub-menu index="3-3">
        <template #title>第三项</template>
        <el-menu-item index="3-3-1">第一项</el-menu-item>
        <el-menu-item index="3-3-2">第二项</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <el-menu-item index="ygo" route="/ygo" disabled>YGO</el-menu-item>

    <el-sub-menu index="market">
      <template #title>交易市场</template>
      <el-menu-item index="market-dynamics" route="/market/dynamics">
        市场动态
      </el-menu-item>
      <el-menu-item index="market-products">我在卖</el-menu-item>
    </el-sub-menu>

    <el-menu-item index="tools" route="/tools">工具</el-menu-item>
  </el-menu>

  <RouterView />
</template>

<style scoped>
ul {
  border-radius: 15px; /* 圆角 */
  overflow: hidden; /* 隐藏超出部分 */
}

/* RouterLink 的文本会被渲染成 a 标签，通过对 a 标签的设置，来这是带链接的字符串的样式 */
a {
  text-decoration: none;
  color: #fff;
}
</style>
