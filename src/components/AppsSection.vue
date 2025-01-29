<script>
import {Vue3Marquee} from 'vue3-marquee'
import {useDarkMode} from "@/composables/useDarkMode";

// Use the composable for dark mode
const {mode} = useDarkMode();

export default {
  name: "AppsSection",
  components: {
    Vue3Marquee
  },
  data() {
    return {
      appsArray: [
        {
          "app": "Human Resources",
          "icon": ''
        },
        {
          "app": "Accounting",
          "icon": ''
        },
        {
          "app": "Inventory Management",
          "icon": ''
        },
        {
          "app": "CRM",
          "icon": ''
        },
        {
          "app": "Marketing",
          "icon": ''
        },
        {
          "app": "Sales",
          "icon": ''
        }
      ],
      appsArray2: [
        {
          "app": "Learning Management System",
          "icon": ''
        },
        {
          "app": "NGO",
          "icon": ''
        },
        {
          "app": "Automation",
          "icon": ''
        },
        {
          "app": "Payments",
          "icon": ''
        },
        {
          "app": "Identity Management",
          "icon": ''
        },
        {
          "app": "Electronic Health Records",
          "icon": ''
        },
        {
          "app": "Digital Document Management",
          "icon": ''
        }
      ]
    }
  },
  setup() {
    return {
      mode
    }
  }
}
</script>

<template>
  <div class="mt-10 min-h-10" id="apps"></div>
  <div class="grid grid-cols-2 w-3/4 mx-auto mb-10">

    <div class="flex flex-col justify-center">
      <h2 class="header">Business Apps</h2>
      <h3 class="subheader">From HR, Accounting, Finance, Payroll, Identity Management, Hospital Solution and Even
        Banking, we got you covered.</h3>
      <!--      <h3 class="mt-3">Our one-click installs and managed services are readily available to make the process smoother for you to get from idea to market in as little time as possible.</h3>-->
      <div class="flex items-center mt-5 gap-x-5">
        <button class="btn-base">Get Started</button>
        <div class="flex flex-col justify-center">
          <p class="smallHeader">₦15,400.56</p>
          <p class="muteSmallSubheader">Monthly</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-x-10 px-5 h-44">
      <Vue3Marquee pause-on-hover vertical>
        <div class="appsMarqueeCard" v-for="app in appsArray" :key="app">
          {{ app.app }}
        </div>
      </Vue3Marquee>
      <Vue3Marquee pause-on-hover vertical direction="reverse">
        <div class="appsMarqueeCard" v-for="app in appsArray2" :key="app.app">
          {{ app.app }}
        </div>
      </Vue3Marquee>
    </div>

  </div>
</template>

<style scoped>

</style>