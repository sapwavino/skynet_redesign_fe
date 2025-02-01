<script setup>
import {RouterView, useRoute} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import CookieConsent from "@/components/CookieConsent.vue";
import MyFooter from "@/components/MyFooter.vue";

// Import your layouts
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import {computed} from "vue";

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


</script>

<template>
  <announcement-banner></announcement-banner>
<!--  <nav-bar :dashboard-nav="true"></nav-bar>-->

  <component :is="layoutComponent">
    <RouterView/>
  </component>

  <MyFooter/>
  <CookieConsent/>
</template>

<style>

</style>
