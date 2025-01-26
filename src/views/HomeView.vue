<script setup>
import HeroSection from "@/components/HeroSection.vue";
import ServicesTab from "@/components/ServicesTab.vue";
import WebHosting from "@/components/WebHosting.vue";
import {nextTick, onMounted} from "vue";
import router from "@/router/index.js";

onMounted(() => {
  const section = router.currentRoute.value.hash.replace("#", "")
  if (section) {
    nextTick(() => window?.document?.getElementById(section)?.scrollIntoView())
  }
})
</script>

<template>
  <main class="min-h-screen">
    <HeroSection/>
    <ServicesTab/>
    <WebHosting/>
  </main>
</template>
