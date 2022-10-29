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
      path: "/dtcg",
      name: "dtcg",
      component: () => import("../views/DTCG.vue"),
    },
  ],
})

export default router
