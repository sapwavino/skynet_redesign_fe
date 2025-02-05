<script>
import NavBar from "@/components/NavBar.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  name: "DefaultLayout",
  components: {MyFooter, NavBar}
}
</script>

<template>
  <div class="relative">
    <NavBar :dashboard-nav="false"/>
    <main>
      <slot/>
    </main>
    <MyFooter/>

  </div>
</template>


<style scoped>

</style>