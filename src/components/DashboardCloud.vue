<script>
import DashCloudRadioCards from "@/components/DashCloudRadioCards.vue";
import DashCloudOSCArds from "@/components/DashCloudOSCArds.vue";
import centos from '../assets/img/centos.svg'
import ubuntu from '../assets/img/ubuntu.svg'
import debian from '../assets/img/debian.svg'
import windows from '../assets/img/windows.svg'
import {CloudCartItem} from "@/utils/helper_classes.js";
import {createToast} from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'


export default {
  name: "DashboardCloud",
  components: {DashCloudOSCArds, DashCloudRadioCards},
  data() {
    return {
      series: [{
        name: '# of cores',
        data: [30, 50, 49, 60, 99, 91]
      }],
      options: {
        chart: {
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'CPU Usage: Realtime status of compute',
        },
        fill: {
          type: 'gradient',
        },
        xaxis: {
          categories: ['1 day', '12 hrs', '6 hrs', '3 hrs', '1 hr', '30 mins']
        }
      },
      tab: this.$route.query.tab || "new",
      cloudServices: [
        {
          name: 'G1',
          features: ['1Gb RAM', '1 vCPU', '20GB SSD']
        },
        {
          name: 'G2',
          features: ['2Gb RAM', '2 vCPU', '50GB SSD']
        },
        {
          name: 'G3',
          features: ['4Gb RAM', '2 vCPU', '100GB SSD']
        },
        {
          name: 'G4',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD']
        },
      ],
      operatingSystems: [
        {
          name: 'ubuntu',
          image: ubuntu,
          versions: ['Ubuntu 18.04', 'Ubuntu 20.04', 'Ubuntu 22.04']
        },
        {
          name: 'centos',
          image: centos,
          versions: ['CentOS 7', 'CentOS 8']
        },
        {
          name: 'debian',
          image: debian,
          versions: ['Debian 10', 'Debian 11', 'Debian 12']
        },
        {
          name: 'windows',
          image: windows,
          versions: ['Windows Server 2016', 'Windows Server 2019', 'Windows Server 2022']
        },
      ],
      service: {},
      selectedAccessOptions: ['root'],
      id: this.$route.query.id || null, // Set initial ID from URL or default to null
    }
  },
  watch: {
    // Watch the route query for changes
    ["$route.query.tab"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.tab = newTab || "domain"; // Fallback to 'new' if no tab is set
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
      this.$router.push({query: {tab}});
      this.tab = tab;
    },
    setService(service) {
      this.service.name = service.name;
    },
    setOS(os) {
      this.service.os = os;
    },
    setOSVersion(version) {
      this.service.os_version = version;
    },
    addToCart() {
      const service_name = "CL_" + this.service.name + `_00${this.$store.state.user.services.cloud.length + 1}`
      // let itemExistsInStore = this.$store.state.user.services.cloud.find((one) => one.name === service_name);
      //
      // if (itemExistsInStore) {
      //   createToast(
      //       "A service with this name is already in your products.",
      //       {
      //         type: 'warning',
      //         duration: 2000,
      //       }
      //   )
      //   return;
      // }

      if (Object.keys(this.service).length === 0) {
        createToast(
            "You haven't selected a service or operating system",
            {
              type: 'danger',
              duration: 2000,
            }
        )
        ;
        return;
      }
      if (
          this.service.os === undefined ||
          this.service.os_version === undefined ||
          this.service.os_version === '') {
        createToast(
            "Hmm. That doesn't look right. Please check your OS & OS Version configuration.",
            {
              type: 'danger',
              duration: 2500,
            }
        )
        return;
      }

      try {
        let item = new CloudCartItem(
            service_name,
            this.service.name,
            this.service.os,
            this.service.os_version,
            this.selectedAccessOptions,
            9000.55);
        console.log("Added to cart:", item);
        this.$store.dispatch('addItemToCart', item);

      } catch (error) {
        createToast(
            error.message,
            {
              type: 'danger',
              duration: 2000,
            }
        )
      }
    }
  },
  computed: {
    getServiceFromStateWithID() {
      return this.$store.state.user.services.cloud.find((one) => one.id === this.id)
    },
    storeCloudServices() {
      return this.$store.state.user.services.cloud;
    }
  }
}
</script>

