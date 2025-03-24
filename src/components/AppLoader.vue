<script setup>

</script>

<template>
  <transition name="slowFade">
    <div
        class="loadingPageStyle"
    >
      <div class="flex flex-col items-center">
        <img
            alt="Logo"
            class="h-[9rem] animate-pulse"
            src="../assets/img/Skynet%20Web%20Services%20Logo.png"
        />
        <!--        <div class="appLoader h-40">{{ $store.state.currentLoadingMessage }}</div>-->
      </div>
    </div>
  </transition>
</template>

<style scoped>

</style>