<script>


export default {
  name: "DashboardNotifications",
  components: {},
  data() {
    return {
      id: this.$route.query.id || null, // Set initial ID from URL or default to null
      mockNotifications: this.$store.state.user.notifications
    };
  },
  watch: {
    ["$route.query.id"]: {
      immediate: true, // Run on component mount
      handler(newID) {
        this.id = newID || null; // Fallback to 'new' if no tab is set
      },
    },
  },
  methods: {
    getNotificationByID() {
      return this.mockNotifications.find((one) => {
        return one.id === parseInt(this.id);
      })
    }
  }
}
</script>

<template>
  <div class="">
    <!-- Your dashboard overview content goes here -->
    <h1 class="header uppercase md:text-left text-center">notifications</h1>
    <h1 class="muteSubheader capitalize md:text-left text-center">Here you can find all the notifications we've sent
      you.</h1>

    <div class="flex mt-5">

      <!-- NOTIFICATIONS LIST     -->
      <div class="border-r w-1/3 mr-2">
        <ul>
          <router-link
              v-for="(notification, index) in mockNotifications"
              :key="index"
              :to="`/dashboard/notifications?id=${notification.id}`"
              @click.prevent="$store.dispatch('markNotificationAsRead', notification.id)">
            <li
                class="py-5 border-b last:border-none border-b-gray-300 cursor-pointer mb-1 hover:shadow-2xl rounded-2xl w-5/6 mx-auto dark:border-0 relative">
              <div v-if="!notification.read" class="h-3 w-3 rounded-full bg-green-600 absolute right-0"></div>
              <div class="flex items-start gap-2 font-semibold hover:text-customGold" :class="{
                'text-gray-400': notification.read,
                'muteBoldSubheader text-black': !notification.read,
              }">
                {{ notification.title }}
              </div>
              <div class="text-sm truncate"
                   :class="{
                'text-gray-400': notification.read,
                'muteBoldSubheader text-black': !notification.read,
              }">{{ notification.message }}
              </div>
            </li>
          </router-link>
        </ul>
      </div>

      <!-- NOTIFICATION DETAILS     -->
      <div class="w-full" v-if="id">
        <section class="dashGroupCard w-full md:w-3/4">
          <div class="header">{{ getNotificationByID().title }}</div>
          <p class="muteSmallSubheader md:mb-10 mb-5">{{ new Date(getNotificationByID().timestamp) }}</p>
          <div class="muteBoldSubheader">{{ getNotificationByID().message }}</div>
          <div class="flex md:flex-row flex-col items-center gap-2 mt-10">
            <button class="btn-base-error w-full">Delete</button>
            <button class="btn-base-success w-full">Resend</button>
            <button class="btn-base w-full">Forward</button>
          </div>
        </section>
      </div>
    </div>

  </div>
</template>


<style scoped>

</style>