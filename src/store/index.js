import { createStore } from "vuex";
// Create a new store instance or import from module.
const store = createStore({
    /* state, actions, mutations */
    state: {
        domainToSearch: "",
        cart: {
            items: [],
            total: 0,
        }
    },
    mutations: {
        UPDATE_DOMAIN_TO_SEARCH(state, domain) {
            state.domainToSearch = domain;
        },
        ADD_ITEM_TO_CART(state, item) {
            state.cart.items.push(item);
        },
    },
    actions: {
        updateSearchDomain({ commit }, domain) {
            commit("UPDATE_DOMAIN_TO_SEARCH", domain);
        },
    },
});

export default store;