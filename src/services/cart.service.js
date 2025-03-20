import api from "@/config/axios"

export const cartService = {
    getAllCartItems() {
        return api.post('/guest/cart/get')
    },
    addItemToCart(item) {
        return api.post('/guest/cart/add_item', item)
    },
    removeItemFromCart(itemId) {
        return api.post('/guest/cart/remove_item', {
            item_id: itemId
        })
    }
}