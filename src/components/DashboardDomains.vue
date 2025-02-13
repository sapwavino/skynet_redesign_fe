<script>
import DomainNameSearch from "@/components/DomainNameSearch.vue";

export default {
  name: "DashboardDomains",
  components: {DomainNameSearch},
  data() {
    return {
      tab: this.$route.query.tab || "buy", // Set initial tab from URL or default to 'buy'
    };
  },
  watch: {
    // Watch the route query for changes
    ["$route.query.tab"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.tab = newTab || "buy"; // Fallback to 'buy' if no tab is set
      },
    },
  },
  methods: {
    setTab(tab) {
      this.$router.push({query: {tab}}); // Update URL when tab changes
    },
  },
};
</script>

<template>
  <div>
    <h1 class="header uppercase">Domains</h1>
    <h1 class="muteSubheader capitalize">Buy & Manage your domains</h1>
  </div>

  <!--  TAB PICKERS-->
  <ul
      class="my-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
  >
    <li class="me-2" @click.prevent="setTab('buy')">
      <button
          class="inline-block p-4 rounded-t-lg"
          :class="{
          'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900':
            tab === 'buy',
        }"
      >
        Buy
      </button>
    </li>
    <li class="me-2" @click.prevent="setTab('manage')">
      <button
          class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          :class="{ 'text-customGold font-bold bg-gray-800 active': tab === 'manage' }"
      >
        Manage
      </button>
    </li>
  </ul>

  <!-- Tab Content -->
  <div class="md:w-1/2 mt-5 mx-auto" v-if="tab === 'buy'">
    <DomainNameSearch/>
  </div>

  <div v-if="tab === 'manage'">
    <div v-if="$store.state.user.services.domains.length < 1">
      <img src="/noDomain.png" alt="No domains found" class="w-full h-64 object-contain" />
      <p class="mt-4 text-center text-gray-500 dark:text-gray-400">
        You haven't registered any domains yet. Go to the "Buy" tab to register your domain.
      </p>
    </div>
    <div v-else>
      <div class="flex flex-wrap gap-4">
        <div v-for="domain in $store.state.user.services.domains" :key="domain.id">{{domain.name}}</div>
      </div>
    </div>
  </div>
</template>
