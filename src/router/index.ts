import { createRouter, createWebHistory } from "vue-router";
import ShopView from "../views/ShopView.vue";
import ProductDetail from "../components/ProductDetail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "products",
      component: ShopView,
    },
    {
      path: "/cart",
      name: "cart",
      component: ShopView,
    },
    {
        path: "/product/:id",
        name: "product-detail",
        component: ShopView
    }
  ],
});

export default router;
