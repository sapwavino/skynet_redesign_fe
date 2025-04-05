<script>
import {createToast} from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
  faPlus,
  faSearch,
  faSpinner,
  faTicket,
  faEnvelope,
  faCheckCircle,
  faExclamationCircle,
  faComments,
  faPaperPlane,
  faCalendarAlt,
  faChevronDown,
  faInfoCircle,
  faPause,
  faUserClock,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "@/components/Modal.vue";

export default {
  name: "DashboardSupport",
  components: {
    Modal,
    FontAwesomeIcon,
  },
  data() {
    return {
      tab: this.$route.query.tab || "all",
      showModal: false,
      ticketData: {
        subject: "",
        content: "",
        support_helpdesk_id: "",
        priority: "medium",
      },
      searchQuery: "",
      isSubmitting: false,
      faPlus,
      faSearch,
      faSpinner,
      faTicket,
      faEnvelope,
      faCheckCircle,
      faExclamationCircle,
      faComments,
      faPaperPlane,
      faCalendarAlt,
      faChevronDown,
      faInfoCircle,
      faUserClock,
    };
  },

  created() {
    // Ensure helpdesks are loaded
    this.$store.dispatch("support/getHelpdeskPairs");
  },

  watch: {
    ["$route.query.tab"]: {
      immediate: true,
      handler(newTab) {
        this.tab = newTab || "all";
      },
    },
  },

  methods: {
    setTab(tab) {
      this.$router.push({query: {tab}});
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    },

    getRelativeTime(dateString) {
      if (!dateString) return "";

      const date = new Date(dateString);
      const now = new Date();
      const diffInSeconds = Math.floor((now - date) / 1000);

      if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
      if (diffInSeconds < 3600)
        return `${Math.floor(diffInSeconds / 60)} minutes ago`;
      if (diffInSeconds < 86400)
        return `${Math.floor(diffInSeconds / 3600)} hours ago`;
      if (diffInSeconds < 604800)
        return `${Math.floor(diffInSeconds / 86400)} days ago`;

      return this.formatDate(dateString);
    },

    viewTicket(id) {
      this.$router.push(`/dashboard/support/ticket/${id}`);
    },

    openModal() {
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      // Reset form data
      this.ticketData = {
        subject: "",
        content: "",
        support_helpdesk_id: "",
        priority: "medium",
      };
    },

    async submitTicket() {
      if (
          !this.ticketData.subject ||
          !this.ticketData.content ||
          !this.ticketData.support_helpdesk_id
      ) {
        createToast("Please fill in all required fields", {
          type: "warning",
          position: "top-right",
          toastBackgroundColor: "#ff9800",
          backgroundColor: "#ff9800",
        });
        return;
      }

      this.isSubmitting = true;

      try {
        await this.$store.dispatch("support/createTicket", this.ticketData);
        // Refresh tickets after creation
        await this.$store.dispatch("support/getTickets");
        this.showModal = false;
        this.ticketData = {
          subject: "",
          content: "",
          support_helpdesk_id: "",
          priority: "medium",
        };
        createToast("Support ticket created successfully", {
          type: "success",
          position: "top-right",
          toastBackgroundColor: "#4caf50",
          backgroundColor: "#4caf50",
        });
      } catch (error) {
        createToast(error.message || "Failed to create ticket", {
          type: "error",
          position: "top-right",
          toastBackgroundColor: "#f44336",
          backgroundColor: "#f44336",
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    getStatusBadgeClass(status) {
      return (
          {
            open: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
            in_progress:
                "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
            on_hold:
                "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
            closed: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
          }[status] ||
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
      );
    },

    getStatusIcon(status) {
      return (
          {
            open: faExclamationCircle,
            in_progress: faSpinner,
            on_hold: faUserClock,
            closed: faCheckCircle,
          }[status] || faTicket
      );
    },

    getShortenedContent(content, maxLength = 100) {
      if (!content) return "";
      return content.length > maxLength
          ? content.substring(0, maxLength) + "..."
          : content;
    },

    clearSearch() {
      this.searchQuery = "";
    },
  },

  computed: {
    tickets() {
      return this.$store.state.support.tickets || [];
    },
    helpdesks() {
      return this.$store.state.support.helpdesks || [];
    },
    loading() {
      return this.$store.state.loading;
    },
    openTickets() {
      return this.tickets.filter((ticket) => ticket.status === "open");
    },
    closedTickets() {
      return this.tickets.filter((ticket) => ticket.status === "closed");
    },
    onHoldTickets() {
      return this.tickets.filter((ticket) => ticket.status === "on_hold");
    },
    filteredTickets() {
      let filtered = this.tickets;

      if (this.tab === "open") {
        filtered = this.openTickets;
      }
      else if (this.tab === "closed") {
        filtered = this.closedTickets;
      }
      else if (this.tab === "on_hold") {
        filtered = this.onHoldTickets;
      }

      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
            (ticket) =>
                ticket.subject.toLowerCase().includes(query) ||
                ticket.id.toString().includes(query) ||
                (ticket.content && ticket.content.toLowerCase().includes(query))
        );
      }

      return [...filtered].sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      );
    },
    hasSearch() {
      return this.searchQuery.trim().length > 0;
    },
  },
};
</script>

<template>
  <div class="min-h-screen">
    <!-- Header section -->
    <div class="mb-8">
      <h1 class="header uppercase flex items-center">
        <font-awesome-icon :icon="faComments"
                           class="mr-3 text-customGold"
        />
        Support Center
      </h1>
      <h2 class="muteSubheader capitalize">
        Need assistance? Our team is here to help you
      </h2>
    </div>

    <!--  tab navigation with Create Ticket button -->
    <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6"
    >
      <ul
          class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mb-4 sm:mb-0"
      >
        <li class="me-2"
            @click="setTab('all')"
        >
          <a
              :class="{
              'text-customGold font-bold bg-gray-800 active': tab === 'all',
            }"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              href="#"
          >
            All
            <span
                class="bg-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2"
            >
              {{ tickets.length }}
            </span>
          </a>
        </li>
        <li class="me-2"
            @click="setTab('open')"
        >
          <a
              :class="{
              'text-customGold font-bold bg-gray-800 active': tab === 'open',
            }"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              href="#"
          >
            Open
            <span
                class="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-2"
            >
              {{ openTickets.length }}
            </span>
          </a>
        </li>
        <li class="me-2"
            @click="setTab('on_hold')"
        >
          <a
              :class="{
              'text-customGold font-bold bg-gray-800 active': tab === 'on_hold',
            }"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300 relative"
              href="#"
          >
            Awaiting Response
            <span
                class="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full ml-2"
            >
              {{ onHoldTickets.length }}
            </span>
            <span
                v-if="onHoldTickets.length > 0"
                class="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full transform -translate-y-1 translate-x-1 animate-pulse"
            ></span>
          </a>
        </li>
        <li class="me-2"
            @click="setTab('closed')"
        >
          <a
              :class="{
              'text-customGold font-bold bg-gray-800 active': tab === 'closed',
            }"
              class="inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-300"
              href="#"
          >
            Closed
            <span
                class="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-2"
            >
              {{ closedTickets.length }}
            </span>
          </a>
        </li>
      </ul>

      <div class="flex items-center space-x-4">
        <!-- Create Ticket Button -->
        <button
            class="px-4 py-2 flex items-center shadow-md hover:shadow-lg transition-all duration-300 bg-customGold hover:bg-customGold/90 text-black font-medium dark:bg-black dark:hover:bg-gray-900 dark:text-customGold rounded-md"
            @click="openModal"
        >
          <font-awesome-icon :icon="faPlus"
                             class="mr-2"
          />
          New Ticket
        </button>

        <!-- Search Box -->
        <div class="relative flex-grow max-w-md">
          <input
              v-model="searchQuery"
              class="w-full pl-10 pr-10 py-2 border rounded-lg focus:ring-2 focus:ring-customGold focus:border-transparent dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Search tickets..."
              type="text"
          />
          <font-awesome-icon
              :icon="faSearch"
              class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <button
              v-if="hasSearch"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              @click="clearSearch"
          >
            <span
                class="text-xs font-bold rounded-full bg-gray-200 dark:bg-gray-600 h-5 w-5 flex items-center justify-center"
            >×</span
            >
          </button>
        </div>
      </div>
    </div>

    <!-- Content Section -->
    <section class="mt-5">
      <!-- Loading State -->
      <div
          v-if="loading"
          class="flex flex-col justify-center items-center mt-16 space-y-4"
      >
        <div
            class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-customGold"
        ></div>
        <p class="text-gray-500 dark:text-gray-400 mt-4 text-lg">
          {{ $store.state.currentLoadingMessage }}
        </p>
      </div>

      <!-- Empty State -->
      <div
          v-else-if="filteredTickets.length === 0"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-md p-12 text-center max-w-2xl mx-auto border border-gray-100 dark:border-gray-700"
      >
        <div class="flex flex-col items-center">
          <div
              class="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6"
          >
            <font-awesome-icon
                :icon="faTicket"
                class="text-3xl text-customGold"
            />
          </div>
          <h2
              class="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2"
          >
            No support tickets found
          </h2>
          <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
            Create a new support ticket to get help from our team. We typically
            respond within 24 hours.
          </p>
          <button
              class="btn-base px-6 py-3 flex items-center"
              @click="openModal"
          >
            <font-awesome-icon :icon="faPlus"
                               class="mr-2"
            />
            Create New Ticket
          </button>
        </div>
      </div>

      <!-- Tickets Grid -->
      <div v-else
           class="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div
            v-for="ticket in filteredTickets"
            v-if="filteredTickets"
            :key="ticket.id"
            :class="{
            'border-green-500': ticket.status === 'open',
            'border-blue-500': ticket.status === 'in_progress',
            'border-yellow-500': ticket.status === 'on_hold',
            'border-red-500': ticket.status === 'closed',
            'awaiting-response': ticket.status === 'on_hold',
          }"
            class="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4 flex flex-col relative"
            @click="viewTicket(ticket.id)"
        >
          <!-- On-Hold Highlight Overlay for tickets awaiting user response -->
          <div
              v-if="ticket.status === 'on_hold'"
              class="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded transform rotate-3 shadow-md"
          >
            Your Response Needed
          </div>

          <!-- Card Header with Status and ID -->
          <div v-if="ticket"
               class="flex justify-between items-start mb-3"
          >
            <span
                :class="`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(
                ticket.status
              )}`"
            >
              <font-awesome-icon
                  :icon="getStatusIcon(ticket.status)"
                  class="mr-1"
              />
              {{
                ticket.status === "in_progress"
                    ? "In Progress"
                    : ticket.status === "on_hold"
                        ? "Awaiting Response"
                        : ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1)
              }}
            </span>
            <span class="text-xs text-gray-500 dark:text-gray-400"
            >ID: #{{ ticket.id }}</span
            >
          </div>

          <!-- Ticket Subject -->
          <h3
              class="text-lg font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1"
          >
            {{ ticket.subject }}
          </h3>

          <!-- Ticket Content Preview -->
          <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {{ getShortenedContent(ticket.content) }}
          </p>

          <!-- Card Footer with Time and Messages count -->
          <div
              class="mt-auto flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700"
          >
            <div class="flex items-center">
              <font-awesome-icon :icon="faCalendarAlt"
                                 class="mr-1"
              />
              <span>{{ getRelativeTime(ticket.created_at) }}</span>
            </div>
            <div class="flex items-center">
              <font-awesome-icon :icon="faEnvelope"
                                 class="mr-1"
              />
              <span
              >{{
                  ticket.messages ? ticket.messages.length : 0
               }}
                messages</span
              >
            </div>
          </div>
        </div>
      </div>
    </section>

    <Modal
        :confirm-text=" isSubmitting ? 'Submitting...' : 'Send Ticket' "
        :model-value="showModal"
        :on-cancel="() => showModal = false"
        :on-confirm="submitTicket"
        persistent
        title=" Submit a Support Ticket"
        type="confirm"
    >
      <div
          class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden transform transition-all sm:align-middle"
      >
        <div class="bg-white dark:bg-gray-800 px-4 pb-4 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <form class="space-y-6"
                    @submit.prevent="submitTicket"
              >
                <!-- intro section -->
                <div
                    class="flex items-center space-x-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/40 rounded-lg mb-2"
                >
                  <div
                      class="flex-shrink-0 w-10 h-10 rounded-full bg-customGold/10 flex items-center justify-center"
                  >
                    <font-awesome-icon
                        :icon="faTicket"
                        class="text-customGold"
                    />
                  </div>
                  <div>
                    <h3
                        class="text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      New Support Request
                    </h3>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <!-- Helpdesk Selection -->
                <div class="form-group">
                  <label class="form-label">
                    Helpdesk <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <select
                        v-model="ticketData.support_helpdesk_id"
                        class="form-input pl-10 outline-none"
                        required
                    >
                      <option class="text-xs"
                              disabled
                              selected
                              value=""
                      >
                        Select a helpdesk
                      </option>
                      <option
                          v-for="helpdesk in helpdesks"
                          :key="helpdesk.id"
                          :value="helpdesk.id"
                          class="text-sm"
                      >
                        {{ helpdesk.name }}
                      </option>
                    </select>
                    <span
                        class="absolute left-1 text-xs top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    >
                          <font-awesome-icon :icon="faComments" />
                        </span>
                  </div>
                  <p class="form-hint">
                    Choose the department best suited to handle your request
                  </p>
                </div>

                <!-- Subject Input -->
                <div class="form-group">
                  <label class="form-label">
                    Subject <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                        v-model="ticketData.subject"
                        class="form-input pl-10"
                        maxlength="100"
                        placeholder="Brief description of your issue"
                        required
                        type="text"
                    />
                    <span
                        class="absolute left-1 text-xs top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                    >
                          <font-awesome-icon :icon="faExclamationCircle" />
                        </span>
                    <span
                        v-if="ticketData.subject"
                        class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400"
                    >
                          {{ ticketData.subject.length }}/100
                        </span>
                  </div>
                  <p class="form-hint">Keep it clear and concise</p>
                </div>

                <!-- Message Textarea -->
                <div class="form-group">
                  <label class="form-label">
                    Message <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                        <textarea
                            v-model="ticketData.content"
                            class="form-input pl-10 min-h-[120px]"
                            placeholder="Describe your issue in detail..."
                            required
                            rows="5"
                        ></textarea>
                    <span
                        class="absolute left-1 text-xs top-3 text-gray-400 pointer-events-none"
                    >
                          <font-awesome-icon :icon="faPaperPlane" />
                        </span>
                  </div>
                  <p class="form-hint">
                    Please provide as much detail as possible about your
                    issue
                  </p>
                </div>
                <!-- Info Box -->
                <div
                    class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg text-xs border border-blue-100 dark:border-blue-800"
                >
                  <div class="flex items-start space-x-3">
                    <font-awesome-icon
                        :icon="faInfoCircle"
                        class="text-blue-500 text-base flex-shrink-0 mt-0.5"
                    />
                    <div>
                      <p
                          class="font-medium mb-1 text-blue-800 dark:text-blue-300"
                      >
                        Our support team typically responds within 24 hours.
                      </p>
                      <p class="text-blue-700 dark:text-blue-400">
                        You'll receive an email notification when we respond
                        to your ticket.
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <!-- Create Ticket Floating Button -->
    <button
        class="hidden md:flex fixed bottom-14 right-6 btn-base rounded-full p-5 shadow-lg hover:shadow-xl transition-all duration-300  items-center justify-center"
        @click="openModal"
    >
      <font-awesome-icon :icon="faPlus"
                         class="text-3xl"
      />
    </button>
  </div>
</template>

<style scoped></style>
