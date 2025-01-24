<script>
// import the library
import {createToast} from 'mosha-vue-toastify';
// import the styling for the toast
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "DomainNameSearch",

  setup() {
    const toast = () => {
      createToast('Wow, easy')
    }
    return {toast}
  },

  data() {
    return {
      tldPrices: [
        {
          'tld': '.com',
          'price': '18,650.32',
        },
        {
          'tld': '.org',
          'price': '18,650.32',
        },
        {
          'tld': '.ng',
          'price': '18,650.32',
        },
        {
          'tld': '.com.ng',
          'price': '3,885.48',
        },
        {
          'tld': '.net',
          'price': '23,312.90',
        },
        {
          'tld': '.co',
          'price': '18,650.32',
        },
        {
          'tld': '.ai',
          'price': '124,335.49',
        },
        {
          'tld': '.africa',
          'price': '23,312.90',
        },
        {
          'tld': '.co.za',
          'price': '7,770.97',
        },

      ],
      currencies: [
        'NGN',
        'USD',
        'GBP'
      ],
      selectedCurrency: 'NGN',
      loading: false,
      searchTerm: '',
      searchResults: [],

    }
  },

  methods: {
    fetchSearchResults() {
      if (!this.searchTerm) {
        createToast(
            `Please enter a domain name`,
            {
              duration: 5000,
              type: 'danger',
            }
        )
        return;
      }
      this.loading = true;
      this.axios.get(`https://api.domainsdb.info/v1/domains/search/${this.searchTerm}`)
          .then(response => {
            this.searchResults = response.data.domains;
            this.loading = false;
          })
          .catch(error => {
            console.error(error);
            createToast(
                `Couldn't fetch domain information: ${error.message}`,
                {
                  duration: 3000,
                  type: 'danger',
                }
            )
            this.loading = false;
          });
      this.searchResults.push(this.searchTerm);
    }
  }
}
</script>

<template>
  <div class="w-1/3">

    <!--    DOMAIN SEARCH INPUT-->
    <section class="container flex h-14">
      <input type="text" placeholder="Find your domain name"
             class="w-5/6 border rounded-tl-xl rounded-bl-xl text-input-base font-medium border-r-0" autofocus
             style="padding: 1rem" v-model="searchTerm"/>
      <button class="flat-btn-base rounded-tr-xl rounded-br-xl tracking-wider" @click="fetchSearchResults">Search
      </button>
    </section>

    <!--CURRENCY DROPDOWN-->
    <div class="block w-full mt-10">
      <select id="currency"
              class="h-12 border border-gray-400 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none font-bold"
              v-model="selectedCurrency">
        <option value="NGN">Nigerian Naira (NGN) - ₦</option>
        <option value="USD">United States Dollar (USD) - $</option>
        <option value="GBP">British Pound Sterling (GBP) - £</option>
        <option value="EUR">Euro (EUR) - €</option>
      </select>
    </div>

    <!--    TLD PRICES -->
    <section class="grid grid-cols-5 mt-3" v-if="!loading && searchResults.length === 0">
      <div class="flex flex-col items-center justify-center gap-y-2 border border-gray-300 h-20"
           v-for="(tld, idx) in tldPrices"
           :key="idx">
        <span class="text-2xl font-medium">{{ tld.tld }}</span>
        <hr class="border-gray-300 border w-1/2"/>
        <span class="text-sm text-customGold font-bold">
          <span v-if="selectedCurrency === 'NGN'">₦</span>
          <span v-else-if="selectedCurrency === 'USD'">$</span>
          <span v-else-if="selectedCurrency === 'GBP'">£</span>
          <span v-else-if="selectedCurrency === 'EUR'">€</span>{{ tld.price }}
        </span>
      </div>
      <div class="border border-gray-300 h-20 text-center flex flex-col justify-center">
        <span class="text-2xl font-semibold">& much more...</span>
      </div>
    </section>


    <!--    SEARCH RESULTS-->
    <section class="mt-3 w-full " v-if="!loading && searchResults.length > 0">
      <div class="border border-gray-300 text-center flex flex-col justify-center">
        <span class="text-2xl font-semibold">Search Results:</span>
        <span class="text-sm">{{ searchTerm }}</span>
      </div>
    </section>

    <!--    LOADING ANIMATION-->
    <section class="mt-3 w-full " v-if="loading">
      <div class="domainSearchLoader h-40">
      </div>
    </section>
  </div>
</template>

<style scoped>

</style>