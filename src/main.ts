import { createApp } from "vue";
import App from "./App.vue";

import router from "./router";

import RouteLoadingAnimation from "./RouteLoadingAnimationPlugin";

const app = createApp(App);
app.use(router);
app.use(RouteLoadingAnimation, {
  pluginOptions: {
    height: 5,
    color: "#40e0d0",
  },
});
app.mount("#app");
