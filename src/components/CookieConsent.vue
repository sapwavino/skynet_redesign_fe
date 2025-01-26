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

}
</script>

<template>
  <transition name="slowFade" mode="in-out">
    <div class="flex flex-col gap-3 fixed bottom-10 left-5 w-1/4 bg-white shadow-2xl rounded-2xl p-5"
         v-show="$store.state.showCookieModal">
      <h1>Cookie Consent</h1>
      <p>
        This website uses cookies to improve your experience and personalize content. By continuing to use this site,
        you
        agree to our use of cookies.
      </p>
      <div class="flex gap-x-5">
        <button class="flat-border-btn-base" style="font-size: 0.9rem" @click="showPrefs = true">Preferences</button>
        <button class="bg-gray-400 px-3 py-1 text-gray-100 font-bold cursor-pointer hover:bg-gray-500"
                style="font-size: 0.9rem" @click="reject">Reject All
        </button>
        <button class="flat-btn-base" style="font-size: 0.9rem" @click="accept">Accept All</button>
      </div>
    </div>
  </transition>
</template>

<style scoped>

</style>