<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";
import MobileNavDrawer from "@/components/MobileNavDrawer.vue";

export default {
  name: "DefaultLayout",
  components: {MobileNavDrawer, AnnouncementBanner, MyFooter, NavBar}
}
</script>

<template>
  <div class="relative">
    <announcement-banner></announcement-banner>
    <NavBar :dashboard-nav="false"/>
    <MobileNavDrawer/>
    <main>
      <slot/>
    </main>
    <MyFooter/>

  </div>
</template>


<style scoped>

</style>