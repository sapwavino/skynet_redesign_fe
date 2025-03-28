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
import {convertPrice, formatCurrency, getCurrencySymbol} from "@/utils/helper_functions.js";
import Modal from "@/components/Modal.vue";
import {ref} from "vue";


export default {
  name: "DashboardCloud",
  components: {Modal, DashCloudOSCArds, DashCloudRadioCards},
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
        markers: {
          size: 10,
          colors: ['#eabe63ff'],
          strokeColors: 'green',
          strokeWidth: 4,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle"
        },
        stroke: {
          curve: 'smooth',
        },
        title: {
          text: 'CPU Usage: Realtime status of compute',
        },
        fill: {
          type: 'gradient',
          colors: ['teal']
        },
        xaxis: {
          categories: ['1 day', '12 hrs', '6 hrs', '3 hrs', '1 hr', '30 mins']
        }
      },
      tab: this.$route.query.tab || "new",
      subTab: this.$route.query.config || "preset",
      cloudServices: [
        {
          name: 'G1',
          features: ['1Gb RAM', '1 vCPU', '20GB SSD'],
          price: 6136.57
        },
        {
          name: 'G2',
          features: ['2Gb RAM', '2 vCPU', '50GB SSD'],
          price: 10739.00
        },
        {
          name: 'G3',
          features: ['4Gb RAM', '2 vCPU', '100GB SSD'],
          price: 15341.43
        },
        {
          name: 'G4',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD'],
          price: 18048.71
        },
        {
          name: 'G5',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD'],
          price: 18048.71
        },
        {
          name: 'G6',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD'],
          price: 18048.71
        },
      ],
      cloudPerformanceServices: [
        {
          name: 'P1',
          features: ['1Gb RAM', '1 vCPU', '20GB SSD'],
          price: 6136.57
        },
        {
          name: 'P2',
          features: ['2Gb RAM', '2 vCPU', '50GB SSD'],
          price: 10739.00
        },
        {
          name: 'P3',
          features: ['4Gb RAM', '2 vCPU', '100GB SSD'],
          price: 15341.43
        },
        {
          name: 'P4',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD'],
          price: 18048.71
        },
        {
          name: 'P5',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD'],
          price: 18048.71
        },
        {
          name: 'P6',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD'],
          price: 18048.71
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
      checkingOut: false,
      billing_frequency: 1,
      billing_frequency_options: [
        {text: 'monthly (1 month)', value: 1},
        {text: 'bi-monthly (2 months)', value: 2},
        {text: 'quarterly (3 months)', value: 3},
        {text: 'bi-annually (6 months)', value: 6},
        {text: 'annually (12 months)', value: 12},


      ],
      resetOSOptions: false,
      updatedPassword: "",
      confirmPassword: "",
      showPasswordChangeModal: false,
      vpsType: false,
      gpuConfig: false,
      popularConfigs: [
        {
          name: 'Starter VPS',
          features: ['2GB RAM', '2 CPU Cores', '50 GB SSD'],
          price: 18,
          isGPU: false,
          isPopular: false,
          ram: 2,
          cores: 2,
          storage: 50
        },
        {
          name: 'Business VPS',
          features: ['4GB RAM', '2 CPU Cores', '100 GB SSD'],
          price: 26,
          isGPU: false,
          isPopular: true,
          ram: 4,
          cores: 2,
          storage: 100
        },
        {
          name: 'Premium VPS',
          features: ['8GB RAM', '4 CPU Cores', '200 GB SSD'],
          price: 52,
          isGPU: false,
          isPopular: false,
          ram: 8,
          cores: 4,
          storage: 200
        },
        {
          name: 'GPU Accelerated VPS',
          features: ['16GB RAM', '8GB GPU RAM', '8 CPU Cores', '500 GB SSD', 'NVIDIA A100'],
          price: 120,
          isGPU: true,
          isPopular: false,
          ram: 16,
          gpuRAM: 8,
          gpuCores: 8,
          cores: 8,
          storage: 500
        }
      ],
      selectedConfig: '',
      operatingSystem: 'debian',
      selectedOsVersion: '',
      ssh: true,
      showPassword: false,
      rootPass: '',
      totalCost: 0,
      ram: "4",
      cores: "2",
      storage: "100",
      gpuRAM: "8",
      gpuCores: "1024",
      gpuArchitecture: "NVIDIA T4",
      gpuArchitectures: [
        {
          name: 'NVIDIA T4',
          content: 'Good for ML inference'
        },
        {
          name: 'NVIDIA A100',
          content: 'AI/ML workloads'
        },
        {
          name: 'NVIDIA RTX',
          content: '3D rendering'
        }
      ],
      additionalIPs: 0
    }
  },
  watch: {
    // Watch the route query for changes
    ["$route.query.tab"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.tab = newTab || "new"; // Fallback to 'new' if no tab is set
      },
    },
    ["$route.query.config"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.subTab = newTab || "preset"; // Fallback to 'new' if no tab is set
      },
    },
    ["$route.query.id"]: {
      immediate: true, // Run on component mount
      handler(newID) {
        this.id = newID || null; // Fallback to 'new' if no tab is set
      },
    },
    selectedAccessOptions(newOption) {
      this.service.selectedAccessOptions = this.selectedAccessOptions
    },
    billing_frequency(newFrequency) {
      this.service.price = this.service.price * newFrequency
    },
    ram() {
      this.calculateTotalCost()
    },
    cores() {
      this.calculateTotalCost()
    },
    gpuRAM() {
      this.calculateTotalCost()
    },
    gpuCores() {
      this.calculateTotalCost()
    },
    additionalIPs() {
      this.calculateTotalCost()
    },
    operatingSystem() {
      this.calculateTotalCost()
      this.selectedOsVersion = ''
    },
    selectedConfig(newConfig) {
      if (!newConfig.isGPU) {
        this.gpuConfig = newConfig.isGPU
        this.ram = newConfig.ram
        this.cores = newConfig.cores
        this.storage = newConfig.storage
        this.calculateTotalCost()
      }
      else {
        this.gpuConfig = newConfig.isGPU
        this.ram = newConfig.ram
        this.cores = newConfig.cores
        this.storage = newConfig.storage
        this.gpuRAM = newConfig.gpuRAM
        this.gpuCores = newConfig.gpuCores
        this.calculateTotalCost()

      }

    }

  },
  methods: {
    formatCurrency,
    convertPrice,
    getCurrencySymbol,
    setTab(tab) {
      this.$router.push({query: {tab}});
      this.tab = tab;
    },
    setSubTab(tab) {
      this.$router.push(`/dashboard/cloud?tab=new&config=${tab}`);
      this.subTab = tab;
    },
    setService(service) {
      this.billing_frequency = 1
      this.resetOSOptions = true;
      this.service = service;
      this.service.selectedAccessOptions = this.selectedAccessOptions;
    },
    setOS(os) {
      this.resetOSOptions = false;
      this.service.os_version = ''
      this.service.os = os;
    },
    setOSVersion(version) {
      this.resetOSOptions = false
      this.service.os_version = version;
    },
    addToCart() {
      const service_name = "CL_" + this.service.name + `_00${this.$store.state.user.services.cloud.length + 1}`
      this.checkingOut = true
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
            9000.55
        );
        // this.$store.dispatch('addItemToCart', item);

      } catch (error) {
        createToast(
            error.message,
            {
              type: 'danger',
              duration: 2000,
            }
        )
      }
    },
    closePasswordChangeModal() {
      this.showPasswordChangeModal = false
    },
    generateSSHPassword() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@-_#*&%$!";
      return Array.from({length: 10}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    },
    copyToClipboard() {
      if (this.rootPass) {
        navigator.clipboard.writeText(this.rootPass)
            .then(() => {
              console.log("Password copied to clipboard! ✅");
              createToast(
                  "Root password copied to clipboard! ✅",
                  {
                    type: "info",
                    duration: 2500
                  }
              )
            });
      }
    },
    calculateTotalCost() {
      let baseCost = (this.ram * 2) + (this.cores * 2) + ((this.storage / 10) * 2) + (this.additionalIPs * 2);

      if (this.gpuConfig) {
        baseCost += (this.gpuCores * 10) + (this.gpuRAM * 10);
      }

      if (this.operatingSystem === 'windows') {
        baseCost += 10;
      }

      this.totalCost = baseCost;
    }
  },
  computed: {
    getServiceFromStateWithID() {
      return this.$store.getters.getCloudOrders.find((one) => one.id === parseInt(this.id)) || undefined
    },
    storeCloudServices() {
      return this.$store.getters.getCloudOrders;
    }
  }
}
</script>

