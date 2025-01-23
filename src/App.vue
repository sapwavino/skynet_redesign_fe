<script setup>
import {RouterView} from 'vue-router'
import NavBar from "@/components/NavBar.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
</script>

<template>
  <announcement-banner></announcement-banner>
  <nav-bar></nav-bar>
  <RouterView/>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
