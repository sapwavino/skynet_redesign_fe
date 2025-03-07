<script>
import WhyUsCard from "@/components/WhyUsCard.vue";

export default {
  name: "WhyUsSection",
  components: {WhyUsCard}
}
</script>

<template>
  <div class="hidden md:block">
    <div id="whyUs"
         class="mt-10 min-h-10"
    ></div>
    <div class="flex flex-col text-center">
      <h2 class="header capitalize dark:text-gray-200">Why us</h2>
    </div>
    <div class="grid grid-cols-3 gap-x-5 mt-5 mx-auto px-10">
      <WhyUsCard
          content="All our services run on the latest processors from Intel, AMD & NVIDIA to boost our computing power to serve your applications."
          header="High Performance"
      />
      <WhyUsCard
          content="Our technologies and systems are always updated and at optimal levels for blazing performance with a 0.1% downtime guarantee."
          header="Performance"
      />
      <WhyUsCard
          content="Protection and prevention against threats, we also offer frequent backups to prevent data loss."
          header="Security"
      />
    </div>
  </div>
</template>

<style scoped>

</style>