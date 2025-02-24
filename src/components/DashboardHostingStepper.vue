<script>
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "DashboardHostingStepper",
  data() {
    return {
      currentStep: 1, // Example: Step 2 is active
      steps: [
        {label: "What type of application or service will you be hosting?"},
        {label: "What is your preferred hosting panel?"}
      ],
      domainSteps: [
        {label: "I will use my existing domain & update nameservers"},
        {label: "I want to register a new domain"}
      ],
      currentDomainStep: 1, // Example: Step 2 is active
      appType: "",
      preferredPanel: "",
      domainChecked: false,
      domain: ""
    };
  },
  methods: {
    checkDomain() {
      if (this.domain === '') {
        console.log('Domain is empty');
        createToast(
            `Please enter a valid domain`,
            {
              // duration: 5000,
              type: 'danger',
            }
        )
        return;
      }
      this.domainChecked = true;
      createToast(
          `Domain has been checked`,
          {
            // duration: 5000,
            type: 'success',
          }
      )
      console.log('Domain checked');
    }
  }
};
</script>

<template>
  <ol class="lg:flex items-center w-full space-y-4 lg:space-x-8 lg:space-y-0 mb-3">
    <li class="flex-1" v-for="(step, idx) in steps" :key="idx">
      <a href="#" :class="{
        'border-customGold text-customGold font-semibold': (idx + 1) <= currentStep,
        'border-gray-200 text-gray-500': (idx + 1) > currentStep
      }"
         class="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid lg:pt-4 lg:border-t-2 lg:border-l-0 lg:pl-0 cursor-not-allowed"
      >
        <span class="text-sm lg:text-base">Step {{ idx + 1 }}</span>
        <h4 class="text-base lg:text-lg text-black dark:text-gray-200">{{ step.label }}</h4>
      </a>
    </li>
  </ol>


  <!--  STEP 1-->
  <transition name="fade">
    <section v-if="currentStep === 1" class="shadow rounded-md p-5 flex flex-col md:block">
      <p class="muteSmallSubheader text-center">(You can change anytime)</p>
      <div class="grid md:grid-cols-3 gap-5 w-3/4 mx-auto p-5">
        <section
            class="hostingConfigureAppCard" @click="appType = 'php'"
            :class="{'border-2 dark:border-customGold' : appType === 'php'}">
          <svg
              class="dark:fill-customGold"
              :class="{'fill-customGold': appType === 'php'}"
              height="4rem"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 512">
            <path
                d="M320 104.5c171.4 0 303.2 72.2 303.2 151.5S491.3 407.5 320 407.5c-171.4 0-303.2-72.2-303.2-151.5S148.7 104.5 320 104.5m0-16.8C143.3 87.7 0 163 0 256s143.3 168.3 320 168.3S640 349 640 256 496.7 87.7 320 87.7zM218.2 242.5c-7.9 40.5-35.8 36.3-70.1 36.3l13.7-70.6c38 0 63.8-4.1 56.4 34.3zM97.4 350.3h36.7l8.7-44.8c41.1 0 66.6 3 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7h-70.7L97.4 350.3zm185.7-213.6h36.5l-8.7 44.8c31.5 0 60.7-2.3 74.8 10.7 14.8 13.6 7.7 31-8.3 113.1h-37c15.4-79.4 18.3-86 12.7-92-5.4-5.8-17.7-4.6-47.4-4.6l-18.8 96.6h-36.5l32.7-168.6zM505 242.5c-8 41.1-36.7 36.3-70.1 36.3l13.7-70.6c38.2 0 63.8-4.1 56.4 34.3zM384.2 350.3H421l8.7-44.8c43.2 0 67.1 2.5 90.2-19.1 26.1-24 32.9-66.7 14.3-88.1-9.7-11.2-25.3-16.7-46.5-16.7H417l-32.8 168.7z"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">PHP</h3>
          <h3 class="text-center muteSmallSubheader">Laravel, CodeIgniter, Wordpress</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'js'"
            :class="{'border-2 dark:border-customGold' : appType === 'js'}">
          <svg
              class="dark:fill-customGold" :class="{'fill-customGold': appType === 'js'}"
              height="4rem"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512">
            <path
                d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6 13.8 0 22.6-5.4 22.6-26.5V237.7h42.1v143.7zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6 17.4 0 28.6-8.7 28.6-20.8 0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5 0-31.6 24.1-55.6 61.6-55.6 26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18-12.3 0-20.1 7.8-20.1 18 0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2 0 37.8-29.8 58.6-69.7 58.6z"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">Javascript</h3>
          <h3 class="text-center muteSmallSubheader">Node, React, Vue</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'python'"
            :class="{'border-2 dark:border-customGold' : appType === 'python'}">
          <svg
              class="dark:fill-customGold" :class="{'fill-customGold': appType === 'python'}"
              height="4rem" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path
                d="M439.8 200.5c-7.7-30.9-22.3-54.2-53.4-54.2h-40.1v47.4c0 36.8-31.2 67.8-66.8 67.8H172.7c-29.2 0-53.4 25-53.4 54.3v101.8c0 29 25.2 46 53.4 54.3 33.8 9.9 66.3 11.7 106.8 0 26.9-7.8 53.4-23.5 53.4-54.3v-40.7H226.2v-13.6h160.2c31.1 0 42.6-21.7 53.4-54.2 11.2-33.5 10.7-65.7 0-108.6zM286.2 404c11.1 0 20.1 9.1 20.1 20.3 0 11.3-9 20.4-20.1 20.4-11 0-20.1-9.2-20.1-20.4.1-11.3 9.1-20.3 20.1-20.3zM167.8 248.1h106.8c29.7 0 53.4-24.5 53.4-54.3V91.9c0-29-24.4-50.7-53.4-55.6-35.8-5.9-74.7-5.6-106.8.1-45.2 8-53.4 24.7-53.4 55.6v40.7h106.9v13.6h-147c-31.1 0-58.3 18.7-66.8 54.2-9.8 40.7-10.2 66.1 0 108.6 7.6 31.6 25.7 54.2 56.8 54.2H101v-48.8c0-35.3 30.5-66.4 66.8-66.4zm-6.7-142.6c-11.1 0-20.1-9.1-20.1-20.3.1-11.3 9-20.4 20.1-20.4 11 0 20.1 9.2 20.1 20.4s-9 20.3-20.1 20.3z"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">Python</h3>
          <h3 class="text-center muteSmallSubheader">Flask, Django, FastAPI</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'go'"
            :class="{'border-2 dark:border-customGold' : appType === 'go'}">
          <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg"
               class="dark:fill-customGold" :class="{'fill-customGold': appType === 'go'}"
               height="4rem"
               x="0px" y="0px"
               viewBox="0 0 254.5 225" xml:space="preserve">
          <g>
            <g>
              <g>
                <g>
                  <path d="M40.2,101.1c-0.4,0-0.5-0.2-0.3-0.5l2.1-2.7c0.2-0.3,0.7-0.5,1.1-0.5l35.7,0c0.4,0,0.5,0.3,0.3,0.6l-1.7,2.6
                    c-0.2,0.3-0.7,0.6-1,0.6L40.2,101.1z"/>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <path d="M25.1,110.3c-0.4,0-0.5-0.2-0.3-0.5l2.1-2.7c0.2-0.3,0.7-0.5,1.1-0.5l45.6,0c0.4,0,0.6,0.3,0.5,0.6l-0.8,2.4
                    c-0.1,0.4-0.5,0.6-0.9,0.6L25.1,110.3z"/>
                </g>
              </g>
            </g>
            <g>
              <g>
                <g>
                  <path d="M49.3,119.5c-0.4,0-0.5-0.3-0.3-0.6l1.4-2.5c0.2-0.3,0.6-0.6,1-0.6l20,0c0.4,0,0.6,0.3,0.6,0.7l-0.2,2.4
                    c0,0.4-0.4,0.7-0.7,0.7L49.3,119.5z"/>
                </g>
              </g>
            </g>
            <g>
              <g id="CXHf1q_5_">
                <g>
                  <g>
                    <path d="M153.1,99.3c-6.3,1.6-10.6,2.8-16.8,4.4c-1.5,0.4-1.6,0.5-2.9-1c-1.5-1.7-2.6-2.8-4.7-3.8c-6.3-3.1-12.4-2.2-18.1,1.5
                      c-6.8,4.4-10.3,10.9-10.2,19c0.1,8,5.6,14.6,13.5,15.7c6.8,0.9,12.5-1.5,17-6.6c0.9-1.1,1.7-2.3,2.7-3.7c-3.6,0-8.1,0-19.3,0
                      c-2.1,0-2.6-1.3-1.9-3c1.3-3.1,3.7-8.3,5.1-10.9c0.3-0.6,1-1.6,2.5-1.6c5.1,0,23.9,0,36.4,0c-0.2,2.7-0.2,5.4-0.6,8.1
                      c-1.1,7.2-3.8,13.8-8.2,19.6c-7.2,9.5-16.6,15.4-28.5,17c-9.8,1.3-18.9-0.6-26.9-6.6c-7.4-5.6-11.6-13-12.7-22.2
                      c-1.3-10.9,1.9-20.7,8.5-29.3c7.1-9.3,16.5-15.2,28-17.3c9.4-1.7,18.4-0.6,26.5,4.9c5.3,3.5,9.1,8.3,11.6,14.1
                      C154.7,98.5,154.3,99,153.1,99.3z"/>
                  </g>
                  <g>
                    <path d="M186.2,154.6c-9.1-0.2-17.4-2.8-24.4-8.8c-5.9-5.1-9.6-11.6-10.8-19.3c-1.8-11.3,1.3-21.3,8.1-30.2
                      c7.3-9.6,16.1-14.6,28-16.7c10.2-1.8,19.8-0.8,28.5,5.1c7.9,5.4,12.8,12.7,14.1,22.3c1.7,13.5-2.2,24.5-11.5,33.9
                      c-6.6,6.7-14.7,10.9-24,12.8C191.5,154.2,188.8,154.3,186.2,154.6z M210,114.2c-0.1-1.3-0.1-2.3-0.3-3.3
                      c-1.8-9.9-10.9-15.5-20.4-13.3c-9.3,2.1-15.3,8-17.5,17.4c-1.8,7.8,2,15.7,9.2,18.9c5.5,2.4,11,2.1,16.3-0.6
                      C205.2,129.2,209.5,122.8,210,114.2z"/>
                  </g>
                </g>
              </g>
            </g>
          </g>
        </svg>
          <h3 class="text-center font-black dark:text-customGold">Go</h3>
          <h3 class="text-center muteSmallSubheader">Gin, Echo</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'c#'"
            :class="{'border-2 dark:border-customGold' : appType === 'c#'}">
          <svg
              class="dark:fill-customGold" :class="{'fill-customGold': appType === 'c#'}"
              height="4rem"
              viewBox="0 -1.428 255.582 290.108"
              xmlns="http://www.w3.org/2000/svg">
            <path
                d="m255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.76-2.052-3.603-5.125-6.622-9.247-9.009-34.025-19.619-68.083-39.178-102.097-58.817-9.17-5.294-18.061-5.1-27.163.27-13.543 7.986-81.348 46.833-101.553 58.536-8.321 4.818-12.37 12.19-12.372 21.771-.013 39.455 0 78.91-.013 118.365 0 4.724.991 8.91 2.988 12.517 2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.27 34.015-19.64 68.075-39.199 102.105-58.818 4.217-2.44 7.333-5.544 9.386-9.252 1.994-3.608 2.987-7.793 2.987-12.518 0 0 0-78.889-.013-118.345"
            />
            <path
                d="m128.182 143.241-125.194 72.084c2.053 3.711 5.169 6.813 9.386 9.254 20.206 11.703 88.02 50.547 101.56 58.536 9.106 5.373 17.997 5.565 27.17.27 34.015-19.64 68.075-39.199 102.105-58.818 4.217-2.44 7.333-5.544 9.386-9.252z"
                fill="#280068"/>
            <path
                d="m255.569 84.452c-.002-4.83-1.035-9.098-3.124-12.76l-124.263 71.55 124.413 72.073c1.994-3.608 2.985-7.793 2.987-12.518 0 0 0-78.889-.013-118.345"
                fill="#390091"/>
            <g fill="#fff">
              <path
                  d="m201.892 116.294v13.474h13.474v-13.474h6.737v13.474h13.474v6.737h-13.474v13.473h13.474v6.737h-13.474v13.474h-6.737v-13.474h-13.474v13.474h-6.737v-13.474h-13.473v-6.737h13.473v-13.473h-13.473v-6.737h13.473v-13.474zm13.474 20.21h-13.474v13.474h13.474z"/>
              <path
                  d="m128.457 48.626c35.144 0 65.827 19.086 82.262 47.456l-.16-.273-41.35 23.808c-8.146-13.793-23.08-23.102-40.213-23.294l-.54-.003c-26.125 0-47.305 21.18-47.305 47.305a47.08 47.08 0 0 0 6.239 23.47c8.154 14.235 23.483 23.836 41.067 23.836 17.693 0 33.109-9.723 41.221-24.11l-.197.345 41.287 23.918c-16.255 28.13-46.518 47.157-81.253 47.536l-1.058.006c-35.255 0-66.025-19.204-82.419-47.724-8.003-13.923-12.582-30.064-12.582-47.277 0-52.466 42.532-95 95-95z"/>
            </g>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">C#</h3>
          <h3 class="text-center muteSmallSubheader">.NET, Mono, VB</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'ruby'"
            :class="{'border-2 dark:border-customGold' : appType === 'ruby'}">
          <svg
              class="dark:fill-customGold" :class="{'fill-customGold': appType === 'ruby'}"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 395.9 139.2" height="4rem">
            <path class="st0"
                  d="M344.6 121.1v18.1h32.7c6.7 0 18.2-4.9 18.6-18.6v-7c0-11.7-9.6-18.6-18.6-18.6H361v-8.4h32.3V68.4h-31c-8 0-18.7 6.6-18.7 18.9v6.3c0 12.3 10.6 18.6 18.7 18.6 22.5.1-5.4 0 15.4 0v8.8m-208.3-4.3s17.5-1.5 17.5-24.1-21.2-24.7-21.2-24.7h-38.2v71.3h19.2V122l16.6 17.2h28.4l-22.3-22.5zm-7.4-14.6h-15.3V85.8h15.4s4.3 1.6 4.3 8.1-4.4 8.2-4.4 8.2zm72.3-33.7h-19.5c-13.9 0-18.6 12.6-18.6 18.6v52.2h19.5v-12.5H234v12.5h18.9V87c0-15.2-13.8-18.6-18.6-18.6zm-.3 38.1h-18.4V89.2s0-3.9 6.1-3.9h6.7c5.4 0 5.5 3.9 5.5 3.9v17.3h.1zM261.8 68.4h20.3v70.8h-20.3zM310.6 120.9V68.4h-20.2v70.8h47.5v-18.3z"/>
            <path class="st0"
                  d="M7 139.2h79s-15.1-68.9 34.9-96.8c10.9-5.3 45.6-25.1 102.4 16.9 1.8-1.5 3.5-2.7 3.5-2.7s-52-51.9-109.9-46.1C87.8 13.1 52 39.6 31 74.6S7 139.2 7 139.2z"/>
            <path class="st0"
                  d="M7 139.2h79s-15.1-68.9 34.9-96.8c10.9-5.3 45.6-25.1 102.4 16.9 1.8-1.5 3.5-2.7 3.5-2.7s-52-51.9-109.9-46.1C87.8 13.1 52 39.6 31 74.6S7 139.2 7 139.2z"/>
            <path class="st0"
                  d="M7 139.2h79s-15.1-68.9 34.9-96.8c10.9-5.3 45.6-25.1 102.4 16.9 1.8-1.5 3.5-2.7 3.5-2.7s-52-51.9-109.9-46.1c-29.2 2.6-65 29.1-86 64.1S7 139.2 7 139.2zM171.6 16.1l.4-6.7c-.9-.5-3.4-1.7-9.7-3.5l-.4 6.6c3.3 1.1 6.5 2.3 9.7 3.6z"/>
            <path class="st0"
                  d="M162.1 37.3l-.4 6.3c3.3.1 6.6.5 9.9 1.2l.4-6.2c-3.4-.7-6.7-1.1-9.9-1.3zm-37-31.2h1l-2-6.1c-3.1 0-6.3.2-9.6.6l1.9 5.9c2.9-.3 5.8-.4 8.7-.4zm4.8 36.8l2.3 6.9c2.9-1.4 5.8-2.6 8.7-3.5l-2.2-6.6c-3.4 1-6.3 2.1-8.8 3.2zM84.5 16.6L80 9.7c-2.5 1.3-5.1 2.7-7.8 4.3l4.6 7c2.6-1.6 5.1-3.1 7.7-4.4zm20.5 45l4.8 7.2c1.7-2.5 3.7-4.8 5.9-7.1l-4.5-6.8c-2.3 2.1-4.4 4.4-6.2 6.7zM90.5 93.8l8.1 6.4c.4-3.9 1.1-7.8 2.1-11.7l-7.2-5.7c-1.3 3.7-2.2 7.4-3 11zM46.7 46.3l-7.1-6.2c-2.6 2.5-5.1 5-7.4 7.5l7.7 6.6c2.1-2.7 4.4-5.4 6.8-7.9zM16.5 91L5 86.8c-1.9 4.3-4 9.3-5 12l11.5 4.2c1.3-3.4 3.4-8.3 5-12zM89 119.2c.2 5.3.7 9.6 1.2 12.6l12 4.3c-.9-3.9-1.8-8.3-2.4-13L89 119.2z"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">Ruby On Rails</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'perl'"
            :class="{'border-2 dark:border-customGold' : appType === 'perl'}">
          <svg
              class="dark:fill-customGold" :class="{'fill-customGold': appType === 'perl'}"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43.17 48.65" height="4rem">
            <path
                d="M28 25.93a69.79 69.79 0 0 1 .86 7.53 7.42 7.42 0 0 1-1.31 4.41c-.21.75-.84 0-1.29 0-1.11 0-1.52-1.2-2.12-1.94s-.17-1.41.23-2c.43-.31.6-1 1.22-1s.54-.85.45-1.3c.41-.63.16-1.56.56-2.25.72-.32.51-1.44.76-2.07.2-.45 0-1.31.57-1.5 0 0 .07 0 .06.1M27.3.23c-.94-.11-1.65.53-2.44.89a18 18 0 0 1-2 .54c-.49 1-1.62 1.59-2.23 2.53a10 10 0 0 1-3.34 4.72c-2.22 1.15-3.34 3.65-4.07 6-.25.53-.21 1.31-.48 1.76-.88.25-.41-.9-.51-1.45-.13-.82.59-1.35.64-2.15a3.29 3.29 0 0 0 .36-1.85c-.1-1.43.33-3.17-.68-4.34-.6-.35-.41-1.09-.63-1.66a7.27 7.27 0 0 0-2.23-2c-.72-.07-1.38-1-2.12-.57-.46.54-1.31.53-1.58 1.25-.17.9-1.18.66-1.84.88-.84.33-1.92 0-2.61.67S-.28 7.1.06 8.23C.85 9.78 2.89 9 4 9.94A32 32 0 0 1 2.79 13a18.06 18.06 0 0 0-.08 4.09c.21 1.36-.14 3.11 1 4.07.65.24.61 1 .86 1.56s.73-.2.93.34c.58.32.06 1 .38 1.4a2.76 2.76 0 0 1 1.41.75A11.82 11.82 0 0 1 9 26.66c.4.82.91-.8 1.35-.19a1 1 0 0 0 1.41.5A5.1 5.1 0 0 0 14 26c.43 1.53.1 3.19.29 4.77a20.89 20.89 0 0 1 .5 3.51 16.86 16.86 0 0 1 .52 3.56 12.7 12.7 0 0 1-1.22 7.29 1.76 1.76 0 0 1-1.39 1.4c-.5.23-1.54.64-1.19 1.36 1.16 1 3 .89 4.33.38.88-.43.12-1.5.57-2.15.59-2.28.3-4.72 1-7a6.72 6.72 0 0 0 .59-3.69c.14-.77-.18-1.7.32-2.33a3.21 3.21 0 0 1 .81-2.1 26.44 26.44 0 0 0 .25-3.55 5.45 5.45 0 0 1 2.18-.22c0 .66-.47 1.42-.33 2.16a3.48 3.48 0 0 1-.45 2.41c-.31 1.3-.52 2.9.29 4 1.34 1.47 3.09 2.51 4.36 4.08a.92.92 0 0 1 .06 1.38 2.66 2.66 0 0 1-1.7 1.81c-.53.21-1.38 1-.76 1.55a6.61 6.61 0 0 0 3.75-.25c.82-.3.52-1.29.84-1.91a19.74 19.74 0 0 1 1.22 1.87c.51.76 1.39.13 2-.11a6.3 6.3 0 0 0-.65-3.22c-.28-.66-1.37-.68-1.32-1.49.54-2 1.88-3.56 2.94-5.25.88-.84.22-2.09.27-3.15a12 12 0 0 1 1.87-7.76 28.15 28.15 0 0 0 1.19 3.75A11 11 0 0 0 37 31.06c.41 1.42.3 3 .57 4.47a18.66 18.66 0 0 1-.42 7.62c.07.91-.79 1.58-.71 2.47.24.82 1.2.16 1.7.51a1.9 1.9 0 0 0 2.28-1A11.21 11.21 0 0 1 40 43a13.31 13.31 0 0 1-.44-6.52c.08-1.18.79-2.62-.13-3.63-.25-1.08.18-2.25-.08-3.36a23 23 0 0 1-.21-8.65c.16-.4 0-1.14.43-1.36a3.29 3.29 0 0 1 .54 2.16 6.61 6.61 0 0 1 .14 3.65c-.73.93-.28 2.19-.19 3.24.12.74.89.21 1-.25a20.93 20.93 0 0 0 1.62-3.93c.46-.62 0-1.35 0-2 .71-.09.44-.89.06-1.24-.38-1.28-.29-2.76-1.15-3.85a18.44 18.44 0 0 1-3.34-4.78c-.91-2.87-3.51-4.78-4.39-7.68A6.23 6.23 0 0 0 31.07.73a13.24 13.24 0 0 0-2-.73 10.88 10.88 0 0 1-1.77.22"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">Perl</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'html&css'"
            :class="{'border-2 dark:border-customGold' : appType === 'html&css'}">
          <svg
              class="dark:fill-customGold" :class="{'fill-customGold': appType === 'html&css'}" height="4rem"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
                d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.3h-1.1l-98.7-27.3-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">Plain HTML & CSS</h3>
        </section>
        <section
            class="hostingConfigureAppCard" @click="appType = 'undecided'"
            :class="{'border-2 dark:border-customGold' : appType === 'undecided'}">
          <svg
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="dark:fill-customGold"
              :class="{'fill-customGold': appType === 'undecided'}" height="4rem">
            <path
                d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"/>
          </svg>
          <h3 class="text-center font-black dark:text-customGold">I haven't decided yet</h3>
        </section>
      </div>
      <transition name="slowFade">
        <button @click="currentStep = 2" class="btn-base mt-3" v-show="appType !== ''">Choose Hosting Panel</button>
      </transition>
    </section>
  </transition>

  <!--  STEP 2-->
  <transition name="fade">
    <section v-if="currentStep === 2">
      <div class="grid md:grid-cols-2 md:w-1/2 mx-auto mb-10">
        <section
            class="hostingConfigureAppCard" @click="preferredPanel = 'cpanel'"
            :class="{'border-2 dark:border-customGold' : preferredPanel === 'cpanel'}">
          <svg
              height="10rem"
              class="dark:fill-customGold"
              :class="{'fill-customGold': preferredPanel === 'cpanel'}"
              xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path
                d="M210.3 220.2c-5.6-24.8-26.9-41.2-51-41.2h-37c-7.1 0-12.5 4.5-14.3 10.9L73.1 320l24.7-.1c6.8 0 12.3-4.5 14.2-10.7l25.8-95.7h19.8c8.4 0 16.2 5.6 18.3 14.8 2.5 10.9-5.9 22.6-18.3 22.6h-10.3c-7 0-12.5 4.6-14.3 10.8l-6.4 23.8h32c37.2 0 58.3-36.2 51.7-65.3zm-156.5 28h18.6c6.9 0 12.4-4.4 14.3-10.9l6.2-23.6h-40C30 213.7 9 227.8 1.7 254.8-7 288.6 18.5 320 52 320h12.4l7.1-26.1c1.2-4.4-2.2-8.3-6.4-8.3H53.8c-24.7 0-24.9-37.4 0-37.4zm247.5-34.8h-77.9l-3.5 13.4c-2.4 9.6 4.5 18.5 14.2 18.5h57.5c4 0 2.4 4.3 2.1 5.3l-8.6 31.8c-.4 1.4-.9 5.3-5.5 5.3h-34.9c-5.3 0-5.3-7.9 0-7.9h21.6c6.8 0 12.3-4.6 14.2-10.8l3.5-13.2h-48.4c-39.2 0-43.6 63.8-.7 63.8l57.5.2c11.2 0 20.6-7.2 23.4-17.8l14-51.8c4.8-19.2-9.7-36.8-28.5-36.8zM633.1 179h-18.9c-4.9 0-9.2 3.2-10.4 7.9L568.2 320c20.7 0 39.8-13.8 44.9-34.5l26.5-98.2c1.2-4.3-2-8.3-6.5-8.3zm-236.3 34.7v.1h-48.3l-26.2 98c-1.2 4.4 2.2 8.3 6.4 8.3h18.9c4.8 0 9.2-3 10.4-7.8l17.2-64H395c12.5 0 21.4 11.8 18.1 23.4l-10.6 40c-1.2 4.3 1.9 8.3 6.4 8.3H428c4.6 0 9.1-2.9 10.3-7.8l8.8-33.1c9-33.1-15.9-65.4-50.3-65.4zm98.3 74.6c-3.6 0-6-3.4-5.1-6.7l8-30c.9-3.9 3.7-6 7.8-6h32.9c2.6 0 4.6 2.4 3.9 5.1l-.7 2.6c-.6 2-1.9 3-3.9 3h-21.6c-7 0-12.6 4.6-14.2 10.8l-3.5 13h53.4c10.5 0 20.3-6.6 23.2-17.6l3.2-12c4.9-19.1-9.3-36.8-28.3-36.8h-47.3c-17.9 0-33.8 12-38.6 29.6l-10.8 40c-5 17.7 8.3 36.7 28.3 36.7h66.7c6.8 0 12.3-4.5 14.2-10.7l5.7-21z"/>
          </svg>
          <h2 class="header">CPanel</h2>
        </section>
        <section
            class="hostingConfigureAppCard" @click="preferredPanel = 'plesk'"
            :class="{'border-2 dark:border-customGold' : preferredPanel === 'plesk'}">
          <svg
              class="dark:fill-customGold"
              :class="{'fill-customGold': preferredPanel === 'plesk'}"
              height="10rem" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px" y="0px"
              viewBox="0 0 500 500" xml:space="preserve">

