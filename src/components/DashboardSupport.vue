<script setup>
import {ref} from "vue";
import Modal from "@/components/Modal.vue";

const showModal = ref(false);
const ticketData = ref({name: "", email: "", message: ""});

const submitTicket = () => {
  console.log("Support Ticket Submitted:", ticketData.value);
  showModal.value = false;
  ticketData.value = {name: "", email: "", message: ""}; // Reset form
};

const openSupportModal = () => {
  showModal.value = true;
};
</script>


<template>
  <div class="min-h-screen">
    <h1 class="header uppercase">Support</h1>
    <div class="flex items-center justify-between">
      <h1 class="muteSubheader capitalize">Need an answer? We are here to help!</h1>
      <button class="btn-base mr-5" @click="openSupportModal">New Ticket</button>
    </div>
    <hr class="mt-5"/>
    <div class="text-center pt-5">
      <h2 class="muteSubheader">No support tickets</h2>
    </div>
    <div>

      <!-- Support Ticket Modal -->
      <Modal
          v-model="showModal"
          title="Submit a Support Ticket"
          type="confirm"
          confirmText="Send Ticket"
          cancelText="Cancel"
          :onConfirm="submitTicket"
          :persistent="false"
      >
        <form @submit.prevent="submitTicket" class="space-y-4">
          <input
              v-model="ticketData.name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
          />
          <input
              v-model="ticketData.email"
              type="email"
              placeholder="john@doe.com"
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
          />
          <textarea
              v-model="ticketData.message"
              placeholder="Describe your issue..."
              class="w-full px-4 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              rows="4"
              required
          ></textarea>
        </form>
      </Modal>
    </div>
  </div>
</template>


<style scoped>

</style>