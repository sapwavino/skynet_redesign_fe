<script>
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
  <section class="flex flex-col gap-y-5 mt-10 w-5/6">
    <div class="flex items-center justify-center">
      <button :class="tab === 'domain' ? 'flat-btn-base-darker' : 'flat-border-btn-base'" @click="tab = 'domain'">Web
        Domain
      </button>
      <button :class="tab === 'hosting' ? 'flat-btn-base-darker' : 'flat-border-btn-base'" @click="tab = 'hosting'">Web
        Hosting
      </button>
      <button :class="tab === 'email' ? 'flat-btn-base-darker' : 'flat-border-btn-base'" @click="tab = 'email'">Email
      </button>
      <button :class="tab === 'db' ? 'flat-btn-base-darker' : 'flat-border-btn-base'" @click="tab = 'db'">Database
      </button>
<!--      <button :class="tab === 'db' ? 'flat-btn-base-darker' : 'flat-border-btn-base'" @click="tab = 'db'">Promos-->
<!--      </button>-->
    </div>

    <!--    DOMAIN TAB-->
    <transition name="fade" mode="in-out">
      <tab-component v-if="tab === 'domain'" animation="/domainAnimation.json" :tab="{
       btn: 'See available TLDs',
       header: 'Search the most popular domains',
       content: `Discover the latest domain deals and check our pricing on hundreds of Top-Level Domains(TLDs) with invaluable add-ons for your
              project.`

    }"></tab-component>
    </transition>
    <!--    HOSTING TAB-->
    <transition name="fade" mode="in-out">
      <tab-component v-if="tab === 'hosting'" :animation="'/hostingAnimation.json'" :tab="{
       btn: 'See hosting plans',
       header: 'Host your websites & web apps with 99% uptime',
       content:`Our hosting options have been carefully selected to cater to most deployment needs.<br/> Let us know if
          you need something more customized.`
     }"></tab-component>
    </transition>
  </section>


</template>

<style scoped>

</style>