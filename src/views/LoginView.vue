<script>
import {createToast} from "mosha-vue-toastify";
import {mapActions} from "vuex";
import "mosha-vue-toastify/dist/style.css";


export default {
  name: "Login",
  components: {},
  data() {
    return {
      email: "",
      password: "",
      error: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      loginAction: "auth/login",
      startLoading: "startLoading",
      stopLoading: "stopLoading",
    }),
    async login() {
      // Check if email matches a valid email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        createToast(`Please enter a valid email address.`, {
          duration: 2000,
          type: "danger",
          position: "bottom-right",
          showIcon: true
        });
        return;
      }
      // Check if password is at least 8 characters long and contains at least one uppercase letter, one lowercase
      // letter, one number, and one special character
      const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!this.email || !this.password) {
        createToast(`Please enter valid credentials.`, {
          duration: 2000,
          type: "danger",
          position: "bottom-right",
        });
        return;
      }
      try {
        this.loading = true;
        await this.startLoading();
        await this.loginAction({
          email: this.email,
          password: this.password,
        });

        this.$router.push("/dashboard");
      } catch (error) {
        console.log("error is")
        console.error(error);
        this.error =
            error.response?.data?.message || "Login failed. Please try again.";
        createToast(this.error, {
          duration: 2000,
          type: "danger",
          position: "bottom-right",
        });
      } finally {
        this.loading = false;
        await this.stopLoading();
      }
    },
  },
};
</script>

<template>
  <div
      class="min-h-screen py-8 px-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-slate-900"
  >
    <form
        class="max-w-2xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 space-y-8 border border-customGold/20"
        @submit.prevent="login"
    >
      <!-- Header Section -->
      <div class="text-center space-y-2">
        <h2 class="text-3xl md:text-4xl font-bold text-customGold">
          Welcome Back
        </h2>
        <p class="text-gray-600 dark:text-gray-300">Log in to your account</p>
      </div>

      <!-- Email Field -->
      <div class="space-y-2">
        <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Email
        </label>
        <input
            v-model="email"
            autofocus
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-customGold focus:border-0"
            name="email"
            placeholder="you@example.com"
            required
            type="email"
        />
      </div>

      <!-- Password Field -->
      <div class="space-y-2">
        <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Password
        </label>
        <input
            v-model="password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-customGold focus:border-0"
            name="password"
            placeholder="••••••••••••••••"
            type="password"
        />
      </div>

      <!-- Forgot Password -->
      <div class="text-right">
        <a
            class="text-sm text-customGold hover:text-customGold/80 font-medium"
            href="#"
        >
          Forgot your password?
        </a>
      </div>

      <!-- Submit Button -->
      <button
          :disabled="loading"
          class="w-full bg-customGold text-gray-900 dark:text-gray-900 py-3 px-6 rounded-xl font-medium hover:bg-customGold/90 focus:ring-4 focus:ring-customGold/25 transform transition duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
      >
        <span v-if="loading"
              class="flex items-center justify-center space-x-2"
        >
          <svg class="animate-spin h-5 w-5"
               viewBox="0 0 24 24"
          >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                fill="none"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            />
            <path
                class="opacity-75"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                fill="currentColor"
            />
          </svg>
          <span>Logging in...</span>
        </span>
        <span v-else>Log in</span>
      </button>

      <!-- Sign Up Link -->
      <p class="text-center text-gray-600 dark:text-gray-300">
        Don't have an account?
        <router-link
            class="text-customGold hover:text-customGold/80 font-medium"
            to="/auth/signup"
        >
          Sign up
        </router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
/* Any additional custom styles can go here */
</style>
