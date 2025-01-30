<script>
export default {
  name: "Login",
  data(){
    return {
      username: '',
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
  <div>
    <form @submit.prevent="login">
      <input type="text" v-model="username" placeholder="Username" />
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<style scoped>

</style>