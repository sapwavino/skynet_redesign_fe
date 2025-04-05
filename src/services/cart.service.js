import api from "@/config/axios"
import store from "@/store/index.js";

export const cartService = {
    getAllCartItems() {
        return api.post("/client/cart/get");
    },
    addItemToCart(item, type) {
        if (type === null || type === undefined || type === '') {
            console.error("Enter a cart item type e.g domain, hosting, etc")
            throw "Enter a cart item type e.g domain, hosting, etc"
        }
        if (type === 'domain') {
            return api.post('/client/cart/add_item', {
                id: item.id,
                action: item.action,
                multiple: item.multiple,
                register_sld: item.register_sld,
                register_tld: item.register_tld,
                register_years: item.register_years,
            })
        }
        else if (type === 'hosting') {
            return api.post('/client/cart/add_item', {
                id: item.id,
                action: item.action,
                multiple: item.multiple,
                "quantity": item.quantity,
                "period": item.period,
                "domain": item.domain,
            })
        }
    },
    removeItemFromCart(itemId) {
        return api.post('/client/cart/remove_item', {
            id: itemId
        })
    }
}