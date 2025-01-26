<script xmlns="http://www.w3.org/1999/html">
import {DotLottieVue} from "@lottiefiles/dotlottie-vue";
import TabComponent from "@/components/TabComponent.vue";

export default {
  name: "ServicesTab",
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
  <section class="flex flex-col gap-y-5 mt-10 w-3/4 mx-auto">
    <div class="flex flex-col">
      <h2 class="header capitalize">Our services</h2>
      <h2 class="subheader">More from us for less from you</h2>
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
       content: `Discover the latest domain deals and check our pricing on hundreds of Top-Level Domains(TLDs) with invaluable add-ons for your
              project.`

    }"></tab-component>


    <!--    HOSTING TAB-->

    <tab-component v-if="tab === 'hosting'" :animation="'/hostingAnimation.lottie'" :tab="{
       btn: 'See hosting plans',
       header: 'Seamlessly Host your web apps with 99% uptime',
       content:`Our hosting options have been carefully selected to cater to most deployment needs.<br/> Let us know if
          you need something more customized.`
     }"></tab-component>

    <!--    EMAIL TAB-->

    <tab-component v-if="tab === 'email'" :animation="'/emailAnimation.lottie'" :tab="{
       btn: 'Set up email service',
       header: 'Professional email service for your business',
       content:`Skynet's email service provides simplicity and security in one package.<br/> Connect your domain or get one from us and start sending emails.`
     }"></tab-component>


    <!--    DATABASE TAB-->

    <tab-component v-if="tab === 'db'" :animation="'/databaseAnimation.lottie'" :tab="{
       btn: 'Join waitlist',
       header: 'High-performance, scalable databases on demand',
       content:'Join our waitlist for the latest database offerings.<br/> We will send you updates & discount on all our new offerings.'
     }"></tab-component>

  </section>


</template>

<style scoped>

</style>