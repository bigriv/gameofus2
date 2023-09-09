import { createApp } from "vue";
import "./assets/css/utils.css";
import "./assets/css/components.scss";
import "./assets/css/style.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).mount("#app");