<template>
  <div class="">
    <h1 class="header uppercase">Cloud</h1>
    <h1 class="muteSubheader capitalize mb-5">All of your cloud services are displayed here.</h1>

    <!--    TOP TAB SELECTORS-->
    <ul
        class="mt-5 mb-1 flex flex-wrap text-sm font-medium text-center text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400"
    >
      <li
          class="me-2"
          @click="setTab('new')"
      >
        <a
            :class="{
            'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'new',
          }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          New
        </a>
      </li>
      <li
          class="me-2"
          @click="setTab('manage')"
      >
        <a
            :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': tab === 'manage' }"
            class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
            href="#"
        >
          Manage
        </a>
      </li>
    </ul>

    <div
        v-if="tab === 'new'"
        class="grid grid-cols-2 gap-y-5 items-center md:items-start"
    >

      <!--      CONFIG TAB SELECTORS-->
      <ul
          class="mb-1 flex justify-center text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 col-span-2"
      >
        <li
            class=""
            @click="setSubTab('preset')"
        >
          <a
              :class="{
            'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': subTab === 'preset',
          }"
              class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
              href="#"
          >
            Preset Configurations
          </a>
        </li>
        <li
            class=""
            @click="setSubTab('custom')"
        >
          <a
              :class="{ 'text-customGold font-bold bg-gray-800 dark:bg-customGold dark:text-gray-900': subTab === 'custom' }"
              class="inline-block p-4 rounded-t-lg w-full sm:w-auto"
              href="#"
          >
            Custom Configuration
          </a>
        </li>
      </ul>

      <!--      PRESET SECTION -->
      <section
          v-if="subTab === 'preset'"
          class="col-span-2"
      >
        <div>

          <!--      VPS TYPE TOGGLE-->
          <div class="flex justify-center mb-5">
            <label class="inline-flex items-center space-x-4 cursor-pointer text-gray-800"
                   for="Toggle2"
            >
              <span class="font-bold dark:text-gray-300">General Purpose</span>
              <span class="relative">
                <input id="Toggle2"
                       v-model="vpsType"
                       class="hidden peer"
                       type="checkbox"
                >
                <div class="w-10 h-4 rounded-full shadow bg-gray-400 peer-checked:bg-customGold"></div>
                <div class="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-customGold"></div>
              </span>
              <span class="font-bold dark:text-gray-300">Performance</span>
            </label>
          </div>


          <DashCloudRadioCards
              v-if="!vpsType"
              :services="cloudServices"
              type="General Purpose"
              @selectService="setService"
          />
          <DashCloudRadioCards
              v-if="vpsType"
              :services="cloudPerformanceServices"
              type="Performance"
              @selectService="setService"
          />
          <DashCloudOSCArds :reset="resetOSOptions"
                            :systems="operatingSystems"
                            @selectOS="setOS"
                            @selectOSVersion="setOSVersion"
          />
          <h3 class="mt-4 muteBoldSubheader text-gray-900 dark:text-white">Access Modes</h3>
          <ul
              class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input id="root-checkbox"
                       v-model="selectedAccessOptions"
                       class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                       type="checkbox"
                       value="root"
                >
                <label class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300"
                       for="root-checkbox"
                >Root
                 Password</label>
              </div>
            </li>
            <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input id="ssh-checkbox"
                       v-model="selectedAccessOptions"
                       class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 "
                       type="checkbox"
                       value="ssh"
                >
                <label class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300"
                       for="ssh-checkbox"
                >SSH</label>
              </div>
            </li>
            <li
                class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600"
            >
              <div class="flex items-center ps-3">
                <input id="vnc-checkbox"
                       v-model="selectedAccessOptions"
                       class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                       type="checkbox"
                       value="vnc"
                >
                <label class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300"
                       for="vnc-checkbox"
                >VNC</label>
              </div>
            </li>
          </ul>
        </div>

      </section>

      <!--   CUSTOM SECTION-->
      <section
          v-if="subTab === 'custom'"
          class="col-span-2"
      >
        <!--    POPULAR CONFIGS-->
        <div class="mt-5">
          <h2 class="text-2xl  text-center dark:text-gray-300">Popular Configurations</h2>
          <hr class="mx-96 mb-5 mt-1 border-gray-300 dark:border-gray-500" />
          <section class="grid md:grid-cols-4">
            <div
                v-for="(config, idx) in popularConfigs"
                :key="idx"
                :class="{
              'ring-4 ring-customGold shadow-2xl': config.name === selectedConfig.name
            }"
                class="m-2 rounded-2xl p-5 relative flex flex-col gap-3 cursor-pointer border-2 border-customGold/50 hover:-translate-y-1 transform transition-all duration-500 ease-in-out dark:bg-gray-900"
                @click="selectedConfig = config"
            >
              <p v-if="config.isGPU"
                 class="bg-customGold font-bold p-1 rounded-full absolute -top-3 -right-3 text-sm animate-pulse tracking-wider"
              >GPU</p>

              <p v-if="config.isPopular"
                 class="bg-customGold font-bold p-1 px-2 rounded-full absolute -top-3 -right-3 text-sm tracking-wider"
              >Popular</p>

              <h2 class="text-2xl font-bold text-center dark:text-gray-300">{{ config.name }}</h2>

              <div class="flex flex-col items-center">
                <p
                    v-for="(feature, fIdx) in config.features"
                    :key="fIdx"
                    class="muteBoldSubheader"
                >{{ feature }}</p>
              </div>
            </div>
          </section>
        </div>

        <div class="mt-5">
          <h2 class="text-2xl text-center dark:text-gray-300">Configure your VPS</h2>
          <hr class="mx-96 mb-5 mt-1 border-gray-300 dark:border-gray-500" />


          <!--      GPU CONFIG TOGGLE-->
          <div class="flex justify-center mb-5">
            <label class="inline-flex items-center space-x-4 cursor-pointer text-gray-800"
                   for="Toggle2"
            >
              <span class="font-bold dark:text-gray-300">CPU</span>
              <span class="relative">
          <input id="Toggle2"
                 v-model="gpuConfig"
                 class="hidden peer"
                 type="checkbox"
          >
          <div class="w-10 h-4 rounded-full shadow bg-gray-400 peer-checked:bg-customGold"></div>
          <div class="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-customGold"></div>
        </span>
              <span class="font-bold dark:text-gray-300">GPU-Accelerated</span>
            </label>
          </div>


          <!--      CPU CONFIGURATION-->
          <div class="pl-10">
            <div class="flex items-center gap-3 mx-auto">
              <label
                  class="text-neutral-700 font-bold dark:text-neutral-200"
                  for="ramRange"
              >
                RAM
              </label
              >
              <input
                  id="ramRange"
                  v-model="ram"
                  class="w-5/6 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                  max="64"
                  min="1"
                  type="range"
              />
              <p class="font-bold text-customGold">{{ ram }} GB</p>
            </div>

            <div class="flex items-center gap-3 mx-auto my-5">
              <label
                  class="text-neutral-700 font-bold dark:text-neutral-200"
                  for="coresRange"
              >
                CPU Cores
              </label
              >
              <input
                  id="coresRange"
                  v-model="cores"
                  class="w-5/6 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                  max="32"
                  min="1"
                  type="range"
              />
              <p class="font-bold text-customGold">{{ cores }} Cores</p>
            </div>

            <div class="flex items-center gap-3 mx-auto">
              <label
                  class="text-neutral-700 font-bold dark:text-neutral-200"
                  for="ramRange"
              >
                Storage
              </label
              >
              <input
                  id="ramRange"
                  v-model="storage"
                  class="w-5/6 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                  max="2000"
                  min="20"
                  step="10"
                  type="range"
              />
              <p class="font-bold text-customGold">{{ storage }} GB</p>
            </div>
          </div>


          <!--GPU CONFIG-->
          <transition name="fade">
            <section v-if="gpuConfig">
              <h2 class="font-bold text-xl text-center mt-5 dark:text-gray-300">GPU Configuration</h2>
              <hr class="mx-80 mb-5 mt-1 border-gray-300 dark:border-gray-500" />
              <div class="border-l-4 border-customGold rounded-l-2xl py-5 px-3">

                <div class="flex items-center gap-3 mx-auto">
                  <label
                      class="text-neutral-700 font-bold dark:text-neutral-200"
                      for="ramRange"
                  >
                    GPU RAM
                  </label
                  >
                  <input
                      id="ramRange"
                      v-model="gpuRAM"
                      class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                      max="32"
                      min="4"
                      type="range"
                  />
                  <p class="font-bold text-customGold">{{ gpuRAM }} GB</p>
                </div>

                <div class="flex items-center gap-3 mx-aut my-5">
                  <label
                      class="text-neutral-700 font-bold dark:text-neutral-200"
                      for="ramRange"
                  >
                    GPU Cores
                  </label
                  >
                  <input
                      id="ramRange"
                      v-model="gpuCores"
                      class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                      max="5120"
                      min="512"
                      step="512"
                      type="range"
                  />
                  <p class="font-bold text-customGold">{{ gpuCores }} Cores</p>
                </div>

                <div class="grid md:grid-cols-3 gap-3 py-5">
                  <section
                      v-for="(architecture, idx) in gpuArchitectures"
                      :key="idx"
                      :class="{
                    'border-2 border-customGold  p-3 rounded-2xl cursor-pointer' : architecture.name === gpuArchitecture,
                    'border dark:border-gray-700 p-3 rounded-2xl cursor-pointer' : architecture.name !== gpuArchitecture,
                  }"
                      @click="gpuArchitecture = architecture.name"
                  >
                    <h1 class="muteBoldSubheader">{{ architecture.name }}</h1>
                    <h1 class="muteSmallSubheader">{{ architecture.content }}</h1>
                  </section>
                </div>
              </div>
            </section>
          </transition>

          <!--      OS-->
          <section class="my-5">
            <h2 class="text-xl text-center dark:text-gray-300">Operating System</h2>
            <hr class="mx-96 mb-5 mt-1 border-gray-300 dark:border-gray-500" />
            <div class="grid grid-cols-2 md:grid-cols-4">
              <div
                  :class="{
                'border-2 border-customGold dark:bg-gray-900' : operatingSystem === 'linux',
                'dark:text-gray-500' : operatingSystem !== 'linux'
              }"
                  class="flex flex-col items-center justify-center hover:text-customGold hover:shadow-2xl rounded-2xl cursor-pointer md:w-2/3 mx-auto hover:border p-3 hover:border-customGold dark:fill-gray-500 hover:fill-customGold"
                  @click="operatingSystem = 'linux'"
              >
                <svg
                    :class="{
                'fill-customGold' : operatingSystem === 'linux'
              }"
                    class="h-20 hover:fill-customGold"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"
                  />
                </svg>
                <span :class="{
                'text-customGold' : operatingSystem === 'linux'
              }"
                      class="font-bold mt-2 tracking-wider text-lg"
                >Linux</span>
              </div>

              <div
                  :class="{
                'border-2 border-customGold text-customGold dark:bg-gray-900' : operatingSystem === 'debian',
                'dark:text-gray-500' : operatingSystem !== 'debian',
              }"
                  class="flex flex-col items-center justify-center hover:text-customGold hover:shadow-2xl rounded-2xl cursor-pointer md:w-2/3 mx-auto hover:border p-3 hover:border-customGold dark:fill-gray-500 hover:fill-customGold"
                  @click="operatingSystem = 'debian'"
              >
                <svg
                    :class="{
                'fill-customGold' : operatingSystem === 'debian'
              }"
                    class="h-20 hover:fill-customGold"
                    enable-background="new 0 0 87.041 108.445"
                    height="80"
                    i:pageBounds="0 792 612 0"
                    i:rulerOrigin="0 0"
                    i:viewOrigin="262 450"
                    overflow="visible"
                    viewBox="0 0 87.041 108.445"
                    width="87.041"
                    xml:space="preserve"
                    xmlns="&ns_svg;"
                    xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    xmlns:graph="&ns_graphs;"
                    xmlns:i="&ns_ai;"
                    xmlns:x="&ns_extend;"
                    xmlns:xlink="&ns_xlink;"
                >
              <g id="Layer_1"
                 i:dimmedPercent="50"
                 i:layer="yes"
                 i:rgbTrio="#4F008000FFFF"
              >
                <g>
                  <path d="M51.986,57.297c-1.797,0.025,0.34,0.926,2.686,1.287
                    c0.648-0.506,1.236-1.018,1.76-1.516C54.971,57.426,53.484,57.434,51.986,57.297"

                        i:knockout="Off"
                  />
                  <path d="M61.631,54.893c1.07-1.477,1.85-3.094,2.125-4.766c-0.24,1.192-0.887,2.221-1.496,3.307
                    c-3.359,2.115-0.316-1.256-0.002-2.537C58.646,55.443,61.762,53.623,61.631,54.893"

                        i:knockout="Off"
                  />
                  <path d="M65.191,45.629c0.217-3.236-0.637-2.213-0.924-0.978
                    C64.602,44.825,64.867,46.932,65.191,45.629"

                        i:knockout="Off"
                  />
                  <path d="M45.172,1.399c0.959,0.172,2.072,0.304,1.916,0.533
                    C48.137,1.702,48.375,1.49,45.172,1.399"

                        i:knockout="Off"
                  />
                  <path d="M47.088,1.932l-0.678,0.14l0.631-0.056L47.088,1.932"

                        i:knockout="Off"
                  />
                  <path d="M76.992,46.856c0.107,2.906-0.85,4.316-1.713,6.812l-1.553,0.776
                    c-1.271,2.468,0.123,1.567-0.787,3.53c-1.984,1.764-6.021,5.52-7.313,5.863c-0.943-0.021,0.639-1.113,0.846-1.541
                    c-2.656,1.824-2.131,2.738-6.193,3.846l-0.119-0.264c-10.018,4.713-23.934-4.627-23.751-17.371
                    c-0.107,0.809-0.304,0.607-0.526,0.934c-0.517-6.557,3.028-13.143,9.007-15.832c5.848-2.895,12.704-1.707,16.893,2.197
                    c-2.301-3.014-6.881-6.209-12.309-5.91c-5.317,0.084-10.291,3.463-11.951,7.131c-2.724,1.715-3.04,6.611-4.227,7.507
                    C31.699,56.271,36.3,61.342,44.083,67.307c1.225,0.826,0.345,0.951,0.511,1.58c-2.586-1.211-4.954-3.039-6.901-5.277
                    c1.033,1.512,2.148,2.982,3.589,4.137c-2.438-0.826-5.695-5.908-6.646-6.115c4.203,7.525,17.052,13.197,23.78,10.383
                    c-3.113,0.115-7.068,0.064-10.566-1.229c-1.469-0.756-3.467-2.322-3.11-2.615c9.182,3.43,18.667,2.598,26.612-3.771
                    c2.021-1.574,4.229-4.252,4.867-4.289c-0.961,1.445,0.164,0.695-0.574,1.971c2.014-3.248-0.875-1.322,2.082-5.609l1.092,1.504
                    c-0.406-2.696,3.348-5.97,2.967-10.234c0.861-1.304,0.961,1.403,0.047,4.403c1.268-3.328,0.334-3.863,0.66-6.609
                    c0.352,0.923,0.814,1.904,1.051,2.878c-0.826-3.216,0.848-5.416,1.262-7.285c-0.408-0.181-1.275,1.422-1.473-2.377
                    c0.029-1.65,0.459-0.865,0.625-1.271c-0.324-0.186-1.174-1.451-1.691-3.877c0.375-0.57,1.002,1.478,1.512,1.562
                    c-0.328-1.929-0.893-3.4-0.916-4.88c-1.49-3.114-0.527,0.415-1.736-1.337c-1.586-4.947,1.316-1.148,1.512-3.396
                    c2.404,3.483,3.775,8.881,4.404,11.117c-0.48-2.726-1.256-5.367-2.203-7.922c0.73,0.307-1.176-5.609,0.949-1.691
                    c-2.27-8.352-9.715-16.156-16.564-19.818c0.838,0.767,1.896,1.73,1.516,1.881c-3.406-2.028-2.807-2.186-3.295-3.043
                    c-2.775-1.129-2.957,0.091-4.795,0.002c-5.23-2.774-6.238-2.479-11.051-4.217l0.219,1.023c-3.465-1.154-4.037,0.438-7.782,0.004
                    c-0.228-0.178,1.2-0.644,2.375-0.815c-3.35,0.442-3.193-0.66-6.471,0.122c0.808-0.567,1.662-0.942,2.524-1.424
                    c-2.732,0.166-6.522,1.59-5.352,0.295c-4.456,1.988-12.37,4.779-16.811,8.943l-0.14-0.933c-2.035,2.443-8.874,7.296-9.419,10.46
                    l-0.544,0.127c-1.059,1.793-1.744,3.825-2.584,5.67c-1.385,2.36-2.03,0.908-1.833,1.278c-2.724,5.523-4.077,10.164-5.246,13.97
                    c0.833,1.245,0.02,7.495,0.335,12.497c-1.368,24.704,17.338,48.69,37.785,54.228c2.997,1.072,7.454,1.031,11.245,1.141
                    c-4.473-1.279-5.051-0.678-9.408-2.197c-3.143-1.48-3.832-3.17-6.058-5.102l0.881,1.557c-4.366-1.545-2.539-1.912-6.091-3.037
                    l0.941-1.229c-1.415-0.107-3.748-2.385-4.386-3.646l-1.548,0.061c-1.86-2.295-2.851-3.949-2.779-5.23l-0.5,0.891
                    c-0.567-0.973-6.843-8.607-3.587-6.83c-0.605-0.553-1.409-0.9-2.281-2.484l0.663-0.758c-1.567-2.016-2.884-4.6-2.784-5.461
                    c0.836,1.129,1.416,1.34,1.99,1.533c-3.957-9.818-4.179-0.541-7.176-9.994l0.634-0.051c-0.486-0.732-0.781-1.527-1.172-2.307
                    l0.276-2.75C4.667,58.121,6.719,47.409,7.13,41.534c0.285-2.389,2.378-4.932,3.97-8.92l-0.97-0.167
                    c1.854-3.234,10.586-12.988,14.63-12.486c1.959-2.461-0.389-0.009-0.772-0.629c4.303-4.453,5.656-3.146,8.56-3.947
                    c3.132-1.859-2.688,0.725-1.203-0.709c5.414-1.383,3.837-3.144,10.9-3.846c0.745,0.424-1.729,0.655-2.35,1.205
                    c4.511-2.207,14.275-1.705,20.617,1.225c7.359,3.439,15.627,13.605,15.953,23.17l0.371,0.1
                    c-0.188,3.802,0.582,8.199-0.752,12.238L76.992,46.856"

                        i:knockout="Off"
                  />
                  <path d="M32.372,59.764l-0.252,1.26c1.181,1.604,2.118,3.342,3.626,4.596
                    C34.661,63.502,33.855,62.627,32.372,59.764"

                        i:knockout="Off"
                  />
                  <path d="M35.164,59.654c-0.625-0.691-0.995-1.523-1.409-2.352
                    c0.396,1.457,1.207,2.709,1.962,3.982L35.164,59.654"

                        i:knockout="Off"
                  />
                  <path d="M84.568,48.916l-0.264,0.662c-0.484,3.438-1.529,6.84-3.131,9.994
                    C82.943,56.244,84.088,52.604,84.568,48.916"

                        i:knockout="Off"
                  />
                  <path d="M45.527,0.537C46.742,0.092,48.514,0.293,49.803,0c-1.68,0.141-3.352,0.225-5.003,0.438
                    L45.527,0.537"

                        i:knockout="Off"
                  />
                  <path d="M2.872,23.219c0.28,2.592-1.95,3.598,0.494,1.889
                    C4.676,22.157,2.854,24.293,2.872,23.219"

                        i:knockout="Off"
                  />
                  <path d="M0,35.215c0.563-1.728,0.665-2.766,0.88-3.766C-0.676,33.438,0.164,33.862,0,35.215"

                        i:knockout="Off"
                  />
                </g>
              </g>
            </svg>
                <span class="font-bold mt-2 tracking-wider text-lg ">Debian</span>
              </div>

              <div
                  :class="{
                'border-2 border-customGold text-customGold dark:bg-gray-900' : operatingSystem === 'centos',
                'dark:text-gray-500' : operatingSystem !== 'centos',
              }"
                  class="flex flex-col items-center justify-center hover:text-customGold hover:shadow-2xl rounded-2xl cursor-pointer md:w-2/3 mx-auto hover:border p-3 hover:border-customGold dark:fill-gray-500 hover:fill-customGold"
                  @click="operatingSystem = 'centos'"
              >
                <svg
                    :class="{
                'fill-customGold' : operatingSystem === 'centos'
              }"
                    class="hover:fill-customGold mx-auto"
                    height="80"
                    width="75"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g transform="matrix(1.954132 0 0 1.954132 -85.24798 -3.17432)">
                    <g fill-rule="evenodd">
                      <path d="M57.42 16.804l1.185 1.178-1.185 1.178H49.08v3.924l-5.085-5.102 5.085-5.016v3.838z"
                      />
                      <path d="M61.196 15.42l-1.178 1.185-1.178-1.185V7.08h-3.924l5.102-5.085 5.016 5.085h-3.838z"
                      />
                      <path d="M62.58 19.196l-1.185-1.178 1.185-1.178h8.338v-3.924l5.085 5.102-5.085 5.016v-3.838z"
                      />
                      <path d="M58.804 20.58l1.178-1.185 1.178 1.185v8.34h3.924l-5.102 5.085-5.016-5.085h3.838z"
                      />
                    </g>
                    <g stroke="#fff"
                       stroke-width=".724"
                    >
                      <path d="M48.783 6.783h10.132v10.132H48.783z"
                      />
                      <path d="M61.086 6.783h10.132v10.132H61.086z"
                      />
                      <path d="M61.086 19.086h10.132v10.132H61.086z"
                      />
                      <path d="M48.783 19.086h10.132v10.132H48.783z"
                      />
                      <path d="M44.136 18l7.164-7.164L58.465 18 51.3 25.164zm8.7-8.7L60 2.136 67.164 9.3 60 16.465zm8.7 8.7l7.164-7.164L75.864 18 68.7 25.164zm-8.7 8.7L60 19.535l7.164 7.164L60 33.864z"
                            fill="none"
                      />
                    </g>
                  </g>
                </svg>

                <span class="font-bold mt-2 tracking-wider text-lg ">CentOS</span>
              </div>

              <div
                  :class="{
                'border-2 border-customGold text-customGold dark:text-customGold dark:bg-gray-900' : operatingSystem === 'windows',
                'dark:text-gray-500' : operatingSystem !== 'windows'
              }"
                  class="flex flex-col items-center justify-center hover:text-customGold hover:shadow-2xl rounded-2xl cursor-pointer md:w-2/3 mx-auto hover:border-2 p-3 hover:border-customGold col-span-3 md:col-span-1 dark:fill-gray-500 hover:fill-customGold"
                  @click="operatingSystem = 'windows'"
              >
                <svg
                    :class="{
                'fill-customGold' : operatingSystem === 'windows'
              }"
                    class="h-20 hover:fill-customGold"
                    viewBox="0 0 448 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z" />
                </svg>
                <span
                    class="font-bold mt-2 tracking-wider text-lg "
                >Windows (+$10)</span></div>

              <div class="mt-5 mx-auto col-span-4">
                <h2 class="muteSubheader text-center">Select OS Version</h2>
                <select
                    id="os"
                    v-model="selectedOsVersion"
                    class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center"
                >
                  <option value="">Select version</option>
                  <option
                      v-for="(version, idx) in operatingSystems.find(one => one.name === operatingSystem)?.versions"
                      :key="idx"
                      :value="version"
                  >{{ version }}
                  </option>
                </select>
              </div>
            </div>
          </section>

          <!--      ACCESS CONFIG-->
          <section class="mt-10">
            <h2 class="text-xl text-center dark:text-gray-300">Access Configuration</h2>
            <hr class="mx-96 mb-5 mt-1 border-gray-300 dark:border-gray-500" />
            <div class="flex items-center justify-center">
              <input id="ssh"
                     v-model="ssh"
                     class="mr-3"
                     type="checkbox"
              />
              <label class="font-bold dark:text-gray-300"
                     for="ssh"
              >Enable SSH Access</label>
            </div>

            <section class="flex flex-col md:flex-row items-center justify-center my-5">
              <div class="relative md:w-1/3 w-full ">
                <!-- Password Input -->
                <input
                    id="rootPass"
                    v-model="rootPass"
                    :type="showPassword ? 'text' : 'password'"
                    class="text-input-base w-full py-2 rounded-md px-3 pr-16 placeholder:text-xs md:placeholder:text-base"
                    placeholder="Enter or Generate Password"
                />

                <!-- Show/Hide & Copy Buttons -->
                <div class="absolute inset-y-0 right-2 flex items-center space-x-2">
                  <button class="text-gray-500 hover:text-gray-700 text-xs font-bold border px-1 rounded-2xl"
                          @click="showPassword = !showPassword"
                  >
                    {{ showPassword ? "HIDE" : "SHOW" }}
                  </button>
                  <button class="text-gray-500 hover:text-gray-700 text-xs font-bold border px-1 rounded-2xl"
                          @click="copyToClipboard"
                  >
                    COPY
                  </button>
                </div>
              </div>

              <!-- Generate Password Button -->
              <button class="btn-base px-3 ml-3 mt-3 md:mt-0"
                      @click="rootPass = generateSSHPassword()"
              >
                Generate 🔄
              </button>
            </section>
          </section>

          <!--      ADDITIONAL IP-->
          <section class="mt-10">
            <h2 class="text-xl text-center dark:text-gray-300">Additional IP Addresses($2 each)</h2>
            <hr class="mx-96 mb-5 mt-1 border-gray-300 dark:border-gray-500" />
            <div class="text-center">
              <button class="border-2 rounded-xl mx-auto p-2 text-lg font-bold dark:border-gray-500 dark:text-gray-300"
                      @click="additionalIPs > 0 ? additionalIPs -= 1 : ''"
              >-
              </button>
              <input v-model="additionalIPs"
                     class="border-2 rounded-2xl py-3 font-bold mx-2 text-center w-1/8 dark:border-gray-500 dark:text-gray-300"
                     max="10"
                     min="0"
                     type="number"
              />
              <button
                  class="border-2 rounded-xl mx-auto p-2 text-lg font-bold dark:border-gray-500 dark:text-gray-300"
                  @click="additionalIPs < 10 ?additionalIPs += 1 : ''"
              >+
              </button>
            </div>
          </section>

          <!--CONFIG SUMMARY-->
          <div class="text-center mt-5">
            <h2 class="header mb-2">Total: ${{ totalCost }}<span class="font-bold text-gray-600 text-sm">/month</span>
            </h2>
            <button class="btn-base">Order Now</button>
          </div>

        </div>
      </section>

    </div>
    <div
        v-if="tab === 'manage'"
    >
      <div>
        <div v-if="id === null && storeCloudServices.length === 0"
             class="text-center"
        ><img
            alt="No domains found"
            class="w-full h-64 object-contain"
            src="/noDomain.png"
        />
          <p class="mt-4 text-gray-500 dark:text-gray-400">
            You don't have any hosted apps/services yet. Go to the "New" tab to host an app/service.
          </p>
        </div>

        <div v-if="id && getServiceFromStateWithID === undefined">
          <p>Service with ID: {{ id }} not found!</p>
        </div>

        <div v-else>
          <section class="flex flex-col sm:flex-row">
            <div class="w-full sm:w-1/3 pb-5 sm:pr-5 mb-5 sm:mb-0">
              <router-link v-for="service in storeCloudServices"
                           :key="service.id"
                           :to="`/dashboard/cloud?tab=manage&id=${service.id}`"
              >
                <li
                    :class="{ 'bg-white border-2 border-gray-400 hover:border-black hover:bg-white': id === service.id }"
                    class="flex flex-col bg-gray-300 dark:bg-gray-900 rounded-3xl p-3 hover:bg-gray-400 cursor-pointer my-2 relative justify-center w-full"
                >
                  <div v-if="service.status !== 'active'"
                       class="absolute right-[10%] top-[30%] text-red-700 border-2 border-red-700 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
                  >
                    Suspended
                  </div>
                  <div v-else
                       class="absolute right-[10%] top-[30%] text-green-700 border-2 border-green-600 rounded-full py-1 px-3 text-sm font-bold tracking-wider"
                  >
                    Online
                  </div>
                  <p class="text-gray-700 font-bold text-sm uppercase dark:text-gray-500">
                    {{ service.title }}-{{ service.id }}
                  </p>
                  <p class="muteSmallSubheader italic">{{ service.title }} VPS</p>
                </li>
              </router-link>
            </div>

            <div class="w-full sm:w-2/3 pl-5">
              <div class="rounded-3xl shadow-2xl mx-auto p-5 pt-0">
                <div
                    v-if="id && storeCloudServices.find((one) => one.id === parseInt(id))"
                >
                  <h2 class="header">{{ getServiceFromStateWithID.name }}</h2>
                  <div class="flex items-center mt-2">
                    <button v-if="getServiceFromStateWithID.status !== 'active'"
                            class="text-red-700 border-2 border-red-700 rounded-full py-1 px-3 text-xs font-bold tracking-wider mr-2"
                    >
                      Suspended
                    </button>
                    <button v-else
                            class="text-green-700 border-2 border-green-600 rounded-full py-1 px-3 text-xs font-bold tracking-wider"
                    >
                      Online
                    </button>
                  </div>
                  <hr class="my-5" />
                  <div>
                    <apexchart :options="options"
                               :series="series"
                               height="300"
                               type="line"
                               width="100%"
                    ></apexchart>
                    <section class="flex flex-wrap items-center mb-2">
                      <div class="cloudInfoChip">
                        RAM: <span>{{ getServiceFromStateWithID.ram }}</span>
                      </div>
                      <div class="cloudInfoChip">
                        Bandwidth: <span>{{ getServiceFromStateWithID.bandwidth }}</span>
                      </div>
                      <div class="cloudInfoChip">
                        Cores: <span>{{ getServiceFromStateWithID.cores }}</span>
                      </div>
                      <div class="cloudInfoChip">
                        Architecture: <span>{{ getServiceFromStateWithID.architecture }}</span>
                      </div>
                      <div class="cloudInfoChip">
                        Storage: <span>{{ getServiceFromStateWithID.storage }}</span>
                      </div>
                      <div class="cloudInfoChip">
                        Location: <span>{{ getServiceFromStateWithID.location }}</span>
                      </div>
                    </section>
                  </div>
                  <div class="flex flex-col sm:flex-row gap-3 mt-5">
                    <button class="btn-base-error w-full sm:w-auto">Stop Service</button>
                    <button class="btn-base-success w-full sm:w-auto">Restart Service</button>
                    <button class="btn-base w-full sm:w-auto"
                            @click="showPasswordChangeModal = true"
                    >Change Root Password
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    </div>
  </div>

  <Modal
      v-if="id"
      :model-value="showPasswordChangeModal"
      :on-cancel="closePasswordChangeModal"
      :persistent="true"
      cancel-text="Cancel"
      confirm-text="Submit"
      title="Change Your Root Password"
      type="confirm"
  >
    <section class="flex flex-col gap-3">
      <input v-model="updatedPassword"
             class="text-input-base border-2 rounded-2xl p-3"
             placeholder="Enter a new password"
             type="password"
      />
      <input v-model="confirmPassword"
             class="text-input-base border-2 rounded-2xl p-3"
             placeholder="Confirm new password"
             type="password"
      />
    </section>
  </Modal>
</template>


<style scoped>
.line-through {
  text-decoration:line-through;
}
</style>
