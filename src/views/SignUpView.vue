<script>
export default {
  name: "Login",
  data() {
    return {
      email: '',
      password: '',
      password2: '',
      error: '',
      countries: [
        {name: "Afghanistan", flag: "🇦🇫"},
        {name: "Albania", flag: "🇦🇱"},
        {name: "Algeria", flag: "🇩🇿"},
        {name: "Andorra", flag: "🇦🇩"},
        {name: "Angola", flag: "🇦🇴"},
        {name: "Antigua and Barbuda", flag: "🇦🇬"},
        {name: "Argentina", flag: "🇦🇷"},
        {name: "Armenia", flag: "🇦🇲"},
        {name: "Australia", flag: "🇦🇺"},
        {name: "Austria", flag: "🇦🇹"},
        {name: "Azerbaijan", flag: "🇦🇿"},
        {name: "Bahamas", flag: "🇧🇸"},
        {name: "Bahrain", flag: "🇧🇭"},
        {name: "Bangladesh", flag: "🇧🇩"},
        {name: "Barbados", flag: "🇧🇧"},
        {name: "Belarus", flag: "🇧🇾"},
        {name: "Belgium", flag: "🇧🇪"},
        {name: "Belize", flag: "🇧🇿"},
        {name: "Benin", flag: "🇧🇯"},
        {name: "Bhutan", flag: "🇧🇹"},
        {name: "Bolivia", flag: "🇧🇴"},
        {name: "Bosnia and Herzegovina", flag: "🇧🇦"},
        {name: "Botswana", flag: "🇧🇼"},
        {name: "Brazil", flag: "🇧🇷"},
        {name: "Brunei", flag: "🇧🇳"},
        {name: "Bulgaria", flag: "🇧🇬"},
        {name: "Burkina Faso", flag: "🇧🇫"},
        {name: "Burundi", flag: "🇧🇮"},
        {name: "Cabo Verde", flag: "🇨🇻"},
        {name: "Cambodia", flag: "🇰🇭"},
        {name: "Cameroon", flag: "🇨🇲"},
        {name: "Canada", flag: "🇨🇦"},
        {name: "Central African Republic", flag: "🇨🇫"},
        {name: "Chad", flag: "🇹🇩"},
        {name: "Chile", flag: "🇨🇱"},
        {name: "China", flag: "🇨🇳"},
        {name: "Colombia", flag: "🇨🇴"},
        {name: "Comoros", flag: "🇰🇲"},
        {name: "Congo (Congo-Brazzaville)", flag: "🇨🇬"},
        {name: "Congo (Democratic Republic)", flag: "🇨🇩"},
        {name: "Costa Rica", flag: "🇨🇷"},
        {name: "Croatia", flag: "🇭🇷"},
        {name: "Cuba", flag: "🇨🇺"},
        {name: "Cyprus", flag: "🇨🇾"},
        {name: "Czechia", flag: "🇨🇿"},
        {name: "Denmark", flag: "🇩🇰"},
        {name: "Djibouti", flag: "🇩🇯"},
        {name: "Dominica", flag: "🇩🇲"},
        {name: "Dominican Republic", flag: "🇩🇴"},
        {name: "Ecuador", flag: "🇪🇨"},
        {name: "Egypt", flag: "🇪🇬"},
        {name: "El Salvador", flag: "🇸🇻"},
        {name: "Equatorial Guinea", flag: "🇬🇶"},
        {name: "Eritrea", flag: "🇪🇷"},
        {name: "Estonia", flag: "🇪🇪"},
        {name: "Eswatini", flag: "🇸🇿"},
        {name: "Ethiopia", flag: "🇪🇹"},
        {name: "Fiji", flag: "🇫🇯"},
        {name: "Finland", flag: "🇫🇮"},
        {name: "France", flag: "🇫🇷"},
        {name: "Gabon", flag: "🇬🇦"},
        {name: "Gambia", flag: "🇬🇲"},
        {name: "Georgia", flag: "🇬🇪"},
        {name: "Germany", flag: "🇩🇪"},
        {name: "Ghana", flag: "🇬🇭"},
        {name: "Greece", flag: "🇬🇷"},
        {name: "Grenada", flag: "🇬🇩"},
        {name: "Guatemala", flag: "🇬🇹"},
        {name: "Guinea", flag: "🇬🇳"},
        {name: "Guinea-Bissau", flag: "🇬🇼"},
        {name: "Guyana", flag: "🇬🇾"},
        {name: "Haiti", flag: "🇭🇹"},
        {name: "Honduras", flag: "🇭🇳"},
        {name: "Hungary", flag: "🇭🇺"},
        {name: "Iceland", flag: "🇮🇸"},
        {name: "India", flag: "🇮🇳"},
        {name: "Indonesia", flag: "🇮🇩"},
        {name: "Iran", flag: "🇮🇷"},
        {name: "Iraq", flag: "🇮🇶"},
        {name: "Ireland", flag: "🇮🇪"},
        {name: "Israel", flag: "🇮🇱"},
        {name: "Italy", flag: "🇮🇹"},
        {name: "Jamaica", flag: "🇯🇲"},
        {name: "Japan", flag: "🇯🇵"},
        {name: "Jordan", flag: "🇯🇴"},
        {name: "Kazakhstan", flag: "🇰🇿"},
        {name: "Kenya", flag: "🇰🇪"},
        {name: "Kiribati", flag: "🇰🇮"},
        {name: "Kuwait", flag: "🇰🇼"},
        {name: "Kyrgyzstan", flag: "🇰🇬"},
        {name: "Laos", flag: "🇱🇦"},
        {name: "Latvia", flag: "🇱🇻"},
        {name: "Lebanon", flag: "🇱🇧"},
        {name: "Lesotho", flag: "🇱🇸"},
        {name: "Liberia", flag: "🇱🇷"},
        {name: "Libya", flag: "🇱🇾"},
        {name: "Liechtenstein", flag: "🇱🇮"},
        {name: "Lithuania", flag: "🇱🇹"},
        {name: "Luxembourg", flag: "🇱🇺"},
        {name: "Madagascar", flag: "🇲🇬"},
        {name: "Malawi", flag: "🇲🇼"},
        {name: "Malaysia", flag: "🇲🇾"},
        {name: "Maldives", flag: "🇲🇻"},
        {name: "Mali", flag: "🇲🇱"},
        {name: "Malta", flag: "🇲🇹"},
        {name: "Mexico", flag: "🇲🇽"},
        {name: "Morocco", flag: "🇲🇦"},
        {name: "Mozambique", flag: "🇲🇿"},
        {name: "Myanmar", flag: "🇲🇲"},
        {name: "Namibia", flag: "🇳🇦"},
        {name: "Nepal", flag: "🇳🇵"},
        {name: "Netherlands", flag: "🇳🇱"},
        {name: "New Zealand", flag: "🇳🇿"},
        {name: "Nigeria", flag: "🇳🇬"},
        {"name": "North Korea", "flag": "🇰🇵"},
        {"name": "Norway", "flag": "🇳🇴"},
        {"name": "Oman", "flag": "🇴🇲"},
        {"name": "Pakistan", "flag": "🇵🇰"},
        {"name": "Palau", "flag": "🇵🇼"},
        {"name": "Palestine", "flag": "🇵🇸"},
        {"name": "Panama", "flag": "🇵🇦"},
        {"name": "Papua New Guinea", "flag": "🇵🇬"},
        {"name": "Paraguay", "flag": "🇵🇾"},
        {"name": "Peru", "flag": "🇵🇪"},
        {"name": "Philippines", "flag": "🇵🇭"},
        {"name": "Poland", "flag": "🇵🇱"},
        {"name": "Portugal", "flag": "🇵🇹"},
        {"name": "Qatar", "flag": "🇶🇦"},
        {"name": "Romania", "flag": "🇷🇴"},
        {"name": "Russia", "flag": "🇷🇺"},
        {"name": "Rwanda", "flag": "🇷🇼"},
        {"name": "Saint Kitts and Nevis", "flag": "🇰🇳"},
        {"name": "Saint Lucia", "flag": "🇱🇨"},
        {"name": "Saint Vincent and the Grenadines", "flag": "🇻🇨"},
        {"name": "Samoa", "flag": "🇼🇸"},
        {"name": "San Marino", "flag": "🇸🇲"},
        {"name": "Sao Tome and Principe", "flag": "🇸🇹"},
        {"name": "Saudi Arabia", "flag": "🇸🇦"},
        {"name": "Senegal", "flag": "🇸🇳"},
        {"name": "Serbia", "flag": "🇷🇸"},
        {"name": "Seychelles", "flag": "🇸🇨"},
        {"name": "Sierra Leone", "flag": "🇸🇱"},
        {"name": "Singapore", "flag": "🇸🇬"},
        {"name": "Slovakia", "flag": "🇸🇰"},
        {"name": "Slovenia", "flag": "🇸🇮"},
        {"name": "Solomon Islands", "flag": "🇸🇧"},
        {"name": "Somalia", "flag": "🇸🇴"},
        {"name": "South Africa", "flag": "🇿🇦"},
        {"name": "South Korea", "flag": "🇰🇷"},
        {"name": "South Sudan", "flag": "🇸🇸"},
        {"name": "Spain", "flag": "🇪🇸"},
        {"name": "Sri Lanka", "flag": "🇱🇰"},
        {"name": "Sudan", "flag": "🇸🇩"},
        {"name": "Suriname", "flag": "🇸🇷"},
        {"name": "Sweden", "flag": "🇸🇪"},
        {"name": "Switzerland", "flag": "🇨🇭"},
        {"name": "Syria", "flag": "🇸🇾"},
        {"name": "Taiwan", "flag": "🇹🇼"},
        {"name": "Tajikistan", "flag": "🇹🇯"},
        {"name": "Tanzania", "flag": "🇹🇿"},
        {"name": "Thailand", "flag": "🇹🇭"},
        {"name": "Timor-Leste", "flag": "🇹🇱"},
        {"name": "Togo", "flag": "🇹🇬"},
        {"name": "Tonga", "flag": "🇹🇴"},
        {"name": "Trinidad and Tobago", "flag": "🇹🇹"},
        {"name": "Tunisia", "flag": "🇹🇳"},
        {"name": "Turkey", "flag": "🇹🇷"},
        {"name": "Turkmenistan", "flag": "🇹🇲"},
        {"name": "Tuvalu", "flag": "🇹🇻"},
        {"name": "Uganda", "flag": "🇺🇬"},
        {"name": "Ukraine", "flag": "🇺🇦"},
        {"name": "United Arab Emirates", "flag": "🇦🇪"},
        {"name": "United Kingdom", "flag": "🇬🇧"},
        {"name": "United States", "flag": "🇺🇸"},
        {"name": "Uruguay", "flag": "🇺🇾"},
        {"name": "Uzbekistan", "flag": "🇺🇿"},
        {"name": "Vanuatu", "flag": "🇻🇺"},
        {"name": "Vatican City", "flag": "🇻🇦"},
        {"name": "Venezuela", "flag": "🇻🇪"},
        {"name": "Vietnam", "flag": "🇻🇳"},
        {"name": "Yemen", "flag": "🇾🇪"},
        {"name": "Zambia", "flag": "🇿🇲"},
        {"name": "Zimbabwe", "flag": "🇿🇼"}
      ],
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
          class="dark:bg-gray-400 shadow-2xl rounded-3xl flex flex-col items-center justify-center mx-auto w-1/3 p-10">
      <h2 class="header text-center">Sign Up</h2>
      <h2 class="muteSmallSubheader text-center mb-5">Join 1000+ website & app owners</h2>

      <!--      FIELDS-->
      <div class="flex items-center gap-x-1.5">
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