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
      <svg class="fill-customGold h-10 hover:fill-gray-900"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M7.68473 7.33186C8.07526 6.94134 8.07526 6.30817 7.68473 5.91765C7.29421 5.52712 6.66105 5.52712 6.27052 5.91765L1.60492 10.5832C0.823873 11.3643 0.823872 12.6306 1.60492 13.4117L6.27336 18.0801C6.66388 18.4706 7.29705 18.4706 7.68757 18.0801C8.0781 17.6896 8.0781 17.0564 7.68757 16.6659L4.02154 12.9998L22 12.9998C22.5523 12.9998 23 12.5521 23 11.9998C23 11.4476 22.5523 10.9998 22 10.9998L4.01675 10.9998L7.68473 7.33186Z"
        />
      </svg>
    </button>
    <button
        v-if="showControls"
        class="absolute top-1/2 transform -translate-y-1/2 right-2 font-bold hover:bg-customGold text-2xl px-3 py-1 rounded-full text-white"
        @click="nextSlide"
    >
      <svg class="fill-customGold h-10 hover:fill-gray-900"
           viewBox="0 0 24 24"
           xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.3153 16.6681C15.9247 17.0587 15.9247 17.6918 16.3153 18.0824C16.7058 18.4729 17.339 18.4729 17.7295 18.0824L22.3951 13.4168C23.1761 12.6357 23.1761 11.3694 22.3951 10.5883L17.7266 5.9199C17.3361 5.52938 16.703 5.52938 16.3124 5.91991C15.9219 6.31043 15.9219 6.9436 16.3124 7.33412L19.9785 11.0002L2 11.0002C1.44772 11.0002 1 11.4479 1 12.0002C1 12.5524 1.44772 13.0002 2 13.0002L19.9832 13.0002L16.3153 16.6681Z"

        />
      </svg>
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
import {ref, computed, onMounted, onUnmounted, watch} from 'vue';

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

watch(() => props.autoPlay, (newValue, oldValue) => {
  console.log('Carousel autoPlay prop changed:', newValue);
  if (!newValue) {
    clearInterval(autoPlayIntervalId);
    autoPlayIntervalId = null; // Ensure the interval ID is cleared
  }
  else if (newValue && slideCount.value > 1 && autoPlayIntervalId === null) {
    startAutoPlay();
  }
});
</script>

<style scoped>
.carousel-track > * {
  flex-shrink:0;
  width:100%;
}
</style>