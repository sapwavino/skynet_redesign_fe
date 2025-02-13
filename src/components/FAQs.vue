<script setup>

import {ref} from "vue";

const openIndex = ref(null); // Tracks the currently open section index

const toggleSection = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

// Sample FAQ Data
const faqs = [
  {
    question: "What control panel is available?",
    answer: "All our hosting packages come with either CPanel, Plesk and many other control panels free of charge."
  },
  {
    question: "What happens when my plan expires?",
    answer: "You will be notified to renew, then your data will be moved to archive at the end of grace period which will further be deleted with prior notification to customer."
  },
  {
    question: "Do I need any technical knowledge?",
    answer: "All our products and services are easy to navigate and use, we also provide active support."
  },
  {
    question: "How long before my service is available?",
    answer: "Provisioning happens instantly upon payment completion."
  },
  {
    question: "How do I renew?",
    answer: "Our system generates invoice at the end of every cycle and notifies you ahead of time to renew."
  },
  {
    question: "Where is my data stored?",
    answer: "We leverage on data centres across the globe to provide fast and reliable services."
  },
];
</script>

<template>
  <div class="md:w-1/2 mx-auto dark:text-gray-300">
    <div class="mt-10 min-h-10" id="apps"></div>
    <h2 class="header text-center mb-5">Frequently Asked Questions</h2>
    <div v-for="(faq, index) in faqs" :key="index" class="border-b cursor-pointer mb-5">
      <button
          class="w-full text-left p-4 font-bold text-lg flex justify-between items-center cursor-pointer"
          @click="toggleSection(index)"
      >
        {{ faq.question }}
        <span :class="{ 'rotate-45': openIndex === index }" class="transition-transform text-3xl">+</span>
      </button>
      <div
          v-if="openIndex === index"
          class="p-4 bg-gray-100 dark:bg-gray-800 transform transition-opacity duration-300 ease-in-out"
      >
        {{ faq.answer }}
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Style tweaks for better UI */
</style>
