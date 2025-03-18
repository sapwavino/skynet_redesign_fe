<script setup>
import {RouterView, useRoute} from 'vue-router'
import CookieConsent from "@/components/CookieConsent.vue";

// Import your layouts
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {computed, onMounted} from "vue";
import store from "@/store/index.js";

const route = useRoute();

// Define available layouts
const layouts = {
  DefaultLayout,
  DashboardLayout,
};

// Get the layout dynamically from the matched component
const layoutComponent = computed(() => {
  return layouts[route.meta.layout] || DefaultLayout;
});

onMounted(() => {
  store.dispatch('initialize')
})


</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>

  <CookieConsent />
</template>

<style>

</style>
