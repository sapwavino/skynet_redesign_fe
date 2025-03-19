<script>
import {convertPrice, convertToUSD, formatNumber} from "../utils/helper_functions.js";

export default {
  name: "DashboardInvoices",
  data() {
    return {
      tab: this.$route.query.tab || "unpaid",
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
    convertToUSD,
    formatNumber,
    convertPrice,
    setTab(tab) {
      this.$router.push({query: {tab}}); // Update URL when tab changes
    },
  },
  computed: {
    paidInvoices() {
      return this.$store.state.invoices.filter((invoice) => invoice.paid_at !== null)
    },
    unpaidInvoices() {
      return this.$store.state.invoices.filter((invoice) => invoice.paid_at === null)
    },
    unpaidInvoicesTotal() {
      let total = 0
      this.unpaidInvoices.map((invoice) => {
        total += convertToUSD(invoice.total, invoice.currency)
        return invoice
      })
      return total
    },
    paidInvoicesTotal() {
      let total = 0
      this.paidInvoices.map((invoice) => {
        total += convertToUSD(invoice.total, invoice.currency)
        return invoice
      })
      return total
    }
  }
}
</script>

<template>
  <div class="min-h-screen">
    <h1 class="header uppercase">Invoices</h1>
    <h1 class="muteSubheader capitalize">
      All of your invoices can be found here. You can choose to see either paid or
      unpaid invoices by clicking the corresponding button.
    </h1>

    <!--  TAB PICKERS-->
    <ul
        class="my-5 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
    >
      <li class="me-2"
          @click="setTab('unpaid')"
      >
        <a
            :class="{ 'text-customGold font-bold bg-gray-800 active': tab === 'unpaid' }"
            class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
            href="#"
        >
          Unpaid
        </a>
      </li>
      <li class="me-2"
          @click="setTab('paid')"
      >
        <a
            :class="{
          'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900':
            tab === 'paid',
        }"
            class="inline-block p-4 rounded-t-lg"
            href="#"
        >
          Paid
        </a>
      </li>
    </ul>

    <section class="mt-5 w-5/6">
      <div class="overflow-x-auto">
        <table v-if="tab === 'unpaid'"
               class="min-w-full bg-white dark:bg-gray-400 shadow-md rounded-xl"
        >
          <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">#ID</th>
            <th class="py-3 px-4 text-left">Created On</th>
            <th class="py-3 px-4 text-left">Due Date</th>
            <th class="py-3 px-4 text-left">Currency</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
          </thead>
          <tbody class="text-blue-gray-900">
          <tr
              v-for="(invoice, idx) in unpaidInvoices"
              :key="idx"
              class="border-b border-blue-gray-200"
          >
            <td class="py-3 px-4 font-bold">#{{ invoice.id }}</td>
            <td class="py-3 px-4">{{ invoice.created_at }}</td>
            <td class="py-3 px-4">{{ invoice.due_at }}</td>
            <td class="py-3 px-4 font-medium">{{ invoice.currency }}</td>
            <td class="py-3 px-4">
              {{
                $store.getters.preferredCurrencySymbol
              }}{{
                formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(invoice.total, invoice.currency)))
              }}
            </td>
            <td class="py-3 px-4">
              <a class="text-btn-base"
                 href="#"
              >View</a>
            </td>
          </tr>


          <tr class="border-b border-blue-gray-200">
            <td class="py-3 px-4 font-bold">Unpaid Total</td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4 font-bold">
              {{
                $store.getters.preferredCurrencySymbol
              }}
              {{
                formatNumber(convertPrice($store.state.preferredCurrency, unpaidInvoicesTotal))
              }}
            </td>
            <td class="py-3 px-4"></td>
          </tr>
          </tbody>
        </table>

        <table v-if="tab === 'paid'"
               class="min-w-full bg-white dark:bg-gray-400 shadow-md rounded-xl"
        >
          <thead>
          <tr class="bg-blue-gray-100 text-gray-700">
            <th class="py-3 px-4 text-left">#ID</th>
            <th class="py-3 px-4 text-left">Invoice Date</th>
            <th class="py-3 px-4 text-left">Due Date</th>
            <th class="py-3 px-4 text-left">Date Paid</th>
            <th class="py-3 px-4 text-left">Currency</th>
            <th class="py-3 px-4 text-left">Total</th>
            <th class="py-3 px-4 text-left">Action</th>
          </tr>
          </thead>
          <tbody class="text-blue-gray-900">
          <tr
              v-for="(invoice, idx) in paidInvoices"
              :key="idx"
              class="border-b border-blue-gray-200"
          >
            <td class="py-3 px-4 font-bold">#{{ invoice.id }}</td>
            <td class="py-3 px-4">{{ invoice.created_at }}</td>
            <td class="py-3 px-4">{{ invoice.due_at }}</td>
            <td class="py-3 px-4">{{ invoice.paid_at }}</td>
            <td class="py-3 px-4 font-medium">{{ invoice.currency }}</td>
            <td class="py-3 px-4 font-bold">
              {{
                $store.getters.preferredCurrencySymbol
              }}{{
                formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(invoice.total, invoice.currency)))
              }}
            </td>
            <td class="py-3 px-4">
              <a class="text-btn-base"
                 href="#"
              >View</a>
            </td>
          </tr>


          <tr class="border-b border-blue-gray-200">
            <td class="py-3 px-4 font-bold">Paid Total</td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4"></td>
            <td class="py-3 px-4 font-bold">
              {{
                $store.getters.preferredCurrencySymbol
              }}{{
                formatNumber(convertPrice($store.state.preferredCurrency, paidInvoicesTotal))
              }}
            </td>

          </tr>
          </tbody>

        </table>


      </div>
    </section>
  </div>
</template>


<style scoped>

</style>