<script>
export default {
  props: {
    systems: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      selectedOS: "ubuntu",
      selectedOsVersion: ''
    }
  }
}
</script>

<template>
  <div class="text-gray-700 mt-10">
    <h3 class="text muteBoldSubheader">Choose your Operating System</h3>
    <form class="grid gap-6 lg:grid-cols-4">
      <div class="relative w-72 lg:w-72" v-for="(service, idx) in systems" :key="idx">
        <input class="peer hidden" :id="service.name" type="radio" name="osSelection"
               v-model="selectedOS"
               :value="service.name"/>
        <span
            class="peer-checked:border-customGold absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label
            class="peer-checked:border-2 peer-checked:border-customGold peer-checked:bg-blue-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 pr-20 hover:shadow-2xl hover:border-0"
            :for="service.name">
          <div class="flex items-center gap-3">
            <img :src="service.image" alt="OS" class=""/>
            <span class="header capitalize">{{ service.name }}</span>
          </div>
        </label>
      </div>


    </form>
    <div class="mt-5">
      <h2 class="muteBoldSubheader">Select OS Version</h2>
      <select id="country"
              class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center"
              v-model="selectedOsVersion">
        <option value="">Select version</option>
        <option
            v-for="(version, idx) in systems.find(one => one.name === selectedOS).versions"
            :key="idx"
            :value="version">{{ version }}
        </option>
      </select>
    </div>
  </div>

</template>

<style scoped>

</style>