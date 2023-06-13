import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/artists",
    name: "Artists",
    component: () => import("../views/Artists.vue"),
  },
  {
    path: "/songs",
    name: "Songs",
    component: () => import("../views/Songs.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