<template>
  <div class="">
    <h1 class="header uppercase">Cloud</h1>
    <h1 class="muteSubheader capitalize mb-5">All of your cloud services are displayed here.</h1>

    <!--    TAB SELECTORS-->
    <ul
        class="mt-5 mb-1 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
      <li
          class="me-2" @click="setTab('new')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto" :class="{
            'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'new',
          }"
        >
          New
        </a>
      </li>
      <li
          class="me-2" @click="setTab('manage')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'manage' }"
        >
          Manage
        </a>
      </li>
    </ul>

    <div v-if="tab === 'new'" class="flex">
      <div class="w-9/12">
        <DashCloudRadioCards :services="cloudServices" @selectService="setService"/>
        <DashCloudOSCArds :systems="operatingSystems" @selectOS="setOS" @selectOSVersion="setOSVersion"/>
        <h3 class="mt-4 muteBoldSubheader text-gray-900 dark:text-white">Access Modes</h3>
        <ul
            class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div class="flex items-center ps-3">
              <input id="root-checkbox" type="checkbox" v-model="selectedAccessOptions" value="root"
                     class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="root-checkbox" class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">Root
                Password</label>
            </div>
          </li>
          <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div class="flex items-center ps-3">
              <input id="ssh-checkbox" type="checkbox" v-model="selectedAccessOptions" value="ssh"
                     class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 ">
              <label for="ssh-checkbox"
                     class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">SSH</label>
            </div>
          </li>
          <li
              class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div class="flex items-center ps-3">
              <input id="vnc-checkbox" type="checkbox" v-model="selectedAccessOptions" value="vnc"
                     class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
              <label for="vnc-checkbox"
                     class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">VNC</label>
            </div>
          </li>
        </ul>
      </div>
      <div class="w-3/12 shadow rounded-2xl border-2 border-gray-300 h-[32vh] p-5 relative">
        <h3 class="muteBoldSubheader text-center">Order Summary</h3>

        <div v-if="Object.keys(service).length === 0 || service.name === ''"
             class="text-center bg-gray-300 rounded-3xl p-10 m-3">
          <p class="muteSubheader">Please select a configuration for your cloud service.</p>
        </div>

        <div v-else>
          <div class="flex flex-col mt-5">
            <h2 class="muteSubheader"><strong>VPS Type: </strong><span v-if="service">{{ service.name }}</span></h2>
            <h2 class="muteSubheader capitalize"><strong>Operating System: </strong><span v-if="service">{{
                service.os
              }}</span>
            </h2>
            <h2 class="muteSubheader"><strong>OS Version: </strong><span v-if="service">{{ service.os_version }}</span>
            </h2>
            <div class="">
              <h2 class="muteBoldSubheader underline mt-1">Access Modes</h2>
              <h2 :class="{ 'line-through': !selectedAccessOptions.includes('root') }">
                Root Password
                <span v-if="selectedAccessOptions.includes('root')">✔️</span>
              </h2>
              <h2 :class="{ 'line-through': !selectedAccessOptions.includes('ssh') }">
                SSH
                <span v-if="selectedAccessOptions.includes('ssh')">✔️</span>
              </h2>
              <h2 :class="{ 'line-through': !selectedAccessOptions.includes('vnc') }">
                VNC
                <span v-if="selectedAccessOptions.includes('vnc')">✔️</span>
              </h2>
            </div>
          </div>
          <button class="absolute btn-base bottom-2" @click="addToCart">Add to cart</button>
        </div>
      </div>
    </div>
    <div v-if="tab === 'manage'">
      <div v-show="tab === 'manage'">
        <div v-if="id === null && storeCloudServices.length === 0" class="text-center"><img
            src="/noDomain.png" alt="No domains found" class="w-full h-64 object-contain"/>
          <p class="mt-4 text-gray-500 dark:text-gray-400">
            You don't have any hosted apps/services yet. Go to the "New" tab to host an app/service.
          </p>
        </div>

        <div v-if="id && storeCloudServices.find((one) => one.id === id) === undefined">
          <p>Service with ID: {{ id }} not found!</p>
        </div>

        <div v-else>
          <section class="flex flex-col sm:flex-row">
            <div class="w-full sm:w-1/3 pb-5 sm:pr-5 mb-5 sm:mb-0">
              <router-link :to="`/dashboard/cloud?tab=manage&id=${service.id}`" v-for="service in storeCloudServices"
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

            <div class="w-full sm:w-2/3 pl-5">
              <div class="rounded-3xl shadow-2xl mx-auto p-5 pt-0">
                <div
                    v-if="id && storeCloudServices.find((one) => one.id === id)">
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
                    <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
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
  </div>
</template>


<style scoped>
.line-through {
  text-decoration: line-through;
}
</style>
