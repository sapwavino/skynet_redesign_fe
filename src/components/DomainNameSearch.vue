<script>
// import the library
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'
import Recents from "@/components/Recents.vue";
import {convertPrice, extractAndSaveSessionId} from "../utils/helper_functions.js";
import CurrencyDropdown from "@/components/CurrencyDropdown.vue";
import {DomainCartItem} from "@/utils/helper_classes.js";
import {cartService} from "@/services/cart.service.js";

export default {
  name: "DomainNameSearch",
  components: {CurrencyDropdown, Recents},
  emits: ['inputFocused', 'domainSelected'],
  props:
      {
        showMoreButton: {
          type: Boolean,
          default: false,
        },
        hostingDomain: {
          type: Boolean,
          default: false,
        }
      }
  ,
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
      recents: [],
      showMore: false,
      selectedDomain: ''

    }
  },
  watch: {
    searchTerm(newval) {
      if (newval === '') {
        this.loading = true
        this.searchResults = []
        this.loading = false
      }
      this.$emit('inputFocused')
    },
    ["$store.state.preferredCurrency"]: {
      immediate: true, // Run on component mount
      handler(newCurrency) {
        this.selectedCurrency = newCurrency || null;
        // this.$emit('inputFocused')
      },
    },
  },
  methods: {
    convertPrice,
    async fetchSearchResults() {
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
              position: "bottom-right",
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
              position: "bottom-right",
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
              position: "bottom-right",
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
              position: "bottom-right",
            }
        )
        this.loading = false;
        return;
      }


      this.$store.dispatch('updateSearchDomain', removeTLD(this.searchTerm));

      try {
        await this.$store.dispatch('checkDomainAvailability');
        this.loading = false; //stop loading in case of error.
        // Process availabilityResults here if needed.
      } catch (error) {
        console.error("Error during domain availability check:", error);
        // Handle the error if checkDomainAvailability fails.
        this.loading = false; //stop loading in case of error.
        return;
      }

      let recentExists = this.recents.includes(this.$store.state.domainToSearch);
      if (!recentExists) {
        this.recents.push(this.$store.state.domainToSearch);

      }
      window.localStorage.setItem('recents', JSON.stringify(this.recents));
      this.searchResults.push(this.$store.state.domainToSearch);
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
    buyDomain(domain) {
      let newDomain = new DomainCartItem(domain)
      let cartItem = {
        "id": newDomain.getProduct().id,
        "action": "register",
        "multiple": 1,
        "register_sld": newDomain.sld,
        "register_tld": newDomain.tld,
        "register_years": newDomain.duration
      }

      cartService.addItemToCart(cartItem, 'domain')
          .then((response) => {
            cartService.getAllCartItems().then((response) => {
              this.$store.commit('SET_CART', response.data.result)
            })
            createToast(
                `${newDomain.sld}${newDomain.tld} been added to cart`,
                {
                  type: 'success',
                  position: "bottom-right",
                }
            )
          })
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
        return this.$store.getters.allTldPrices
      }
      return this.$store.getters.tldPrices
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
             class="w-5/6  rounded-tl-xl rounded-bl-xl text-input-base font-medium border-r-0 placeholder:text-gray-700 focus:bg-gray-50 bg-gray-300"
             placeholder="Find your domain"
             style="padding: 1rem"
             type="search"
             @change="$emit('inputFocused')"
             @focus="$emit('inputFocused')"
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

    <Recents
        :recents="recents.filter((val, index, arr) => index > arr.length - 4 - 1)"
        @clear="clearRecents"
        @clickedRecent="setRecent"
    />

    <!--CURRENCY DROPDOWN-->
    <div class="block w-full mt-5">
      <CurrencyDropdown
          :show-text="true"
          @active="$emit('inputFocused')"
      />
    </div>

    <!--    LOADING ANIMATION-->
    <section v-if="loading"
             class="mt-3 w-full "
    >
      <div class="domainSearchLoader2"></div>
    </section>
  </div>

  <!--    SEARCH RESULTS-->
  <section v-if="hostingDomain">
    <section v-if="!loading && searchResults.length > 0"
             class="mt-3 mx-auto"
    >
      <div
          class="border border-gray-50 flex flex-col justify-center rounded-3xl md:p-5 p-1 bg-gray-100 dark:bg-gray-950 dark:border-0 dark:rounded-3xl"
      >
        <span class="text-2xl font-bold text-center dark:text-gray-200 text-black hidden md:block">Results</span>
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
                  + tld.tld
                }}
              </h2>
            </div>

            <div class="flex items-center gap-x-1 ">
              <div class="flex flex-col text-right mr-1">
                <h1 class="font-black text-xs md:text-lg">
                  <span class="font-bold">
                    <span>{{ $store.getters.preferredCurrencySymbol }}</span>{{
                      formatNumber(convertPrice($store.state.preferredCurrency, tld.price))
                                                                             }}
                  </span>
                </h1>
                <h1 class="text-xs text-gray-400 dark:text-gray-600 tracking-tight font-medium">Per Year</h1>
              </div>
              <button :class="{
                'resultListAddBtn' : selectedDomain!==tld.tld,
                'resultListAddBtnSelected' : selectedDomain===tld.tld,
                }"
                      @click.prevent="buyDomain(searchTerm + tld.tld)"
              >{{ selectedDomain === tld.tld ? "Selected" : "Select" }}
              </button>
            </div>
          </li>
          <li v-if="showMoreButton && !showMore"
              class="list-none resultListItem flex items-center justify-center"
          >
            <button class="resultListAddBtn"
                    @click="showMore = true"
            >+ Explore more Domains
            </button>
          </li>
        </ul>
      </div>
    </section>
  </section>
  <section v-else>
    <section v-if="!loading && searchResults.length > 0"
             class="mt-3 mx-auto"
    >
      <div
          class="border border-gray-50 flex flex-col justify-center rounded-3xl md:p-5 p-1 bg-gray-100 dark:bg-gray-950 dark:border-0 dark:rounded-3xl"
      >
        <span class="text-2xl font-bold text-center dark:text-gray-200 text-black hidden md:block">Results</span>
        <span v-if="$store.state.domainToSearch.length > 20"
              class="text-xs text-green-600 dark:text-gray-700 text-center"
        >We are showing a shorter name because domain name is longer than 20 characters</span>
        <ul class="w-full">
          <li v-for="(tld, idx) in toggleTldPrices"
              :key="idx"
              class="list-none resultListItem flex items-center justify-between gap-2"
          >
            <div class="flex flex-col gap-y-1">
              <h2
                  :class="{
                    'font-medium text-xs md:text-lg line-through text-gray-500': !$store.state.domainToSearchAvailableTLDs.includes(tld.tld),
                    'font-bold text-xs md:text-lg' : $store.state.domainToSearchAvailableTLDs.includes(tld.tld),
                  }"
              >
                {{
                  ($store.state.domainToSearch.length > 15
                      ? $store.state.domainToSearch.substring(0, 15) + '***'
                      : $store.state.domainToSearch)
                  + tld.tld
                }}
              </h2>
            </div>

            <div class="flex items-center gap-x-1 ">
              <div class="flex flex-col text-right mr-1">
                <h1 class="font-black text-xs md:text-lg">
                  <span
                      v-if="$store.state.domainToSearchAvailableTLDs.includes(tld.tld)"
                      class="font-bold"
                  >
                    <span>
                      {{
                        $store.getters.preferredCurrencySymbol
                      }}
                    </span>
                    {{
                      formatNumber(convertPrice($store.state.preferredCurrency, tld.price))
                    }}
                  </span>
                  <span v-else>Unavailable</span>
                </h1>
                <h1
                    v-if="$store.state.domainToSearchAvailableTLDs.includes(tld.tld)"
                    class="text-xs text-gray-400 dark:text-gray-600 tracking-tight font-medium"
                >Per Year</h1>
              </div>
              <button
                  v-if="$store.state.domainToSearchAvailableTLDs.includes(tld.tld)"
                  class="resultListAddBtn"
                  @click.prevent="buyDomain(searchTerm + tld.tld)"
              >🛒 Buy
              </button>
            </div>
          </li>
          <li v-if="showMoreButton && !showMore"
              class="list-none resultListItem flex items-center justify-center"
          >
            <button class="resultListAddBtn"
                    @click="showMore = true"
            >+ Explore more Domains
            </button>
          </li>
        </ul>
      </div>
    </section>
  </section>

</template>

<style scoped>

</style>