<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import CookieConsent from "@/components/CookieConsent.vue";
</script>

<template>
  <announcement-banner></announcement-banner>
  <nav-bar></nav-bar>
  <RouterView/>
  <CookieConsent/>
</template>

<style>

</style>
