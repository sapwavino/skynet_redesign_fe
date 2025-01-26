<script>
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";
const TabItem = {
  header: String,
  content: String,
  btn: String
}
export default {
  name: "TabComponent",
  props: {
    tab: {
      type: TabItem,
      required: true
    },
    animation: {
      type: String,
      required: true
    }
  },
  components: {
    DotLottieVue
  }
}
</script>

<template>

  <div class="grid grid-cols-2 w-3/4 mx-auto rounded-3xl">
    <DotLottieVue style="height: 300px; width: 400px; margin: 0 auto; text-align: right" autoplay loop
                  :src="animation" />
    <div class="border-l border-gray-300 flex flex-col justify-center w-full">
      <div class="ml-5 mr-1.5">
        <h3 class="font-bold text-2xl mb-3 capitalize">{{ tab.header }}</h3>
        <p v-html="tab.content" class="italic"></p>
        <slot></slot>
        <button class="mx-auto text-left mt-3 btn-base capitalize mt-5" style="font-size: 15px">{{ tab.btn }}</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>