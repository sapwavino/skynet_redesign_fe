import api from "@/config/axios"
import store from "@/store/index.js";

export const cartService = {
    getAllCartItems(sessionID = null) {
        if (sessionID) {
            return api.post("/guest/cart/getx", {
                sessionID: sessionID,
            });
        }
        // No sessionID implies authenticated user
        return api.post("/guest/cart/getx");
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