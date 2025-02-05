<script>
import DashboardHostingStepper from "@/components/DashboardHostingStepper.vue";

export default {
  name: "DashboardHosting",
  components: {DashboardHostingStepper},
  data() {
    return {
      tab: this.$route.query.tab || "new", // Set initial tab from URL or default to 'new'
    };
  },
  watch: {
    // Watch the route query for changes
    ["$route.query.tab"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.tab = newTab || "new"; // Fallback to 'new' if no tab is set
      },
    },
  },
  methods: {
    setTab(tab) {
      this.$router.push({query: {tab}}); // Update URL when tab changes
    },
  },
}
</script>

<template>
  <div class="">
    <h1 class="header uppercase">Hosting</h1>
    <h1 class="muteSubheader capitalize mb-5">All your hosting packages in one place</h1>

    <!--  TAB PICKERS-->
    <ul
        class="mt-5 mb-1 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
    >
      <li class="me-2" @click="setTab('new')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg"
            :class="{
          'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900':
            tab === 'new',
        }"
        >
          New
        </a>
      </li>
      <li class="me-2" @click="setTab('manage')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            :class="{ 'text-customGold font-bold bg-gray-800 active': tab === 'manage' }"
        >
          Manage
        </a>
      </li>
    </ul>
    <div v-show="tab === 'new'">
      <DashboardHostingStepper/>
    </div>

    <div v-show="tab ==='manage'">
      <!-- Manage your hosting packages here -->
      <p class="muteSubheader">Manage your hosting packages here.</p>
      <div>
        <img src="/noDomain.png" alt="No domains found" class="w-full h-64 object-contain" />
        <p class="mt-4 text-center text-gray-500 dark:text-gray-400">
          You don't have any hosted apps/services yet. Go to the "New" tab to host an app/service.
        </p>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>