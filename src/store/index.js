import {createStore} from "vuex";
import {createToast} from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'
import {v4 as uuidv4} from "uuid";
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
        },
        showCookieModal: true,
        isLoggedIn: false,
        user: {
            info: {
                full_name: "John Doe",
                first_name: "John",
                last_name: "Doe",
                email: "johndoe@example.com",
                phone: "+1234567890",
                country: "United States",
                address: "123 Main St, Anytown, USA",
                gender: 'male'
            },
            services: {
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
                        id: 'f163d394-800d-40a3-b07f-9262cc9b4034',
                        name: "CL_G3_001",
                        type: "cloud",
                        price: 2000,
                        description: "G3 VPS",
                        active: true,
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
                    },
                    {
                        id: "63a97cf6-51f1-4a7c-b50e-f5d5cbbbac53",
                        name: "CL_G2_002",
                        type: "cloud",
                        price: 2000,
                        description: "G2 VPS",
                        active: false,
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
                    },
                    {
                        id: "e25fa6c0-0393-45ac-8cd1-723f80bb6524",
                        name: "CL_G3_003",
                        type: "cloud",
                        price: 2000,
                        description: "G3 VPS",
                        active: true,
                        billing_cycle: "monthly",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2022-02-01'),
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
        },
        addItemToCart({commit}, item) {
            commit("ADD_ITEM_TO_CART", item);
            createToast(
                "Item added to cart: " + item.name,
                {
                    type: 'info',
                    duration: 2000,
                }
            )
        }
    },
    getters: {
        cartTotal: (state) => {
            return state.cart.items.reduce((total, item) => {
                return (parseFloat(total + item.price)).toFixed(2);
            }, 0); // Start with a total of 0
        }
    }
});

export default store;