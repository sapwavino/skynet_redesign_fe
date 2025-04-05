<script>
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {
  faArrowLeft,
  faClock,
  faUser,
  faPaperPlane,
  faTimesCircle,
  faExclamationTriangle,
  faCheckCircle,
  faPaperclip, // Make sure this icon is imported properly
  faUserCog,
  faSpinner,
  faUserClock,
  faReply,
  faComments,
  faCalendarAlt,
  faInfoCircle,
  faBell,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";
import {createToast} from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";
import Modal from "@/components/Modal.vue";

export default {
  name: "DashboardTicketDetail",
  components: {
    FontAwesomeIcon,
    Modal,
  },
  props: {
    id: {
      type: [String, Number],
      required: false,
    },
  },
  data() {
    return {
      replyContent: "",
      showConfirmCloseModal: false,
      fileAttachment: null,
      isSubmitting: false,
      showFileTypeError: false,
      errorMessage: "",
      typingTimer: null,
      isSavingDraft: false,
      draftSaved: false,
      faArrowLeft,
      faClock,
      faUser,
      faPaperPlane,
      faTimesCircle,
      faExclamationTriangle,
      faCheckCircle,
      faPaperclip,
      faUserCog,
      faSpinner,
      faUserClock,
      faReply,
      faComments,
      faCalendarAlt,
      faInfoCircle,
      faBell,
      faExclamationCircle,
    };
  },
  computed: {
    ticketId() {
      return this.id || this.$route.params.id;
    },
    ticket() {
      if (
          this.$store.state.support.currentTicket?.id === Number(this.ticketId)
      ) {
        return this.$store.state.support.currentTicket;
      }
      return (
          this.$store.getters["support/getTicketById"](Number(this.ticketId)) ||
          {}
      );
    },
    ticketMessages() {
      return this.ticket?.messages || [];
    },
    canCloseTicket() {
      return (
          this.ticket?.status === "open" ||
          this.ticket?.status === "in_progress" ||
          this.ticket?.status === "on_hold"
      );
    },
    isClosedTicket() {
      return this.ticket?.status === "closed";
    },
    isOnHoldTicket() {
      return this.ticket?.status === "on_hold";
    },
    loading() {
      return this.$store.state.loading;
    },
    submitting() {
      return this.isSubmitting;
    },
    ticketStatusClass() {
      return {
        "bg-green-500": this.ticket.status === "open",
        "bg-blue-500": this.ticket.status === "in_progress",
        "bg-yellow-500": this.ticket.status === "on_hold",
        "bg-red-500": this.ticket.status === "closed",
      };
    },
    ticketStatusBadgeClass() {
      return {
        "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200":
            this.ticket.status === "open",
        "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200":
            this.ticket.status === "in_progress",
        "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200":
            this.ticket.status === "on_hold",
        "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200":
            this.ticket.status === "closed",
      };
    },
    statusDisplayName() {
      switch (this.ticket.status) {
        case "open":
          return "Open";
        case "in_progress":
          return "In Progress";
        case "on_hold":
          return "Awaiting Response";
        case "closed":
          return "Closed";
        default:
          return this.ticket.status;
      }
    },
    statusIcon() {
      switch (this.ticket.status) {
        case "open":
          return faExclamationCircle;
        case "in_progress":
          return faSpinner;
        case "on_hold":
          return faUserClock;
        case "closed":
          return faCheckCircle;
        default:
          return faInfoCircle;
      }
    },
    replyButtonDisabled() {
      return this.submitting || !this.replyContent.trim();
    },
    getAttachmentSize() {
      if (!this.fileAttachment) return "";
      const size = this.fileAttachment.size;
      if (size < 1024) return `${size} B`;
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
      return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    },
  },
  methods: {
    async fetchTicketDetails() {
      if (!this.ticketId) {
        createToast("No ticket ID provided", {
          type: "error",
          position: "bottom-right",
          backgroundColor: "#f44336",
          toastBackgroundColor: "#f44336",
        });
        this.$router.push("/dashboard/support");
        return;
      }

      try {
        // await this.$store.dispatch("support/getTicketById", this.ticketId);
        // Load draft if available
        this.loadReplyDraft();
      } catch (error) {
        console.error("Error loading ticket details:", error);
        createToast(error.message || "Failed to load ticket details", {
          type: "error",
          timeout: 5000,
          position: "bottom-right",
          backgroundColor: "#f44336",
          toastBackgroundColor: "#f44336",
        });
        this.$router.push("/dashboard/support");
      }
    },

    async submitReply() {
      if (!this.replyContent.trim()) {
        createToast("Please enter a reply message", {
          type: "warning",
          timeout: 4000,
          position: "bottom-right",
          backgroundColor: "#ff9800",
          toastBackgroundColor: "#ff9800",
        });
        return;
      }

      this.isSubmitting = true;

      try {
        const replyData = {
          id: Number(this.ticketId), // Ensure ID is a number
          content: this.replyContent,
          attachment: this.fileAttachment,
        };

        await this.$store.dispatch("support/replyToTicket", replyData);

        // Clear fields and draft after successful submission
        this.replyContent = "";
        this.fileAttachment = null;
        this.clearReplyDraft();

        // Success notification
        createToast("Reply sent successfully", {
          type: "success",
          timeout: 4000,
          position: "bottom-right",
          backgroundColor: "#4caf50",
          toastBackgroundColor: "#4caf50",
        });

        // Scroll to the bottom to see the new message
        this.$nextTick(() => {
          this.scrollToBottom();
        });
      } catch (error) {
        console.error("Error sending reply:", error);
        createToast(error.message || "Failed to send reply", {
          type: "error",
          timeout: 5000,
          position: "bottom-right",
          backgroundColor: "#f44336",
          toastBackgroundColor: "#f44336",
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    async handleCloseTicket() {
      try {
        await this.$store.dispatch("support/closeTicket", this.ticketId);
        this.closeConfirmModal();

        // Re-fetch ticket details
        await this.fetchTicketDetails();

        createToast("Ticket closed successfully", {
          type: "success",
          timeout: 4000,
          position: "bottom-right",
          backgroundColor: "#4caf50",
          toastBackgroundColor: "#4caf50",
        });

        // Clear any drafts
        this.clearReplyDraft();
      } catch (error) {
        console.error("Error closing ticket:", error);
        createToast(error.message || "Failed to close ticket", {
          type: "error",
          timeout: 5000,
          position: "bottom-right",
          backgroundColor: "#f44336",
          toastBackgroundColor: "#f44336",
        });
      }
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

    handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.showFileTypeError = true;
        this.errorMessage = "File size exceeds 5MB limit";
        this.removeAttachment();
        return;
      }

      // Check file type - only allow common document and image formats
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/zip",
      ];

      if (!validTypes.includes(file.type)) {
        this.showFileTypeError = true;
        this.errorMessage =
            "Invalid file type. Please upload an image, PDF, Word document, or ZIP file.";
        this.removeAttachment();
        return;
      }

      this.showFileTypeError = false;
      this.errorMessage = "";
      this.fileAttachment = file;
    },

    removeAttachment() {
      this.fileAttachment = null;
      this.showFileTypeError = false;
      // Reset file input
      const fileInput = document.getElementById("file-attachment");
      if (fileInput) fileInput.value = "";
    },

    goBack() {
      this.$router.push("/dashboard/support");
    },

    getMessageClass(message, index) {
      return {
        "message-container": true,
        "admin-message": message.admin_id,
        "user-message": !message.admin_id,
        "first-message": index === 0,
        "latest-message": index === this.ticketMessages.length - 1,
      };
    },

    scrollToBottom() {
      // Update selector to match the new structure
      const container = document.querySelector(
          ".h-\\[500px\\].overflow-y-auto"
      );
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },

    // Save draft while typing
    handleReplyInput() {
      clearTimeout(this.typingTimer);
      this.draftSaved = false;

      this.typingTimer = setTimeout(() => {
        this.saveReplyDraft();
      }, 1000);
    },

    saveReplyDraft() {
      if (!this.replyContent.trim()) {
        this.clearReplyDraft();
        return;
      }

      this.isSavingDraft = true;

      try {
        localStorage.setItem(
            `ticket-reply-draft-${this.ticketId}`,
            this.replyContent
        );
        this.draftSaved = true;

        // Reset saved status after a few seconds
        setTimeout(() => {
          this.draftSaved = false;
        }, 3000);
      } catch (e) {
        console.error("Error saving draft", e);
      } finally {
        this.isSavingDraft = false;
      }
    },

    loadReplyDraft() {
      try {
        const draft = localStorage.getItem(
            `ticket-reply-draft-${this.ticketId}`
        );
        if (draft) {
          this.replyContent = draft;
        }
      } catch (e) {
        console.error("Error loading draft", e);
      }
    },

    clearReplyDraft() {
      try {
        localStorage.removeItem(`ticket-reply-draft-${this.ticketId}`);
        this.draftSaved = false;
      } catch (e) {
        console.error("Error clearing draft", e);
      }
    },

    // Add explicit methods for opening and closing the modal
    openConfirmModal() {
      console.log("Opening confirm modal");
      this.showConfirmCloseModal = true;
    },

    closeConfirmModal() {
      console.log("Closing confirm modal");
      this.showConfirmCloseModal = false;
    },
  },
  created() {
    this.fetchTicketDetails();
  },
  mounted() {
    // Scroll to bottom of messages when component is mounted
    this.$nextTick(() => {
      this.scrollToBottom();
    });
  },
  watch: {
    "$route.params.id": function (newId) {
      if (newId && newId !== (this.ticket?.id || "").toString()) {
        this.fetchTicketDetails();
      }
    },
    replyContent: function () {
      this.handleReplyInput();
    },
    "ticketMessages.length": function () {
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
  },
};
</script>

<template>
  <div class="h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header section -->
    <div
        class="flex items-center gap-4 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
    >
      <button
          aria-label="Go back"
          class="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-customGold"
          @click="goBack"
      >
        <FontAwesomeIcon
            :icon="faArrowLeft"
            class="h-5 w-5 text-gray-700 dark:text-gray-300"
        />
      </button>
      <h1
          class="text-2xl font-bold text-gray-800 dark:text-white flex items-center"
      >
        <FontAwesomeIcon
            :icon="faComments"
            class="mr-3 text-customGold hidden sm:inline-block"
        />
        Support Ticket #{{ ticketId }}
      </h1>
    </div>

    <!-- Loading state -->
    <div
        v-if="loading"
        class="flex justify-center items-center py-32 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
    >
      <div class="flex flex-col items-center">
        <div
            class="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700 border-t-customGold"
        ></div>
        <p class="mt-6 text-gray-500 dark:text-gray-400 text-lg">
          Loading ticket details...
        </p>
      </div>
    </div>

    <!-- Error state - Ticket not found -->
    <div
        v-else-if="!ticket.id"
        class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-12 text-center max-w-2xl mx-auto"
    >
      <div
          class="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <FontAwesomeIcon
            :icon="faExclamationTriangle"
            class="h-10 w-10 text-yellow-500"
        />
      </div>
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">
        Ticket Not Found
      </h2>
      <p class="text-gray-600 dark:text-gray-400 mb-8 text-lg">
        The requested ticket could not be found or you don't have permission to
        view it.
      </p>
      <button
          class="px-6 py-3 bg-customGold hover:bg-amber-500 text-gray-900 font-medium rounded-lg transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-customGold"
          @click="goBack"
      >
        Return to Support Center
      </button>
    </div>

    <!-- Main ticket content -->
    <div v-else
         class="space-y-6"
    >
      <!-- Ticket header card -->
      <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <!-- Status indicator strip -->
        <div :class="ticketStatusClass"
             class="h-1.5"
        ></div>

        <!-- Ticket subject and status bar -->
        <div class="px-6 pt-6 pb-2">
          <div
              class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4"
          >
            <h2
                class="text-2xl font-bold text-gray-900 dark:text-white leading-tight"
            >
              {{ ticket.subject }}
            </h2>

            <div class="flex items-center gap-3 flex-shrink-0">
              <span
                  :class="[
                  ticketStatusBadgeClass,
                  'px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap flex items-center',
                ]"
              >
                <FontAwesomeIcon :icon="statusIcon"
                                 class="mr-1.5"
                />
                {{ statusDisplayName }}
              </span>

              <button
                  v-if="canCloseTicket"
                  class="px-4 py-1.5 bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 rounded-full text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-800/60 transition-colors whitespace-nowrap flex items-center"
                  @click.prevent="openConfirmModal"
              >
                <FontAwesomeIcon :icon="faTimesCircle"
                                 class="mr-1.5"
                />
                Close Ticket
              </button>
            </div>
          </div>

          <!-- On-Hold Warning Banner -->
          <div
              v-if="isOnHoldTicket"
              class="mb-5 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg px-4 py-3 border-l-4 border-yellow-400"
          >
            <div class="flex items-center">
              <FontAwesomeIcon
                  :icon="faBell"
                  class="text-yellow-600 dark:text-yellow-400 mr-3 h-5 w-5"
              />
              <p class="text-sm text-yellow-800 dark:text-yellow-200">
                <span class="font-semibold">Action required:</span> This ticket
                                                                    is awaiting your response. Our support team needs
                                                                    additional
                                                                    information from you.
              </p>
            </div>
          </div>
        </div>

        <!-- Metadata section -->
        <div
            class="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-4 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
        >
          <div class="flex flex-col">
            <span
                class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1"
            >Created</span
            >
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <FontAwesomeIcon
                  :icon="faCalendarAlt"
                  class="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"
              />
              <span>{{ formatDate(ticket.created_at) }}</span>
            </div>
          </div>

          <div class="flex flex-col">
            <span
                class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1"
            >Last Updated</span
            >
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <FontAwesomeIcon
                  :icon="faClock"
                  class="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"
              />
              <span>{{ getRelativeTime(ticket.updated_at) }}</span>
            </div>
          </div>

          <div class="flex flex-col">
            <span
                class="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1"
            >Department</span
            >
            <div class="flex items-center text-gray-700 dark:text-gray-300">
              <FontAwesomeIcon
                  :icon="faUserCog"
                  class="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400"
              />
              <span>{{ ticket.helpdesk?.name || "General Support" }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Conversation section -->
      <div
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden"
      >
        <!-- Conversation header -->
        <div
            class="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center"
        >
          <h3
              class="text-lg font-semibold text-gray-800 dark:text-gray-200 flex items-center"
          >
            <FontAwesomeIcon :icon="faComments"
                             class="mr-2 text-customGold"
            />
            Conversation History
          </h3>
          <span
              class="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs font-medium px-2.5 py-1 rounded-full"
          >
            {{ ticketMessages.length }}
            {{ ticketMessages.length === 1 ? "message" : "messages" }}
          </span>
        </div>

        <!-- Fixed Height Message Container -->
        <div
            class="h-[500px] overflow-y-auto px-6 py-4 bg-gray-50 dark:bg-gray-900/20"
        >
          <!-- Empty state when no messages -->
          <div
              v-if="ticketMessages.length === 0 && !ticket.content"
              class="text-center py-16 px-4"
          >
            <div
                class="mx-auto w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4"
            >
              <FontAwesomeIcon
                  :icon="faComments"
                  class="text-3xl text-gray-400 dark:text-gray-500"
              />
            </div>
            <h3
                class="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              No messages yet
            </h3>
            <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
              {{
                isClosedTicket
                    ? "This ticket has been closed without any responses."
                    : "Start the conversation by sending a message below."
              }}
            </p>
          </div>

          <!-- Message Thread -->
          <div v-else
               class="space-y-6"
          >
            <!-- Initial Ticket Message -->
            <div
                v-if="ticket.content"
                class="message-container user-message first-message"
            >
              <div class="message-header">
                <div class="flex items-center">
                  <div class="message-avatar">
                    <FontAwesomeIcon
                        :icon="faUser"
                        class="text-gray-400 dark:text-gray-500"
                    />
                  </div>
                  <div>
                    <h4 class="message-name">You</h4>
                    <p class="message-time">
                      {{ formatDate(ticket.created_at) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="message-content">
                <p class="whitespace-pre-wrap">{{ ticket.content }}</p>
              </div>
            </div>

            <!-- Message Replies -->
            <div
                v-for="(message, index) in ticketMessages"
                :key="message.id || index"
                :class="getMessageClass(message, index)"
            >
              <div class="message-header">
                <div class="flex items-center">
                  <div class="message-avatar">
                    <FontAwesomeIcon
                        :class="
                        message.admin_id
                          ? 'text-customGold'
                          : 'text-gray-400 dark:text-gray-500'
                      "
                        :icon="message.admin_id ? faUserCog : faUser"
                    />
                  </div>
                  <div>
                    <h4 class="message-name">
                      {{
                        message.admin_id
                            ? message.admin?.name || "Support Staff"
                            : "You"
                      }}
                    </h4>
                    <p class="message-time">
                      {{ formatDate(message.created_at) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="message-content">
                <p class="whitespace-pre-wrap">{{ message.content }}</p>

                <!-- Attachment display if present -->
                <div
                    v-if="message.attachment_url"
                    class="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700"
                >
                  <a
                      :href="message.attachment_url"
                      class="attachment-link group flex items-start"
                      target="_blank"
                  >
                    <div
                        class="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mr-3 flex-shrink-0"
                    >
                      <FontAwesomeIcon
                          :icon="faPaperclip"
                          class="text-customGold"
                      />
                    </div>
                    <div class="flex-grow min-w-0">
                      <p
                          class="text-sm font-medium text-gray-700 dark:text-gray-300 truncate group-hover:text-customGold transition-colors"
                      >
                        {{ message.attachment_url.split("/").pop() }}
                      </p>
                      <p
                          v-if="message.attachment_size"
                          class="text-xs text-gray-500 dark:text-gray-400"
                      >
                        {{ (message.attachment_size / 1024).toFixed(1) }} KB
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Reply form -->
        <div
            v-if="!isClosedTicket"
            class="border-t border-gray-200 dark:border-gray-700 px-6 py-5 bg-white dark:bg-gray-800"
        >
          <label
              class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              for="reply-content"
          >
            Your Reply
          </label>

          <!-- On-hold ticket prompt -->
          <div
              v-if="isOnHoldTicket"
              class="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-md text-sm text-yellow-800 dark:text-yellow-200"
          >
            <div class="flex">
              <FontAwesomeIcon
                  :icon="faReply"
                  class="text-yellow-500 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0"
              />
              <p>
                <strong>Please respond:</strong> The support team is waiting for
                                                 your reply to continue assisting you.
              </p>
            </div>
          </div>

          <div class="relative">
            <textarea
                id="reply-content"
                v-model="replyContent"
                :disabled="submitting"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-customGold focus:border-transparent shadow-sm resize-none placeholder-gray-400 dark:bg-gray-700 dark:text-white"
                placeholder="Type your reply here..."
                rows="4"
            ></textarea>

            <!-- Draft saved indicator -->
            <transition name="fade">
              <div
                  v-if="draftSaved || isSavingDraft"
                  class="absolute right-3 bottom-3 text-xs bg-white dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center px-2 py-1 rounded-md shadow-sm"
              >
                <div
                    v-if="isSavingDraft"
                    class="mr-1 w-3 h-3 rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-customGold animate-spin"
                ></div>
                {{ isSavingDraft ? "Saving draft..." : "Draft saved" }}
              </div>
            </transition>
          </div>

          <!-- File attachment area -->
          <div class="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div class="flex items-center">
              <label
                  class="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  for="file-attachment"
              >
                <FontAwesomeIcon :icon="faPaperclip"
                                 class="mr-2"
                />
                <span>Add attachment</span>
                <input
                    id="file-attachment"
                    :disabled="submitting"
                    class="sr-only"
                    type="file"
                    @change="handleFileChange"
                />
              </label>
              <span class="ml-2 text-xs text-gray-500 dark:text-gray-400"
              >(Max: 5MB)</span
              >
            </div>

            <button
                :class="{ 'opacity-60 cursor-not-allowed': replyButtonDisabled }"
                :disabled="replyButtonDisabled"
                class="px-5 py-2.5 bg-customGold hover:bg-amber-500 text-gray-900 font-medium rounded-lg shadow-sm transition flex items-center"
                type="button"
                @click="submitReply"
            >
              <FontAwesomeIcon
                  :class="{ 'animate-spin': submitting }"
                  :icon="submitting ? faSpinner : faPaperPlane"
                  class="mr-2"
              />
              {{ submitting ? "Sending..." : "Send Reply" }}
            </button>
          </div>

          <!-- File attachment preview -->
          <div
              v-if="fileAttachment"
              class="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-700"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center overflow-hidden">
                <div
                    class="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center mr-3 flex-shrink-0"
                >
                  <FontAwesomeIcon
                      :icon="faPaperclip"
                      class="text-customGold"
                  />
                </div>
                <div class="min-w-0 flex-1">
                  <p
                      class="text-sm font-medium text-gray-900 dark:text-gray-100 truncate"
                  >
                    {{ fileAttachment.name }}
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    {{ getAttachmentSize }}
                  </p>
                </div>
              </div>
              <button
                  aria-label="Remove attachment"
                  class="p-1.5 bg-gray-200 dark:bg-gray-600 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
                  type="button"
                  @click="removeAttachment"
              >
                <FontAwesomeIcon :icon="faTimesCircle"
                                 class="text-lg"
                />
              </button>
            </div>
          </div>

          <!-- File error message -->
          <div
              v-if="showFileTypeError"
              class="mt-3 flex items-start p-3 rounded-md bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-sm text-red-700 dark:text-red-400"
          >
            <FontAwesomeIcon
                :icon="faExclamationTriangle"
                class="mt-0.5 mr-2 flex-shrink-0"
            />
            <span>{{ errorMessage }}</span>
          </div>
        </div>

        <!-- Closed ticket message -->
        <div
            v-else
            class="border-t border-gray-200 dark:border-gray-700 flex flex-col items-center text-center p-8 bg-gray-50 dark:bg-gray-900/20"
        >
          <div
              class="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-4"
          >
            <FontAwesomeIcon
                :icon="faTimesCircle"
                class="text-red-500 dark:text-red-400 text-2xl"
            />
          </div>
          <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            This ticket is closed
          </h4>
          <p class="text-gray-500 dark:text-gray-400 text-base mb-6 max-w-md">
            You can no longer reply to this conversation. Please create a new
            ticket if you need further assistance.
          </p>
          <button
              class="px-5 py-2.5 bg-customGold hover:bg-amber-500 text-gray-900 font-medium rounded-lg shadow-sm transition flex items-center"
              @click="goBack"
          >
            <FontAwesomeIcon :icon="faArrowLeft"
                             class="mr-2"
            />
            Return to Support Center
          </button>
        </div>
      </div>
    </div>

    <!-- Confirm Close Ticket Modal -->
    <Modal
        v-if="showConfirmCloseModal"
        title="Close Support Ticket"
        @close="closeConfirmModal"
    >
      <div class="p-6">
        <div class="flex items-start mb-6">
          <div
              class="mr-4 flex-shrink-0 w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"
          >
            <FontAwesomeIcon
                :icon="faTimesCircle"
                class="text-red-600 dark:text-red-400 text-xl"
            />
          </div>
          <div>
            <h3 class="text-xl font-medium text-gray-900 dark:text-white mb-2">
              Are you sure you want to close this ticket?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Closing this ticket will mark it as resolved and prevent further
              replies. This action cannot be undone.
            </p>
          </div>
        </div>

        <div class="flex justify-end space-x-4 mt-8">
          <button
              class="px-5 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              type="button"
              @click="closeConfirmModal"
          >
            Cancel
          </button>
          <button
              class="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition"
              type="button"
              @click="handleCloseTicket"
          >
            Close Ticket
          </button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped></style>
