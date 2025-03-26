<script setup>

</script>

<template>
  <section>
    <button class="btn-base-sm"
            @click.prevent="$router.back()"
    >← Back
    </button>
  </section>
  <div class="dark:text-gray-300">This is for {{ $route.params.id }}</div>
</template>

<style scoped>

</style>