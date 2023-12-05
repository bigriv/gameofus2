import {
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import BasicLayout from "@/components/templates/layouts/BasicLayout.vue";

const routes = [
  {
    path: "/",
    meta: { title: "Home" },
    component: BasicLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/components/views/index.vue"),
      },
      {
        path: "about",
        name: "About",
        meta: { title: "About" },
        component: () => import("@/components/views/about.vue"),
      },
      {
        path: "contact",
        name: "Contact",
        meta: { title: "Contact" },
        component: () => import("@/components/views/contact.vue"),
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
          {
            path: "wil",
            name: "Wil",
            component: () => import("@/components/views/games/wil.vue"),
            meta: { title: "聖騎士と五つの国" },
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
      {
        path: "tools",
        meta: { title: "ツール" },
        children: [
          {
            path: "stopwatch",
            name: "CustomeStopwatch",
            component: () =>
              import("@/components/views/tools/stopwatch/custome.vue"),
            meta: { title: "ストップウォッチ" },
          },
        ],
      },
    ],
  },
  {
    path: "/tools/view",
    children: [
      {
        path: "stopwatch",
        name: "ViewStopwatch",
        component: () => import("@/components/views/tools/stopwatch/view.vue"),
        meta: { title: "ストップウォッチ" },
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
