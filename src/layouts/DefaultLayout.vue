<script>
import NavBar from "@/components/NavBar.vue";

export default {
  name: "DefaultLayout",
  components: {NavBar}
}
</script>

<template>
  <div class="default-layout">
    <NavBar :dashboard-nav="false"/>
    <main>
      <slot/>
    </main>
    <footer>Default Footer</footer>
  </div>
</template>


<style scoped>

</style>