<!--            <rect class="st0" width="500" height="500"/>-->
            <g>
              <path d="M53.3,336.9H40.6v-133c10.1-3.2,20.7-4.9,31.4-5c6.9-0.1,13.8,1.1,20.3,3.5c5.8,2.1,11.2,5.4,15.7,9.7
                c4.4,4.2,7.8,9.2,10,14.9c2.4,5.9,3.5,12.3,3.5,18.7c0,8.2-1.4,15.2-4.2,21.1c-2.6,5.6-6.4,10.5-11.1,14.5
                c-4.6,3.8-9.9,6.6-15.7,8.3c-5.8,1.8-11.9,2.7-18,2.7c-3.3,0-6.5-0.2-9.7-0.7s-6.4-1.2-9.5-2L53.3,336.9z M107,245.4
                c0-10.6-3-19.2-8.9-25.8c-5.9-6.5-14.3-9.8-25-9.8c-3.4,0-6.7,0.2-10.1,0.6c-3.3,0.4-6.6,1.2-9.7,2.3v64.9c3,1,6,1.8,9.1,2.5
                c3,0.7,6,1,9.1,1c10.9,0,19.5-3.1,25.9-9.3C103.8,265.7,107,256.9,107,245.4z"/>
              <path d="M147.1,291.4V163.1h12.8v128.2h-12.8V291.4z"/>
              <path d="M264.8,278c-4.1,4.5-9.2,8.1-14.8,10.5s-12.4,3.6-20.3,3.6c-6.6,0.1-13.2-1.1-19.3-3.8c-5.3-2.3-10-5.8-13.7-10.2
                c-3.7-4.3-6.5-9.3-8.2-14.7c-1.9-5.6-2.8-11.5-2.8-17.4c-0.2-7.1,1-14.3,3.3-21c1.9-5.5,5-10.5,9-14.8c3.7-3.8,8.2-6.8,13.2-8.7
                c5.1-1.9,10.5-2.8,15.9-2.8c13.4,0,23.6,4.1,30.4,12.4c6.8,8.2,10.1,20.2,9.9,36h-68.7c0.4,10.4,3.4,18.6,9,24.7s13.3,9.2,22.9,9.2
                c5,0.1,10-0.8,14.7-2.7c4.6-1.9,8.6-4.8,11.9-8.5L264.8,278z M254.5,236.4c0-3.6-0.6-7.2-1.7-10.6c-1.1-3.1-2.7-6-4.9-8.4
                c-2.3-2.5-5.2-4.4-8.3-5.6c-7.7-2.8-16.2-2.8-23.9,0c-3,1.2-5.8,3-8,5.4c-2.2,2.5-4,5.3-5.4,8.3c-1.7,3.4-2.7,7.1-3.2,10.9
                L254.5,236.4L254.5,236.4z"/>
              <path d="M351.3,221.4c-2.8-3.7-6.3-6.7-10.4-8.9c-4.1-2-8.7-3-13.2-2.8c-6.5,0-11.1,1.2-13.7,3.5c-2.6,2.2-4,5.4-3.9,8.8
                c-0.1,2.2,0.6,4.4,1.8,6.2c1.3,1.8,2.9,3.3,4.8,4.4c2.2,1.3,4.5,2.4,6.9,3.2c2.6,0.9,5.3,1.8,8.2,2.7c3.5,1.1,6.9,2.3,10.4,3.6
                c3.4,1.2,6.6,2.9,9.5,5c2.8,2,5.2,4.6,7,7.6c1.9,3.4,2.8,7.3,2.7,11.3c0.1,3.9-0.9,7.7-2.7,11.2c-1.8,3.3-4.3,6.1-7.3,8.3
                c-3.3,2.4-7,4.1-10.9,5.1c-10.8,2.8-22.3,2.2-32.7-1.8c-6.1-2.7-11.6-6.8-15.9-11.8l10-8.8c6.7,8.6,15.3,12.8,25.9,12.8
                c6.9,0,12-1.3,15.4-3.9c3.3-2.6,5-5.7,5-9.3c0.1-2.5-0.5-4.9-1.8-7.1c-1.3-2-3-3.6-5-4.9c-2.3-1.4-4.7-2.6-7.3-3.4
                c-2.8-0.9-5.7-1.8-8.7-2.7c-3.5-1-6.9-2.1-10.3-3.3c-3.2-1.1-6.3-2.7-9.1-4.7c-2.7-1.9-5-4.4-6.6-7.2c-1.8-3.4-2.7-7.3-2.6-11.2
                c0-8.1,2.9-14.3,8.8-18.7s13.5-6.6,22.9-6.6c6.1-0.1,12.1,1.1,17.7,3.4c5.2,2.2,10.1,6.1,14.9,11.6l-9.4,8.6L351.3,221.4z"/>
              <path d="M385.3,291.4V163.3h12.8v128.1L385.3,291.4L385.3,291.4z M398.2,244.1l44-44.4h17.2l-45.1,44l44.9,47.6h-17.8L398.2,244.1z
                "/>
              <path class="st1" d="M191.7,336.9h-77.2v-12.1h77.2V336.9z"/>
            </g>
            </svg>
          <h2 class="header">Plesk</h2>
        </section>
      </div>


      <!--DOMAIN CONFIG TAB SELECTORS      -->
      <section class="w-3/4 mx-auto" v-if="preferredPanel !== ''">
        <ol class="lg:flex items-center w-full space-y-4 lg:space-x-8 lg:space-y-0">
          <li
              class="flex-1 cursor-pointer"
              v-for="(step, idx) in domainSteps"
              :key="idx"
              @click="currentDomainStep = idx + 1"
          >
            <a
                :class="{
          'border-customGold text-customGold font-semibold': (idx + 1) === currentDomainStep,
          'border-gray-200 text-gray-500': (idx + 1) !== currentDomainStep
        }"
                class="border-l-2 flex flex-col border-t-0 pl-4 pt-0 border-solid lg:pt-4 lg:border-t-2 lg:border-l-0 lg:pl-0"
            >
              <h4 class="text-base lg:text-lg">{{ step.label }}</h4>
            </a>
          </li>
        </ol>
      </section>


      <!--      DOMAIN CONFIG-->
      <section v-if="preferredPanel !== ''">
        <transition name="fade">
          <section v-if="currentDomainStep === 1" class="h-[20vh] w-3/4 mx-auto mt-5">
            <form>
              <div class="">
                <label class="muteSmallSubheader" for="domain">
                  Domain name
                </label>
                <div class="mt-1 flex items-center">
                  <input
                      v-model="domain"
                      type="text"
                      class="appearance-none block md:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-customGold focus:border-customGold sm:text-sm dark:text-gray-100"
                  />
                  <button class="btn-base ml-2" @click.prevent="checkDomain">Check</button>

                </div>
              </div>
            </form>
          </section>
        </transition>


        <transition name="fade">
          <!--      DOMAIN CONFIG-->
          <section v-if="currentDomainStep === 2" class="h-[20vh] w-3/4 mx-auto mt-5">
            <form>
              <div class="">
                <label class="muteSmallSubheader" for="domain">
                  Domain name
                </label>
                <div class="mt-1 flex items-center">
                  <input
                      v-model="domain"
                      type="text"
                      class="appearance-none block w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-customGold focus:border-customGold sm:text-sm"
                  />
                  <button class="btn-base ml-2">Check</button>
                </div>
              </div>
            </form>
          </section>
        </transition>

        <transition name="slowFade">
          <router-link to="/cart">
            <button class="btn-base mt-3" v-show="domainChecked">Review & Finish</button>
          </router-link>
        </transition>
      </section>
      <button @click="currentStep = 1; preferredPanel = ''" class="btn-base mt-3 mr-3">Go back</button>
    </section>
  </transition>

</template>

<style scoped>

</style>
