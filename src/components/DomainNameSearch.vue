<script>
// import the library
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import Recents from "@/components/Recents.vue";
import {convertPrice} from "../utils/helper_functions.js";
import CurrencyDropdown from "@/components/CurrencyDropdown.vue";

export default {
  name: "DomainNameSearch",
  components: {CurrencyDropdown, Recents},
  setup() {
    return {}
  },
  data() {
    return {
      tldPrices: [
        {'tld': 'com', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'ai', 'originalPrice': 123204.46, 'price': 123204.46},
        {'tld': 'org', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'ng', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'africa', 'originalPrice': 23100.84, 'price': 23100.84},
        {'tld': 'co', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'com.ng', 'originalPrice': 3850.14, 'price': 3850.14},
        {'tld': 'net', 'originalPrice': 23100.84, 'price': 23100.84},
        {'tld': 'co.za', 'originalPrice': 7770.28, 'price': 7770.28},
      ],
      tldPricesShort: [
        {'tld': 'com', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'ai', 'originalPrice': 123204.46, 'price': 123204.46},
        {'tld': 'org', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'ng', 'originalPrice': 18480.67, 'price': 18480.67},
        {'tld': 'africa', 'originalPrice': 23100.84, 'price': 23100.84},
      ],
      currencies: [
        'NGN',
        'USD',
        'GBP',
        'EUR'
      ],
      loading: false,
      searchTerm: '',
      searchResults: [],
      exchangeRates: {
        NGN: 1,
        USD: 0.00066, // 1 NGN = 0.00066 USD (Updated)
        GBP: 0.00051, // 1 NGN = 0.00051 GBP (Updated)
        EUR: 0.00061, // 1 NGN = 0.00061 EUR (Updated)
        KES: 0.086,    // 1 NGN = 0.086 KSH (Approximate - Check for current rate)
        GHS: 0.012,    // 1 NGN = 0.012 GHS (Approximate - Check for current rate)
      },
      recents: [],
      showMore: false,
      countries: [
        {name: "GHS", flag: "🇬🇭", text: "Ghanaian Cedis"},
        {name: "KES", flag: "🇰🇪", text: "Kenyan Shillings"},
        {name: "NGN", flag: "🇳🇬", text: "Nigerian Naira"},
        {name: "GBP", flag: "🇬🇧", text: "British Pound Sterling"},
        {name: "USD", flag: "🇺🇸", text: "United States Dollar"},
        {name: "EUR", flag: "🇪🇺", text: "European Euro"},
      ],

    }
  },
  watch: {
    selectedCurrency: {
      handler(newCurrency) {
        this.convertPrices(newCurrency);
      },
      immediate: true
    },
    searchTerm(newval) {
      if (newval === '') {
        this.loading = true
        this.searchResults = []
        this.loading = false
      }
    },
    ["$store.state.preferredCurrency"]: {
      immediate: true, // Run on component mount
      handler(newCurrency) {
        this.selectedCurrency = newCurrency || null; // Fallback to 'new' if no tab is set
      },
    },
  },
  methods: {
    convertPrice,
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
      if (this.searchTerm === this.$store.state.domainToSearch) {
        return;
      }
      this.loading = true;
      this.searchTerm = removeWhitespace(this.searchTerm.toLowerCase())
      this.searchTerm = removeTLD(this.searchTerm)

      if (maxLengthRegex.test(this.searchTerm) === false) {
        createToast(
            `Domain name must be between 1 and 253 characters`,
            {
              duration: 5000,
              type: 'danger',
            }
        )
        this.loading = false;
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
        this.loading = false;
        return;
      }
      if (!noHyphenStartEndRegex.test(this.searchTerm)) {
        createToast(
            `Domain name cannot start or end with a hyphen`,
            {
              duration: 5000,
              type: 'danger',
            }
        )
        this.loading = false;
        return;
      }

      this.$store.dispatch('updateSearchDomain', removeTLD(this.searchTerm));
      let recentExists = this.recents.includes(this.$store.state.domainToSearch);
      if (!recentExists) {
        this.recents.push(this.$store.state.domainToSearch);

      }
      window.localStorage.setItem('recents', JSON.stringify(this.recents));

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
      // this.$store.dispatch('updateSearchDomain', '');
    },
    convertPrices(currency) {
      const rate = this.exchangeRates[currency];
      this.tldPrices.forEach(tld => {
        tld.price = (tld.originalPrice * rate).toFixed(2);
      });
    },
    formatNumber(value) {
      let parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
    clearRecents() {
      this.recents = [];
      this.searchTerm = '';
      window.localStorage.removeItem('recents');
    },
    setRecent(domain) {
      this.searchTerm = domain;
    },
    buyDomain(domain, price) {
      // console.log(new DomainCartItem("name", "100",))
      console.log(
          domain,
          convertPrice(this.$store.state.preferredCurrency, price),
          this.$store.state.preferredCurrency
      )
    },
    changePreferredCurrency() {
      this.$store.dispatch('updatePreferredCurrency', this.selectedCurrency);
      window.localStorage.setItem('preferredCurrency', JSON.stringify(this.selectedCurrency))
      let selectedCountryText = this.countries.find((one) => {
        return one.name === this.selectedCurrency
      }).text
      createToast(
          "Your preferred currency is now " + selectedCountryText + ` (${this.selectedCurrency})`,
          {
            type: 'info',
            duration: 500,
            position: 'bottom-right'
          }
      )
    }
  },
  mounted() {
    let preferredCurrency = JSON.parse(window.localStorage.getItem('preferredCurrency'));
    if (preferredCurrency) {
      this.selectedCurrency = preferredCurrency;
    }
    this.recents = window.localStorage.getItem('recents')
        ? JSON.parse(window.localStorage.getItem('recents'))
        : [];
    this.$store.dispatch('updateSearchDomain', '');
  },
  computed: {
    toggleTldPrices() {
      if (this.showMore) {
        return this.tldPrices
      }
      return this.tldPricesShort
    },
    selectedCurrency: {
      get() {
        return this.$store.state.preferredCurrency
      },
      set(value) {
        this.$store.dispatch('updatePreferredCurrency', value)
      }
    }
  }
}
</script>

