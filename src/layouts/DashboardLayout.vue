<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import MobileNavDrawer from "@/components/MobileNavDrawer.vue";

export default {
  name: "DashboardLayout",
  components: {MobileNavDrawer, AnnouncementBanner, MyFooter, NavBar},
  mounted() {
    this.$store.dispatch('startLoading');
    setTimeout(() => {
      this.$store.dispatch('stopLoading');
    }, 3000);
  }
}
</script>

<template>

  <transition name="slowFade">
    <div class="loadingPageStyle" v-if="$store.state.loading">
      <div class="flex flex-col items-center">
        <img
            src="../assets/img/Skynet%20Web%20Services%20Logo.png"
            alt="Logo"
            class="h-[9rem] animate-pulse"
        />
        <div class="appLoader h-40">{{ $store.state.currentLoadingMessage }}</div>
      </div>
    </div>
  </transition>
  <div class="dashboard-layout">
    <announcement-banner></announcement-banner>
    <NavBar :dashboard-nav="true"/>
    <MobileNavDrawer/>
    <main>
      <slot/>
    </main>
    <MyFooter/>
  </div>
</template>


<style scoped>

</style>