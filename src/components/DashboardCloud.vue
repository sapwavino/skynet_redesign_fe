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
    selectedAccessOptions(newOption) {
      this.service.selectedAccessOptions = this.selectedAccessOptions
    },
    billing_frequency(newFrequency) {
      this.service.price = this.service.price * newFrequency
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
    setService(service) {
      this.service = service;
      this.service.selectedAccessOptions = this.selectedAccessOptions;
    },
    setOS(os) {
      this.service.os_version = ''
      this.service.os = os;
    },
    setOSVersion(version) {
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
            9000.55);
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


      <div class="w-3/12 shadow rounded-2xl border-2 border-gray-300 p-5 relative h-[60vh]">
        <h3 class="header text-center">Order Summary</h3>

        <div v-if="Object.keys(service).length === 0 || service.name === ''"
             class="text-center bg-gray-300 rounded-3xl p-10 m-3">
          <p class="muteSubheader">Please select a configuration for your cloud service.</p>
        </div>


        <!--        ORDER SUMMARY-->
        <div v-else>


          <div class="flex flex-col mt-5">
            <h2 class="muteSubheader"><strong>VPS Type: </strong><span v-if="service">{{ service.name }}</span></h2>
            <h2 class="muteSubheader capitalize"><strong>Operating System: </strong><span v-if="service">{{
                service.os
              }}</span>
            </h2>
            <h2 class="muteSubheader"><strong>OS Version: </strong><span v-if="service">{{
                service.os_version
              }}</span>
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

          <div class="my-5">
            <h2 class="muteBoldSubheader">Billing Frequency</h2>
            <select id="country"
                    class="h-12 w-full border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center capitalize"
                    v-model="billing_frequency">
              <option
                  :key="idx"
                  v-for="(option, idx) in billing_frequency_options"
                  :value="option.value">{{ option.text }}
              </option>
            </select>
          </div>

          <transition name="slowFade">
            <div v-if="Object.keys(service).length > 0">
              <p class="font-medium mt-2 mb-1 underline muteBoldSubheader">Payment Method:</p>
              <div class="flex flex-col gap-4 mb-5">

                <!--  PAYPAL-->
                <div
                    class="relative flex items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
                  <input class="peer hidden" type="radio" name="radio" id="paypal"/>
                  <label
                      class="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full rounded-xl border cursor-pointer"
                      for="paypal"> </label>
                  <div
                      class="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2 "></div>
                  <span class="pointer-events-none z-10">
                      <svg
                          xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 188 49" height="2rem"
                          class="ml-5">
                         <path fill="#0070E0"
                               d="M164.01 11.446l-4.012 25.207a.643.643 0 0 0 .642.746h4.748a.701.701 0 0 0 .698-.589l4.012-25.207a.643.643 0 0 0-.642-.746h-4.748a.692.692 0 0 0-.698.589zm-5.07 7.356h-4.505a.699.699 0 0 0-.697.588l-.149.928s-3.499-3.794-9.694-1.23c-3.554 1.468-5.26 4.501-5.986 6.723 0 0-2.304 6.753 2.907 10.47 0 0 4.832 3.575 10.273-.22l-.094.592a.644.644 0 0 0 .37.686c.085.04.178.06.272.06h4.508a.692.692 0 0 0 .698-.589l2.742-17.262a.632.632 0 0 0-.149-.521.643.643 0 0 0-.496-.226zm-6.629 9.54a5.005 5.005 0 0 1-1.715 3.095 5.073 5.073 0 0 1-3.345 1.203 4.602 4.602 0 0 1-1.416-.206c-1.945-.62-3.055-2.474-2.736-4.484a5.01 5.01 0 0 1 1.717-3.093 5.08 5.08 0 0 1 3.343-1.207 4.6 4.6 0 0 1 1.416.208c1.957.616 3.062 2.473 2.741 4.485h-.005zm-24.056.477c2.443 0 4.806-.868 6.662-2.446a10.147 10.147 0 0 0 3.456-6.158c.789-4.993-3.14-9.351-8.71-9.351h-8.973a.699.699 0 0 0-.697.589L115.98 36.66a.644.644 0 0 0 .37.686c.086.04.178.06.272.06h4.751a.699.699 0 0 0 .697-.589l1.178-7.402a.692.692 0 0 1 .698-.59l4.309-.006zm3.974-8.831c-.293 1.846-1.731 3.205-4.482 3.205h-3.517l1.068-6.713h3.454c2.844.005 3.77 1.67 3.477 3.513v-.005z">
                         </path>
                         <path fill="#003087"
                               d="M110.567 19.23l-5.434 9.105-2.758-9.038a.694.694 0 0 0-.672-.495h-4.904a.526.526 0 0 0-.527.446.515.515 0 0 0 .025.247l4.942 15.224-4.47 7.174a.516.516 0 0 0 .18.728.527.527 0 0 0 .269.07h5.282a.876.876 0 0 0 .751-.42l13.804-22.667a.512.512 0 0 0 .011-.53.524.524 0 0 0-.463-.263h-5.28a.877.877 0 0 0-.756.419zm-16.548-.428H89.51a.7.7 0 0 0-.698.59l-.146.927s-3.502-3.794-9.697-1.23c-3.553 1.468-5.26 4.501-5.983 6.723 0 0-2.306 6.753 2.904 10.47 0 0 4.833 3.575 10.274-.22l-.094.592a.642.642 0 0 0 .37.686c.085.04.178.06.272.06h4.508a.701.701 0 0 0 .697-.589l2.743-17.262a.642.642 0 0 0-.37-.687.655.655 0 0 0-.272-.06zm-6.63 9.542a5.011 5.011 0 0 1-1.716 3.091 5.082 5.082 0 0 1-3.343 1.206 4.605 4.605 0 0 1-1.414-.206c-1.944-.62-3.053-2.474-2.734-4.485a5.011 5.011 0 0 1 1.723-3.098 5.082 5.082 0 0 1 3.353-1.201c.48-.005.959.065 1.417.208 1.937.616 3.04 2.472 2.72 4.485h-.005zm-24.055.476a10.284 10.284 0 0 0 6.656-2.449 10.144 10.144 0 0 0 3.452-6.156c.79-4.992-3.14-9.35-8.708-9.35H55.76a.7.7 0 0 0-.698.588l-4 25.2a.642.642 0 0 0 .37.687c.085.039.178.06.272.06h4.748a.7.7 0 0 0 .698-.59l1.176-7.402a.692.692 0 0 1 .698-.589h4.31zm3.974-8.832c-.293 1.846-1.73 3.205-4.481 3.205H59.31l1.066-6.713h3.454c2.845.005 3.77 1.671 3.478 3.513v-.005z">
                         </path>
                         <path fill="#001C64"
                               d="M32.639 12.16c.107-5.566-4.484-9.836-10.797-9.836H8.784a1.277 1.277 0 0 0-1.262 1.078L2.29 36.095a1.038 1.038 0 0 0 1.025 1.2h7.736l-1.209 7.57a1.038 1.038 0 0 0 1.025 1.2h6.302c.304 0 .575-.109.807-.306.23-.198.268-.471.316-.772l1.85-10.884c.047-.3.2-.69.431-.888.231-.198.433-.306.738-.306h3.856c6.183 0 11.428-4.395 12.387-10.507.679-4.338-1.181-8.286-4.915-10.243z">
                         </path>
                         <path fill="#0070E0"
                               d="M12.725 25.238l-1.927 12.218-1.21 7.664a1.038 1.038 0 0 0 1.026 1.199h6.67a1.276 1.276 0 0 0 1.26-1.078l1.758-11.139a1.277 1.277 0 0 1 1.261-1.078h3.926c6.183 0 11.428-4.51 12.388-10.622.68-4.338-1.504-8.286-5.238-10.243-.01.462-.05.923-.121 1.38-.959 6.11-6.206 10.621-12.387 10.621h-6.145a1.278 1.278 0 0 0-1.261 1.079">
                         </path>
                         <path fill="#003087"
                               d="M10.797 37.456h-7.76a1.037 1.037 0 0 1-1.024-1.2L7.245 3.078A1.277 1.277 0 0 1 8.506 2h13.336c6.313 0 10.904 4.594 10.797 10.159-1.571-.824-3.417-1.295-5.439-1.295H16.082a1.277 1.277 0 0 0-1.262 1.078l-2.094 13.296-1.93 12.218z">
                         </path>
                        </svg>
                    </span>
                </div>

                <!--  PAYSTACK-->
                <div
                    class="relative flex items-center justify-center rounded-xl bg-gray-50 p-4 font-medium text-gray-700">
                  <input class="peer hidden" type="radio" name="radio" id="radio3" checked/>
                  <label
                      class="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                      for="radio3"> </label>
                  <div
                      class="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
                  <span class="pointer-events-none z-10">
                      <svg
                          id="Layer_1" xmlns="http://www.w3.org/2000/svg" height="1.6rem" x="0px" y="0px"
                          viewBox="0 0 280.6 50" class="ml-7"
                          xml:space="preserve">

                         <g>
                          <g>
                           <path class="st0" d="M39.9,4.8H2.3C1.1,4.8,0,5.8,0,7.1v4.2c0,1.3,1.1,2.4,2.3,2.4h37.6c1.3,0,2.3-1.1,2.4-2.4V7.2
                              C42.3,5.8,41.2,4.8,39.9,4.8L39.9,4.8z M39.9,28.4H2.3c-0.6,0-1.2,0.3-1.7,0.7c-0.4,0.4-0.7,1-0.7,1.7V35c0,1.3,1.1,2.4,2.3,2.4
                              h37.6c1.3,0,2.3-1,2.4-2.4v-4.2C42.3,29.4,41.2,28.4,39.9,28.4L39.9,28.4z M23.5,40.1H2.3c-0.6,0-1.2,0.2-1.6,0.7
                              c-0.4,0.4-0.7,1-0.7,1.7v4.2c0,1.3,1.1,2.4,2.3,2.4h21.1c1.3,0,2.3-1.1,2.3-2.4v-4.3C25.8,41.2,24.8,40.1,23.5,40.1L23.5,40.1z
                               M42.3,16.6h-40c-0.6,0-1.2,0.2-1.6,0.7c-0.4,0.4-0.7,1-0.7,1.7v4.2c0,1.3,1.1,2.4,2.3,2.4h39.9c1.3,0,2.3-1.1,2.3-2.4v-4.2
                              C44.6,17.6,43.6,16.6,42.3,16.6L42.3,16.6z M42.3,16.6">
                           </path>
                           <path class="st1" d="M86,14.3c-1.2-1.2-2.5-2.1-4.1-2.8c-1.5-0.7-3.2-1-4.9-1c-1.6,0-3.2,0.3-4.7,1c-1,0.5-1.9,1.1-2.6,1.9v-0.7
                              c0-0.4-0.2-0.7-0.4-1c-0.3-0.3-0.6-0.5-1-0.5h-5.3c-0.4,0-0.8,0.2-1,0.5c-0.3,0.3-0.4,0.6-0.4,1v35c0,0.4,0.2,0.7,0.4,1
                              c0.3,0.3,0.6,0.4,1,0.4h5.3c0.4,0,0.7-0.1,1-0.4c0.3-0.3,0.4-0.6,0.4-1v-12c0.8,0.8,1.7,1.5,2.8,1.8c1.4,0.5,2.9,0.8,4.3,0.8
                              c1.7,0,3.4-0.3,4.9-1c1.6-0.6,3-1.6,4.1-2.8c1.2-1.3,2.2-2.8,2.8-4.4c0.7-1.8,1.1-3.8,1-5.7c0-2-0.3-3.9-1-5.8
                              C88.2,17.1,87.2,15.6,86,14.3L86,14.3z M81.3,27c-0.3,0.7-0.7,1.4-1.2,2c-1.1,1.2-2.6,1.8-4.2,1.8c-0.8,0-1.6-0.2-2.3-0.5
                              c-0.7-0.3-1.4-0.8-1.9-1.3c-0.5-0.6-1-1.3-1.3-2c-0.6-1.6-0.6-3.3,0-4.9c0.3-0.7,0.7-1.4,1.3-2c0.6-0.6,1.2-1,1.9-1.4
                              c0.7-0.3,1.5-0.5,2.3-0.5c0.8,0,1.6,0.2,2.4,0.5c0.7,0.3,1.3,0.8,1.9,1.3c0.5,0.6,0.9,1.2,1.2,2C81.9,23.6,81.9,25.4,81.3,27
                              L81.3,27z M118.5,11.3h-5.3c-0.4,0-0.7,0.2-1,0.4c-0.3,0.3-0.4,0.7-0.4,1.1v0.6c-0.7-0.8-1.5-1.4-2.4-1.8c-1.4-0.7-3-1-4.6-1
                              c-3.4,0-6.7,1.4-9.1,3.8c-1.2,1.3-2.2,2.8-2.9,4.4c-0.8,1.8-1.1,3.8-1.1,5.8c0,2,0.3,4,1.1,5.8c0.7,1.6,1.7,3.1,2.9,4.4
                              c2.4,2.4,5.6,3.8,9,3.8c1.6,0,3.2-0.3,4.6-1c0.9-0.5,1.8-1.1,2.4-1.8v0.7c0,0.4,0.2,0.7,0.4,1c0.3,0.2,0.6,0.4,1,0.4h5.3
                              c0.4,0,0.7-0.2,1-0.4c0.3-0.3,0.4-0.6,0.4-1V12.8c0-0.4-0.1-0.7-0.4-1C119.2,11.4,118.9,11.3,118.5,11.3L118.5,11.3z M111.3,26.9
                              c-0.3,0.7-0.7,1.4-1.2,2c-0.5,0.5-1.2,1-1.9,1.4c-1.5,0.7-3.2,0.7-4.7,0c-0.7-0.3-1.4-0.8-1.9-1.4c-0.5-0.6-1-1.3-1.2-2
                              c-0.6-1.6-0.6-3.3,0-4.9c0.3-0.7,0.7-1.4,1.2-2c0.5-0.6,1.2-1,1.9-1.4c1.5-0.7,3.2-0.7,4.7,0c0.7,0.3,1.3,0.8,1.9,1.3
                              c0.5,0.6,0.9,1.2,1.2,2C112,23.6,112,25.4,111.3,26.9L111.3,26.9z M171.2,23.8c-0.8-0.7-1.6-1.2-2.6-1.6c-1-0.4-2-0.7-3.1-0.9
                              l-4-0.8c-1-0.2-1.8-0.5-2.2-0.8c-0.3-0.2-0.5-0.6-0.5-1c0-0.4,0.2-0.8,0.8-1.1c0.7-0.4,1.5-0.6,2.2-0.5c1,0,2.1,0.2,3,0.6
                              c0.9,0.4,1.8,0.9,2.6,1.4c1.2,0.7,2.2,0.6,2.9-0.2l1.9-2.2c0.4-0.4,0.6-0.9,0.6-1.4c0-0.5-0.3-1.1-0.7-1.4
                              c-0.8-0.7-2.1-1.5-3.9-2.2c-1.7-0.7-3.9-1.1-6.5-1.1c-1.6,0-3.1,0.2-4.6,0.7c-1.3,0.4-2.5,1-3.5,1.8c-1,0.7-1.7,1.7-2.3,2.8
                              c-0.5,1.1-0.8,2.2-0.8,3.4c0,2.2,0.7,4,2,5.3c1.3,1.3,3,2.2,5.2,2.6l4.2,0.9c0.9,0.2,1.8,0.4,2.7,0.8c0.5,0.2,0.8,0.6,0.8,1.2
                              c0,0.5-0.2,0.9-0.8,1.3c-0.5,0.4-1.4,0.6-2.5,0.6c-1.1,0-2.3-0.2-3.3-0.7c-1-0.5-1.9-1.1-2.7-1.8c-0.4-0.3-0.8-0.5-1.2-0.7
                              c-0.5-0.1-1.1,0-1.7,0.5l-2.3,1.8c-0.6,0.5-1,1.3-0.8,2c0.1,0.8,0.8,1.5,1.9,2.4c2.9,2,6.4,3,9.9,2.9c1.6,0,3.3-0.2,4.8-0.7
                              c1.4-0.4,2.6-1,3.7-1.9c1-0.8,1.9-1.8,2.4-2.9c0.6-1.1,0.8-2.3,0.8-3.6c0-1.1-0.2-2.2-0.7-3.3C172.5,25.3,171.9,24.5,171.2,23.8
                              L171.2,23.8z M194.2,30.2c-0.2-0.4-0.7-0.7-1.2-0.8c-0.5,0-1,0.2-1.4,0.4c-0.6,0.4-1.4,0.7-2.2,0.7c-0.2,0-0.5,0-0.8-0.1
                              c-0.3,0-0.5-0.2-0.7-0.4c-0.2-0.2-0.4-0.5-0.6-0.8c-0.2-0.4-0.3-0.9-0.2-1.4v-9.6h6.9c0.4,0,0.8-0.2,1.1-0.5
                              c0.3-0.3,0.5-0.6,0.5-1v-4.1c0-0.4-0.2-0.8-0.5-1c-0.3-0.3-0.6-0.4-1-0.4h-6.9V4.7c0-0.4-0.1-0.8-0.4-1c-0.3-0.3-0.6-0.4-1-0.4
                              h-5.3c-0.4,0-0.8,0.1-1,0.4c-0.3,0.3-0.4,0.7-0.4,1v6.6h-3c-0.4,0-0.8,0.2-1,0.5c-0.3,0.3-0.4,0.6-0.4,1v4.1c0,0.4,0.1,0.7,0.4,1
                              c0.2,0.3,0.6,0.5,1,0.5h3v11.4c0,1.4,0.2,2.7,0.8,3.9c0.5,1,1.2,1.9,2,2.6c0.8,0.7,1.8,1.2,2.9,1.5c1.1,0.3,2.2,0.5,3.3,0.5
                              c1.5,0,2.9-0.2,4.3-0.7c1.3-0.4,2.5-1.2,3.4-2.1c0.6-0.6,0.7-1.6,0.2-2.3L194.2,30.2z M223.2,11.3h-5.3c-0.4,0-0.7,0.2-1,0.4
                              c-0.3,0.3-0.4,0.7-0.4,1.1v0.6c-0.7-0.8-1.5-1.4-2.4-1.8c-1.4-0.7-3-1-4.6-1c-3.4,0-6.6,1.4-9,3.8c-1.2,1.3-2.2,2.8-2.9,4.4
                              c-0.8,1.8-1.1,3.8-1.1,5.7c0,2,0.3,3.9,1.1,5.8c0.7,1.6,1.7,3.1,2.9,4.4c2.4,2.4,5.6,3.8,9,3.8c1.6,0,3.2-0.3,4.6-1
                              c0.9-0.5,1.8-1.1,2.4-1.8v0.7c0,0.4,0.1,0.7,0.4,1c0.3,0.3,0.6,0.4,1,0.4h5.3c0.8,0,1.4-0.6,1.4-1.4V12.8c0-0.4-0.1-0.7-0.4-1
                              C223.9,11.4,223.6,11.3,223.2,11.3L223.2,11.3z M216,26.9c-0.3,0.7-0.7,1.4-1.2,2c-0.6,0.5-1.2,1-1.9,1.4
                              c-0.7,0.3-1.6,0.5-2.4,0.5c-0.8,0-1.6-0.2-2.3-0.5c-0.7-0.3-1.4-0.8-1.9-1.4c-0.5-0.6-1-1.3-1.2-2c-0.6-1.6-0.6-3.3,0-4.9
                              c0.3-0.7,0.7-1.4,1.2-2c0.6-0.6,1.2-1,1.9-1.4c0.7-0.3,1.5-0.5,2.3-0.5c0.8,0,1.6,0.2,2.4,0.5c0.7,0.3,1.3,0.8,1.9,1.3
                              c0.5,0.6,1,1.2,1.2,2C216.7,23.6,216.7,25.4,216,26.9L216,26.9z M252.2,29.8l-3-2.3c-0.6-0.5-1.1-0.6-1.6-0.4
                              c-0.4,0.2-0.8,0.5-1.1,0.8c-0.7,0.8-1.4,1.5-2.3,2.1c-0.9,0.5-1.9,0.8-3,0.7c-1.2,0-2.3-0.3-3.3-1c-1-0.7-1.7-1.7-2.1-2.8
                              c-0.3-0.8-0.4-1.6-0.4-2.4c0-0.8,0.1-1.7,0.4-2.5c0.3-0.7,0.7-1.4,1.2-2c0.6-0.6,1.2-1,1.9-1.3c0.7-0.3,1.6-0.5,2.4-0.5
                              c1,0,2.1,0.2,2.9,0.7c0.9,0.6,1.6,1.3,2.3,2.1c0.3,0.3,0.7,0.6,1.1,0.8c0.5,0.2,1,0.1,1.6-0.4l3-2.3c0.4-0.3,0.7-0.6,0.8-1
                              c0.2-0.5,0.1-1-0.1-1.4c-1.2-1.8-2.8-3.3-4.7-4.4c-2-1.1-4.4-1.7-7.1-1.7c-1.9,0-3.8,0.4-5.5,1.1c-1.7,0.7-3.2,1.7-4.5,3
                              c-1.3,1.3-2.3,2.8-3,4.4c-1.4,3.5-1.4,7.5,0,11c0.7,1.7,1.7,3.2,3,4.4c2.7,2.6,6.2,4,10,4c2.7,0,5.1-0.6,7.1-1.7
                              c1.9-1.1,3.5-2.6,4.7-4.4c0.3-0.4,0.3-0.9,0.1-1.4C252.8,30.5,252.5,30.1,252.2,29.8L252.2,29.8z M280.3,35.3l-8.3-12.3l7.1-9.4
                              c0.3-0.4,0.4-1,0.3-1.5c-0.1-0.4-0.5-0.8-1.3-0.8h-5.6c-0.3,0-0.6,0.1-0.9,0.2c-0.4,0.2-0.6,0.4-0.8,0.8l-5.7,8h-1.4V1.4
                              c0-0.4-0.1-0.7-0.4-1c-0.3-0.3-0.6-0.4-1-0.4h-5.3c-0.4,0-0.7,0.1-1,0.4c-0.3,0.3-0.4,0.6-0.4,1v34.8c0,0.4,0.2,0.8,0.4,1
                              c0.3,0.3,0.6,0.4,1,0.4h5.3c0.4,0,0.7-0.2,1-0.4c0.3-0.3,0.4-0.6,0.4-1V27h1.5l6.2,9.6c0.4,0.7,1.1,1.1,1.8,1.1h5.9
                              c0.9,0,1.3-0.4,1.4-0.8C280.7,36.4,280.6,35.8,280.3,35.3L280.3,35.3z M148.5,11.3h-5.9c-0.4,0-0.9,0.1-1.2,0.5
                              c-0.3,0.3-0.5,0.6-0.5,1L136.5,29h-1.1l-4.7-16.3c-0.1-0.3-0.2-0.7-0.5-1c-0.3-0.3-0.7-0.5-1.1-0.5h-6.1c-0.8,0-1.3,0.3-1.5,0.8
                              c-0.2,0.5-0.2,1,0,1.4l7.5,22.9c0.1,0.3,0.3,0.7,0.6,0.9c0.3,0.3,0.7,0.4,1.1,0.4h3.2l-0.3,0.7l-0.7,2.1c-0.2,0.6-0.6,1.2-1.2,1.7
                              c-0.5,0.4-1.1,0.6-1.8,0.6c-0.5,0-1.1-0.1-1.6-0.3c-0.5-0.2-1-0.5-1.4-0.8c-0.4-0.3-0.9-0.4-1.3-0.4h-0.1c-0.6,0-1.1,0.3-1.3,0.8
                              l-1.9,2.8c-0.8,1.2-0.3,2,0.2,2.4c1,0.9,2.2,1.6,3.5,2.1c1.4,0.5,2.9,0.7,4.5,0.7c2.7,0,5-0.7,6.7-2.2c1.8-1.6,3.1-3.7,3.8-6
                              l8.7-28.3c0.2-0.5,0.2-1,0-1.5C149.7,11.6,149.3,11.3,148.5,11.3L148.5,11.3z M148.5,11.3">
                           </path>
                          </g>
                         </g>
                        </svg>
                    </span>
                </div>
              </div>
              <button
                  class="btn-base w-full mx-auto">
                Pay {{ getCurrencySymbol($store.state.preferredCurrency) }}
                {{ formatCurrency(convertPrice($store.state.preferredCurrency, service.price)) }}
              </button>
            </div>
          </transition>
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
