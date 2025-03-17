<script>
import {createToast} from "mosha-vue-toastify";

export default {
  name: "CurrencyDropdown",
  props: {
    showText: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {
      countries: this.$store.state.currencyPairs,
    }
  },
  methods: {
    changePreferredCurrency() {
      this.$store.dispatch('updatePreferredCurrency', this.selectedCurrency);
      console.log("changePreferredCurrency", this.selectedCurrency)
      window.localStorage.setItem('preferredCurrency', JSON.stringify(this.selectedCurrency))
      let selectedCountryText = this.countries.find((one) => {
        return one.name === this.selectedCurrency
      }).text
      createToast(
          "Your preferred currency is now " + selectedCountryText + ` (${this.selectedCurrency})`,
          {
            type: 'info',
            duration: 500,
            position: 'bottom-right'
          }
      )
    }
  },
  computed: {
    selectedCurrency: {
      get() {
        return this.$store.state.preferredCurrency
      },
      set(value) {
        this.$store.dispatch('updatePreferredCurrency', value)
      }
    }
  }
}
</script>

<template>
  <div class="block mx-auto"
       @mouseover="$emit('active')"
  >
    <select id="country"
            v-model="selectedCurrency"
            class="border-2 border-customGold dark:text-customGold rounded-xl block p-3 py-3.5 focus:outline-none font-bold cursor-pointer text-center "
            @change="changePreferredCurrency"
            @click.stop
    >
      <option v-for="(country, idx) in countries"
              :key="idx"
              :value="country.name"
      >{{ country.flag }}
       {{ country.name }} ({{ country.symbol }}) <span v-if="showText"> - {{ country.text }}</span>
      </option>
    </select>
  </div>
</template>

<style scoped>

</style>