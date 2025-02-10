<script>
import ThemeDropdown from "@/components/ThemeDropdown.vue";

export default {
  name: "NavBar",
  components: {ThemeDropdown},
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
      <img src="../assets/img/Skynet%20Web%20Services%20Logo.png" alt="Logo" class="h-16"/>
    </router-link>
    <!--    <div></div>-->
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
    This is the mobile navigation bar
  </nav>
</template>

<style scoped>

</style>