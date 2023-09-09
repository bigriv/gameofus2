import {
  RouteLocationNormalized,
  createRouter,
  createWebHistory,
} from "vue-router";

const routes = [
  {
    path: "/was",
    name: "Was",
    component: () => import("@/components/views/games/was.vue"),
  },
  {
    path: "/was/debug/character",
    name: "WasDebugCharacter",
    component: () => import("@/components/views/games/wasDebugCharacter.vue"),
  },
  {
    path: "/was/debug/building",
    name: "WasDebugBuilding",
    component: () => import("@/components/views/games/wasDebugBuilding.vue"),
  },
  {
    path: "/was/tool/audio",
    name: "WasAudioTool",
    component: () => import("@/components/views/games/wasAudioTool.vue"),
  },
  {
    path: "/was/tool/visual",
    name: "WasVisualTool",
    component: () => import("@/components/views/games/wasVisualTool.vue"),
  },
  {
    path: "/was/tool/audio",
    name: "WasAudioTool",
    component: () => import("@/components/views/games/wasAudioTool.vue"),
  },
  {
    path: "/blessing/birthday/:date",
    name: "BlessingBirthday",
    props: (route: RouteLocationNormalized) => ({
      date: route.params.date,
      icons: route.query.icons,
      name: route.query.name,
      message: route.query.message,
    }),
    component: () => import("@/components/views/blessings/birthday.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/components/views/test.vue"),
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
