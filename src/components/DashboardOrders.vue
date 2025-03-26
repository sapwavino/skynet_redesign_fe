<script>
import EmptyOrder from "@/components/EmptyOrder.vue";
import {convertPrice, convertToUSD, formatNumber} from "../utils/helper_functions.js";

export default {
  name: "DashboardOrders",
  components: {EmptyOrder},
  data() {
    return {
      tab: this.$route.query.tab || "domain", // Set initial tab from URL or default to 'new'
    }
  },
  methods: {
    formatNumber,
    convertPrice,
    convertToUSD,
    setTab(tab) {
      this.$router.push({query: {tab}});
      this.tab = tab;
    },
  },
  watch: {
    // Watch the route query for changes
    ["$route.query.tab"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.tab = newTab || "domain"; // Fallback to 'new' if no tab is set
      },
    },
  },
}
</script>

<template>
  <div>
    <h1 class="header uppercase">Orders</h1>
    <h2 class="muteSmallSubheader">All of your orders are displayed here. Click on any service to get full information
                                   about it.
    </h2>


    <!--    TAB SELECTORS-->
    <ul
        class="mt-5 mb-1 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
    >
      <li class="me-2"
          @click="setTab('domain')"
      >
        <a
            :class="{
            'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'domain',
          }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          Domain
        </a>
      </li>
      <li class="me-2"
          @click="setTab('hosting')"
      >
        <a
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'hosting' }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          Hosting
        </a>
      </li>
      <li class="me-2"
          @click="setTab('cloud')"
      >
        <a
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'cloud' }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          Cloud
        </a>
      </li>
      <li class="me-2"
          @click="setTab('email')"
      >
        <a
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'email' }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          Email
        </a>
      </li>
      <li class="me-2"
          @click="setTab('database')"
      >
        <a
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'database' }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          Database
        </a>
      </li>
    </ul>


    <section v-if="tab === 'domain'"
             class="flex"
    >
      <div
          v-if="$store.state.user.services.domains.length > 0"
          class="grid md:grid-cols-4 md:w-3/4 pb-5 mb-5 sm:mb-0 gap-3"
      >

        <router-link v-for="order in $store.getters.getDomainOrders"
                     :key="order.id"
                     :to="`/dashboard/domains?tab=manage&id=${order.id}`"
        >
          <li
              class="flex flex-col bg-gray-300 rounded-3xl p-3 hover:bg-gray-400 cursor-pointer my-2 relative justify-center w-full"
          >
            <p class="text-gray-700 font-bold">
              {{ order.title }}
            </p>
            <p class="muteBoldSubheader text-sm">
              Duration: {{ order.config.register_years }}
            </p>
            <p class="muteSmallSubheader ">
              <strong>
                Cost:
              </strong>
              {{ $store.getters.preferredCurrencySymbol }} {{
                formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(order.price, order.currency)))
              }}
            </p>
            <p class="muteSmallSubheader ">
              <strong>
                Order currency:
              </strong>
              {{ order.currency }}
            </p>
            <p class="muteSmallSubheader capitalize">
              <strong>Purchased
                      on:
              </strong>
              {{ order.activated_at.substring(0, 10) }}
            </p>
            <button
                v-if="order.status !== 'active'"
                class="text-white bg-red-700 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
            >
              Expired
            </button>
            <button v-else
                    class="text-white bg-green-600 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
            >
              Active
            </button>
          </li>
        </router-link>
      </div>
    </section>

    <section v-if="tab === 'cloud'"
             class="flex"
    >
      <div
          v-if="$store.state.user.services.domains.length > 0"
          class="grid md:grid-cols-4 md:w-3/4 pb-5 mb-5 sm:mb-0 gap-3"
      >
        <router-link v-for="service in $store.state.user.services.cloud"
                     :key="service.id"
                     :to="`/dashboard/cloud?tab=manage&id=${service.id}`"
        >
          <li
              class="flex flex-col bg-gray-300 rounded-3xl p-3 hover:bg-gray-400 cursor-pointer my-2 relative justify-center w-full"
          >
            <p class="text-gray-700 text-xs font-medium"><strong>Order ID#: </strong>{{ service.id }}</p>
            <hr class="my-5" />
            <p class="text-gray-700 font-bold">{{ service.name }}</p>
            <p class="muteSmallSubheader italic">{{ service.description }}</p>
            <p class="muteSmallSubheader "><strong>Cost: </strong>{{ service.price }}</p>
            <p class="muteSmallSubheader capitalize"><strong>Billing Cycle: </strong>{{ service.billing_cycle }}</p>
            <p class="muteSmallSubheader "><strong>Created on: </strong>{{ service.created_at }}</p>
            <hr class="my-5" />
            <button v-if="!service.active"
                    class="text-white bg-red-700 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
            >
              Expired
            </button>
            <button v-else
                    class="text-white bg-green-600 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
            >
              Active
            </button>
          </li>
        </router-link>
      </div>
    </section>

    <section v-if="tab === 'hosting'"
             class="flex"
    >
      <div
          v-if="$store.state.user.services.hosting.length > 0"
          class="grid md:grid-cols-4 w-full md:w-3/4 pb-5 mb-5 sm:mb-0 gap-3"
      >
        <router-link v-for="service in $store.state.user.services.hosting"
                     :key="service.id"
                     :to="`/dashboard/hosting?tab=manage&id=${service.id}`"
        >
          <li
              class="flex flex-col bg-gray-300 rounded-3xl p-3 hover:bg-gray-400 cursor-pointer my-2 relative justify-center w-full"
          >
            <p class="text-gray-700 text-xs font-medium"><strong>Order ID#: </strong>{{ service.id }}</p>
            <hr class="my-5" />
            <p class="text-gray-700 font-bold uppercase">{{ service.name }}</p>
            <p class="muteBoldSubheader text-sm">{{ service.type }}</p>
            <p class="muteSmallSubheader italic">{{ service.description }}</p>
            <p class="muteSmallSubheader italic"><strong>Cost: </strong>{{ service.price }}</p>
            <hr class="my-5" />
            <button v-if="!service.active"
                    class="text-white bg-red-700 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
            >
              Stopped
            </button>
            <button v-else
                    class="text-white bg-green-600 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
            >
              Running
            </button>
          </li>
        </router-link>
      </div>
    </section>

    <section v-if="tab === 'email'"
             class="flex"
    >
      <EmptyOrder order="email" />
    </section>

    <section v-if="tab === 'database'"
             class="flex"
    >
      <EmptyOrder order="database" />
    </section>
  </div>

</template>


<style scoped>

</style>