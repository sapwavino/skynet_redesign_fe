<script setup>
import {RouterView, useRoute} from 'vue-router'
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import CookieConsent from "@/components/CookieConsent.vue";

// Import your layouts
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {computed, onMounted} from "vue";
import store from "@/store/index.js";
import router from "@/router/index.js";
const route = useRoute();
// const store = store;

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
  const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
  if (isLoggedIn) {
    store.dispatch('login')
    router.push('/dashboard')
  }
})


</script>

<template>
  <announcement-banner></announcement-banner>
<!--  <nav-bar :dashboard-nav="true"></nav-bar>-->

  <component :is="layoutComponent">
    <RouterView/>
  </component>

  <CookieConsent/>
</template>

<style>

</style>
