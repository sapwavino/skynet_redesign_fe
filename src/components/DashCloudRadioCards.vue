<script>
export default {
  props: {
    services: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },

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
    <h3 class="text muteSubheader mb-5">{{ type }}</h3>
    <form class="grid gap-6 lg:grid-cols-4">
      <div v-for="service in services"
           :key="service.name"
           class="relative w-64 lg:w-64"
      >
        <input
            :id="service.name"
            v-model="selectedService"
            :value="service.name"
            class="peer hidden"
            name="services"
            type="radio"
            @click="$emit('selectService', service)"
        />
        <span
            class="peer-checked:border-customGold absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
        ></span>
        <label
            :for="service.name"
            class="peer-checked:border-2 peer-checked:border-customGold dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 pr-20 hover:shadow-2xl "
        >
          <div class="">
            <span class="mt-2 font-semibold dark:text-gray-300">{{ service.name }}</span>
            <p v-for="feature in service.features"
               :key="feature"
               class="text-slate-500 text-sm leading-6"
            >
              {{ feature }}</p>
          </div>
        </label>
      </div>

    </form>
  </div>

</template>

<style scoped>

</style>