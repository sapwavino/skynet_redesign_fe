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
import {authService} from "@/services/auth.service.js";

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
  store.dispatch('initialize')
  const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
  if (isLoggedIn) {
    router.push('/dashboard')
  }
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
