<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name: "DashboardLayout",
  components: {MyFooter, NavBar}
}
</script>

<template>
  <div class="dashboard-layout">
    <NavBar :dashboard-nav="true"/>
    <main>
      <slot/>
    </main>
    <MyFooter/>
  </div>
</template>


<style scoped>

</style>