import { createStore } from "vuex";
// Create a new store instance or import from module.
const store = createStore({
    /* state, actions, mutations */
    state: {
        domainToSearch: "",
        cart: {
            items: [
                {
                    name: "Product 1",
                    price: 90,
                    quantity: 1,
                    description: "Domain registration",
                    type: "domain"
                },
                {
                    name: "Product 2",
                    price: 100,
                    quantity: 2,
                    type: "cloud"
                },
                {
                    name: "Product 3",
                    price: 700,
                    quantity: 1,
                    type: "hosting"
                },
                {
                    name: "Product 4",
                    price: 200,
                    quantity: 1,
                    type: "database"
                }
            ],
            total: 0,
        },
        showCookieModal: true,
    },
    mutations: {
        UPDATE_DOMAIN_TO_SEARCH(state, domain) {
            state.domainToSearch = domain;
        },
        ADD_ITEM_TO_CART(state, item) {
            state.cart.items.push(item);
        },
        SHOW_COOKIE_MODAL(state) {
            state.showCookieModal = true;
        },
        HIDE_COOKIE_MODAL(state) {
            state.showCookieModal = false;
        },
    },
    actions: {
        updateSearchDomain({ commit }, domain) {
            commit("UPDATE_DOMAIN_TO_SEARCH", domain);
        },
        showCookieModal({ commit }) {
            commit("SHOW_COOKIE_MODAL", true);
        },
        hideCookieModal({ commit }) {
            commit("HIDE_COOKIE_MODAL", false);
            window.localStorage.setItem('showCookieModal', JSON.stringify(false));
        },
    },
});

export default store;