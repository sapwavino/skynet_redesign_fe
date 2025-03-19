import api from "@/config/axios"

export const invoiceService = {
    getAllInvoices() {
        return api.post('/client/invoice/get_list')
    },
    getAllTransactions() {
        return api.post('/client/invoice/get_list')
    },

}