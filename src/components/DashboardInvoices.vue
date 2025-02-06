<script>
export default {
  name: "DashboardInvoices",
  data() {
    return {
      tab: this.$route.query.tab || "unpaid",
      invoices: []
    };
  },
  watch: {
    // Watch the route query for changes
    ["$route.query.tab"]: {
      immediate: true, // Run on component mount
      handler(newTab) {
        this.tab = newTab || "unpaid"; // Fallback to 'paid' if no tab is set
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
  <div class="min-h-screen">
    <h1 class="header uppercase">Invoices</h1>
    <h1 class="muteSubheader capitalize">All of your invoices can be found here. You can choose to see either paid or
      unpaid invoices by clicking
      corresponding button.</h1>

    <!--  TAB PICKERS-->
    <ul
        class="my-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
    >
      <li class="me-2" @click="setTab('unpaid')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            :class="{ 'text-customGold font-bold bg-gray-800 active': tab === 'unpaid' }"
        >
          Unpaid
        </a>
      </li>
      <li class="me-2" @click="setTab('paid')">
        <a
            href="#"
            class="inline-block p-4 rounded-t-lg"
            :class="{
          'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900':
            tab === 'paid',
        }"
        >
          Paid
        </a>
      </li>
    </ul>

    <section class="mt-5 w-5/6">
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white shadow-md rounded-xl" v-if="tab === 'unpaid'">
          <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">ID</th>
            <th class="py-3 px-4 text-left">Invoice Date</th>
            <th class="py-3 px-4 text-left">Due Date</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
          </thead>
          <tbody class="text-blue-gray-900">
          <tr class="border-b border-blue-gray-200">
            <td class="py-3 px-4 font-bold">#367234B</td>
            <td class="py-3 px-4">22/01/2025</td>
            <td class="py-3 px-4">27/01/2025</td>
            <td class="py-3 px-4">$5,025.00</td>
            <td class="py-3 px-4">
              <a href="#" class="text-btn-base">View</a>
            </td>
          </tr>

          <tr class="border-b border-blue-gray-200">
            <td class="py-3 px-4 font-bold">#367234X</td>
            <td class="py-3 px-4">22/01/2025</td>
            <td class="py-3 px-4">27/01/2025</td>
            <td class="py-3 px-4">$5,025.00</td>
            <td class="py-3 px-4">
              <a href="#" class="text-btn-base">View</a>
            </td>
          </tr>


          <tr class="border-b border-blue-gray-200">
            <td class="py-3 px-4 font-bold">Total Invoices Value</td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4 font-bold">$22,525.00</td>
            <td class="py-3 px-4"></td>
          </tr>
          </tbody>
        </table>

        <table class="min-w-full bg-white shadow-md rounded-xl" v-if="tab === 'paid'">
          <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">ID</th>
            <th class="py-3 px-4 text-left">Invoice Date</th>
            <th class="py-3 px-4 text-left">Due Date</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
          </thead>
          <tbody class="text-blue-gray-900">
          </tbody>
<!--          <h1 class="muteSubheader text-center mt-10">Nothing to see here!</h1>-->
        </table>


      </div>
    </section>
  </div>
</template>


<style scoped>

</style>