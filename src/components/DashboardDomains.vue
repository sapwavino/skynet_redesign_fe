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


  <ul class="my-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
    <li class="me-2">
      <a href="#" aria-current="page"
         class="inline-block p-4 text-customGold font-bold bg-gray-800 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500">Buy</a>
    </li>
    <li class="me-2">
      <a href="#"
         class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300">Manage</a>
    </li>
    <li class="me-2">
      <a href="#"
         class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300">Domain
        Contacts</a>
    </li>
  </ul>

  <div class="w-1/2 mt-5 mx-auto">
    <DomainNameSearch/>
  </div>
</template>

<style scoped>

</style>