<template>
  <div class="carousel relative overflow-hidden md:w-3/4 rounded-2xl mb-5 shadow-2xl">
    <transition name="slowFade">
      <div
          :style="{
      transform: `translateX(-${currentIndex * 100}%)`
    }"
          class="carousel-track flex transition-transform duration-500 ease-in-out "
      >
        <slot></slot>
      </div>
    </transition>
    <button
        v-if="showControls"
        class="absolute top-1/2 transform -translate-y-1/2 left-2 font-bold hover:bg-customGold text-2xl px-3 py-1 rounded-full text-white"
        @click="prevSlide"
    >
      &lt;
    </button>
    <button
        v-if="showControls"
        class="absolute top-1/2 transform -translate-y-1/2 right-2 font-bold hover:bg-customGold text-2xl px-3 py-1 rounded-full text-white"
        @click="nextSlide"
    >
      &gt;
    </button>

    <div v-if="showIndicators"
         class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
    >
      <button
          v-for="(item, index) in slideCount"
          :key="index"
          :class="{
            'bg-customGold': currentIndex === index,
            'bg-gray-300 border-2 border-customGold': currentIndex !== index
          }"
          class="w-3 h-3 rounded-full"
          @click="goToSlide(index)"
      ></button>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, onUnmounted} from 'vue';

const props = defineProps({
  showControls: {
    type: Boolean,
    default: false,
  },
  showIndicators: {
    type: Boolean,
    default: true,
  },
  autoPlay: {
    type: Boolean,
    default: false,
  },
  autoPlayInterval: {
    type: Number,
    default: 4000, // 4 seconds
  },
});

const currentIndex = ref(0);
const slideCount = ref(0);
let autoPlayIntervalId = null;

onMounted(() => {
  slideCount.value = document.querySelector('.carousel-track')?.children.length || 0;
  if (props.autoPlay && slideCount.value > 1) {
    startAutoPlay();
  }
});

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % slideCount.value;
  resetAutoPlay();
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + slideCount.value) % slideCount.value;
  resetAutoPlay();
};

const goToSlide = (index) => {
  currentIndex.value = index;
  resetAutoPlay();
};

const startAutoPlay = () => {
  autoPlayIntervalId = setInterval(() => {
    nextSlide();
  }, props.autoPlayInterval);
};

const resetAutoPlay = () => {
  if (props.autoPlay && slideCount.value > 1) {
    clearInterval(autoPlayIntervalId);
    startAutoPlay();
  }
};

onUnmounted(() => {
  clearInterval(autoPlayIntervalId);
});

</script>

<style scoped>
.carousel-track > * {
  flex-shrink:0;
  width:100%;
}
</style>