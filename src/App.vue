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

</style>
