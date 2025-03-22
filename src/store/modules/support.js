import { supportService } from "@/services/support.service";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

export default {
    namespaced: true,

    state: () => ({
        tickets: [],
        currentTicket: null,
        helpdesks: [],
        error: null,
        initialized: false
    }),

    mutations: {
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_TICKETS(state, tickets) {
            state.tickets = tickets || [];
        },
        ADD_TICKET(state, ticket) {
            state.tickets = [ticket, ...state.tickets];
        },
        SET_CURRENT_TICKET(state, ticket) {
            state.currentTicket = ticket;
        },
        SET_HELPDESKS(state, helpdesks) {
            state.helpdesks = helpdesks;
        },
        UPDATE_TICKET(state, updatedTicket) {
            const index = state.tickets.findIndex(t => t.id === updatedTicket.id);
            if (index !== -1) {
                state.tickets[index] = updatedTicket;
            }
            if (state.currentTicket?.id === updatedTicket.id) {
                state.currentTicket = updatedTicket;
            }
        },
        SET_INITIALIZED(state, value) {
            state.initialized = value;
        }
    },

    actions: {
        async initialize({ dispatch, state, commit }) {
            if (state.initialized) return;

            console.log("Initializing support module...");
            try {
                const [ticketsResponse, helpdesksResponse] = await Promise.all([
                    supportService.getTicketsList(),
                    supportService.getHelpdeskPairs()
                ]);

                if (ticketsResponse.data.error) {
                    throw new Error(ticketsResponse.data.error.message || 'Failed to fetch tickets');
                }

                if (helpdesksResponse.data.error) {
                    throw new Error(helpdesksResponse.data.error.message || 'Failed to fetch helpdesks');
                }

                const helpdesks = Object.entries(helpdesksResponse.data.result || {})
                    .map(([id, name]) => ({ id, name }));

                commit('SET_TICKETS', ticketsResponse.data.result?.list || []);
                commit('SET_HELPDESKS', helpdesks);
                commit('SET_INITIALIZED', true);

                console.log(`✅ Support module initialized: ${ticketsResponse.data.result?.list.length} tickets, ${helpdesks.length} helpdesks`);
            } catch (error) {
                console.error('❌ Failed to initialize support module:', error);
                commit('SET_ERROR', error.message);
                createToast(error.message || "Failed to initialize support module", {
                    type: "error",
                    timeout: 5000,
                    position: "top-right",
                    backgroundColor: "#f44336",
                    toastBackgroundColor: "#f44336"
                });
            }
        },

        async getTickets({ commit, rootState }) {
            // Don't fetch if already loading
            if (rootState.loading) return;

            try {
                commit('SET_ERROR', null);
                rootState.loading = true;

                const { data } = await supportService.getTicketsList();
                if (data.error) {
                    throw new Error(data.error.message || 'Failed to fetch tickets');
                }

                commit('SET_TICKETS', data.result?.list || []);
                return data.result?.list;
            } catch (error) {
                commit('SET_ERROR', error.message);
                createToast(error.message || "Failed to fetch tickets", {
                    type: "error",
                    position: "top-right",
                    backgroundColor: "#f44336",
                    toastBackgroundColor: "#f44336"
                });
                return [];
            } finally {
                rootState.loading = false;
            }
        },

        async getHelpdeskPairs({ commit, rootState, state }) {
            // Don't fetch if we already have helpdesks or are loading
            if (state.helpdesks.length > 0 || rootState.loading) return state.helpdesks;

            try {
                commit('SET_ERROR', null);
                rootState.loading = true;

                const { data } = await supportService.getHelpdeskPairs();
                if (data.error) {
                    throw new Error(data.error.message || 'Failed to fetch helpdesks');
                }

                const helpdesks = Object.entries(data.result || {})
                    .map(([id, name]) => ({ id, name }));

                commit('SET_HELPDESKS', helpdesks);
                return helpdesks;
            } catch (error) {
                commit('SET_ERROR', error.message);
                createToast(error.message || "Failed to fetch helpdesks", {
                    type: "error",
                    position: "top-right",
                    backgroundColor: "#f44336",
                    toastBackgroundColor: "#f44336"
                });
                return [];
            } finally {
                rootState.loading = false;
            }
        },

        async createTicket({ commit, dispatch, rootState }, ticketData) {
            if (rootState.loading) return;

            try {
                commit('SET_ERROR', null);
                rootState.loading = true;

                const { data } = await supportService.createTicket(ticketData);
                if (data.error) {
                    throw new Error(data.error.message || 'Failed to create ticket');
                }

                const newTicket = data.result;

                // Immediate optimistic update for better UX
                if (newTicket) {
                    commit('ADD_TICKET', newTicket);
                }

                // Refresh tickets list from the server to ensure consistency
                await dispatch('getTickets');

                createToast('Ticket created successfully', {
                    type: 'success',
                    position: "top-right",
                    backgroundColor: "#4caf50",
                    toastBackgroundColor: "#4caf50"
                });

                return newTicket;
            } catch (error) {
                commit('SET_ERROR', error.message);
                createToast(error.message || "Failed to create ticket", {
                    type: "error",
                    position: "top-right",
                    backgroundColor: "#f44336",
                    toastBackgroundColor: "#f44336"
                });
                throw error;
            } finally {
                rootState.loading = false;
            }
        },

        // async getTicketById({ commit, state, dispatch }, ticketId) {
        //     try {
        //         commit('SET_ERROR', null);

        //         // First check if we have it locally
        //         const existingTicket = state.tickets.find(t => t.id === ticketId);

        //         if (existingTicket) {
        //             commit('SET_CURRENT_TICKET', existingTicket);
        //             return existingTicket;
        //         }

        //         // If not, fetch it from API
        //         const { data } = await supportService.getTicketById(ticketId);

        //         if (data.error) {
        //             throw new Error(data.error.message || 'Failed to fetch ticket details');
        //         }

        //         const ticket = data.result;
        //         commit('SET_CURRENT_TICKET', ticket);

        //         // Also update the tickets list to include this ticket
        //         if (!state.tickets.some(t => t.id === ticketId)) {
        //             commit('UPDATE_TICKET', ticket);
        //         }

        //         return ticket;
        //     } catch (error) {
        //         commit('SET_ERROR', error.message);
        //         createToast(error.message || "Failed to fetch ticket details", {
        //             type: "error",
        //             position: "top-right",
        //             backgroundColor: "#f44336",
        //             toastBackgroundColor: "#f44336"
        //         });
        //         return null;
        //     }
        // },

        async replyToTicket({ commit, dispatch, rootState }, replyData) {
            // rootState.loading = true;
            
            try {
                const { id, content } = replyData;
                
                // First, send the reply text
                const { data } = await supportService.replyToTicket({ id, content });
                
                if (data.error) {
                    throw new Error(data.error.message || "Failed to reply to ticket");
                }
                
                // If there's a file attachment, upload it in a separate request
                // if (attachment) {
                //     try {
                //         const uploadResponse = await supportService.uploadAttachment(id, attachment);
                        
                //         if (uploadResponse.data.error) {
                //             console.error("Attachment upload failed:", uploadResponse.data.error);
                //             // Continue execution even if attachment fails - we already sent the text reply
                //         }
                //     } catch (uploadError) {
                //         console.error("Error uploading attachment:", uploadError);
                //         // Continue execution - the text reply was already sent
                //     }
                // }
                
                // Fetch the updated ticket to get the new message
                await dispatch("getTicketById", id);
                
                return true;
            } catch (error) {
                console.error("Error replying to ticket:", error);
                throw error;
            } 
        }
    },

    getters: {
        getTicketById: state => id => state.tickets.find(ticket => ticket.id === id),
        sortedTickets: state => [...state.tickets].sort((a, b) =>
            new Date(b.created_at || 0) - new Date(a.created_at || 0)
        ),
        helpdesksAsOptions: state => state.helpdesks.map(({ id, name }) => ({
            value: id,
            label: name
        })),
        openTickets: state => state.tickets.filter(ticket => ticket.status === 'open'),
        closedTickets: state => state.tickets.filter(ticket => ticket.status === 'closed'),
        inProgressTickets: state => state.tickets.filter(ticket => ticket.status === 'in_progress')
    }
};