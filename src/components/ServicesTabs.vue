<script xmlns="http://www.w3.org/1999/html">
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";
import TabComponent from "@/components/TabComponent.vue";

export default {
  name: "ServicesTabs",
  components: {
    TabComponent,
    DotLottieVue
  },
  data() {
    return {
      tab: 'domain'
    };
  }
}
</script>

<template>
  <section class="flex flex-col gap-y-5 mt-10 w-3/4 mx-auto ">
    <div class="flex flex-col text-center">
      <h2 class="header capitalize dark:text-gray-200">What we offer</h2>
      <h2 class="subheader dark:text-gray-200">More from us for less from you</h2>
    </div>
    <div class="flex items-center justify-center">
      <button :class="tab === 'domain' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'domain'">
        Domains
      </button>
      <button :class="tab === 'hosting' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'hosting'">
        Hosting
      </button>
      <button :class="tab === 'email' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'email'">Email
      </button>
      <button :class="tab === 'db' ? 'tab-selector-active' : 'tab-selector-inactive'" @click="tab = 'db'">Database
      </button>
      <!--      <button :class="tab === 'db' ? 'flat-btn-base-darker' : 'flat-border-btn-base'" @click="tab = 'db'">Promos-->
      <!--      </button>-->
    </div>

    <!--    DOMAIN TAB-->

    <tab-component v-if="tab === 'domain'" animation="/domainAnimation.lottie" :tab="{
       btn: 'See available TLDs',
       header: 'Search the most popular domains',
       content: `Explore the best domain deals and pricing on hundreds of TLDs, plus awesome add-ons to level up your project! 🚀`

    }"></tab-component>


    <!--    HOSTING TAB-->

    <tab-component v-if="tab === 'hosting'" :animation="'/hostingAnimation.lottie'" :tab="{
       btn: 'See hosting plans',
       header: 'Host your web apps with 99% uptime',
       content:`We've got hosting options to cover most needs—just let us know if you need something custom! 😊`
     }"></tab-component>

    <!--    EMAIL TAB-->

    <tab-component v-if="tab === 'email'" :animation="'/emailAnimation.lottie'" :tab="{
       btn: 'Set up email service',
       header: 'Professional email for your business',
       content:`Skynet makes email easy and secure. Bring your domain or grab one from us—you're all set to start sending! 🚀`
     }"></tab-component>


    <!--    DATABASE TAB-->

    <tab-component v-if="tab === 'db'" :animation="'/databaseAnimation.lottie'" :tab="{
       btn: 'Join waitlist',
       header: 'High-performance, scalable databases on demand',
       content:'Join our waitlist for the latest database offerings.<br/> We will send you updates & discount on all our new offerings.'
     }">
      <slot>
        <input type="email" v-model="earlyBirdEmail" class="outline-customGold border border-customGold block rounded-2xl p-2 w-3/4 dark:text-gray-200 dark:placeholder:text-gray-500 focus:outline-0 focus:bg-gray-100 focus:text-gray-900 focus:border-customGold focus:border-2" placeholder="your_email@yourwebsite.com">
      </slot>
    </tab-component>

  </section>


</template>

<style scoped>

</style>