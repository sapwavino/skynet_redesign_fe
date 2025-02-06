<script setup>
const props = defineProps({
  modelValue: Boolean, // Controls modal visibility
  title: String, // Modal title
  type: {type: String, default: "info"}, // 'info' or 'confirm'
  confirmText: {type: String, default: "Submit"},
  cancelText: {type: String, default: "Cancel"},
  persistent: {type: Boolean, default: false}, // Prevent closing on outside click
  onConfirm: Function, // Function to run on confirm
  onCancel: Function, // Function to run on cancel
});

const emit = defineEmits(["update:modelValue"]);

const closeModal = () => emit("update:modelValue", false);

const handleOutsideClick = (event) => {
  // Only close modal if `persistent` is false and the click is on the overlay
  if (!props.persistent && event.target.id === "modal-overlay") {
    closeModal();
  }
};
</script>

<template>
  <transition name="fade">
    <div
        v-if="modelValue"
        id="modal-overlay"
        @click="handleOutsideClick"
        class="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
    >
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-lg p-6">
        <!-- Modal Title -->
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>

        <!-- Slot for Custom Content -->
        <div class="mt-4">
          <slot/>
        </div>

        <!-- Modal Actions -->
        <div class="mt-5 flex justify-end space-x-3">
          <!-- Cancel Button (Only for Confirm Modals) -->
          <button
              v-if="type === 'confirm'"
              @click="onCancel ? onCancel() : closeModal()"
              class="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
          >
            {{ cancelText }}
          </button>

          <!-- Confirm Button -->
          <button
              @click="onConfirm ? onConfirm() : closeModal()"
              class="btn-base"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Smooth fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
