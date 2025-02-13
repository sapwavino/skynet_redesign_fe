<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";

export default {
  name: "DashboardLayout",
  components: {AnnouncementBanner, MyFooter, NavBar}
}
</script>

<template>
  <div class="dashboard-layout">
    <announcement-banner></announcement-banner>
    <NavBar :dashboard-nav="true"/>
    <main>
      <slot/>
    </main>
    <MyFooter/>
  </div>
</template>


<style scoped>

</style>