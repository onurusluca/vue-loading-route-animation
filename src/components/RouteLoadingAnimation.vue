<script setup lang="ts">
import { ref, inject, watchEffect } from "vue";

let defaultDuration = ref<number>(3000); // Assume that loading will complete in this amount of time.
let defaultInterval = ref<number>(200); // How frequently to update
let variation = ref<number>(0.5); // 0 - 1. Add some variation to how much the bar will grow at each interval
let startingPoint = ref<number>(10); // 0 - 100. Where the progress bar should start from.
let endingPoint = ref<number>(95); // Limiting how far the progress bar will get to before loading is complete
let isLoading = ref<boolean>(true); // Once loading is done, start fading away
let isVisible = ref<boolean>(false); // Once animate finish, set display: none
let progress = startingPoint;
let timeoutId = ref();

// See if route is loading
/* route.beforeEach((to, from, next) => {
  console.log("route.beforeEach", to, from, next);

  if (typeof to.matched[0]?.components.default === "function") {
    startProgress();
  }
  if (typeof from.matched[0]?.components.default === "function") {
    startProgress();
  }
  next();
});
 */
// See if router loading is done
/* route.beforeResolve((to, from, next) => {
  stopProgress();
  next();
});
 */

const startProgress = () => {
  isLoading.value = true;
  isVisible.value = true;
  progress.value = startingPoint.value;
  loopProgress();
};

const loopProgress = () => {
  if (timeoutId.value) {
    clearTimeout(timeoutId.value);
  }
  if (progress.value >= endingPoint.value) {
    return;
  }
  let size =
    (endingPoint.value - startingPoint.value) /
    (defaultDuration.value / defaultInterval.value);
  let p = Math.round(
    progress.value +
      getRandomInt(size * (1 - variation.value), size * (1 + variation.value))
  );
  progress.value = Math.min(p, endingPoint.value);
  timeoutId.value = setTimeout(
    loopProgress,
    getRandomInt(
      defaultInterval.value * (1 - variation.value),
      defaultInterval.value * (1 + variation.value)
    )
  );
};

const stopProgress = () => {
  isLoading.value = false;
  progress.value = 100;
  clearTimeout(timeoutId.value);
  setTimeout(() => {
    if (isLoading.value) {
      isVisible.value = false;
    }
  }, 200);
};

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * max);
};

const rlaData = inject("rlaData");

watchEffect(() => {
  if (rlaData) {
    if (rlaData.first === true) {
      startProgress();
    }
  }
});
</script>

<template>
  <!--   <h1 v-height="5">Loaderfafa</h1>
  <div v-height="5" v-color class="test">
    <button @click="startProgress">start</button>
  </div> -->

  <h1>{{ rlaData }}</h1>
  <div
    :class="{
      'loading-container': true,
      loading: isLoading,
      visible: isVisible,
    }"
  >
    <div class="loader" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style scoped>
.test {
  background: red;
  height: 15px;
  width: 105px;
}
.loading-container {
  font-size: 0;
  position: fixed;
  top: 0;
  left: 0;
  height: 10px;
  width: 100%;
  opacity: 0;
  display: none;
  z-index: 9999;
  transition: opacity 200;
}

.loading-container.visible {
  display: block;
}
.loading-container.loading {
  opacity: 1;
}

.loader {
  background: #40e0d0;
  display: inline-block;
  height: 100%;
  width: 50%;
  overflow: hidden;
  border-radius: 0 0 5px 0;
  transition: 200 width ease-out;
}
</style>