<template>
  <div>

    <!--    DOMAIN SEARCH INPUT-->
    <section class="container flex h-14">
      <input v-model="searchTerm"
             class="w-5/6  rounded-tl-xl rounded-bl-xl text-input-base font-medium border-r-0 placeholder:text-gray-700"
             placeholder="Find your domain name"
             style="padding: 1rem"
             type="search"
             @keydown.enter="fetchSearchResults"
      />
      <button
          :disabled="loading"
          class="flat-btn-base rounded-tr-xl rounded-br-xl tracking-wider disabled:bg-gray-400 disabled:hover:bg-gray-400 disabled:cursor-not-allowed hover:no-underline"
          @click="fetchSearchResults"
      >
        Search
      </button>

    </section>

    <Recents :recents="recents.filter((val, index, arr) => index > arr.length - 4 - 1)"
             @clear="clearRecents"
             @clickedRecent="setRecent"
    />

    <!--CURRENCY DROPDOWN-->
    <div class="block w-full mt-5">
      <CurrencyDropdown :show-text="true" />
    </div>

    <!--    TLD PRICES -->
    <!--    <section v-if="!loading && searchResults.length === 0"-->
    <!--             class="grid grid-cols-3 md:grid-cols-5 mt-3"-->
    <!--    >-->
    <!--      <div v-for="(tld, idx) in tldPrices"-->
    <!--           :key="idx"-->
    <!--           class="flex flex-col items-center justify-center gap-y-2 border border-gray-300 h-20"-->
    <!--      >-->
    <!--        <span class="text-2xl font-medium dark:text-gray-300">.{{ tld.tld }}</span>-->
    <!--        <hr class="border-gray-300 border w-1/2" />-->
    <!--        <span class="md:text-base text-sm text-yellow-500 font-bold tracking-wide">-->
    <!--          <span v-if="selectedCurrency === 'NGN'">₦</span>-->
    <!--          <span v-if="selectedCurrency === 'KES'">KSh</span>-->
    <!--          <span v-if="selectedCurrency === 'GHS'">₵</span>-->
    <!--          <span v-else-if="selectedCurrency === 'USD'">$</span>-->
    <!--          <span v-else-if="selectedCurrency === 'GBP'">£</span>-->
    <!--          <span v-else-if="selectedCurrency === 'EUR'">€</span>{{ formatNumber(tld.price) }}-->
    <!--        </span>-->
    <!--      </div>-->
    <!--      <div class="border border-gray-300 h-20 text-center flex flex-col justify-center">-->
    <!--        <span class="text-2xl font-semibold dark:text-gray-300">& much more</span>-->
    <!--      </div>-->
    <!--    </section>-->

    <!--    LOADING ANIMATION-->
    <section v-if="loading"
             class="mt-3 w-full "
    >
      <div class="domainSearchLoader h-40"></div>
    </section>
  </div>

  <!--    SEARCH RESULTS-->
  <section v-if="!loading && searchResults.length > 0"
           class="mt-3 mx-auto"
  >
    <div
        class="border border-gray-50 flex flex-col justify-center rounded-br-3xl rounded-bl-3xl p-5 bg-gray-100 dark:bg-gray-950 dark:border-0 dark:rounded-3xl"
    >
      <span class="text-2xl font-bold text-center dark:text-gray-200">Results</span>
      <span v-if="$store.state.domainToSearch.length > 20"
            class="text-xs text-green-600 dark:text-gray-700 text-center"
      >We are showing a shorter name because domain name is longer than 20 characters</span>
      <ul class="w-full">
        <li v-for="(tld, idx) in toggleTldPrices"
            :key="idx"
            class="list-none resultListItem flex items-center justify-between gap-2"
        >
          <div class="flex flex-col gap-y-1">
            <h2 class="font-bold text-xs md:text-lg">
              {{
                ($store.state.domainToSearch.length > 15
                    ? $store.state.domainToSearch.substring(0, 15) + '***'
                    : $store.state.domainToSearch)
                + '.' + tld.tld
              }}
            </h2>
          </div>

          <div class="flex items-center gap-x-1 ">
            <div class="flex flex-col text-right mr-1">
              <h1 class="font-black text-xs md:text-lg">
                  <span class="font-bold">
                    <span v-if="selectedCurrency === 'NGN'">₦</span>
                    <span v-else-if="selectedCurrency === 'USD'">$</span>
                    <span v-else-if="selectedCurrency === 'KES'">KSh</span>
                    <span v-else-if="selectedCurrency === 'GHS'">₵</span>
                    <span v-else-if="selectedCurrency === 'GBP'">£</span>
                    <span v-else-if="selectedCurrency === 'EUR'">€</span>{{
                      formatNumber(convertPrice($store.state.preferredCurrency, tld.price))
                                                                         }}
                  </span>
              </h1>
              <h1 class="text-xs text-gray-400 dark:text-gray-600 tracking-tight font-medium">Per Year</h1>
            </div>
            <button class="resultListAddBtn"
                    @click.prevent="buyDomain($store.state.domainToSearch + tld.tld, tld.price)"
            >🛒 Buy
            </button>
          </div>
        </li>
        <li class="list-none resultListItem flex items-center justify-center">
          <button class="resultListAddBtn"
                  @click="showMore = true"
          >+ Explore more Domains
          </button>
        </li>
      </ul>
    </div>
  </section>

</template>

<style scoped>

</style>