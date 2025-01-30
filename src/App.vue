<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import CookieConsent from "@/components/CookieConsent.vue";
import MyFooter from "@/components/MyFooter.vue";
// import {useDarkMode} from "@/composables/useDarkMode.js";
// import {onMounted} from "vue";
//
// const { setDarkMode } = useDarkMode(); // Access the function to set dark mode
//
// // Trigger dark mode when the component is mounted
// onMounted(() => {
//   setDarkMode()
// });


</script>

<template>
  <announcement-banner></announcement-banner>
  <nav-bar></nav-bar>
  <RouterView/>
  <MyFooter/>
  <CookieConsent/>
</template>

<style>

</style>
