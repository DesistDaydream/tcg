<script setup>
import { RouterLink, RouterView } from "vue-router"
</script>

<template>
  <ul>
    <li><RouterLink to="/">首页</RouterLink></li>
    <li><RouterLink to="/wowtcg">WOWTCG</RouterLink></li>
    <li>
      <div class="dropdown">
        <RouterLink to="/dtcg">DTCG</RouterLink>
        <div class="dropdown-content">
          <RouterLink to="/dtcg/carddesc">卡牌列表</RouterLink>
        </div>
      </div>
    </li>
    <li>
      <div class="dropdown">
        <RouterLink to="/ygo">YGO</RouterLink>
        <div class="dropdown-content">
          <RouterLink to="/ygo/carddesc">卡牌列表</RouterLink>
        </div>
      </div>
    </li>
    <li>
      <div class="dropdown">
        <RouterLink to="/tools">工具</RouterLink>
        <div class="dropdown-content">
          <RouterLink to="/tools/probability">抽卡概率计算器</RouterLink>
        </div>
      </div>
    </li>
  </ul>

  <RouterView />
</template>

<style scoped>
ul {
  border-radius: 15px; /* 圆角 */
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}

li {
  float: left;
}

li a,
.dropbtn {
  display: inline-block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

li a:hover,
.dropdown:hover .dropbtn {
  background-color: #111;
}

.dropdown {
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
