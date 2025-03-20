import api from "@/config/axios"

export const productService = {
    getAllProducts() {
        return api.post('/guest/product/get_list')
    },
}