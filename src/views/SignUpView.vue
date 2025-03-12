<script>
import { createToast } from "mosha-vue-toastify";
import { mapActions } from "vuex";
import countries from "@/utils/countries.js";
import "mosha-vue-toastify/dist/style.css";

export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      password2: "",
      error: "",
      countries,
      selectedCountry: "Nigeria",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      postcode: "",
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      signupAction: "auth/signup",
      startLoading: "startLoading",
      stopLoading: "stopLoading",
    }),

    async handleSignup() {
      // Validate inputs
      if (!this.firstName || !this.lastName) {
        createToast("Please enter your full name", { type: "danger" });
        return;
      }

      if (!this.email) {
        createToast("Please enter your email", { type: "danger" });
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        createToast("Please enter a valid email address", { type: "danger" });
        return;
      }

      if (!this.password || !this.password2) {
        createToast("Please enter both passwords", { type: "danger" });
        return;
      }

      if (this.password !== this.password2) {
        createToast("Passwords do not match", { type: "danger" });
        return;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(this.password)) {
        createToast(
          "Password must be at least 8 characters and contain uppercase, lowercase, number and special character",
          { type: "danger" }
        );
        return;
      }

      try {
        this.loading = true;
        this.startLoading();

        const userData = {
          email: this.email,
          password: this.password,
          password_confirm: this.password2,
          first_name: this.firstName,
          last_name: this.lastName,
          phone: this.phone,
          country: this.selectedCountry,
          address_1: this.address,
          postcode: this.postcode,
        };

        await this.signupAction(userData);

        createToast("Account created successfully!", { type: "success" });
        this.$router.push("/login");
      } catch (error) {
        const errorDetails = this.$store.getters["auth/getLastError"];

        if (errorDetails?.code === 9999) {
          createToast(`${errorDetails.message}. Please add your postal code.`, {
            type: "error",
            duration: 4000,
          });
        } else {
          createToast(errorDetails?.message || "Signup failed", {
            type: "error",
          });
        }
      } finally {
        this.loading = false;
        this.stopLoading();
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
      @submit.prevent="handleSignup"
      class="max-w-4xl mx-auto bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 space-y-8 border border-customGold/20"
    >
      <!-- Header Section -->
      <div class="text-center space-y-2">
        <h2 class="text-3xl md:text-4xl font-bold text-customGold">
          Create Account
        </h2>
        <p class="text-gray-600 dark:text-gray-300">
          Join 1500+ website & app owners
        </p>
      </div>

      <!-- Name Fields -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >First Name</label
          >
          <input
            v-model="firstName"
            type="text"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="John"
          />
        </div>
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Last Name</label
          >
          <input
            v-model="lastName"
            type="text"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Doe"
          />
        </div>
      </div>

      <!-- Contact Fields -->
      <div class="space-y-2">
        <label
          class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >Email</label
        >
        <input
          v-model="email"
          type="email"
          class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          placeholder="you@example.com"
        />
      </div>

      <!-- Address Fields -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Address</label
          >
          <input
            v-model="address"
            type="text"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="Street Address"
          />
        </div>
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Postal Code</label
          >
          <input
            v-model="postcode"
            type="text"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="123456"
          />
        </div>
      </div>

      <!-- Country and Phone -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Country</label
          >
          <select
            v-model="selectedCountry"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100"
          >
            <option value="none" class="bg-white dark:bg-gray-800">
              Select country
            </option>
            <option
              v-for="(country, idx) in countries"
              :key="idx"
              :value="country.name"
              class="bg-white dark:bg-gray-800"
            >
              {{ country.flag }} {{ country.name }}
            </option>
          </select>
        </div>
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Phone</label
          >
          <input
            v-model="phone"
            type="tel"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            placeholder="+1234567890"
          />
        </div>
      </div>

      <!-- Password Fields -->
      <div class="grid md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100"
            placeholder="••••••••"
          />
        </div>
        <div class="space-y-2">
          <label
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >Confirm Password</label
          >
          <input
            v-model="password2"
            type="password"
            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-customGold focus:border-customGold transition duration-200 bg-white/50 dark:bg-gray-700/50 text-gray-900 dark:text-gray-100"
            placeholder="••••••••"
          />
        </div>
      </div>

      <!-- Terms and Submit -->
      <div class="space-y-6">
        <p class="text-sm text-gray-600 dark:text-gray-300 text-center">
          By creating your account, you agree to our
          <router-link
            to="/policies?tab=tos"
            class="text-customGold hover:text-customGold/80 font-medium"
          >
            terms and conditions
          </router-link>
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-customGold text-gray-900 dark:text-gray-900 py-3 px-6 rounded-xl font-medium hover:bg-customGold/90 focus:ring-4 focus:ring-customGold/25 transform transition duration-200 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span
            v-if="loading"
            class="flex items-center justify-center space-x-2"
          >
            <svg class="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
                fill="none"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Creating Account...</span>
          </span>
          <span v-else>Create Account</span>
        </button>

        <p class="text-center text-gray-600 dark:text-gray-300">
          Already have an account?
          <router-link
            to="/auth/login"
            class="text-customGold hover:text-customGold/80 font-medium"
          >
            Log in
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Any additional custom styles can go here */
</style>
