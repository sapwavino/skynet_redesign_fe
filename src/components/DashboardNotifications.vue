<script>


export default {
  name: "DashboardNotifications",
  components: {},
  data() {
    return {
      mockNotifications: [
        {
          id: 1,
          title: "New Message",
          message: "You have a new message from John Doe.",
          type: "message",
          read: false,
          timestamp: "2025-02-06T10:30:00Z",
        },
        {
          id: 2,
          title: "System Update",
          message: "A new system update is available. Click here to update. Lorem20 ipsum dolor sit amet, consectetur adipiscing elit.",
          type: "system",
          read: false,
          timestamp: "2025-02-06T09:15:00Z",
        },
        {
          id: 3,
          title: "Reminder",
          message: "Your meeting with the product team starts in 30 minutes.",
          type: "reminder",
          read: true,
          timestamp: "2025-02-05T16:45:00Z",
        },
        {
          id: 4,
          title: "Payment Received",
          message: "You received a payment of $250.00 from Jane Doe.",
          type: "payment",
          read: false,
          timestamp: "2025-02-06T12:00:00Z",
        },
        {
          id: 5,
          title: "Security Alert",
          message: "Unusual login activity detected on your account.",
          type: "security",
          read: true,
          timestamp: "2025-02-04T22:10:00Z",
        },
      ]
    };
  }
}
</script>

<template>
  <div class="">
    <!-- Your dashboard overview content goes here -->
    <h1 class="header uppercase">notifications</h1>
    <h1 class="muteSubheader capitalize">Here you can find all the notifications we've sent you.</h1>

    <div class="flex mt-5">
      <div class="border-r w-1/3 mr-2">
        <ul>
          <li v-for="(notification, index) in mockNotifications" :key="index"
              class="p-5 border-b last:border-none border-b-gray-300 cursor-pointer mb-1 hover:shadow-2xl">
            <div class="flex items-start gap-2 font-semibold hover:text-customGold">
              {{ notification.title }}
            </div>
            <div class="text-sm text-gray-600 truncate">{{ notification.message }}</div>
          </li>
        </ul>
      </div>
      <div class="w-full">
        <div>Notification details</div>
      </div>
    </div>

  </div>
</template>


<style scoped>

</style>