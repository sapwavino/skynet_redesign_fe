<script>
import DomainNameSearch from "@/components/DomainNameSearch.vue";

export default {
  name: "DashboardDomains",
  components: {DomainNameSearch}
}
</script>

<template>
  <div class="">
    <h1 class="header uppercase">Domains</h1>
    <h1 class="muteSubheader capitalize">Buy & Manage your domains</h1>
  </div>
  <div class="w-1/2 mt-3">
    <DomainNameSearch/>
  </div>
</template>

<style scoped>

</style>