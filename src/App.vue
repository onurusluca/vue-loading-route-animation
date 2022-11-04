<script setup lang="ts">
import { ref, inject, watchEffect, onMounted } from "vue";
import { useRouter } from "vue-router";

const routeStart = inject("routeStart");
const route = useRouter();

onMounted(() => {});

route.beforeEach((to, from, next) => {
  console.log(to.matched[1]?.components.default);

  if (typeof to.matched[0].components.default == "function") {
    console.log("Startedddddddddd");

    $routeStart2();
  }
  if (typeof from.matched[0]?.components.default == "function") {
    startProgress();
  }
  next();
});
</script>

<template>
  <route-loading-animation />
  <button @click="$routeStart2">START</button>
  <router-view> </router-view>
</template>

<style scoped></style>
