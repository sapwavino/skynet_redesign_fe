<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";
import AnnouncementBanner from "@/components/AnnouncementBanner.vue";

export default {
  name: "DefaultLayout",
  components: {AnnouncementBanner, MyFooter, NavBar}
}
</script>

<template>
  <div class="relative">
    <announcement-banner></announcement-banner>
    <NavBar :dashboard-nav="false"/>
    <main>
      <slot/>
    </main>
    <MyFooter/>

  </div>
</template>


<style scoped>

</style>