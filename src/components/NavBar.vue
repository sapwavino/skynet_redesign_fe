<script>
import ThemeDropdown from "@/components/ThemeDropdown.vue";
import {createToast} from "mosha-vue-toastify";
import CurrencyDropdown from "@/components/CurrencyDropdown.vue";

export default {
  name: "NavBar",
  components: {CurrencyDropdown, ThemeDropdown},
  props: {
    dashboardNav: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      countries: [
        {name: "GHS", flag: "🇬🇭", text: "Ghanaian Cedis"},
        {name: "KSH", flag: "🇰🇪", text: "Kenyan Shillings"},
        {name: "NGN", flag: "🇳🇬", text: "Nigerian Naira"},
        {name: "GBP", flag: "🇬🇧", text: "British Pound Sterling"},
        {name: "USD", flag: "🇺🇸", text: "United States Dollar"},
        {name: "EUR", flag: "🇪🇺", text: "European Euro"},
      ],
    };
  },
  methods: {
    changePreferredCurrency() {
      console.log("changePreferredCurrency", this.selectedCurrency)
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
  computed: {
    selectedCurrency() {
      return this.$store.state.preferredCurrency
    }
  },
  mounted() {
    const preferredCurrency = JSON.parse(window.localStorage.getItem('preferredCurrency'))
    this.selectedCurrency = preferredCurrency || this.$store.state.preferredCurrency;
  },
}
</script>

<template>
  <nav class="navbar-base">

    <router-link to="/">
      <img src="../assets/img/Skynet%20Web%20Services%20Logo.png" alt="Logo" class="h-16"/>
    </router-link>

    <div class="flex items-center gap-x-5 font-bold" v-show="!dashboardNav">
      <a href="/#hosting" class="text-btn-base">Hosting</a>
      <a href="/#email" class="text-btn-base">Email</a>
      <a href="/#apps" class="text-btn-base">Apps</a>
      <a href="/#database" class="text-btn-base">Database</a>
      <router-link to="#" class="text-btn-base">Help & Support</router-link>

    </div>
    <div class="flex gap-x-2 items-center" v-show="!dashboardNav && !$store.state.isLoggedIn">
      <ThemeDropdown/>
      <router-link to="/cart"
                   class="text-2xl p-3 relative hover:scale-125 transform transition-all duration-300 ease-in-out mr-1">
        🛒
        <div class="absolute top-0 -right-2 bg-red-600 px-2 py-1 rounded-full text-xs text-white text-center">
          {{ $store.state.cart.items.length }}
        </div>
      </router-link>
      <CurrencyDropdown :show-text="false"/>
      <router-link to="/auth/login" class="border-btn-base" style="padding: 10px 15px">
        Log In
      </router-link>
      <router-link to="/auth/signup" class="btn-base" style="padding: 10px  15px">
        Create Account
      </router-link>
    </div>
    <div class="flex gap-x-4 items-center" v-show="dashboardNav || $store.state.isLoggedIn">
      <ThemeDropdown/>
      <router-link to="/cart"
                   class="text-2xl p-3 relative hover:scale-125 transform transition-all duration-300 ease-in-out">
        🛒
        <div class="absolute top-0 -right-2 bg-red-600 px-2 py-1 rounded-full text-xs text-white text-center">
          {{ $store.state.cart.items.length }}
        </div>
      </router-link>
      <router-link
          to="/dashboard"
          class="btn-base"
          style="padding: 10px 15px"
          v-if="$store.state.isLoggedIn"
      >
        Dashboard
      </router-link>
      <button v-if="$store.state.isLoggedIn" @click="$store.dispatch('logout'); $router.push('/auth/login')"
              class="btn-base" style="padding: 10px 15px">
        Log Out
      </button>

      <div class="flex gap-x-2" v-show="!$store.state.isLoggedIn">
        <router-link to="/auth/login" class="border-btn-base" style="padding: 10px 15px">
          Log In
        </router-link>
        <router-link to="/auth/signup" class="btn-base" style="padding: 10px  15px">
          Create Account
        </router-link>
      </div>
    </div>
  </nav>

  <nav class="mobile-nav">
    <router-link to="/">
      <img src="../assets/img/Skynet%20Web%20Services%20Logo.png" alt="Logo" class="h-16 mx-auto"/>
    </router-link>

    <div class="flex gap-x-3 items-center">
      <ThemeDropdown/>
      <router-link to="/cart"
                   class="text-2xl p-3 relative hover:scale-125 transform transition-all duration-300 ease-in-out">
        🛒
        <div class="absolute top-0 -right-2 bg-red-600 px-2 py-1 rounded-full text-xs text-white text-center">
          {{ $store.state.cart.items.length }}
        </div>
      </router-link>
      <svg
          height="2rem"
          class="fill-customGold"
          @click.prevent="$store.commit('SET_SHOW_MOBILE_NAV', true)"
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"/>
      </svg>
    </div>

  </nav>
</template>

<style scoped>

</style>