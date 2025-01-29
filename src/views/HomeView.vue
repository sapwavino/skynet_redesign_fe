<script setup>
import HeroSection from "@/components/HeroSection.vue";
import ServicesTabs from "@/components/ServicesTabs.vue";
import WebHostingSection from "@/components/WebHostingSection.vue";
import {nextTick, onMounted} from "vue";
import router from "@/router/index.js";
import EmailSection from "@/components/EmailSection.vue";
import AppsSection from "@/components/AppsSection.vue";
import DatabaseSection from "@/components/DatabaseSection.vue";
import WhyUsSection from "@/components/WhyUsSection.vue";

onMounted(() => {
  const section = router.currentRoute.value.hash.replace("#", "")
  if (section) {
    nextTick(() => window?.document?.getElementById(section)?.scrollIntoView())
  }
})
</script>

<template>
  <main class="min-h-screen dark:bg-gray-900">
    <HeroSection/>
    <ServicesTabs/>
    <WebHostingSection/>
    <EmailSection/>
    <AppsSection/>
    <DatabaseSection/>
    <WhyUsSection/>
  </main>
</template>
