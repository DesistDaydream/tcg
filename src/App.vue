<script setup>
import { ref } from "vue"
import { RouterLink, RouterView } from "vue-router"

// 生成顶部路由导航栏
let menuList = ref([
  { menu: "首页", link: "/" },
  { menu: "卡组价格", link: "/card" },
])

// 判断导航栏中哪个按钮被激活了
// 点击某一项的时候拿到相应的index 。然后把这个index赋值给isActiveNum 。再用 RouterLink 里面的 index 去对比。如果一样的话就加上 isActive 类 否则类名为空。
let isActiveNum = ref(0)
let btnMenu = (index) => {
  isActiveNum.value = index
}
</script>

<template>
  <ul>
    <li>
      <RouterLink to="/">首页</RouterLink>
    </li>
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
        <a href="#" class="dropbtn">YGO</a>
        <div class="dropdown-content">
          <RouterLink to="/ygo">YGO</RouterLink>
          <RouterLink to="/ygo/carddesc">卡牌列表</RouterLink>
        </div>
      </div>
    </li>
    <li><RouterLink to="/http">WOWTCG</RouterLink></li>
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
