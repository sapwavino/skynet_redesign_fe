import api from "@/config/axios"

export const orderService = {
    getAll() {
        return api.post('/client/order/get_list')
    }
}