<template>
  <div class="md:hidden" @click.stop="$store.commit('SET_SHOW_MOBILE_NAV', false)">
    <transition name="slowFade">
      <div v-if="$store.state.showMobileNav" class="mobile-nav-overlay">
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="$store.state.showMobileNav" class="mobile-nav-drawer">
        <router-link to="/">
          <img src="../assets/img/Skynet%20Web%20Services%20Logo.png" alt="Logo" class="h-16 "/>
        </router-link>
        <hr class="mt-5 border border-gray-300"/>

        <!--        LOGGED IN NAV-->
        <ul class="grid grid-cols-2 gap-y-1 mt-5 text-center" v-if="$store.state.isLoggedIn">
          <li class="col-span-2">
            <h2 class="muteBoldSubheader ">Dashboard</h2>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard')">
            <button class="mobile-nav-link">Overview</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/domains?tab=buy')">
            <button class="mobile-nav-link">Domains</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/hosting?tab=new')">
            <button class="mobile-nav-link">Hosting</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/cloud?tab=new')">
            <button class="mobile-nav-link">Cloud</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/email')">
            <button class="mobile-nav-link">Email</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/database')">
            <button class="mobile-nav-link">Database</button>
          </li>
          <hr class="mt-5 border border-gray-300 col-span-2"/>
          <li class="col-span-2">
            <h2 class="muteBoldSubheader">Account</h2>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/orders')">
            <button class="mobile-nav-link">Orders</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/profile-settings')">
            <button class="mobile-nav-link">Invoices</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/profile-settings')">
            <button class="mobile-nav-link">Notifications</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/profile-settings')">
            <button class="mobile-nav-link">Wallet</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/profile-settings')">
            <button class="mobile-nav-link">Support</button>
          </li>
          <li class="mobile-nav-item" @click="navigateTo('/dashboard/profile-settings')">
            <button class="mobile-nav-link">Settings</button>
          </li>
          <li class="mobile-nav-item col-span-2">
            <button class="mobile-nav-link">Log Out</button>
          </li>
          <li class="col-span-2">
            <div class="flex items-center">
              <img
                  src="https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4="
                  alt="userImg" class="rounded-full h-14 w-14 object-cover border-4 border-customGold"/>
              <div class="flex flex-col px-5">

                <h2 class="text-2xl font-bold dark:text-gray-200">John Doe</h2>
                <h2 class="muteSubheader">john@doe.com</h2>
                <h2 class="muteSmallSubheader" style="font-size: 0.6rem; font-weight: bolder !important;">Last login:
                  {{ getLastLogin() }}</h2>
              </div>
            </div>
            <div class="flex mt-5 gap-x-2">
              <div class="block">
                <select id="country"
                        class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-1 px-3 focus:outline-none font-bold cursor-pointer text-center text-sm"
                        v-model="selectedCurrency"
                        @change="changePreferredCurrency"
                        @click.stop
                >
                  <option v-for="(country, idx) in countries" :key="idx" :value="country.name">{{ country.flag }}
                    {{ country.name }}
                  </option>
                </select>
              </div>
              <button class="flat-border-btn-base-small  rounded-2xl">Balance: <span
                  class="text-base">0.00</span></button>
            </div>
          </li>
        </ul>

        <ul class="flex flex-col gap-y-1 mt-5" v-else>
          <li class="mobile-nav-item" @click="navigateTo('/')">
            <button class="mobile-nav-link">Home</button>
          </li>
        </ul>

        <button @click="$store.commit('SET_SHOW_MOBILE_NAV', false)" class="absolute top-10 right-5 text-3xl">✖️
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {useRouter} from 'vue-router'; // Import useRouter
import {computed, ref} from 'vue';

const store = useStore();
const router = useRouter(); // Get the router instance
const navigateTo = (route) => {
  store.commit('SET_SHOW_MOBILE_NAV', false); // Close the drawer
  router.push(route); // Navigate to the route
};

// Example of how to access the showMobileNav state (if needed in this component)
const showMobileNav = computed(() => store.state.showMobileNav);

// Example of committing a mutation to close the nav (if needed in this component)
const closeNav = () => store.commit('SET_SHOW_MOBILE_NAV', false);

</script>

<script>
import {getLastLogin} from "@/utils/helper_functions.js";
import {createToast} from "mosha-vue-toastify";

export default {
  data() {
    return {
      countries: [
        {name: "GHS", flag: "🇬🇭", text: "Ghanaian Cedis"},
        {name: "KSH", flag: "🇰🇪", text: "Kenyan Shillings"},
        {name: "NGN", flag: "🇳🇬", text: "Nigerian Naira"},
        {name: "GBP", flag: "🇬🇧", text: "British Pound Sterling"},
        {name: "USD", flag: "🇺🇸", text: "United States Dollar"}
      ],
      selectedCurrency: 'NGN',
      getLastLogin
    };
  },
  methods: {
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
}
</script>

<style>
.mobile-nav-overlay {
  position: fixed; /* Stay in place */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent overlay */
  z-index: 1000; /* Ensure it's on top */
  overflow: hidden; /* Prevent background scrolling */
}

.mobile-nav-drawer {
  position: absolute;
  top: 0;
  left: 0; /* Start off-screen to the left */
  width: 80%; /* Or a specific width */
  height: 100%;
  background-color: #fff; /* White background */
  padding: 20px;
  overflow-y: auto; /* Allow scrolling within the drawer */
  z-index: 1001; /* Above the overlay */
}


.mobile-nav-close {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #4CAF50; /* Example button color */
  color: white;
  border: none;
  cursor: pointer;
}


/* Transitions */
.slide-fade-enter-active {
  animation: slide-fade-in 0.5s ease-in-out;
}

.slide-fade-leave-active {
  animation: slide-fade-out 0.5s ease-in-out;
}

@keyframes slide-fade-in {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-fade-out {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}


</style>