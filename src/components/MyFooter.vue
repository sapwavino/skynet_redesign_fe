<script>
export default {
  name: "MyFooter"
}
</script>

<template>
  <footer class="dark:bg-gray-900 flex items-center justify-between px-10 py-5 dark:text-gray-200">
    <h1 class="smallHeader">©️ 2025 Skynet All Rights Reserved.</h1>
    <ul class="flex items-center gap-x-3">
      <li>
        <router-link to="/policies?tab=privacy" class="text-btn-base">Privacy Policy</router-link>
      </li>
      <li>
        <router-link to="/policies?tab=tos" class="text-btn-base">Terms of use</router-link>
      </li>
      <li>
        <router-link to="/policies?tab=refund" class="text-btn-base">Refund Policy</router-link>
      </li>
    </ul>
  </footer>
</template>

<style scoped>

</style>