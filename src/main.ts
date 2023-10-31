import { createApp } from "vue";
import "./assets/css/animation.css";
import "./assets/css/utils.scss";
import "./assets/css/components.scss";
import "./assets/css/style.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./pinia";

createApp(App).use(router).use(pinia).mount("#app");
