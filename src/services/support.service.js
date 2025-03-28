import api from "@/config/axios"

export const supportService = {
    getTicketsList(params = {}) {
        return api.post('/client/support/ticket_get_list', null, { params })
    },

    getTicketDetails(id) {
        return api.post('/client/support/ticket_get',id)
    },

    getHelpdeskPairs() {
        return api.post('/client/support/helpdesk_get_pairs')
    },

    createTicket(ticketData) {
        return api.post('/client/support/ticket_create', ticketData)
    },

    replyToTicket(replyData) {
        return api.post('/client/support/ticket_reply', replyData)
    },

    closeTicket(id) {
        return api.post('/client/support/ticket_close', null, {
            params: { id }
        })
    }
}