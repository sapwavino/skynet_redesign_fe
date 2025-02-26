<script>
import DomainNameSearch from "@/components/DomainNameSearch.vue";
import countries from "@/utils/countries.js";
import {formatDateWithoutTime} from "@/utils/helper_functions.js";

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
      countries,
      selectedCountryCode: '+234',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      country: '',
      gender: '',
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
    formatDateWithoutTime,
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
  },
  mounted() {
    const user = this.$store.state.user.info;
    this.date = new Date();
    this.firstName = user.first_name;
    this.lastName = user.last_name;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.country = user.country;
    this.gender = user.gender;
    this.selectedCountryCode = countries.find(country => country.name === user.country).calling_code;
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
                class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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

            <!--            INFO-->
            <section
                class="dashGroupCard w-full md:w-3/4" style="padding: 0" v-if="detailsTab === 'info'">
              <div class="header mb-3">{{ getServiceFromStateWithID.name }}</div>
              <p class="muteSmallSubheader"><strong>Registered on: </strong>{{
                  formatDateWithoutTime(new Date(getServiceFromStateWithID.created_at))
                }}</p>
              <p class="muteSmallSubheader mb-5"><strong>Expires on: </strong>{{
                  formatDateWithoutTime(new Date(getServiceFromStateWithID.renewal_date))
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
              <div class="flex gap-2 my-5">
                <button
                    @click.prevent="updatingNameservers = true"
                    class="btn-base w-full md:w-1/2" v-show="!updatingNameservers">Update Nameservers
                </button>
                <button class="btn-base-success w-full md:w-1/3" v-show="updatingNameservers"
                        @click.prevent="updatingNameservers = false">Submit
                </button>
              </div>
            </section>

            <!--            SECURITY-->
            <section
                class="dashGroupCard w-full md:w-3/4" style="padding: 0" v-if="detailsTab === 'security'">
              <h2 class="font-bold text-black text-lg mb-1">Domain Protection</h2>
              <p class="muteSubheader">Domain locking is a security feature which prevents your domain from being
                transferred without first unlocking it. When enabled, the domain cannot be transferred even with the
                transfer code.</p>
              <button class="btn-base mt-3">🔒 Lock</button>
              <hr class="my-5"/>
              <h2 class="font-bold text-black text-lg mb-1">Domain Privacy Settings</h2>
              <p class="muteSubheader">If you would like to hide the contact information that is shown on WHOIS you can
                enable privacy protection. Once enabled, no one will know who registered this domain. Once disabled the
                information in the "WhoIs" tab will be visible on WHOIS.</p>
              <button class="btn-base mt-3">Enable Privacy Protection</button>
            </section>

            <!--            WHOIS-->
            <section
                class="dashGroupCard w-full md:w-3/4"
                style="padding: 0"
                v-if="detailsTab === 'whois'">
              <div
                  class="col-span-8 overflow-hidden dark:rounded-3xl sm:bg-gray-50 dark:bg-gray-900"
              >
                <h2 class="font-bold text-black text-lg mb-1">Domain Contact Information for
                  <strong>{{ getServiceFromStateWithID.name }}</strong></h2>
                <p class="muteSubheader">This information will be displayed once someone checks the WHOIS information
                  for your domain(s). This is publicly accessible information & you can enable Domain Privacy Protection
                  if you want this information hidden. Updating this will affect technical, billing & admin contact
                  information.</p>
                <form class="relative px-5 mx-auto rounded-md bg-white dark:bg-gray-500 mt-5 w-full">

                  <div class="grid gap-3 md:grid-cols-2">
                    <div>
                      <label class=""> First Name </label>
                      <input type="text" placeholder="Your Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                             v-model="firstName"/>
                    </div>
                    <div>
                      <label class=""> Last Name </label>
                      <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                             v-model="lastName"/>
                    </div>
                  </div>
                  <div class="flex md:flex-row flex-col md:items-center justify-between my-3">
                    <div class="md:w-1/3">
                      <div>
                        <label class="block text-sm font-medium text-gray-700"> Gender </label>
                        <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
                          <button
                              type="button"
                              @click="isOpen = !isOpen"
                              class="flex w-full items-center justify-between rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400 focus:outline-none capitalize"
                          >
                            {{ gender || 'Select Gender' }}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-4 text-gray-600 transition-transform duration-200"
                                :class="{ 'rotate-180': isOpen }"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                stroke-width="2"
                            >
                              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                            </svg>
                          </button>
                          <ul
                              v-show="isOpen"
                              class="absolute z-10 mt-1 w-full rounded-b-lg bg-white shadow-md transition-all duration-300"
                          >
                            <li
                                v-for="option in options"
                                :key="option"
                                @click="selectOption(option)"
                                class="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white capitalize"
                            >
                              {{ option }}
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="md:w-1/2 w-full mt-3 md:mt-0">
                      <label class=""> Email Address </label>
                      <input type="email" placeholder="Info@example.com" v-model="email"
                             class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"/>
                    </div>
                  </div>
                  <div class="md:w-1/3 w-full">
                    <label class=""> Birth Date </label>
                    <VueDatePicker v-model="date"></VueDatePicker>
                  </div>
                  <div class="flex md:flex-row flex-col md:items-center justify-between mt-3 md:mt-0">
                    <div class="">
                      <label class="capitalize"> Phone country code</label>
                      <select id="country"
                              class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center w-3/4"
                              v-model="selectedCountryCode">
                        <option v-for="(country, idx) in countries" :key="idx" :value="country.calling_code">{{
                            country.flag
                          }}
                          {{ country.name }} - ({{ country.calling_code }})
                        </option>
                      </select>
                    </div>
                    <div class="md:w-1/2 mt-3 md:mt-0">
                      <label class=""> Phone: <span class="text-sm text-gray-400">(optional)</span> </label>
                      <input type="text" placeholder="+543 5445 0543"
                             class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"
                             v-model="phone"/>
                    </div>
                  </div>

                  <div class=" mt-5 ">
                    <button type="button" class="btn-base md:w-1/2">Update Domain Contact</button>
                  </div>
                </form>
              </div>

            </section>

            <!--            TRANSFER-->
            <section
                class="dashGroupCard w-full md:w-3/4"
                style="padding: 0"
                v-if="detailsTab === 'transfer'">

              <h2 class="font-bold text-black text-lg mb-1">Domain Secret</h2>
              <p class="muteSubheader">Most domain names (except a few top-level domains like .eu and .uk) have a Domain
                Secret Key/Authorization code(EPP code) associated with them. This code is typically required when
                transferring the domain to a different registrar.</p>
              <button class="btn-base mt-3">Get EPP Code</button>

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
