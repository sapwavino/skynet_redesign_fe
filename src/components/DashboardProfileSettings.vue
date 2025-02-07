<script>
import countries from "@/utils/countries.js";

export default {
  name: "DashboardProfileSettings",
  data() {
    return {
      tabs: ['personal', 'change password', 'api key', 'currency'],
      activeTab: 'personal',
      date: null,
      options: ['Male', 'Female', 'Other'],
      selectedOption: '',
      isOpen: false,
      selectedCountryCode: '+234',
      countries,
      apiKey: '5x2k3kjss9232bh2hr9bd09qll2398sds',
      isHidden: true,
    }
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
    },
    toggleVisibility() {
      this.isHidden = !this.isHidden;
    },
    async generateAPIKey() {
      try {
        const response = await fetch("/api/generate-key", {method: "POST"});
        const data = await response.json();
        this.apiKey = data.api_key;
      } catch (error) {
        console.error("Error generating API key:", error);
      }
    }
  }
}
</script>

<template>
  <div class="">
    <div class="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
      <h1 class="header uppercase border-b pb-6 text-4xl font-semibold">Settings</h1>
      <div class="grid grid-cols-8 pt-3 sm:grid-cols-10">
        <!--        NAV DROPDOWN-->
        <div class="relative my-4 w-56 sm:hidden">
          <input class="peer hidden" type="checkbox" name="select-1" id="select-1"/>
          <label for="select-1"
                 class="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Accounts </label>
          <svg xmlns="http://www.w3.org/2000/svg"
               class="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
               fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
          </svg>
          <ul class="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
            <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Accounts</li>
            <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
            <li class="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
          </ul>
        </div>

        <div class="col-span-2 hidden sm:block">
          <ul>
            <li
                class="mt-5 cursor-pointer border-l-2 border-transparent px-2 py-2 font-semibold transition hover:border-l-customGold capitalize transition hover:text-customGold text-gray-600"
                v-for="(tab, idx) in tabs"
                :key="idx"
                :class="{
                  'text-yellow-500 border-l-2 border-l-customGold hover:border-gray-800 dark:text-customGold' : activeTab === tab,
                }"
                @click="activeTab = tab"
            >
              {{ tab }}
            </li>
          </ul>
        </div>

        <!--        PERSONAL-->
        <div
            class="col-span-8 overflow-hidden rounded-3xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-900"
            v-if="activeTab === 'personal'">
          <div class="pt-4">
            <h1 class="py-2 text-2xl font-semibold muteSubheader">Personal settings</h1>
            <p class="muteSubheader">View and update your personal details here.</p>
            <form class="relative p-5 mx-auto rounded-md bg-white dark:bg-gray-500 mt-5 w-full">

              <div class="grid gap-3 md:grid-cols-2">
                <div>
                  <label class=""> First Name </label>
                  <input type="text" placeholder="Your Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"/>
                </div>
                <div>
                  <label class=""> Last Name </label>
                  <input type="text" placeholder="Last  Name" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"/>
                </div>
              </div>
              <div class="flex items-center justify-between my-3">
                <div class="w-1/3">
                  <div>
                    <label class="block text-sm font-medium text-gray-700"> Gender </label>
                    <div class="relative w-56 mt-2 bg-gray-100 rounded-lg">
                      <button
                          type="button"
                          @click="isOpen = !isOpen"
                          class="flex w-full items-center justify-between rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-400 focus:outline-none"
                      >
                        {{ selectedOption || 'Select Option' }}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 text-gray-600 transition-transform duration-200"
                            :class="{ 'rotate-180': isOpen }"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </button>
                      <ul
                          v-show="isOpen"
                          class="absolute z-10 mt-1 w-full rounded-b-lg bg-white shadow-md transition-all duration-300"
                      >
                        <li
                            v-for="option in options"
                            :key="option"
                            @click="selectOption(option)"
                            class="cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-blue-500 hover:text-white"
                        >
                          {{ option }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="w-1/2">
                  <label class=""> Email Address </label>
                  <input type="email" placeholder="Info@example.com"
                         class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"/>
                </div>
              </div>
              <div class="flex items-center justify-between mb-3">
                <div class="w-1/3">
                  <label class=""> Birth Date </label>
                  <VueDatePicker v-model="date"></VueDatePicker>
                </div>
                <div class="w-1/2">
                  <label class=""> Password </label>
                  <input type="password" placeholder="******" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"/>
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="">
                  <label class="capitalize"> Phone country code</label>
                  <select id="country"
                          class="h-12 border-2 border-customGold dark:text-gray-300 rounded-2xl block py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center w-3/4"
                          v-model="selectedCountryCode">
                    <option v-for="(country, idx) in countries" :key="idx" :value="country.calling_code">{{
                        country.flag
                      }}
                      {{ country.name }} - ({{ country.calling_code }})
                    </option>
                  </select>
                </div>
                <div class="w-1/2">
                  <label class=""> Phone: <span class="text-sm text-gray-400">(optional)</span> </label>
                  <input type="text" placeholder="+543 5445 0543" class="mt-2 h-12 w-full rounded-md bg-gray-100 px-3"/>
                </div>
              </div>

              <div>
                <button type="button" class="btn-base mt-5 w-1/3">Update Profile</button>
              </div>
            </form>

          </div>
          <hr class="mt-4 mb-8"/>
          <div class="mb-10">
            <p class="font-black text-red-500 text-2xl flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"/>
              </svg>
              Danger Zone
            </p>
            <p class="py-2 text-xl font-semibold muteSubheader">Delete Account</p>
            <p class="mt-2 muteSmallSubheader">Make sure you have taken backup of your account in case you ever need to get access to your
              data. We will completely wipe your data. There is no way to access your account after this action.</p>
            <button class="ml-auto text-sm font-semibold text-rose-600 underline decoration-2">Continue with deletion
            </button>
          </div>
        </div>

        <!--        PASSWORD-->
        <div
            class="col-span-8 overflow-hidden rounded-3xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-900 dark:text-gray-500 p-5"
            v-if="activeTab === 'change password'">
          <p class="py-2 text-xl font-semibold">Password</p>
          <div class="flex items-center">
            <div class="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
              <label for="login-password">
                <span class="text-sm text-gray-500">Current Password</span>
                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input type="password" id="login-password"
                         class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                         placeholder="***********"/>
                </div>
              </label>
              <label for="login-password">
                <span class="text-sm text-gray-500">New Password</span>
                <div class="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                  <input type="password" id="login-password"
                         class="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                         placeholder="***********"/>
                </div>
              </label>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
            </svg>
          </div>
          <p class="mt-2">Can't remember your current password. <a
              class="text-sm font-semibold text-blue-600 underline decoration-2" href="#">Recover Account</a></p>
          <button class="mt-4 rounded-lg btn-base px-4 py-2 text-white">Save Password</button>
          <hr class="mt-4 mb-8"/>
        </div>


        <!-- API KEY        -->
        <div
            class="mx-auto p-6 bg-white shadow-lg rounded-2xl col-span-8 overflow-hidden rounded-3xl sm:bg-gray-50 sm:px-8 sm:shadow dark:bg-gray-900 w-full dark:text-gray-500 py-5"
            v-if="activeTab === 'api key'">
          <label for="api-key" class="block text-lg font-semibold mb-2">API Key</label>

          <div class="relative">
            <input
                :type="isHidden ? 'password' : 'text'"
                id="api-key"
                v-model="apiKey"
                class="w-full p-3 border-2 border-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 rounded-2xl"
                readonly
            />
            <button
                @click="toggleVisibility"
                class="absolute inset-y-0 right-3 flex items-center text-xl cursor-pointer"
            >
              {{ isHidden ? '👁️' : '❌' }}
            </button>
          </div>

          <button
              @click="generateApiKey"
              class="mt-4 w-1/4 mx-auto btn-base transition"
          >
            Generate API Key
          </button>
        </div>


      </div>
    </div>

  </div>
</template>

<style scoped>

</style>