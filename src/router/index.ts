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
    path: "/tools/audio",
    name: "AudioTool",
    component: () => import("@/components/views/tools/audio.vue"),
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
