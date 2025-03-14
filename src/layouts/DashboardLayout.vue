<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import MobileNavDrawer from "@/components/MobileNavDrawer.vue";
import AppLoader from "@/components/AppLoader.vue";

export default {
  name: "DashboardLayout",
  components: {AppLoader, MobileNavDrawer, AnnouncementBanner, MyFooter, NavBar},
  mounted() {
  }
}
</script>

<template>

  <AppLoader v-if="$store.state.loading" />
  <div v-else
       class="dashboard-layout"
  >
    <announcement-banner></announcement-banner>
    <NavBar :dashboard-nav="true" />
    <MobileNavDrawer />
    <main>
      <slot />
    </main>
    <MyFooter />
  </div>
</template>


<style scoped>

</style>