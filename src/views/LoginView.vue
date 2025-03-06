<script>
import {createToast} from 'mosha-vue-toastify';
import 'mosha-vue-toastify/dist/style.css'

export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    login() {
      // Check if email matches a valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        createToast(
            `Please enter a valid email address.`,
            {
              duration: 2000,
              type: 'danger',
            }
        )
        return;
      }
      // Check if password is at least 8 characters long and contains at least one uppercase letter, one lowercase letter, one number, and one special character
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!this.email || !this.password) {
        createToast(
            `Please enter valid credentials.`,
            {
              duration: 2000,
              type: 'danger',
            }
        )
        return;
      }
      // Simulate a login request
      this.$store.dispatch('login')
      this.$router.push('/dashboard')
      // setTimeout(() => {
      //   if (this.username === 'admin' && this.password === 'password') {
      //     this.$store.dispatch('login')
      //     this.$router.push('/dashboard')
      //   } else {
      //     this.error = 'Invalid credentials'
      //   }
      // }, 1000)
    }
  }
}
</script>

<template>
  <div class="min-h-[83vh]">
    <form class="dark:bg-gray-400 shadow-2xl rounded-3xl flex flex-col items-center justify-center mx-auto md:w-1/3 p-10 my-5"
          @submit.prevent="login"
    >
      <h2 class="header text-center mb-5">Log in</h2>
      <label class="muteSubheader mb-1">Email</label>
      <input
          v-model="email"
          class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-8 text-center"
          placeholder="you@yourwebsite.com"
          required
          type="email"
      />
      <label class="muteSubheader mb-1">Password</label>
      <input v-model="password"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-3 text-center"
             placeholder="Password"
             type="password"
      />
      <p class="text-sm text-gray-600"><a class="underline"
                                          href="#"
      >Forgot your password? </a></p>
      <button class="resultListAddBtn mt-5"
              type="submit"
              @click.prevent="login"
      >Login
      </button>
      <p class="text-sm text-gray-600 mt-5">Don't have an account? <a class="underline font-medium italic"
                                                                      href="/auth/signup"
      >Sign up</a></p>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>