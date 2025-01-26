<script>
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";

export default {
  name: "EmailSection",
  components: {DotLottieVue}
}
</script>

<template>
  <div class="w-5/6 mx-auto">
    <div class="mt-10 min-h-10" id="email"></div>
    <div class="text-center">
      <h2 class="header">Professional Business Email</h2>
      <h3 class="subheader">Your domain, your email: Together with all the tools you need</h3>
    </div>
    <div class="grid grid-cols-2 p-5">
      <DotLottieVue
          style="height: 300px;"
          autoplay
          loop
          src="emailSectionAnimation.lottie"/>
      <section>
        <ul class="grid grid-cols-2 gap-y-1">
          <li class="mr-5 rounded-2xl shadow p-5">
            <h2 class="smallHeader mb-1">Your business at the heart of every mail</h2>
            <p class="muteSmallSubheader">Create yourname@yoursite.com so every single email looks 'the business'.</p>
          </li>
          <li class="mr-5 rounded-2xl shadow p-5">
            <h2 class="smallHeader mb-1">Keep working on the go</h2>
            <p class="muteSmallSubheader">Easily access all your personal and business email addresses from any device. Connect to your favorite email application, like Outlook, Thunderbird, or Gmail.</p>
          </li>
          <li class="mr-5 rounded-2xl shadow p-5 col-span-2">
            <h2 class="smallHeader mb-1">Feel you belong</h2>
            <p class="muteSmallSubheader">We don’t just guarantee our Professional Business Email service — we use it daily. Our 30+ Skynet staff (across 4 countries and three continents) are happily connected.</p>
          </li>
          <li class="flex items-center mt-5 gap-x-5">
            <button class="btn-base">Get Started</button>
            <div class="flex flex-col justify-center">
              <p class="smallHeader">₦1,514.13</p>
              <p class="muteSmallSubheader">Monthly</p>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>