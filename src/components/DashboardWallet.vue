<script>
export default {
  name: "DashboardWallet",
  data() {
    return {
      sortOptions: ['recent', 'complete', 'cancelled', 'pending'],
      showBalance: false
    }
  },
  methods: {
    toggleBalance() {
      this.showBalance = !this.showBalance
    }
  }
}
</script>

<template>
  <div class="text-center md:text-left">
    <h1 class="header uppercase text-2xl font-bold sm:text-3xl">Wallet</h1>
    <h1 class="muteSubheader capitalize mb-5 text-base sm:text-lg">
      Here you can manage and track your payments & account balance.
    </h1>
    <div class="max-w-screen-lg px-2 md:flex gap-x-5 block">

      <!--ADD FUNDS-->
      <div class="mx-auto md:w-1/2 rounded-2xl shadow">
        <section class="dashGroupCard w-full">
          <div class="flex flex-col items-center gap-4 mt-3">
            <div class="flex flex-col items-center bg-gray-300 p-5 rounded-3xl w-full md:w-1/2">
              <h2 class="text-gray-700 font-bold text-6xl">{{ showBalance ? '0.00' : '****' }}</h2>
              <p class="text-sm text-gray-500 font-bold tracking-wider capitalize">Balance</p>
            </div>
            <div class="flex flex-col gap-2 mx-auto md:w-1/2">
              <button class="dash-card-btn-base w-full" @click.prevent="toggleBalance">
                {{ showBalance ? 'Hide Balance' : 'Show Balance' }}
              </button>
              <button class="dash-card-btn-base w-full">Top Up</button>
            </div>
          </div>
        </section>
      </div>

      <!--TABLE-->
      <div class="mt-6 overflow-hidden rounded-xl border shadow">
        <table class="min-w-full border-separate border-spacing-y-2 border-spacing-x-2">
          <thead class="hidden border-b lg:table-header-group">
          <tr class="">
            <td class="whitespace-normal py-4 text-sm font-black text-gray-500 sm:px-6">Invoice</td>

            <td class="whitespace-normal py-4 text-sm font-black text-gray-500 sm:px-6">Date</td>

            <td class="whitespace-normal py-4 text-sm font-black text-gray-500 sm:px-6">Amount</td>

          </tr>
          </thead>

          <tbody class="lg:border-gray-300">
          <tr class="">
            <td class="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
              Standard Plan - Feb 2022
              <div class="mt-1 lg:hidden">
                <p class="font-normal text-gray-500">07 February, 2022</p>
              </div>
            </td>

            <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">07
              February, 2022
            </td>

            <td class="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $59.00
            </td>

          </tr>

          <tr class="">
            <td width="50%" class="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
              Standard Plan - Jan 2022
              <div class="mt-1 lg:hidden">
                <p class="font-normal text-gray-500">09 January, 2022</p>
              </div>
            </td>

            <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">09
              January, 2022
            </td>

            <td class="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $59.00

            </td>

          </tr>

          <tr class="">
            <td width="50%" class="whitespace-no-wrap py-4 text-sm font-bold text-gray-900 sm:px-6">
              Basic Plan - Nov 2021
              <div class="mt-1 lg:hidden">
                <p class="font-normal text-gray-500">14 November, 2021</p>
              </div>
            </td>

            <td class="whitespace-no-wrap hidden py-4 text-sm font-normal text-gray-500 sm:px-6 lg:table-cell">14
              November, 2021
            </td>

            <td class="whitespace-no-wrap py-4 px-6 text-right text-sm text-gray-600 lg:text-left">
              $29.00
            </td>

          </tr>

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>