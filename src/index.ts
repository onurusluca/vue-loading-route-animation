import { App } from "vue";
/* import RouteLoadingAnimation from "./components/RouteLoadingAnimation.vue"; */
export default {
  install: (app: App, options: {}) => {
    app.component(
      "loading-route-animation",
      () => import("./components/RouteLoadingAnimation.vue")
    );
    // app.provide()
  },
};
