<script>
import countries from '@/utils/countries.js'
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      error: '',
      countries,
      selectedCountry: 'none',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',

    }
  },
  methods: {
    login() {
      // Simulate a login request
      setTimeout(() => {
        if (this.username === 'admin' && this.password === 'password') {
          this.$router.push('/dashboard')
        } else {
          this.error = 'Invalid credentials'
        }
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <form @submit.prevent="login"
          class="dark:bg-gray-400 md:shadow-2xl rounded-3xl flex flex-col items-center justify-center mx-auto md:w-1/3 p-10">
      <h2 class="header text-center">Sign Up</h2>
      <h2 class="muteSmallSubheader text-center mb-5">Join 1000+ website & app owners</h2>

      <!--      FIELDS-->
      <div class="flex md:flex-row flex-col items-center gap-x-1.5">
        <div class="flex flex-col">
          <label class="muteSubheader mb-1">First Name</label>
          <input type="text" v-model="firstName" placeholder="Sky"
                 class="text-input-base rounded-2xl px-3.5 py-2 mb-5 text-center"/>
        </div>

        <div class="flex flex-col">

          <label class="muteSubheader mb-1">Last Name</label>
          <input type="text" v-model="lastName" placeholder="Net"
                 class="text-input-base rounded-2xl px-3.5 py-2 mb-5 text-center"/>
        </div>
      </div>

      <label class="muteSubheader mb-1">Email</label>
      <input type="email" v-model="email" placeholder="you@yourwebsite.com"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-5 text-center"/>

      <label class="muteSubheader mb-1">Address</label>
      <input type="text" v-model="address" placeholder="123, Skynet Street, Earth"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-5 text-center"/>

      <!--COUNTRY DROPDOWN-->
      <label class="muteSubheader mb-1">Country</label>
      <div class="block w-full mb-5">
        <select id="country"
                class="h-12 border border-customGold dark:text-gray-300 text-base rounded-2xl block w-3/4 mx-auto py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center"
                v-model="selectedCountry">
          <option value="none">-Select your country-</option>
          <option v-for="(country, idx) in countries" :key="idx" :value="country.name">{{ country.flag }} {{
              country.name
            }}
          </option>
        </select>
      </div>


      <label class="muteSubheader mb-1">Phone</label>
      <input type="tel" v-model="phone" placeholder="+123456789"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-5 text-center"/>

      <label class="muteSubheader mb-1">Password</label>
      <input type="password" v-model="password" placeholder="Password"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-3 text-center"/>

      <label class="muteSubheader mb-1">Confirm Password</label>
      <input type="password" v-model="password2" placeholder="Password again"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-8 text-center"/>

      <button type="submit" class="resultListAddBtn mt-5">Create Account</button>

      <p class="text-sm text-gray-600 mt-5">Already have an account? <a href="/auth/login" class="underline font-medium italic">Log in</a></p>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>