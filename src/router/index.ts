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
            path: "mp",
            name: "Mp",
            component: () => import("@/components/views/games/mp.vue"),
            meta: { title: "守銭奴の壺" },
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
            path: "customes",
            children: [
              {
                path: "newyear",
                name: "CustomeNewyear",
                component: () =>
                  import("@/components/views/blessings/newyear/custome.vue"),
                meta: { title: "年賀状" },
              },
            ],
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
          {
            path: "newyear",
            name: "ViewNewyear",
            props: (route: RouteLocationNormalized) => ({
              background: route.query.background,
              year: route.query.year,
              from: route.query.from,
              greeting: route.query.greeting,
              message: route.query.message,
              showIllust: route.query.showIllust,
              oneText: route.query.oneText,
            }),
            component: () =>
              import("@/components/views/blessings/newyear/view.vue"),
            meta: { title: "年賀状" },
          },
        ],
      },
      {
        path: "tools",
        meta: { title: "ツール" },
        children: [
          {
            path: "",
            name: "Tool",
            component: () => import("@/components/views/tools/index.vue"),
          },
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
      {
        path: "translate",
        name: "ViewTranslate",
        component: () => import("@/components/views/tools/translate.vue"),
        meta: { title: "翻訳機" },
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
