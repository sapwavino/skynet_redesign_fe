<script setup>
import HeroSection from "@/components/HeroSection.vue";
import ServicesTab from "@/components/ServicesTab.vue";
import WebHostingSection from "@/components/WebHostingSection.vue";
import {nextTick, onMounted} from "vue";
import router from "@/router/index.js";
import EmailSection from "@/components/EmailSection.vue";

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
    <WebHostingSection/>
    <EmailSection/>
  </main>
</template>
