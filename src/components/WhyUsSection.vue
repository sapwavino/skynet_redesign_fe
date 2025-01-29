<script>
import WhyUsCard from "@/components/WhyUsCard.vue";

export default {
  name: "WhyUsSection",
  components: {WhyUsCard}
}
</script>

<template>
  <div class="hidden md:block">
    <div class="mt-10 min-h-10" id="whyUs"></div>
    <div class="flex flex-col text-center">
      <h2 class="header capitalize dark:text-gray-200">Why us</h2>
    </div>
    <div class="grid grid-cols-3 gap-x-5 mt-5 mx-auto px-10">
      <WhyUsCard header="Reliability"
                 content="We run a lot of servers and services across the globe 24/7 to ensure maximum uptime."/>
      <WhyUsCard header="Performance"
                 content="Our technologies and systems are always updated and at optimal levels for blazing performance."/>
      <WhyUsCard header="Security"
                 content="Protection and prevention against threats, we also backup frequently to prevent data loss."/>
    </div>
  </div>
</template>

<style scoped>

</style>