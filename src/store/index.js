import { createStore } from "vuex";
// Create a new store instance or import from module.
const store = createStore({
    /* state, actions, mutations */
    state: {
        domainToSearch: "",
        cart: {
            items: [],
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
        }
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
        }
    },
});

export default store;