<script>
import coming_soon from '../assets/img/coming_soon.svg'

export default {
  name: "DashboardDatabase",
  data() {
    return {
      coming_soon
    }
  }
}
</script>

<template>
  <div class="">
    <h1 class="header uppercase">Database</h1>
    <h1 class="muteSubheader capitalize">Your managed database services</h1>
    <div class="flex flex-col items-center">
      <img :src="coming_soon" alt="Coming Soon" class="coming-soon-img"/>
      <h2 class="header">Under Construction</h2>
    </div>
  </div>
</template>

<style scoped>

</style>