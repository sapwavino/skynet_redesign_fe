<script>
export default {
  props: {
    systems: {
      type: Array,
      required: true,
    },
    reset: {
      type: Boolean,
    }
  },
  data() {
    return {
      selectedOS: "",
      selectedOsVersion: '',
    }
  },
  watch: {
    reset(newVal) {
      if (newVal) {
        this.selectedOS = "";
        this.selectedOsVersion = "";
        console.log("Resetting...///")
        // Important: Emit an event back to the parent to acknowledge the reset
        this.$emit('resetComplete'); // Or a more descriptive name
      }
    }
  }
}
</script>

<template>
  <div class="text-gray-700 mt-10">
    <h3 class="text muteBoldSubheader">Choose your Operating System</h3>
    <form class="grid gap-1 gap-y-2 lg:grid-cols-4">
      <div
          v-for="(service, idx) in systems"
          :key="idx"
          class="relative w-72"
          @click="$emit('selectOS', service.name)"
      >
        <input :id="service.name"
               v-model="selectedOS"
               :value="service.name"
               class="peer hidden"
               name="osSelection"
               type="radio"
        />
        <span
            class="peer-checked:border-customGold absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"
        ></span>
        <label
            :for="service.name"
            class="peer-checked:border-2 peer-checked:border-customGold dark:peer-checked:bg-gray-700 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 pr-20 hover:shadow-2xl hover:border-0"
        >
          <div class="flex items-center gap-x-1.5">
            <img :src="service.image"
                 alt="OS"
                 class=""
            />
            <span class="header capitalize">{{ service.name }}</span>
          </div>
        </label>
      </div>


    </form>
    <div class="mt-5">
      <h2 class="muteBoldSubheader">Select OS Version</h2>
      <select id="country"
              v-model="selectedOsVersion"
              class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center"
              @change="$emit('selectOSVersion', selectedOsVersion)"
      >
        <option value="">Select version</option>
        <option
            v-for="(version, idx) in systems.find(one => one.name === selectedOS)?.versions"
            v-if="selectedOS"
            :key="idx"
            :value="version"
        >{{ version }}
        </option>
      </select>
    </div>
  </div>

</template>

<style scoped>

</style>