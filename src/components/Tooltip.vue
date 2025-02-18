<template>
  <div class="relative inline-block " @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <slot></slot>
    <transition name="tooltip">
      <div v-if="visible" :class="tooltipClasses" :style="tooltipStyles">
        <p v-for="msg in message" class="text-center my-1 bg-gray-100 text-black rounded-2xl p-1">{{ msg.name }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref, computed} from 'vue';

const props = defineProps({
  message: {
    type: Array,
    required: true
  },
  position: {
    type: String,
    default: 'top' // top, bottom, left, right
  },
  color: {
    type: String,
    default: 'bg-gray-700' // Any Tailwind color name
  },
  offset: {
    type: Number,
    default: 15 // Increased offset for better spacing
  }
});

const visible = ref(false);

const showTooltip = () => {
  visible.value = true;
};

const hideTooltip = () => {
  visible.value = false;
};

const tooltipClasses = computed(() => {
  return [
    'absolute',
    'z-10',
    'px-3',
    'py-2',
    'rounded',
    'text-xs',
    'w-44',
    `${props.color}`,
    'text-white',
    'transition-opacity',
    'duration-200',
    'ease-in-out',
    'pointer-events-none',
    'rounded-3xl'
  ];
});

const tooltipStyles = computed(() => {
  let styles = {};

  switch (props.position) {
    case 'top':
      styles.top = props.message.length > 1 ? `-${props.offset + 65}px` : `-${props.offset + 35}px`; // Adjusted top offset
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
      break;
    case 'bottom':
      styles.bottom = `-${props.offset + 40}px`; // Adjusted bottom offset
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
      break;
    case 'left':
      styles.left = `-${props.offset + 110}px`; // Adjusted left offset
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
      break;
    case 'right':
      styles.right = `-${props.offset + 110}px`; // Adjusted right offset
      styles.top = '50%';
      styles.transform = 'translateY(-50%)';
      break;
  }
  return styles;
});

</script>

<style scoped>
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>