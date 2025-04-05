import api from "@/config/axios"
import store from "@/store/index.js";

export const cartService = {
    getAllCartItems(sessionID) {
        return api.post("/client/cart/get");
    },
    addItemToCart(item) {
        return api.post('/client/cart/add_item', {
            id: item.id,
            action: item.action,
            multiple: item.multiple,
            register_sld: item.register_sld,
            register_tld: item.register_tld,
            register_years: item.register_years,
        })
    },
    removeItemFromCart(itemId) {
        return api.post('/guest/cart/remove_item', {
            item_id: itemId
        })
    }
}