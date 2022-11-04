import type { App } from "vue";
import { ref, reactive } from "vue";
import RouteLoadingAnimation from "./components/RouteLoadingAnimation.vue";

export default {
  install: (
    app: App,
    options: {
      pluginOptions: { height: number; color: string };
    }
  ) => {
    app.component("route-loading-animation", RouteLoadingAnimation);

    // v-height
    app.directive("height", (el, binding, vnode) => {
      el.style.height = options.pluginOptions.height + "px";
    });
    app.directive("color", (el, binding, vnode) => {
      el.style.backgroundColor = options.pluginOptions.color;
    });

    app.config.globalProperties.$routeStart2 = () => {
      console.log("hety");

      rlaData.value.first = true;
    };

    app.mixin({
      data() {
        return {
          loadStarted: "fasfasfs",
          loading: false,
        };
      },
      /*  mounted() {
        console.log("mounted", this.loading);
      }, */
    });

    const routeStart = () => {
      app.config.globalProperties.loadStarted = true;
      console.log("routeStarted");
    };

    // Makes it possible for components to use functions. We then inject the function in the component
    app.provide("routeStart", routeStart);
    let rlaData = ref({
      first: false,
    });
    // Send variable to RouteLoadingAnimation.vue
    app.provide("rlaData", rlaData.value);
  },
};

// Needed for importing with 'require'
// export { RouteLoadingAnimation };
