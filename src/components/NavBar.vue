<script>
export default {
  name: "NavBar"
}
</script>

<template>
  <nav class="navbar-base">
    <router-link to="/">
      <img src="../assets/img/Skynet%20Web%20Services%20Logo.png" alt="Logo" class="h-16"/>
    </router-link>
    <!--    <div></div>-->
    <div class="flex items-center gap-x-5 font-bold">
      <a href="#hosting" class="text-btn-base">Hosting</a>
      <a href="#email" class="text-btn-base">Email</a>
      <a href="#apps" class="text-btn-base">Apps</a>
      <a href="#database" class="text-btn-base">Database</a>
      <router-link to="#" class="text-btn-base">Help & Support</router-link>
      <router-link to="#" class="text-2xl p-3 relative hover:scale-125 transform duration-300 ease-in-out">
        🛒
        <div class="absolute top-0 right-0 bg-red-600 px-1 rounded-full text-xs text-white text-center">1</div>
      </router-link>
    </div>
    <div class="flex gap-x-2">
      <router-link to="#" class="border-btn-base" style="padding: 10px 15px">
        Log In
      </router-link>
      <router-link to="#" class="btn-base" style="padding: 10px  15px">
        Create Account
      </router-link>
    </div>
  </nav>

  <nav class="mobile-nav">
    This is the mobile navigation bar
  </nav>
</template>

<style scoped>

</style>