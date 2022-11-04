import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import Home from "./Home.vue";
import Test from "./Test.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes, // short for `routes: routes`
});
export default router;
