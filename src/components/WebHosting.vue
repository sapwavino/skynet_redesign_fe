<script>
import HostingPlanCard from "@/components/HostingPlanCard.vue";
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";

export default {
  name: "WebHosting",
  components: {DotLottieVue, HostingPlanCard},
  data() {
    return {
      selectedCurrency: "NGN",
      hostingPlans: [
        {
          name: "Basic",
          price: 2301.21,
          color: 'rgb(239, 36, 105)',
          features: [
            "Choose Panel",
            "Apache & NGINX",
            "Wordpress & Other apps",
            "Unlimited Space",
            "Unlimited Traffic",
            "1 website",
            "Multiple Databases",
            "Python, .NET, PHP, Ruby, Node.js",
            "24/7 Support",
            "Free SSL",
            "FTP Access",
            "SSH Access"
          ],
          popular: false,
        },
        {
          name: "Standard",
          price: 6136.57,
          color: 'rgb(50, 192, 114)',
          features: [
            "Choose Panel",
            "Apache & NGINX",
            "Wordpress & Other apps",
            "Unlimited Space",
            "Unlimited Traffic",
            "1 website",
            "Multiple Databases",
            "Python, .NET, PHP, Ruby, Node.js",
            "24/7 Support",
            "Free SSL",
            "FTP Access",
            "SSH Access",
            "Docker Support"
          ],
          popular: true,
        },
        {
          name: "Pro",
          price: 12273.14,
          color: '#4243DC',
          features: [
            "Choose Panel",
            "Apache & NGINX",
            "Wordpress & Other apps",
            "Unlimited Space",
            "Unlimited Traffic",
            "1 website",
            "Multiple Databases",
            "Python, .NET, PHP, Ruby, Node.js",
            "24/7 Support",
            "Free SSL",
            "FTP Access",
            "SSH Access",
            "Docker Support",
            "Dedicated RAM"
          ],
          popular: false,
        },
      ],
      cloudPlans: [
        {
          name: "G1",
          price: 6136.57,
          color: 'rgb(239, 36, 105)',
          features: [
            "Choose Panel",
            "Apache & NGINX",
            "Wordpress & Other apps",
            "Unlimited Space",
            "Unlimited Traffic",
            "1 website",
            "Multiple Databases",
            "Python, .NET, PHP, Ruby, Node.js",
            "24/7 Support",
            "Free SSL",
            "FTP Access",
            "SSH Access"
          ],
          popular: false,
        },
        {
          name: "G2",
          price: 10739.00,
          color: 'rgb(50, 192, 114)',
          features: [
            "Choose Panel",
            "Apache & NGINX",
            "Wordpress & Other apps",
            "Unlimited Space",
            "Unlimited Traffic",
            "1 website",
            "Multiple Databases",
            "Python, .NET, PHP, Ruby, Node.js",
            "24/7 Support",
            "Free SSL",
            "FTP Access",
            "SSH Access"
          ],
          popular: true,
        },
        {
          name: "G3",
          price: 15341.43,
          color: '#4243DC',
          features: [
            "Choose Panel",
            "Apache & NGINX",
            "Wordpress & Other apps",
            "Unlimited Space",
            "Unlimited Traffic",
            "1 website",
            "Multiple Databases",
            "Python, .NET, PHP, Ruby, Node.js",
            "24/7 Support",
            "Free SSL",
            "FTP Access",
            "SSH Access"
          ],
          popular: false,
        },
      ],
      gpuPlans: [],
      tab: 'hosting',
      earlyBirdEmail: ''
    }
  }
}
</script>

<template>
  <div class="mt-10 min-h-10" id="hosting"></div>
  <h1 class="text-center font-bold text-3xl">Web Hosting Plans</h1>
  <h2 class="subheader">All plans can be upgraded or downgraded</h2>
  <!-- PLANS -->
  <div>

    <!--    TAB SELECTOR-->
    <div class="flex items-center justify-center mt-10">
      <button :class="tab === 'hosting' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'hosting'">
        Hosting
      </button>
      <button :class="tab === 'cloud' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'cloud'">
        Cloud
      </button>
      <button :class="tab === 'gpu' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'gpu'">GPU
      </button>
    </div>

    <!--CURRENCY DROPDOWN-->
    <div class="block w-1/5 mx-auto mt-5 col-span-3">
      <select id="currency"
              class="h-12 border border-gray-400 text-gray-600 text-base rounded-lg block w-full py-2.5 px-4 focus:outline-none font-bold"
              v-model="selectedCurrency">
        <option value="NGN">Nigerian Naira (NGN) - ₦</option>
        <option value="USD">United States Dollar (USD) - $</option>
        <option value="GBP">British Pound Sterling (GBP) - £</option>
        <option value="EUR">Euro (EUR) - €</option>
      </select>
    </div>

    <!--    TABS-->
    <div v-if="tab === 'hosting'" class="cardGrid3">
      <HostingPlanCard v-for="(plan, idx) in hostingPlans"
                       :key="idx"
                       :plan-name="plan.name"
                       :color="plan.color"
                       :cost="plan.price"
                       :features="plan.features"
                       :popular="plan.popular"

      />
    </div>
    <div v-if="tab === 'cloud'" class="cardGrid3">
      <button class="col-span-3 text-btn-base">View all cloud →</button>
      <HostingPlanCard v-for="(plan, idx) in cloudPlans"
                       :key="idx"
                       :plan-name="plan.name"
                       :color="plan.color"
                       :cost="plan.price"
                       :features="plan.features"
                       :popular="plan.popular"

      />
    </div>
    <div v-if="tab === 'gpu'" class="grid grid-cols-3 gap-5 p-10">
      <div v-if="gpuPlans.length === 0" class="col-span-3 h-[80vh] flex flex-col justify-center">
        <p class="text-center text-4xl">No GPU plans available at the moment.</p>
        <p class="text-center mb-5">You can opt-in for an early bird notification once there are servers available.</p>
        <input type="email" v-model="earlyBirdEmail" class="outline-customGold border border-customGold w-1/4 mx-auto rounded-2xl mb-3.5 p-2" placeholder="your_email@yourwebsite.com">
        <button class="btn-base mx-auto">Notify Me</button>
        <DotLottieVue style="height: 300px; width: 400px; margin: 0 auto; text-align: right" autoplay loop
                      src="/noGPUAnimation.json"/>
      </div>
    </div>

  </div>
</template>

<style scoped>

</style>