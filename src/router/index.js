import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // route to all artists
  {
    path: "/artists",
    name: "Artists",
    component: () => import("../views/Artists.vue"),
  },
  // route to all songs
  {
    path: "/songs",
    name: "Songs",
    component: () => import("../views/Songs.vue"),
  },
  // route to single artist - info
  {
    path: "/artists/:artist",
    name: "Artist.show",
    component: () => import("../views/ArtistShow.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
