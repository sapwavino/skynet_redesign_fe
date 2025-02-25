<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      selectedService: ''
    }
  }
}
</script>

<template>
  <div class="text-gray-700 mb-10">
    <h3 class="text muteBoldSubheader">Choose your VPS Type</h3>
    <form class="grid gap-6 lg:grid-cols-2">
      <div class="relative w-72 lg:w-96" v-for="service in services" :key="service.name">
        <input
            class="peer hidden"
            :id="service.name"
            type="radio"
            name="services"
            v-model="selectedService"
            :value="service.name"
            @click="$emit('selectService', service)"/>
        <span
            class="peer-checked:border-customGold absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label
            class="peer-checked:border-2 peer-checked:border-customGold dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 pr-20 hover:shadow-2xl "
            :for="service.name">
          <div class="">
            <span class="mt-2 font-semibold dark:text-gray-300">{{ service.name }}</span>
            <p class="text-slate-500 text-sm leading-6" v-for="feature in service.features" :key="feature">
              {{ feature }}</p>
          </div>
        </label>
      </div>

    </form>
  </div>

</template>

<style scoped>

</style>