<script>
export default {
  name: "Recents",
  props: {
    recents: {
      type: Array,
      required: true
    }
  }
}
</script>

<template>
  <transition name="fade">
    <div v-if="recents.length > 0">
      <h2 class="my-1 text-xs font-bold tracking-wider">Recently searched</h2>
      <div class="flex items-center gap-x-1">
        <div v-for="recent in recents" :key="recent" class="px-2 py-1 rounded-2xl shadow text-xs font-medium truncate cursor-pointer border-customGold border" @click="$emit('clickedRecent', recent)">
          {{ recent }}
        </div>
        <button @click="$emit('clear')"
                class="px-3 py-1 rounded-2xl shadow text-xs bg-customGold text-black hover:bg-black hover:text-customGold transform transition-all duration-300 ease-in-out hover:cursor-pointer font-bold tracking-wider">
          ✖️Clear
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>

</style>