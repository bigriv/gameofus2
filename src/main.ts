import { createApp } from "vue";
import "./assets/css/animation.css";
import "./assets/css/utils.scss";
import "./assets/css/components.scss";
import "./assets/css/style.css";
import App from "./App.vue";
import router from "./router";
import pinia from "./pinia";
import VueGtag from "vue-gtag";
import * as Sentry from "@sentry/vue";

const app = createApp(App);

if (import.meta.env.PROD) {
  Sentry.init({
    app,
    dsn: "https://a59f313623e2a7e57fbc30cce6724b17@o4506743851188224.ingest.sentry.io/4506743853350912",
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: [/^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

app
  .use(
    VueGtag,
    {
      config: {
        id: "G-FSQN8Y9RB5",
      },
    },
    router
  )
  .use(router)
  .use(pinia)
  .mount("#app");
