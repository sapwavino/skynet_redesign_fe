<script setup>
import {ref} from 'vue'
import {convertPrice, exchangeRates} from "../utils/helper_functions.js";
import {useStore} from "vuex";

const store = useStore()


const popularConfigs = ref([
  {
    name: 'Starter VPS',
    features: ['2GB RAM', '2 CPU Cores', '50 GB SSD'],
    price: '18',
    isGPU: false
  },
  {
    name: 'Business VPS',
    features: ['4GB RAM', '2 CPU Cores', '100 GB SSD'],
    price: '26',
    isGPU: false
  },
  {
    name: 'Premium VPS',
    features: ['8GB RAM', '4 CPU Cores', '200 GB SSD'],
    price: '52',
    isGPU: false
  },
  {
    name: 'GPU Accelerated VPS',
    features: ['16GB RAM', '8GB GPU RAM', '8 CPU Cores', '500 GB SSD', 'NVIDIA A100'],
    price: '120',
    isGPU: true
  }
])

const ram = ref("4")
const cores = ref("2")
const storage = ref("100")
const gpuRAM = ref("8")
const gpuCores = ref("1024")
const gpuArchitecture = ref("")
const gpuConfig = ref(false)

</script>

<template>
  <section class="w-3/4 mx-auto mt-5">
    <h2 class="text-4xl font-bold capitalize text-center dark:text-gray-200 text-center">Cloud VPS Solutions</h2>
    <h2 class="muteBoldSubheader text-center">Customize your virtual private server with the exact resources you need.
      <br /> Pay only for what you use.
    </h2>
    <div class="mt-5">
      <h2 class="text-2xl font-bold text-center">Popular Configurations</h2>
      <hr class="mx-80 mb-5 mt-1 border-gray-300" />
      <section class="grid grid-cols-4 ">
        <div v-for="(config, idx) in popularConfigs"
             :key="idx"
             :class="{
               'border-2 border-customGold' : config.isGPU
             }"
             class="m-2 shadow-2xl rounded-2xl p-5 relative flex flex-col gap-3"
        >
          <p v-if="config.isGPU"
             class="bg-customGold font-bold p-1 rounded-full absolute -top-3 -right-3 text-sm animate-pulse tracking-wider"
          >GPU</p>
          <h2 class="text-2xl font-bold text-center">{{ config.name }}</h2>
          <div class="flex flex-col items-center">
            <p
                v-for="(feature, idx) in config.features"
                :key="idx"
                class="muteBoldSubheader"
            >{{ feature }}
            </p>
          </div>
          <p class="font-bold text-gray-800 dark:text-gray-400 text-2xl text-center">
            {{
              convertPrice($store.state.preferredCurrency, config.price)
            }}
            /month
          </p>
          <button class="btn-base w-full">Select</button>
        </div>
      </section>
    </div>
    <div class="mt-5">
      <h2 class="text-2xl font-bold text-center">Configure your VPS</h2>
      <hr class="mx-80 mb-5 mt-1 border-gray-300" />


      <div class="flex justify-center mb-5">
        <label class="inline-flex items-center space-x-4 cursor-pointer text-gray-800"
               for="Toggle2"
        >
          <span class="font-bold">CPU</span>
          <span class="relative">
          <input id="Toggle2"
                 v-model="gpuConfig"
                 class="hidden peer"
                 type="checkbox"
          >
          <div class="w-10 h-4 rounded-full shadow bg-gray-400 peer-checked:bg-customGold"></div>
          <div class="absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto bg-customGold"></div>
        </span>
          <span class="font-bold">GPU-Accelerated</span>
        </label>
      </div>

      <div class="flex items-center gap-3 mx-auto">
        <label
            class="text-neutral-700 font-bold dark:text-neutral-200"
            for="ramRange"
        >
          RAM
        </label
        >
        <input
            id="ramRange"
            v-model="ram"
            class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
            max="64"
            min="1"
            type="range"
        />
        <p class="font-bold text-customGold">{{ ram }} GB</p>
      </div>

      <div class="flex items-center gap-3 mx-auto my-5">
        <label
            class="text-neutral-700 font-bold dark:text-neutral-200"
            for="coresRange"
        >
          CPU Cores
        </label
        >
        <input
            id="coresRange"
            v-model="cores"
            class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
            max="32"
            min="1"
            type="range"
        />
        <p class="font-bold text-customGold">{{ cores }} Cores</p>
      </div>

      <div class="flex items-center gap-3 mx-auto">
        <label
            class="text-neutral-700 font-bold dark:text-neutral-200"
            for="ramRange"
        >
          Storage
        </label
        >
        <input
            id="ramRange"
            v-model="storage"
            class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
            max="2000"
            min="20"
            step="10"
            type="range"
        />
        <p class="font-bold text-customGold">{{ storage }} GB</p>
      </div>


      <transition name="fade">
        <section v-if="gpuConfig">
          <h2 class="font-bold text-xl text-center mt-5">GPU Configuration</h2>
          <div class="border-l-4 border-customGold rounded-l-2xl py-5 px-3">
            <div class="flex items-center gap-3 mx-auto">
              <label
                  class="text-neutral-700 font-bold dark:text-neutral-200"
                  for="ramRange"
              >
                GPU RAM
              </label
              >
              <input
                  id="ramRange"
                  v-model="gpuRAM"
                  class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                  max="32"
                  min="4"
                  type="range"
              />
              <p class="font-bold text-customGold">{{ gpuRAM }} GB</p>
            </div>

            <div class="flex items-center gap-3 mx-aut my-5">
              <label
                  class="text-neutral-700 font-bold dark:text-neutral-200"
                  for="ramRange"
              >
                GPU Cores
              </label
              >
              <input
                  id="ramRange"
                  v-model="gpuCores"
                  class="w-3/4 cursor-pointer bg-neutral-100 dark:bg-neutral-600 accent-customGold border-0 border-transparent"
                  max="5120"
                  min="512"
                  step="512"
                  type="range"
              />
              <p class="font-bold text-customGold">{{ gpuCores }} Cores</p>
            </div>
          </div>
        </section>
      </transition>

    </div>
  </section>
</template>

<style scoped>

</style>