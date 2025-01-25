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

  mounted() {
    console.log(this.$store.state.count) // this.$store
  },

  methods: {
    fetchSearchResults() {
      const removeTLD = (str) => str.replace(/\..*$/, '');
      const removeWhitespace = (str) => str.replace(/\s+/g, '');
      const noHyphenStartEndRegex = /^(?!-)[a-zA-Z0-9-]+(?<!-)$/;
      const noSpecialCharsRegex = /^[a-zA-Z0-9-]+$/;
      const maxLengthRegex = /^.{1,253}$/;


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
      if(this.searchTerm === this.$store.state.domainToSearch) {
        return;
      }
      this.loading = true;
      this.searchTerm = removeWhitespace(this.searchTerm.toLowerCase())
      this.searchTerm = removeTLD(this.searchTerm)

      if (!noHyphenStartEndRegex.test(this.searchTerm)) {
        createToast(
            `Domain name cannot start or end with a hyphen`,
            {
              duration: 5000,
              type: 'danger',
            }
        )
        return;
      }
      if (!noSpecialCharsRegex.test(this.searchTerm)) {
        createToast(
            `Domain name can only contain alphanumeric characters and hyphens`,
            {
              duration: 5000,
              type: 'danger',
            }
        )
        return;
      }
      if (maxLengthRegex.test(this.searchTerm) === false) {
        createToast(
            `Domain name must be between 1 and 253 characters`,
            {
              duration: 5000,
              type: 'danger',
            }
        )
        return;
      }

      this.$store.dispatch('updateSearchDomain', removeTLD(this.searchTerm));
      this.axios.get(`https://api.domainsdb1.info/v1/domains/search/${this.$store.state.domainToSearch}`)
          .then(response => {
            this.searchResults = response.data.domains;
            this.loading = false;
          })
          .catch(error => {
            console.error(error);
            this.loading = false;
          });
      this.searchResults.push(this.$store.state.domainToSearch);
    }
  }
}
</script>

<template>
  <div class="w-1/3">

    <!--    DOMAIN SEARCH INPUT-->
    <section class="container flex h-14">
      <input type="search"
             placeholder="Find your domain name"
             class="w-5/6 border rounded-tl-xl rounded-bl-xl text-input-base font-medium border-r-0" autofocus
             style="padding: 1rem" v-model="searchTerm"
             @keydown.enter="fetchSearchResults"/>
      <button
          class="flat-btn-base rounded-tr-xl rounded-br-xl tracking-wider disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed"
          @click="fetchSearchResults"
          :disabled="loading">
        Search
      </button>

    </section>

    <!--CURRENCY DROPDOWN-->
    <div class="block w-full mt-5">
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
        <span class="text-2xl font-semibold">& much more</span>
      </div>
    </section>


    <!--    LOADING ANIMATION-->
    <section class="mt-3 w-full " v-if="loading">
      <div class="domainSearchLoader h-40">
      </div>
    </section>
  </div>
  <!--    SEARCH RESULTS-->
  <section class="mt-3 w-1/2 mx-auto" v-if="!loading && searchResults.length > 0">
    <div class="border border-gray-50 flex flex-col justify-center rounded-br-3xl rounded-bl-3xl p-5 bg-gray-100">
      <span class="text-2xl font-semibold text-center">Results</span>
      <ul class="w-full">
        <li class="list-none resultListItem flex items-center justify-between"
            v-for="(tld, idx) in ['com', 'org', 'com.ng', 'ai', 'co']">
          <div class="flex flex-col gap-y-1">
            <h2 class="font-bold text-lg">
              {{
                ($store.state.domainToSearch.length > 45
                    ? $store.state.domainToSearch.substring(0, 45) + '***'
                    : $store.state.domainToSearch)
                + '.' + tld
              }}
            </h2>
            <span v-if="$store.state.domainToSearch.length > 45" class="text-xs text-green-600">We are showing a shorter name because domain name is longer than 45 characters</span>

          </div>
          <div class="flex items-center gap-x-1">
            <div class="flex flex-col">
              <h1 class="font-black text-lg">
                  <span class="font-bold">
                    <span v-if="selectedCurrency === 'NGN'">₦</span>
                    <span v-else-if="selectedCurrency === 'USD'">$</span>
                    <span v-else-if="selectedCurrency === 'GBP'">£</span>
                    <span v-else-if="selectedCurrency === 'EUR'">€</span>100
                  </span>
              </h1>
              <h1 class="text-xs text-gray-400 tracking-tight font-medium">Per Year</h1>
            </div>
            <button class="btn-base">🛒 Add to cart</button>
          </div>
        </li>
        <li class="list-none resultListItem flex items-center justify-center">
          <button class="btn-base-darker">Explore more</button>
        </li>
      </ul>
    </div>
  </section>

</template>

<style scoped>

</style>