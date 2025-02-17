<script>
import DomainNameSearch from "@/components/DomainNameSearch.vue";

export default {
  name: "DashboardDomains",
  components: {DomainNameSearch},
  data() {
    return {
      tab: this.$route.query.tab || "buy",
      detailsTab: this.$route.query.details || "info",
      id: this.$route.query.id || null,
      updatingNameservers: false,
      ns1: 'ns1.skynet.africa',
      ns2: 'ns2.skynet.africa',
      ns3: '',
      ns4: '',
    };
  },
  watch: {
    ["$route.query.tab"]: {
      immediate: true,
      handler(newTab) {
        this.tab = newTab || "buy";
      },
    },
    ["$route.query.id"]: {
      immediate: true,
      handler(newID) {
        this.id = newID || null;
      },
    },
    ["$route.query.details"]: {
      immediate: true,
      handler(newDetailsTab) {
        this.detailsTab = newDetailsTab || 'info';
      },
    },
  },
  methods: {
    setTab(tab) {
      this.$router.push({query: {tab}}); // Update URL when tab changes
    },
    setDetailsTab(detail) {
      this.$router.push({
        query: {tab: "manage", id: this.id, details: detail},
      });
    },
  },
  computed: {
    getServiceFromStateWithID() {
      return this.$store.state.user.services.domains.find((one) => one.id === this.id)
    },
  }
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
      <img src="/noDomain.png" alt="No domains found" class="w-full h-64 object-contain"/>
      <p class="mt-4 text-center text-gray-500 dark:text-gray-400">
        You haven't registered any domains yet. Go to the "Buy" tab to register your domain.
      </p>
    </div>
    <div v-else>
      <div class="flex md:flex-row flex-col">
        <div class="md:w-1/3 md:border-r border-b mb-2 md:border-b-0 md:mr-2 px-2">
          <ul>
            <router-link
                :to="`/dashboard/domains?tab=manage&id=${domain.id}&details=info`"
                v-for="domain in $store.state.user.services.domains"
                :key="domain.id">
              <li
                  class="flex flex-col bg-gray-300 rounded-3xl p-3 hover:bg-gray-400 cursor-pointer my-4 relative justify-center w-full"
                  :class="{ 'bg-white border-2 border-gray-400 hover:border-black hover:bg-white font-bold': id === domain.id }"
              >{{ domain.name }}
                <div v-if="!domain.active"
                     class="absolute right-2 top-[20%] text-red-700 border-2 border-red-700 rounded-full py-1 px-2 text-xs font-bold tracking-wider">
                  Expired
                </div>
                <div v-else
                     class="absolute right-2 top-[20%] text-green-700 border-2 border-green-700 rounded-full py-1 px-2 text-xs font-bold tracking-wider">
                  Active
                </div>
              </li>
            </router-link>
          </ul>
        </div>

        <!--        DOMAIN DETAILS-->
        <div class="w-full">
          <div class="w-full" v-if="id">


            <!-- DETAILS TAB PICKERS-->
            <ul
                class="mb-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
            >
              <li class="me-2" @click.prevent="setDetailsTab('info')">
                <button
                    class="inline-block p-4 rounded-t-lg"
                    :class="{
                      'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900':
                        detailsTab === 'info',
                    }"
                >
                  Info
                </button>
              </li>

              <li class="me-2" @click.prevent="setDetailsTab('security')">
                <button
                    class="inline-block p-4 rounded-t-lg"
                    :class="{
                      'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900':
                        detailsTab === 'security',
                    }"
                >
                  Security
                </button>
              </li>

              <li class="me-2" @click.prevent="setDetailsTab('whois')">
                <button
                    class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    :class="{ 'text-customGold font-bold bg-gray-800 active': detailsTab === 'whois' }"
                >
                  WhoIs
                </button>
              </li>

              <li class="me-2" @click.prevent="setDetailsTab('transfer')">
                <button
                    class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                    :class="{ 'text-customGold font-bold bg-gray-800 active': detailsTab === 'transfer' }"
                >
                  Transfer
                </button>
              </li>

            </ul>

            <section class="dashGroupCard w-full md:w-3/4" style="padding: 0">
              <div class="header">{{ getServiceFromStateWithID.name }}</div>
              <p class="muteSmallSubheader">Registered on: {{
                  new Date(getServiceFromStateWithID.created_at)
                }}</p>
              <p class="muteSmallSubheader mb-5">Expires on: {{
                  new Date(getServiceFromStateWithID.renewal_date)
                }}</p>

              <hr/>

              <div class="py-4">
                <h2 class="muteBoldSubheader text-lg">Nameservers</h2>
                <section class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label for="ns1">Nameserver 1*</label>
                    <input name="ns1" type="text" class="text-input-base p-3 m-2" placeholder="ns1.example.com"
                           :disabled="!updatingNameservers" v-model="ns1"/>
                  </div>

                  <div>
                    <label for="ns2">Nameserver 2*</label>
                    <input name="ns2" type="text" class="text-input-base p-3 m-2" placeholder="ns2.example.com"
                           :disabled="!updatingNameservers" v-model="ns2"/>
                  </div>

                  <div>
                    <label for="ns3">Nameserver 3*</label>
                    <input name="ns3" type="text" class="text-input-base p-3 m-2" placeholder="ns3.example.com"
                           :disabled="!updatingNameservers" v-model="ns3"/>
                  </div>

                  <div>
                    <label for="ns4">Nameserver 4*</label>
                    <input name="ns4" type="text" class="text-input-base p-3 m-2" placeholder="ns4.example.com"
                           :disabled="!updatingNameservers" v-model="ns4"/>
                  </div>
                </section>
              </div>
              <div class="flex gap-2">
                <button
                    @click.prevent="updatingNameservers = true"
                    class="btn-base w-full md:w-1/2" v-show="!updatingNameservers">Update Nameservers
                </button>
                <button class="btn-base-success w-full md:w-1/3" v-show="updatingNameservers"
                        @click.prevent="updatingNameservers = false">Submit
                </button>
              </div>
            </section>
          </div>
          <div v-else>
            <p class="text-center text-gray-500 dark:text-gray-400">
              Please select a domain from the list to manage.
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
