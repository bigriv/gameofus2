import {
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";
import { pageview } from "vue-gtag";
import BasicLayout from "@/components/templates/layouts/BasicLayout.vue";
import { CONTENTS_TITLE } from "@/composables/const/title";
import { CONTENTS_DESCRIPTION } from "@/composables/const/description";

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
          // {
          //   path: "was",
          //   name: "Was",
          //   component: () => import("@/components/views/games/was.vue"),
          //   meta: {
          //     title: CONTENTS_TITLE.GAMES_WAS,
          //     description: CONTENTS_DESCRIPTION.GAMES_WAS,
          //   },
          // },
          {
            path: "tbh",
            name: "Tbh",
            component: () => import("@/components/views/games/tbh.vue"),
            meta: {
              title: CONTENTS_TITLE.GAMES_TBH,
              description: CONTENTS_DESCRIPTION.GAMES_TBH,
            },
          },
          {
            path: "mp",
            name: "Mp",
            component: () => import("@/components/views/games/mp.vue"),
            meta: { title: CONTENTS_TITLE.GAMES_MP },
          },
          {
            path: "wil",
            name: "Wil",
            component: () => import("@/components/views/games/wil.vue"),
            meta: {
              title: CONTENTS_TITLE.GAMES_WIL,
              description: CONTENTS_DESCRIPTION.GAMES_WIL,
            },
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
                meta: {
                  title: CONTENTS_TITLE.BLESSINGS_NEWYEAR,
                  description: CONTENTS_DESCRIPTION.BLESSINGS_NEWYEAR,
                },
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
            meta: { title: CONTENTS_TITLE.BLESSINGS_NEWYEAR },
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
            meta: {
              title: CONTENTS_TITLE.TOOLS_STOPWATCH,
              description: CONTENTS_DESCRIPTION.TOOLS_STOPWATCH,
            },
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
        meta: {
          title: CONTENTS_TITLE.TOOLS_STOPWATCH,
        },
      },
      {
        path: "translate",
        name: "ViewTranslate",
        component: () => import("@/components/views/tools/translate.vue"),
        meta: {
          title: CONTENTS_TITLE.TOOLS_TRANSLATE,
          description: CONTENTS_DESCRIPTION.TOOLS_TRANSLATE,
        },
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

router.beforeEach((to, __from, next) => {
  pageview({ page_path: to.path });
  next();
});

router.afterEach((to, __from) => {
  // ページタイトルの書き換え
  if (to.meta.title) {
    document.title = to.meta.title + "- Game of us";
  } else {
    document.title = "Game of us";
  }

  // ページ説明の書き換え
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    if (to.meta.description) {
      description.setAttribute("content", String(to.meta.description));
    } else {
      description.setAttribute("content", CONTENTS_DESCRIPTION.DEFAULT);
    }
  }
  const og_description = document.querySelector(
    'meta[property="og:description"]'
  );
  if (og_description) {
    if (to.meta.description) {
      og_description.setAttribute("content", String(to.meta.description));
    } else {
      og_description.setAttribute("content", CONTENTS_DESCRIPTION.DEFAULT);
    }
  }
});
export default router;
