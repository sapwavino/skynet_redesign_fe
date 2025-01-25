import { createStore } from "vuex";
// Create a new store instance or import from module.
const store = createStore({
    /* state, actions, mutations */
    state: {
        domainToSearch: "",
    },
    mutations: {
        UPDATE_DOMAIN_TO_SEARCH(state, domain) {
            state.domainToSearch = domain;
        },
    },
    actions: {
        updateSearchDomain({ commit }, domain) {
            commit("UPDATE_DOMAIN_TO_SEARCH", domain);
        },
    },
});

export default store;