<script>
import DashboardHostingStepper from "@/components/DashboardHostingStepper.vue";

export default {
  name: "DashboardHosting",
  components: {DashboardHostingStepper},
  data() {
    return {
      tab: this.$route.query.tab || "new", // Set initial tab from URL or default to 'new'
      id: this.$route.query.id || null, // Set initial ID from URL or default to null
      selectedService: null, // Selected hosting service
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
    ["$route.query.id"]: {
      immediate: true, // Run on component mount
      handler(newID) {
        this.id = newID || null; // Fallback to 'new' if no tab is set
      },
    },
  },
  methods: {
    setTab(tab) {
      this.$router.push({query: {tab}}); // Update URL when tab changes
    },
  },
  computed: {
    getServiceFromStateWithID() {
      return this.$store.state.user.services.hosting.find((one) => one.id === this.id)
    },
    hostingServices() {
      return this.$store.state.user.services.hosting;
    }
  }
}
</script>

<template>

  <div class=" mx-auto">
    <h1 class="header uppercase text-2xl font-bold sm:text-3xl">Hosting</h1>
    <h1 class="muteSubheader capitalize mb-5 text-base sm:text-lg">All your hosting packages in one place</h1>
    <ul class="mt-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li class="me-2" @click="setTab('new')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto" :class="{
            'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'new',
          }"
        >
          New
        </a>
      </li>
      <li class="me-2" @click="setTab('manage')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'manage' }"
        >
          Manage
        </a>
      </li>
    </ul>

    <div v-show="tab === 'new'">
      <DashboardHostingStepper/>
    </div>

    <div v-show="tab === 'manage'">
      <div v-if="id === null && $store.state.user.services.hosting.length === 0" class="text-center"><img
          src="/noDomain.png" alt="No domains found" class="w-full h-64 object-contain"/>
        <p class="mt-4 text-gray-500 dark:text-gray-400">
          You don't have any hosted apps/services yet. Go to the "New" tab to host an app/service.
        </p>
      </div>

      <div v-if="id && $store.state.user.services.hosting.find((one) => one.id === id) === undefined">
        <p>Service with ID: {{ id }} not found!</p>
      </div>

      <div v-else>
        <section class="flex flex-col sm:flex-row">
          <div class="w-full sm:w-1/3 pb-5 sm:pr-5 mb-5 sm:mb-0">
            <router-link :to="`/dashboard/hosting?tab=manage&id=${service.id}`" v-for="service in hostingServices"
                         :key="service.id">
              <li
                  class="flex flex-col bg-gray-300 rounded-3xl p-3 hover:bg-gray-400 cursor-pointer my-2 relative justify-center w-full"
                  :class="{ 'bg-white border-2 border-gray-400 hover:border-black hover:bg-white': id === service.id }"
              >
                <div v-if="!service.active"
                     class="absolute right-[10%] top-[30%] text-red-700 border-2 border-red-700 rounded-full py-1 px-3 text-sm font-bold tracking-wider">
                  Stopped
                </div>
                <div v-else
                     class="absolute right-[10%] top-[30%] text-green-700 border-2 border-green-600 rounded-full py-1 px-3 text-sm font-bold tracking-wider">
                  Running
                </div>
                <p class="text-gray-700 font-bold text-sm uppercase">{{ service.name }}</p>
                <p class="muteBoldSubheader">{{ service.type }}</p>
                <p class="muteSmallSubheader italic">{{ service.description }}</p>
              </li>
            </router-link>
          </div>

          <div class="w-full sm:w-2/3">
            <div class="rounded-3xl shadow-2xl mx-auto p-5 pt-0">
              <div v-if="id && $store.state.user.services.hosting.find((one) => one.id === id)">
                <h2 class="header">{{ getServiceFromStateWithID.name }}</h2>
                <h2 class="muteSubheader mb-1">{{ getServiceFromStateWithID.type }}</h2>
                <div class="flex items-center">
                  <button v-if="!getServiceFromStateWithID.active"
                          class="text-red-700 border-2 border-red-700 rounded-full py-1 px-3 text-sm font-bold tracking-wider mr-2">
                    Stopped
                  </button>
                  <button v-else
                          class="text-green-700 border-2 border-green-600 rounded-full py-1 px-3 text-sm font-bold tracking-wider">
                    Running
                  </button>
                </div>
                <hr class="my-5"/>
                <div>
                  <p><strong>ID#:</strong> {{ getServiceFromStateWithID.id }}</p>
                  <p><strong>Purchased:</strong> {{ getServiceFromStateWithID.price }}</p>
                  <p><strong>Created on:</strong> {{ getServiceFromStateWithID.created_at }}</p>
                  <p><strong>Activated on:</strong> {{ getServiceFromStateWithID.activated_at }}</p>
                  <p><strong>Renewal date:</strong> {{ getServiceFromStateWithID.renewal_date }}</p>
                </div>
                <div class="flex flex-col sm:flex-row gap-3 mt-5">
                  <button class="btn-base-error w-full sm:w-auto">Stop Service</button>
                  <button class="btn-base-success w-full sm:w-auto">Restart Service</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>

</template>

<style scoped>

</style>