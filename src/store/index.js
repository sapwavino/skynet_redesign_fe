import {createStore} from "vuex";
// Create a new store instance or import from module.
const store = createStore({

    state: {
        domainToSearch: "",
        cart: {
            items: [
                // {
                //     name: "anewdomain.com",
                //     price: 90,
                //     quantity: 1,
                //     description: "Domain registration",
                //     type: "domain"
                // },
                // {
                //     name: "Product 2",
                //     description: 'G3 VPS',
                //     price: 100,
                //     quantity: 2,
                //     type: "cloud"
                // },
                // {
                //     name: "Product 3",
                //     description: 'CPanel Hosting',
                //     price: 700,
                //     quantity: 1,
                //     type: "hosting"
                // }
            ],
            total: 0,
        },
        showCookieModal: true,
        isLoggedIn: false,
        user:{
            info:{},
            services:{
                domain: [
                    {
                        id: '123',
                        name: "anewdomain.com",
                        price: 90,
                        description: "Domain registration",
                    },
                    {
                        id: '456',
                        name: "anotherdomain.com",
                        price: 90,
                        description: "Domain registration",
                    },

                ],
                hosting: [
                    {
                        id: '789',
                        name: "Hosting-001",
                        type: "Python",
                        price: 500,
                        description: "CPanel Hosting",
                        active: true,
                        domain: 'anewdomain.com'
                    },
                    {
                        id: '234',
                        name: "Hosting-002",
                        type: "Wordpress",
                        price: 500,
                        description: "CPanel Hosting",
                        active: true,
                        domain: 'anotherdomain.com'
                    }
                ],
                cloud: [
                    {
                        id: '345',
                        name: "Cloud-001",
                        type: "G3 VPS",
                        price: 2000,
                        description: "G3 VPS",
                        active: true
                    },
                    {
                        id: '345',
                        name: "Cloud-002",
                        type: "G2 VPS",
                        price: 2000,
                        description: "G2 VPS",
                        active: false
                    },
                    {
                        id: '456',
                        name: "Cloud-003",
                        type: "G3 VPS",
                        price: 2000,
                        description: "G3 VPS",
                        active: true
                    }
                ],
                email: [],
                database: [],
            },
            orders: [],
            invoices: [],
            wallet: [],
            notifications: [],
            support: {
                tickets: [],
            }
        }
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
        LOGIN(state) {
            state.isLoggedIn = true
        },
        LOGOUT(state) {
            state.isLoggedIn = false
        },
    },
    actions: {
        updateSearchDomain({commit}, domain) {
            commit("UPDATE_DOMAIN_TO_SEARCH", domain);
        },
        showCookieModal({commit}) {
            commit("SHOW_COOKIE_MODAL", true);
        },
        hideCookieModal({commit}) {
            commit("HIDE_COOKIE_MODAL", false);
            window.localStorage.setItem('showCookieModal', JSON.stringify(false));
        },
        login({commit}) {
            commit("LOGIN");
            window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
        },
        logout({commit}) {
            commit("LOGOUT");
            window.localStorage.removeItem('isLoggedIn');
        }
    },
});

export default store;