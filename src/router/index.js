import { createRouter, createWebHistory } from "vue-router"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/wowtcg",
      name: "wowtcg",
      component: () => import("../views/WOWTCG.vue"),
    },
    {
      path: "/dtcg",
      name: "dtcg",
      component: () => import("../views/DTCG.vue"),
    },
    {
      path: "/ygo",
      name: "ygo",
      component: () => import("../views/YGO.vue"),
    },
    {
      path: "/tools",
      name: "tools",
      component: () => import("../views/Tools.vue"),
    },
  ],
})

export default router
