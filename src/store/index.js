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
            info:{
                full_name: "John Doe",
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@example.com",
                phone: "+1234567890",
                country: "United States",
                address: "123 Main St, Anytown, USA",
                gender: 'male'
            },
            services:{
                domains: [
                    {
                        id: '123',
                        name: "anewdomain.com",
                        price: 90,
                        description: "Domain registration",
                        active: true,
                        billing_cycle: "annually",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
                    },
                    {
                        id: '456',
                        name: "anotherdomain.com",
                        price: 90,
                        description: "Domain registration",
                        active: false,
                        billing_cycle: "annually",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
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
                        domain: 'anewdomain.com',
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
                    },
                    {
                        id: '234',
                        name: "Hosting-002",
                        type: "Wordpress",
                        price: 500,
                        description: "CPanel Hosting",
                        active: true,
                        domain: 'anotherdomain.com',
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
                    },
                    {
                        id: '345',
                        name: "Hosting-003",
                        type: "Node",
                        price: 500,
                        description: "CPanel Hosting",
                        active: false,
                        domain: 'anewdomain2.com',
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
                    },
                    {
                        id: '678',
                        name: "Hosting-012",
                        type: "Undecided",
                        price: 500,
                        description: "Plesk",
                        active: true,
                        domain: 'anotherdomain4.com',
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
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
        },
        preferredCurrency: "NGN",
    },
    mutations: {
        UPDATE_DOMAIN_TO_SEARCH(state, domain) {
            state.domainToSearch = domain;
        },
        UPDATE_PREFERRED_CURRENCY(state, currency) {
            state.preferredCurrency = currency;
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
        updatePreferredCurrency({commit}, currency) {
            commit("UPDATE_PREFERRED_CURRENCY", currency);
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