<script>
import {convertCurrency, convertPrice, convertToUSD, formatNumber} from "../utils/helper_functions.js";

export default {
  methods: {
    convertToUSD,
    convertPrice,
    formatNumber,
    openSupportTicket() {
      this.$router.push('/dashboard/support')
    }
  },
  mounted() {
    this.invoice = this.$store.state.invoices.find((one) => {
      return one.id === parseInt(this.$route.params.id)
    })
    if (this.invoice === undefined || this.$store.state.invoices.length === 0) {
      this.$router.push('/dashboard/invoices?tab=unpaid')
    }
    console.log(this.invoice)
  },
  data() {
    return {
      invoice: null
    }
  }
}
</script>

<template>
  <section>
    <button class="btn-base-sm"
            @click.prevent="$router.back()"
    >← Back
    </button>
  </section>
  <!-- Invoice -->
  <div v-if="invoice"
       class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10"
  >
    <div class="sm:w-11/12 lg:w-3/4 mx-auto">
      <!-- Card -->
      <div class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl dark:bg-gray-900">
        <!-- Grid -->
        <div class="flex justify-between">
          <div>
            <img alt="Logo"
                 class="h-16"
                 src="../assets/img/Skynet%20Web%20Services%20Logo.png"
            />

            <!--            <h1 class="mt-2 text-lg md:text-xl font-semibold text-customGold dark:text-white">Skynet Web Services</h1>-->
          </div>
          <!-- Col -->

          <div class="text-end">
            <h2 v-if="invoice.paid_at"
                class="font-semibold text-teal-600"
            >Paid</h2>
            <h2 v-else
                class="font-semibold text-rose-600"
            >Unpaid</h2>
            <h2 class="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-neutral-200">Invoice #</h2>
            <span class="mt-1 block text-gray-500 dark:text-neutral-500 font-black text-lg">{{ invoice.id }}</span>

            <address class="mt-4 not-italic text-gray-800 dark:text-neutral-200">
              <h1 class="mt-2 text-lg md:text-xl font-semibold text-customGold dark:text-white">Skynet Web Services</h1>
              {{ invoice.seller.address_2 }}<br>
              {{ invoice.seller.address_1 }}<br>
              {{ invoice.seller.address_3 }}<br>
            </address>
          </div>
          <!-- Col -->
        </div>
        <!-- End Grid -->

        <!-- Grid -->
        <div class="mt-8 grid sm:grid-cols-2 gap-3">
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">Bill to:</h3>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">{{ invoice.buyer.first_name }}
                                                                                  {{ invoice.buyer.last_name }}</h3>
            <address class="mt-2 not-italic text-gray-500 dark:text-neutral-500">
              {{ invoice.buyer.address }}<br>
            </address>
          </div>
          <!-- Col -->

          <div class="sm:text-end space-y-2">
            <!-- Grid -->
            <div class="grid gap-3 sm:gap-2">
              <dl class="flex items-center gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">Invoice date:</dt>
                <dd class="col-span-2 text-gray-500 dark:text-neutral-500">
                  {{ invoice.created_at.substring(0, 10) }}
                </dd>
              </dl>
              <dl class="flex items-center gap-x-3">
                <dt class="font-semibold text-gray-800 dark:text-neutral-200">Due date:</dt>
                <dd class="text-gray-500 dark:text-neutral-500">
                  {{ invoice.due_at.substring(0, 10) }}
                </dd>
              </dl>
            </div>
            <!-- End Grid -->
          </div>
          <!-- Col -->
        </div>
        <!-- End Grid -->

        <!-- Table -->
        <div class="mt-6">
          <div class="border border-gray-200 p-4 rounded-lg space-y-4 dark:border-neutral-700">
            <div class="hidden sm:grid sm:grid-cols-5">
              <div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Item</div>
              <div class="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Qty</div>
              <div class="text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Rate</div>
              <div class="text-end text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</div>
            </div>

            <div class="hidden sm:block border-b border-gray-200 dark:border-neutral-700"></div>

            <div v-for="(item, idx) in invoice.lines"
                 :key="idx"
                 class="grid grid-cols-3 sm:grid-cols-5 gap-2"
            >
              <div class="col-span-full sm:col-span-2">
                <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Item</h5>
                <p class="font-medium text-gray-800 dark:text-neutral-200">{{ item.title }}</p>
              </div>
              <div>
                <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Qty</h5>
                <p class="text-gray-800 dark:text-neutral-200">{{ item.quantity }}</p>
              </div>
              <div>
                <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Rate</h5>
                <p class="text-gray-800 dark:text-neutral-200">
                  {{ $store.getters.preferredCurrencySymbol }} {{
                    formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(item.price, invoice.currency)))
                  }}</p>
              </div>
              <div>
                <h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase dark:text-neutral-500">Amount</h5>
                <p class="sm:text-end text-gray-800 dark:text-neutral-200">
                  {{ $store.getters.preferredCurrencySymbol }} {{
                    formatNumber(item.quantity * convertPrice($store.state.preferredCurrency, convertToUSD(item.price, invoice.currency)))
                  }}
                </p>
              </div>
            </div>
            <div class="sm:hidden border-b border-gray-200 dark:border-neutral-700"></div>

          </div>
        </div>
        <!-- End Table -->

        <!-- Flex -->
        <div class="mt-8 flex sm:justify-end">
          <div class="w-full max-w-2xl sm:text-end space-y-2">
            <!-- Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">Subtotal:</dt>
                <dd class="col-span-2 text-gray-500 dark:text-gray-300">
                  {{
                    $store.getters.preferredCurrencySymbol
                  }}{{
                    formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(invoice.subtotal, invoice.currency)))
                  }}
                </dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">Tax:</dt>
                <dd class="col-span-2 text-gray-500 dark:text-gray-300">
                  {{
                    $store.getters.preferredCurrencySymbol
                  }}{{
                    formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(invoice.tax, invoice.currency)))
                  }}
                </dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">Total:</dt>
                <dd class="col-span-2 text-gray-500 dark:text-gray-300">
                  {{
                    $store.getters.preferredCurrencySymbol
                  }}{{
                    formatNumber(convertPrice($store.state.preferredCurrency, convertToUSD(invoice.total, invoice.currency)))
                  }}
                </dd>
              </dl>

              <dl class="grid sm:grid-cols-5 gap-x-3">
                <dt class="col-span-3 font-semibold text-gray-800 dark:text-neutral-200">Invoice Currency:</dt>
                <dd class="col-span-2 text-gray-500 dark:text-gray-300">
                  {{
                    invoice.currency
                  }}
                </dd>
              </dl>
            </div>
            <!-- End Grid -->
          </div>
        </div>
        <!-- End Flex -->

        <div class="mt-8 sm:mt-12">
          <h4 class="text-lg font-semibold text-gray-800 dark:text-neutral-200">Thank you!</h4>
          <p class="text-gray-500 dark:text-neutral-500 inline-flex items-center">
            If you have any questions concerning this invoice
            <button
                class="btn-base-sm mx-1"
                @click="openSupportTicket"
            >open a support ticket
            </button>
            or
            send an email to:
            <span class="text-sm font-medium text-gray-800 dark:text-neutral-200 ml-1">sales@insolify.africa</span>
          </p>
        </div>

        <p class="mt-5 text-sm text-gray-500 dark:text-neutral-500">© 2022 Preline.</p>
      </div>
      <!-- End Card -->

      <!-- Buttons -->
      <div class="mt-6 flex justify-end gap-x-3">
        <a class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-black shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-customGold dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
           href="#"
        >
          <svg class="shrink-0 size-4"
               fill="none"
               height="24"
               stroke="currentColor"
               stroke-linecap="round"
               stroke-linejoin="round"
               stroke-width="2"
               viewBox="0 0 24 24"
               width="24"
               xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12"
                  x2="12"
                  y1="15"
                  y2="3"
            />
          </svg>
          Invoice PDF
        </a>
        <a class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-customGold text-black hover:bg-black hover:text-customGold focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
           href="#"
        >
          <svg class="shrink-0 size-4 hover:fill-customGold"
               height="24"
               stroke="#eabe63ff"
               stroke-linecap="round"
               stroke-linejoin="round"
               stroke-width="1"
               viewBox="0 0 24 24"
               width="24"
               xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect height="8"
                  width="12"
                  x="6"
                  y="14"
            />
          </svg>
          Print
        </a>
        <a v-if="invoice.paid_at === null"
           class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-customGold text-black hover:bg-black hover:text-customGold focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
           href="#"
        >
          <svg
              class="fill-none stroke-current hover:stroke-customGold transform transition-all duration-100 ease-in-out"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6 8H4M6 16H4M6 12H3M7 4.51555C8.4301 3.55827 10.1499 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C10.1499 21 8.4301 20.4417 7 19.4845M14 9.49991C13.5 9.37589 12.6851 9.37133 12 9.37589M12 9.37589C11.7709 9.37742 11.9094 9.36768 11.6 9.37589C10.7926 9.40108 10.0016 9.73666 10 10.6874C9.99825 11.7002 11 11.9999 12 11.9999C13 11.9999 14 12.2311 14 13.3124C14 14.125 13.1925 14.4811 12.1861 14.599C12.1216 14.599 12.0597 14.5991 12 14.5994M12 9.37589L12 8M12 14.5994C11.3198 14.6022 10.9193 14.6148 10 14.4999M12 14.5994L12 16"

                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
            />
          </svg>
          Pay
        </a>
      </div>
      <!-- End Buttons -->
    </div>
  </div>
  <!-- End Invoice -->
</template>

<style scoped>

</style>