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
      selectedCountry: 'Nigeria',
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
        }
        else {
          this.error = 'Invalid credentials'
        }
      }, 1000)
    }
  }
}
</script>

<template>
  <div class="mt-5">
    <form class="dark:bg-gray-400 md:shadow-2xl rounded-3xl flex flex-col items-center justify-center mx-auto md:w-1/3 p-10"
          @submit.prevent="login"
    >
      <h2 class="header text-center">Sign Up</h2>
      <h2 class="muteSmallSubheader text-center mb-5">Join 1000+ website & app owners</h2>

      <!--      FIELDS-->
      <div class="flex md:flex-row flex-col items-center gap-x-1.5  w-full">
        <div class="flex flex-col w-full">
          <label class="muteSubheader mb-1 text-center">First Name</label>
          <input v-model="firstName"
                 class="text-input-base rounded-2xl px-3.5 py-2 mb-5 text-center"
                 placeholder="Sky"
                 type="text"
          />
        </div>

        <div class="flex flex-col w-full">

          <label class="muteSubheader mb-1 text-center">Last Name</label>
          <input v-model="lastName"
                 class="text-input-base rounded-2xl px-3.5 py-2 mb-5 text-center"
                 placeholder="Net"
                 type="text"
          />
        </div>
      </div>

      <label class="muteSubheader mb-1">Email</label>
      <input v-model="email"
             class="text-input-base rounded-2xl px-3.5 py-2 w-full md:w-3/4 mb-5 text-center"
             placeholder="you@yourwebsite.com"
             type="email"
      />

      <label class="muteSubheader mb-1">Address</label>
      <input v-model="address"
             class="text-input-base rounded-2xl px-3.5 py-2 w-full md:w-3/4 mb-5 text-center"
             placeholder="123, Skynet Street, Earth"
             type="text"
      />

      <!--COUNTRY DROPDOWN-->
      <label class="muteSubheader mb-1">Country</label>
      <div class="block mb-5">
        <select id="country"
                v-model="selectedCountry"
                class="h-12 border border-customGold dark:text-gray-300 text-base rounded-2xl block w-full md:w-3/4 mx-auto py-2.5 px-4 focus:outline-none font-bold cursor-pointer text-center"
        >
          <option value="none">-Select your country-</option>
          <hr />
          <option v-for="(country, idx) in countries"
                  :key="idx"
                  :value="country.name"
          >{{ country.flag }} {{
              country.name
           }}
          </option>
        </select>
      </div>


      <label class="muteSubheader mb-1">Phone</label>
      <input v-model="phone"
             class="text-input-base rounded-2xl px-3.5 py-2 w-full md:w-3/4 mb-5 text-center"
             placeholder="+123456789"
             type="tel"
      />

      <label class="muteSubheader mb-1">Password</label>
      <input v-model="password"
             class="text-input-base rounded-2xl px-3.5 py-2 w-full md:w-3/4 mb-3 text-center"
             placeholder="Password"
             type="password"
      />

      <label class="muteSubheader mb-1">Confirm Password</label>
      <input v-model="password2"
             class="text-input-base rounded-2xl px-3.5 py-2 w-full md:w-3/4 mb-8 text-center"
             placeholder="Password again"
             type="password"
      />

      <small>By creating your account, you agree to our <span><router-link class="font-bold underline underline-offset-2"
                                                                           to="/policies?tab=tos"
      >terms and conditions</router-link></span> </small>

      <router-link to="/auth/login">
        <button class="resultListAddBtn mt-5"
                type="submit"
        >Create Account
        </button>
      </router-link>

      <p class="text-sm text-gray-600 mt-5">Already have an account?
        <router-link class="underline font-medium italic"
                     to="/auth/login"
        >Log in
        </router-link>
      </p>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>