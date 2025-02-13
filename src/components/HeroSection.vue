<script>
import DomainNameSearch from "@/components/DomainNameSearch.vue";
import ServicesTabs from "@/components/ServicesTabs.vue";

export default {
  name: "HeroSection",
  components: {ServicesTab: ServicesTabs, DomainNameSearch}
}
</script>

<template>
  <section class="hero">
    <h2 class="bigHeader"><span class="text-5xl tracking-wider">Do more online,</span> <br/> for much less</h2>
    <div class="mx-auto md:w-1/3">
      <DomainNameSearch/>
    </div>
  </section>
</template>

<style scoped>

</style>