<script>
import DomainNameSearch from "@/components/DomainNameSearch.vue";
import ServicesTab from "@/components/ServicesTab.vue";

export default {
  name: "HeroSection",
  components: {ServicesTab, DomainNameSearch}
}
</script>

<template>
  <section class="hero">
    <h2 class="bigHeader"><span class="text-5xl tracking-wider">Do more online,</span> <br/> for much less</h2>
    <DomainNameSearch class=""/>
    <ServicesTab/>
  </section>
</template>

<style scoped>

</style>