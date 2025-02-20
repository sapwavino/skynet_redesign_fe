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
import Testimonials from "@/components/Testimonials.vue";
import FAQs from "@/components/FAQs.vue";
import {useStore} from 'vuex';

const store = useStore();

onMounted(() => {
  const section = router.currentRoute.value.hash.replace("#", "")
  if (section) {
    nextTick(() => window?.document?.getElementById(section)?.scrollIntoView())
  }
  const preferredCurrency = JSON.parse(window.localStorage.getItem('preferredCurrency'))
  if (!preferredCurrency) {
    window.localStorage.setItem('preferredCurrency', JSON.stringify('NGN'))
  }
  console.log("here")
  store.dispatch('updatePreferredCurrency', preferredCurrency);
})

defineProps({ layout: "DefaultLayout" });
</script>

<template>
  <main class="min-h-screen dark:bg-gray-800">
    <HeroSection/>
    <ServicesTabs/>
    <WebHostingSection/>
    <EmailSection/>
    <AppsSection/>
    <DatabaseSection/>
    <WhyUsSection/>
    <Testimonials/>
    <FAQs/>
  </main>
</template>
