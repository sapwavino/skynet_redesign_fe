<script>
export default {
  name: "CookieConsent",
  data() {
    return {
      showPrefs: false,
    };
  },
  methods: {
    reject() {
      this.$store.dispatch("hideCookieModal");
    },
    accept() {
      this.$store.dispatch("hideCookieModal");
    }
  },
  created() {
    const showModal = JSON.parse(window.localStorage.getItem('showCookieModal'))
    if (showModal) {
      this.$store.dispatch("showCookieModal");
    }else if(showModal === null) {
      this.$store.dispatch("showCookieModal");
    }else{
      this.$store.dispatch("hideCookieModal");
    }
  }

}
</script>

<template>
  <transition name="slowFade" mode="in-out">
    <div
        class="md:flex flex-col gap-3 fixed bottom-10 left-5 md:w-1/4 bg-gray-200 shadow-2xl rounded-2xl p-5 dark:bg-gray-900 dark:text-white"
        v-show="$store.state.showCookieModal">
      <h1 class="smallHeader dark:text-gray-200">Cookie Consent</h1>
      <p class="dark:text-gray-200" v-if="!showPrefs">
        This website uses cookies to improve your experience and personalize content. By continuing to use this site,
        you
        agree to our use of cookies.
      </p>
      <div v-if="showPrefs">
        <h2 class="muteSubheader mb-3 dark:text-gray-200">Cookie Preferences</h2>

        <div class="flex items-center ">
          <label class="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer">
            <div
                class="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0  rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-customGold-transparent hover:peer-checked:bg-customGold "></div>
          </label>
          <div class="block">
            <span class="ml-3 text-sm font-normal text-gray-600 mb-1">Strictly Necessary Cookies</span>
            <br>
            <span class="ml-3 text-sm font-normal text-gray-400 ">Used to aid navigation and UI state</span>
          </div>
        </div>

        <div class="flex items-center ">
          <label class="relative inline-flex items-center mb-5 cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" checked>
            <div
                class="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0  rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-customGold-transparent hover:peer-checked:bg-customGold "></div>
          </label>
          <div class="block">
            <span class="ml-3 text-sm font-normal text-gray-600 mb-1">Functional Cookies</span>
            <br>
            <span class="ml-3 text-sm font-normal text-gray-400 ">Used to speed up processes and functions within the app</span>
          </div>
        </div>
      </div>
      <div class="flex gap-x-5">
        <button class="flat-border-btn-base" style="font-size: 0.9rem" @click="showPrefs = true">Preferences</button>
        <button class="bg-gray-400 px-3 py-1 text-gray-100 font-bold cursor-pointer hover:bg-gray-500"
                style="font-size: 0.9em" @click="reject">Reject All
        </button>
        <button class="flat-btn-base hover:underline underline-offset-1" style="font-size: 0.9rem" @click="accept">
          Accept All
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>

</style>