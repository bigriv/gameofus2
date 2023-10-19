import {
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import BasicLayout from "@/components/templates/layouts/BasicLayout.vue"

const routes = [
  {
    path: "/",
    meta: { title: "ホーム" },
    component: BasicLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/components/views/index.vue"),
      },
      {
        path: "games",
        meta: { title: "ゲーム" },
        children: [
          {
            path: "",
            name: "Game",
            component: () => import("@/components/views/games/index.vue"),
          },
          {
            path: "was",
            name: "Was",
            component: () => import("@/components/views/games/was.vue"),
            meta: { title: "僕が魔王！？" },
          },
          {
            path: "tbh",
            name: "Tbh",
            component: () => import("@/components/views/games/tbh.vue"),
            meta: { title: "ヒーローになろう" },
          },
        ],
      },
      {
        path: "blessings",
        meta: { title: "祝い事" },
        children: [
          {
            path: "",
            name: "Blessing",
            component: () => import("@/components/views/blessings/index.vue"),
          },
          {
            path: "birthday",
            name: "BlessingBirthday",
            props: (route: RouteLocationNormalized) => ({
              date: route.params.date,
              icons: route.query.icons,
              name: route.query.name,
              message: route.query.message,
            }),
            component: () =>
              import("@/components/views/blessings/birthday.vue"),
              meta: { title: "バースデー" },
          },
        ],
      },
    ],
  },
  {
    path: "/tools/audio",
    name: "AudioTool",
    component: () => import("@/components/views/tools/audio.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/components/views/errors/notfound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
