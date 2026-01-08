import { createRouter, createWebHistory } from "vue-router"
import ShopView from "../views/ShopView.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
        path: "/",
        name: "shop",
        component: ShopView
    }
]
})

export default router