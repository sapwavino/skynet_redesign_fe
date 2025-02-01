<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "DashboardLayout" ,
  components: {NavBar}
}
</script>

<template>
  <div class="dashboard-layout">
    <NavBar :dashboard-nav="true"/>
    <main>
      <slot />
    </main>
  </div>
</template>


<style scoped>

</style>