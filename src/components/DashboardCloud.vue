<script>
import DashCloudRadioCards from "@/components/DashCloudRadioCards.vue";

export default {
  name: "DashboardCloud",
  components: {DashCloudRadioCards},
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
          name: 'G3',
          features: ['8Gb RAM', '4 vCPU', '100GB SSD']
        },
      ]
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
  },
  methods: {
    setTab(tab) {
      this.$router.push({query: {tab}});
      this.tab = tab;
    },
  },
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

    <div v-if="tab === 'new'">
      <DashCloudRadioCards :services="cloudServices"/>


      <h3 class="mt-4 font-semibold text-gray-900 dark:text-white">Access Modes</h3>
      <ul class="w-48 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li
            class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input id="root-checkbox" type="checkbox" value=""
                   class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="root-checkbox" class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">Root
              Password</label>
          </div>
        </li>
        <li
            class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input id="ssh-checkbox" type="checkbox" value=""
                   class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 ">
            <label for="ssh-checkbox"
                   class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">SSH</label>
          </div>
        </li>
        <li
            class="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
          <div class="flex items-center ps-3">
            <input id="vnc-checkbox" type="checkbox" value=""
                   class="w-4 h-4 text-customGold bg-gray-100 border-gray-300 rounded-sm focus:ring-customGold dark:focus:ring-customGold dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500">
            <label for="vnc-checkbox" class="w-full py-3 ms-2 text-sm font-bold text-gray-900 dark:text-gray-300">VNC</label>
          </div>
        </li>
      </ul>


    </div>
    <div v-if="tab === 'manage'">
      <apexchart width="500" type="line" :options="options" :series="series"></apexchart>
    </div>
  </div>
</template>


<style scoped>

</style>