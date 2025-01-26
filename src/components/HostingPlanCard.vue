<script>
export default {
  name: "HostingPlanCard",
  props: {
    planName: {
      type: String,
      required: true
    },
    cost: {
      type: Number,
      required: true
    },
    color: {
      type: String,
      required: true
    },
    features: {
      type: Array,
      required: true
    },
    popular: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatNumber(value) {
      let parts = value.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    },
  }
}
</script>

<template>
  <div class="flex flex-col  justify-center gap-y-2 shadow-lg rounded-2xl p-20 relative">
    <span class="ribbon" v-if="popular">P<br>O<br>P<br>U<br>L<br>A<br>R</span>
    <h2 class="text-2xl font-bold" :style="`color: ${color}`">{{ planName }}</h2>
    <h2 class="text-3xl font-bold">₦ {{ formatNumber(cost) }}<span class="text-sm text-gray-400 font-medium">/month</span></h2>
    <hr class="mt-5 mb-10"/>
    <ul>
      <li v-for="(feature, idx) in features" :key="idx" class="mb-2">✔️ {{ feature }}</li>
    </ul>
    <button class="flat-btn-base mt-5">Purchase</button>
  </div>
</template>

<style scoped>

</style>