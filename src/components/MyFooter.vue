<script>
export default {
  name: "MyFooter"
}
</script>

<template>
  <footer class="border-t border-t-gray-300 dark:border-0 dark:bg-gray-900 flex md:flex-row flex-col items-center justify-between px-10 py-5 dark:text-gray-200">
    <h1 class="smallerHeader text-center md:text-right">©️ 2025 Skynet All Rights Reserved.</h1>
    <ul class="flex items-center gap-x-3 mx-auto md:mx-0">
      <li>
        <router-link to="/policies?tab=privacy" class="text-btn-base-sm">Privacy Policy</router-link>
      </li>
      <li>
        <router-link to="/policies?tab=tos" class="text-btn-base-sm">Terms of use</router-link>
      </li>
      <li>
        <router-link to="/policies?tab=refund" class="text-btn-base-sm">Refund Policy</router-link>
      </li>
    </ul>
  </footer>
</template>

<style scoped>

</style>