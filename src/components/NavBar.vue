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
  }
}
</script>

<template>
  <nav class="navbar-base">

    <router-link to="/">
      <img alt="Logo"
           class="h-16"
           src="../assets/img/Skynet%20Web%20Services%20Logo.png"
      />
    </router-link>

    <div v-show="!dashboardNav"
         class="flex items-center gap-x-5 font-bold"
    >
      <a class="text-btn-base"
         href="/#cloud"
      >Cloud</a>
      <a class="text-btn-base"
         href="/#hosting"
      >Hosting</a>
      <a class="text-btn-base"
         href="/#email"
      >Email</a>
      <a class="text-btn-base"
         href="/#database"
      >Database</a>

    </div>
    <div v-show="!dashboardNav && !$store.state.auth.isLoggedIn"
         class="flex gap-x-2 items-center"
    >
      <ThemeDropdown />
      <router-link class="text-2xl p-3 relative hover:scale-125 transform transition-all duration-300 ease-in-out mr-1"
                   to="/cart"
      >
        🛒
        <div class="absolute top-0 -right-2 bg-red-600 px-2 py-1 rounded-full text-xs text-white text-center">
          {{ $store.state.cart.items.length }}
        </div>
      </router-link>
      <CurrencyDropdown :show-text="false" />
      <router-link class="border-btn-base"
                   style="padding: 10px 15px"
                   to="/auth/login"
      >
        Log In
      </router-link>
      <router-link class="btn-base"
                   style="padding: 10px  15px"
                   to="/auth/signup"
      >
        Create Account
      </router-link>
    </div>
    <div v-show="dashboardNav || $store.state.auth.isLoggedIn"
         class="flex gap-x-4 items-center"
    >
      <ThemeDropdown />
      <router-link class="text-2xl p-3 relative hover:scale-125 transform transition-all duration-300 ease-in-out"
                   to="/cart"
      >
        🛒
        <div class="absolute top-0 -right-2 bg-red-600 px-2 py-1 rounded-full text-xs text-white text-center">
          {{ $store.state.cart.items.length }}
        </div>
      </router-link>
      <router-link
          v-if="$store.state.auth.isLoggedIn && $route.path !== '/dashboard'"
          class="btn-base"
          style="padding: 10px 15px"
          to="/dashboard"
      >
        Dashboard
      </router-link>
      <button v-if="$store.state.auth.isLoggedIn"
              class="btn-base"
              style="padding: 10px 15px"
              @click="$store.dispatch('auth/logout'); $router.push('/auth/login')"
      >
        Log Out
      </button>

      <div v-show="!$store.state.auth.isLoggedIn"
           class="flex gap-x-2"
      >
        <router-link class="border-btn-base"
                     style="padding: 10px 15px"
                     to="/auth/login"
        >
          Log In
        </router-link>
        <router-link class="btn-base"
                     style="padding: 10px  15px"
                     to="/auth/signup"
        >
          Create Account
        </router-link>
      </div>
    </div>
  </nav>

  <nav class="mobile-nav">
    <router-link to="/">
      <img alt="Logo"
           class="h-16 mx-auto"
           src="../assets/img/Skynet%20Web%20Services%20Logo.png"
      />
    </router-link>

    <div class="flex gap-x-3 items-center">
      <ThemeDropdown />
      <router-link class="text-2xl p-3 relative hover:scale-125 transform transition-all duration-300 ease-in-out"
                   to="/cart"
      >
        🛒
        <div class="absolute top-0 -right-2 bg-red-600 px-2 py-1 rounded-full text-xs text-white text-center">
          {{ $store.state.cart.items.length }}
        </div>
      </router-link>
      <svg
          class="fill-customGold"
          height="2rem"
          viewBox="0 0 448 512"
          xmlns="http://www.w3.org/2000/svg"
          @click.prevent="$store.commit('SET_SHOW_MOBILE_NAV', true)"
      >
        <path
            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
        />
      </svg>
    </div>

  </nav>
</template>

<style scoped>

</style>