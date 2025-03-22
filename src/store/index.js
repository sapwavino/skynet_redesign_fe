import {createStore} from "vuex";
import {createToast} from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'
import auth from "./modules/auth";
import support from "./modules/support"
import {domainService} from "@/services/domain.service.js";
import axios from "axios";
import {authService} from "@/services/auth.service.js";
import router from "@/router/index.js";
import {orderService} from "@/services/order.service.js";
import {currencyService} from "@/services/currency.service.js";
import {invoiceService} from "@/services/invoice.service.js";

const store = createStore({

    modules: {
        auth,
        support
    },

    state: {
        domainToSearch: "",
        cart: {
            items: [// {
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
            }, services: {
                domains: [{
                    id: '123',
                    name: "anewdomain.com.ng",
                    price: 90,
                    description: "Domain registration",
                    active: true,
                    billing_cycle: "annually",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2023-01-01'),
                }, {
                    id: '456',
                    name: "anotherdomain.com",
                    price: 90,
                    description: "Domain registration",
                    active: false,
                    billing_cycle: "annually",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }, {
                    id: '789',
                    name: "dominatetheweb.net",
                    price: 90,
                    description: "Domain registration",
                    active: true,
                    billing_cycle: "annually",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2023-01-01'),
                },

                ], hosting: [{
                    id: '789',
                    name: "Hosting-001",
                    type: "Python",
                    server_ip: '127.0.0.1',
                    server_hostname: 'cpanel.skynet.africa',
                    username: 'luka_77',
                    password: 'password',
                    bandwidth: '1024MB/month',
                    disk_quota: '1024MB',
                    hosting_plan: 'email',
                    price: 500,
                    description: "CPanel Hosting",
                    active: true,
                    domain: 'anewdomain.com',
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }, {
                    id: '234',
                    name: "Hosting-002",
                    type: "Wordpress",
                    server_ip: '127.0.0.1',
                    server_hostname: 'cpanel.skynet.africa',
                    username: '236_lebron',
                    password: 'password',
                    bandwidth: '1024MB/month',
                    disk_quota: '1024MB',
                    hosting_plan: 'email',
                    price: 500,
                    description: "CPanel Hosting",
                    active: true,
                    domain: 'anotherdomain.com',
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }, {
                    id: '345',
                    name: "Hosting-003",
                    type: "Node",
                    price: 500,
                    description: "CPanel Hosting",
                    active: false,
                    domain: 'anewdomain2.com',
                    server_ip: '127.0.0.1',
                    server_hostname: 'cpanel.skynet.africa',
                    username: 'kyrie',
                    password: 'password',
                    bandwidth: '1024MB/month',
                    disk_quota: '1024MB',
                    hosting_plan: 'email',
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }, {
                    id: '678',
                    name: "Hosting-012",
                    type: "Undecided",
                    price: 500,
                    server_ip: '127.0.0.1',
                    server_hostname: 'cpanel.skynet.africa',
                    username: 'harden',
                    password: 'password',
                    bandwidth: '1024MB/month',
                    disk_quota: '1024MB',
                    hosting_plan: 'email',
                    description: "Plesk",
                    active: true,
                    domain: 'anotherdomain4.com',
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }], cloud: [{
                    id: 'f163d394-800d-40a3-b07f-9262cc9b4034',
                    name: "CL_G3_001",
                    type: "cloud",
                    price: 2000,
                    ram: '4gb',
                    bandwidth: '1tb',
                    cores: '4v',
                    architecture: 'intel',
                    storage: '50gb',
                    location: 'nairobi',
                    status: 'online',
                    os: 'ubuntu',
                    os_version: '22.04',
                    ip_address: '212.115.024.111',
                    ipv6: '212.115.024.111',
                    description: "G3 VPS",
                    active: true,
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }, {
                    id: "63a97cf6-51f1-4a7c-b50e-f5d5cbbbac53",
                    name: "CL_G2_002",
                    type: "cloud",
                    price: 2000,
                    ram: '8gb',
                    bandwidth: '2tb',
                    cores: '4v',
                    architecture: 'intel',
                    storage: '100gb',
                    location: 'nairobi',
                    status: 'online',
                    os: 'debian',
                    os_version: '22.04',
                    ip_address: '122.145.024.111',
                    ipv6: '122.145.024.111',
                    description: "G2 VPS",
                    active: false,
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }, {
                    id: "e25fa6c0-0393-45ac-8cd1-723f80bb6524",
                    name: "CL_G3_003",
                    type: "cloud",
                    price: 2000,
                    ram: '4gb',
                    bandwidth: '1tb',
                    cores: '4v',
                    architecture: 'intel',
                    storage: '100gb',
                    location: 'nairobi',
                    status: 'online',
                    description: "G3 VPS",
                    os: 'ubuntu',
                    os_version: '20.04',
                    ip_address: '212.115.024.111',
                    ipv6: '212.115.024.111',
                    active: true,
                    billing_cycle: "monthly",
                    created_at: new Date('2022-01-01'),
                    activated_at: new Date('2022-01-01'),
                    renewal_date: new Date('2022-02-01'),
                }], email: [], database: [],
            }, orders: [], invoices: [], wallet: [], notifications: [{
                id: 1,
                title: "New Message",
                message: "You have a new message from John Doe.",
                type: "message",
                read: false,
                timestamp: "2025-02-06T10:30:00Z",
            }, {
                id: 2,
                title: "System Update",
                message: "A new system update is available. Click here to update. Lorem20 ipsum dolor sit amet, consectetur adipiscing elit.",
                type: "system",
                read: false,
                timestamp: "2025-02-06T09:15:00Z",
            }, {
                id: 3,
                title: "Reminder",
                message: "Your meeting with the product team starts in 30 minutes.",
                type: "reminder",
                read: true,
                timestamp: "2025-02-05T16:45:00Z",
            }, {
                id: 4,
                title: "Payment Received",
                message: "You received a payment of $250.00 from Jane Doe.",
                type: "payment",
                read: false,
                timestamp: "2025-02-06T12:00:00Z",
            }, {
                id: 5,
                title: "Security Alert",
                message: "Unusual login activity detected on your account.",
                type: "security",
                read: true,
                timestamp: "2025-02-04T22:10:00Z",
            },], support: {
                tickets: [],
            }
        },
        preferredCurrency: JSON.parse(localStorage.getItem('preferredCurrency')) || "NGN",
        showMobileNav: false,
        loading: false,
        loadingMessages: [
            "Whispering to the network.",
            "Finding the right frequency.",
            "Servers sipping coffee.",
            "Connecting the dots (literally).",
            "Decoding the internet whispers...",
            "Warming up the servers...",
            "Polishing the pixels...",
            // "Servers dey reason your request.",
            // "Fetching the network jollof.",
            // "Servers are doing shakara.",
            // "Fetching data, no be juju.",
            // "Fetching data like jollof rice.",
            // "Fetching data, no be beans.",
            // "Data dey come, calm down.",
            // "Server dey do shakara.",
            // "Checking if the server greeted elders.",
            // "Catching the digital molue.",
            // "Checking the village network.",
            // "Loading, no be small thing o!",
            "Building the bridge to your data."],
        currentLoadingMessage: '',
        availableTLDs: [],
        error: '',
        currencyPairs: [
            {name: 'USD', flag: '🇺🇸', text: 'US Dollar', symbol: '$'},
            {name: 'NGN', flag: '🇳🇬', text: 'Nigerian Naira', symbol: '₦'},
            {name: 'KES', flag: '🇰🇪', text: 'Kenyan Shilling', symbol: 'KSh'},
            {name: 'ZAR', flag: '🇿🇦', text: 'South African Rands', symbol: 'R'},
            {name: 'EUR', flag: '🇪🇺', text: 'European Euro', symbol: '€'},
            {name: 'GHS', flag: '🇬🇭', text: 'Ghanaian Cedis', symbol: '₵'},
            {name: 'AED', flag: '🇦🇪', text: 'Arab Emirate Dirham', symbol: 'د.إ'},
            {name: 'EGP', flag: '🇪🇬', text: 'Egyptian Pound', symbol: 'E£'},
            {name: 'CAD', flag: '🇨🇦', text: 'Canadian Dollar', symbol: '$'},
            {name: 'GBP', flag: '🇬🇧', text: 'Pound Sterling', symbol: '£'}
        ],
        orders: [],
        invoices: []
    },
    mutations: {
        UPDATE_DOMAIN_TO_SEARCH(state, domain) {
            state.domainToSearch = domain;
        },
        UPDATE_PREFERRED_CURRENCY(state, currency) {
            state.preferredCurrency = currency;
            localStorage.setItem('preferredCurrency', JSON.stringify(currency));
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
        MARK_NOTIFICATION_READ(state, id) {
            const notification = state.user.notifications.find(one => one.id === id);
            if (notification) {
                notification.read = true;
            }
        },
        SET_SHOW_MOBILE_NAV(state, value) {
            state.showMobileNav = value;
        },
        SET_LOADING(state, value) {
            state.loading = value;
        },
        SET_CURRENT_LOADING_MESSAGE(state, message) {
            state.currentLoadingMessage = message;
        },
        SET_AVAILABLE_TLDS(state, list) {
            state.availableTLDs = list;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        SET_CURRENCY_PAIRS(state, pairs) {
            state.currencyPairs = pairs;
        },
        SET_ORDERS(state, orders) {
            state.orders = orders;
        },
        SET_INVOICES(state, invoices) {
            state.invoices = invoices;
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
        addItemToCart({commit}, item) {
            commit("ADD_ITEM_TO_CART", item);
            createToast("Item added to cart: " + item.name, {
                type: 'info', duration: 2000,
            })
        },
        markNotificationAsRead({commit}, id) {
            commit("MARK_NOTIFICATION_READ", id)
        },
        setShowMobileNav({commit}, value) {
            commit("SET_SHOW_MOBILE_NAV", value);
        },
        startLoading({commit, state}) {
            commit('SET_LOADING', true);
            const randomIndex = Math.floor(Math.random() * state.loadingMessages.length);
            commit('SET_CURRENT_LOADING_MESSAGE', state.loadingMessages[randomIndex]);
        },
        stopLoading({commit}) {
            commit('SET_LOADING', false);
        },
        async initialize({commit, state, dispatch}) {
            console.log("Initializing app & user data...")

            // INIT LOGGED IN USER'S DATA
            const isLoggedIn = JSON.parse(window.localStorage.getItem('isLoggedIn'));
            if (isLoggedIn) {
                state.auth.isLoggedIn = true
                authService.me()
                    .then((response) => {
                        const {data} = response
                        state.auth.user = data.result
                        console.log(`✅Fetched authenticated user profile`)
                    })
                    .catch((error) => {
                        console.error('❌Failed to fetch authenticated user profile:', error)
                        throw new Error(error.message)
                    })
                orderService.getAll()
                    .then((response) => {
                        const {data} = response

                        if (data.error) {
                            console.error('❌Error while fetching user orders:', data.error)
                            throw new Error(data.error)
                        }
                        commit('SET_ORDERS', data.result.list)
                        console.log(`✅Initialized ${data.result.list.length} ${data.result.list.length > 1 ? 'orders' : 'order'}.`)

                    })
                    .catch((error) => {
                        console.error('Failed to initialize orders:', error)
                        commit('SET_ERROR', error)
                    })
                invoiceService.getAllInvoices()
                    .then((response) => {
                        const {data} = response

                        if (data.error) {
                            console.error('❌Error while fetching user invoices:', data.error)
                            throw new Error(data.error)
                        }
                        commit('SET_INVOICES', data.result.list)
                        console.log(`✅Initialized ${data.result.list.length} ${data.result.list.length > 1 ? 'invoices' : 'invoice'}.`)
                    })
                    .catch((error) => {
                        console.error('Failed to initialize invoices:', error)
                        commit('SET_ERROR', error)
                    })
            }

            // INIT APP DATA
            domainService.availableTLDs()
                .then((response) => {
                    const {data} = response

                    if (data.error) {
                        console.error('❌Error while fetching available TLDs:', data.error)
                        commit('SET_ERROR', data.error)
                        throw new Error(data.error.message || 'Error while fetching available TLDs:')
                    }

                    commit('SET_AVAILABLE_TLDS', data.result);
                    console.log(`✅Initialized ${data.result.length} TLDs.`)
                })
                .catch((error) => {
                    console.error('❌Failed to initialize TLDs:', error)
                    commit('SET_ERROR', error)
                })

            // INIT CURRENCY CONVERSION RATES
            let initialized_currency_rates = []
            const conversionPromises = state.currencyPairs.map(async (currency) => {
                try {
                    const response = await currencyService.getConversionRates(currency.name)
                    currency.conversion_rate = response.data.result.conversion_rate;
                    initialized_currency_rates.push(currency.name);
                    return currency;
                } catch (error) {
                    console.error(`❌Error fetching conversion rate for ${currency.name}:`, error);
                    currency.conversion_rate = null;
                    return currency;
                }
            });
            await Promise.all(conversionPromises)
                .then((response) => {
                    commit('SET_CURRENCY_PAIRS', response)
                    console.log(`✅Initialized conversion rates for ${initialized_currency_rates.join(", ")}. \nTotal: ${initialized_currency_rates.length}`)
                })
                .catch();
            await dispatch('support/initialize');
        }
    },
    getters: {
        cartTotal: (state) => {
            return state.cart.items.reduce((total, item) => {
                return (parseFloat(total + item.price)).toFixed(2);
            }, 0); // Start with a total of 0
        },
        preferredCurrencySymbol: (state) => {
            const currency = state.currencyPairs.find(c => c.name === state.preferredCurrency);
            return currency.symbol
        },
        tldPrices: (state) => {
            return state.availableTLDs.slice(0, 5).map(tld => ({
                tld: tld.tld,
                price: tld.price_registration
            }));
        },
        getCloudOrders: (state) => {
            return state.orders.filter(order => order.service_type === 'custom');
        },
        getDatabaseOrders: (state) => {
        },
        getHostingOrders: (state) => {
        },
        getDomainOrders: (state) => {
        },
        getEmailOrders: (state) => {
        },
    }
});

export default store;