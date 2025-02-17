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
        <ul class="flex flex-col gap-y-1 mt-5">
          <li class="">
            <h2 class="muteBoldSubheader">Dashboard</h2>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/dashboard/domains?tab=buy">Domains</router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/dashboard/hosting?tab=new">Hosting</router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/dashboard/cloud/tab=new">Cloud</router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/dashboard/email">Email</router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/dashboard/database">Database</router-link>
          </li>
          <hr class="my-5"/>
          <li class="">
            <h2 class="muteBoldSubheader">Account</h2>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/profile-settings">Settings</router-link>
          </li>
          <li class="mobile-nav-item">
            <router-link to="/profile">Log Out</router-link>
          </li>
        </ul>
        <button @click="$store.commit('SET_SHOW_MOBILE_NAV', false)" class="absolute top-10 right-5 text-3xl">✖️</button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {computed} from 'vue';

const store = useStore();

// Example of how to access the showMobileNav state (if needed in this component)
const showMobileNav = computed(() => store.state.showMobileNav);

// Example of committing a mutation to close the nav (if needed in this component)
const closeNav = () => store.commit('SET_SHOW_MOBILE_NAV', false);

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