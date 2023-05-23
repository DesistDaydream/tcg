import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/wowtcg",
      name: "wowtcg",
      component: () => import("@/views/WOWTcgView.vue"),
    },
    {
      path: "/dtcg",
      name: "dtcg",
      component: () => import("@/views/dtcg/index.vue"),
      children: [],
    },
    {
      path: "/dtcg/price",
      name: "price",
      component: () => import("@/views/dtcg/price/index.vue"),
    },
    {
      path: "/dtcg/cardset",
      name: "dtcgset",
      component: () => import("@/views/dtcg/cardset_list/index.vue"),
    },
    {
      path: "/dtcg/carddesc",
      name: "dtcgdesc",
      component: () => import("@/views/dtcg/card_list/index.vue"),
    },
    {
      path: "/ygo",
      name: "ygo",
      component: () => import("@/views/YgoTcgView.vue"),
    },
    {
      path: "/ptcg",
      name: "ptcg",
      component: () => import("@/views/PTCGView.vue"),
    },
    {
      path: "/market/dynamics",
      name: "dynamics",
      component: () => import("@/views/market/dynamics/index.vue"),
    },
    {
      path: "/market/products",
      name: "products",
      component: () => import("@/views/market/my_sell_products/index.vue"),
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("@/views/ToolsView.vue"),
    },
  ],
})

export default router
