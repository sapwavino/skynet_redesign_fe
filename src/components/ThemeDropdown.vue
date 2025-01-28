<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useDarkMode } from "@/composables/useDarkMode";

// Use the composable for dark mode
const { mode, setMode, initialize } = useDarkMode();

// Initialize dark mode on mount
initialize();

// Dropdown state
const dropdownOpen = ref(false);

// Close the dropdown
const closeDropdown = () => {
  dropdownOpen.value = false;
};

// Dynamically display the current mode with its emoji
const currentModeLabel = computed(() => {
  switch (mode.value) {
    case "light":
      return "🌞︎";
    case "dark":
      return "🌙";
    case "system":
      return "🖥️";
    default:
      return "🖥️";
  }
});

// Detect clicks outside the dropdown
const dropdownRef = ref(null);
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown();
  }
};

// Add and remove the event listener
onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div ref="dropdownRef" class="relative shadow-2xl">
    <!-- Dropdown Button -->
    <button
        @click="dropdownOpen = !dropdownOpen"
        class="py-1 px-2 font-medium rounded-full bg-gray-800 dark:hover:bg-gray-600 transform transition-all ease-in-out duration-300 border-2 border-customGold cursor-pointer hover:scale-110  text-2xl"
    >
      {{ currentModeLabel }}
    </button>

    <transition name="fade">
      <!-- Dropdown Menu -->
      <div
          v-if="dropdownOpen"
          class="absolute bg-white border-2 rounded-lg shadow-lg dark:bg-black dark:text-white dark:border-customGold px-2 py-3 w-32 -right-28 flex flex-col gap-y-1.5 z-50"
      >
        <button
            class="block w-full px-4 py-2 text-left text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer ease-in-out border-2 border-black dark:border-customGold"
            @click="setMode('light'); closeDropdown()"
        >
          🌞 Light
        </button>

        <button
            class="block w-full px-4 py-2 text-left text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer ease-in-out border-2 border-black dark:border-customGold"
            @click="setMode('dark'); closeDropdown()"
        >
          🌙 Dark
        </button>

        <button
            class="block w-full px-4 py-2 text-left text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer ease-in-out border-2 border-black dark:border-customGold"
            @click="setMode('system'); closeDropdown()"
        >
          🖥️ System
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Optional: Additional styles for dropdown */
</style>
