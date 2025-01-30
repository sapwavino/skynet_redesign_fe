<script>
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
  <div class="h-[78vh]">

    <h2 class="header text-center my-5">Welcome back</h2>

    <form @submit.prevent="login"
          class="dark:bg-gray-400 shadow-2xl rounded-3xl flex flex-col items-center justify-center mx-auto w-1/3 p-10">
      <h2 class="header text-center mb-5">Log in</h2>
      <label class="muteSubheader mb-1">Email</label>
      <input type="email" v-model="email" placeholder="you@yourwebsite.com"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-8 text-center"/>
      <label class="muteSubheader mb-1">Password</label>
      <input type="password" v-model="password" placeholder="Password"
             class="text-input-base rounded-2xl px-3.5 py-2 w-3/4 mb-3 text-center"/>
      <p class="text-sm text-gray-600"><a href="#" class="underline">Forgot your password? </a></p>
      <button type="submit" class="resultListAddBtn mt-5">Login</button>
      <p class="text-sm text-gray-600 mt-5">Don't have an account? <a href="#" class="underline font-medium italic">Sign up</a></p>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>