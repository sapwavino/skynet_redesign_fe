import {createStore} from "vuex";
import {createToast} from "mosha-vue-toastify";
import 'mosha-vue-toastify/dist/style.css'
const preferredCurrencyFromStorage = JSON.parse(localStorage.getItem('preferredCurrency'));

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
                        name: "anewdomain.com.ng",
                        price: 90,
                        description: "Domain registration",
                        active: true,
                        billing_cycle: "annually",
                        created_at: new Date('2022-01-01'),
                        activated_at: new Date('2022-01-01'),
                        renewal_date: new Date('2023-01-01'),
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
                    {
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

                ],
                hosting: [
                    {
                        id: '789',
                        name: "Hosting-001",
                        type: "Python",
                        server_ip: '127.0.0.1',
                        server_hostname: 'cpanel.skynet.africa',
                        username:'luka_77',
                        password:'password',
                        bandwidth:'1024MB/month',
                        disk_quota:'1024MB',
                        hosting_plan:'email',
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
                        server_ip: '127.0.0.1',
                        server_hostname: 'cpanel.skynet.africa',
                        username:'236_lebron',
                        password:'password',
                        bandwidth:'1024MB/month',
                        disk_quota:'1024MB',
                        hosting_plan:'email',
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
                        server_ip: '127.0.0.1',
                        server_hostname: 'cpanel.skynet.africa',
                        username:'kyrie',
                        password:'password',
                        bandwidth:'1024MB/month',
                        disk_quota:'1024MB',
                        hosting_plan:'email',
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
                        server_ip: '127.0.0.1',
                        server_hostname: 'cpanel.skynet.africa',
                        username:'harden',
                        password:'password',
                        bandwidth:'1024MB/month',
                        disk_quota:'1024MB',
                        hosting_plan:'email',
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
                        ram: '4gb',
                        bandwidth:'1tb',
                        cores: '4v',
                        architecture: 'intel',
                        storage: '50gb',
                        location: 'nairobi',
                        status: 'online',
                        os:'ubuntu',
                        os_version: '22.04',
                        ip_address: '212.115.024.111',
                        ipv6:'212.115.024.111',
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
                        ram: '8gb',
                        bandwidth:'2tb',
                        cores: '4v',
                        architecture: 'intel',
                        storage: '100gb',
                        location: 'nairobi',
                        status: 'online',
                        os:'debian',
                        os_version: '22.04',
                        ip_address: '122.145.024.111',
                        ipv6:'122.145.024.111',
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
                        ram: '4gb',
                        bandwidth:'1tb',
                        cores: '4v',
                        architecture: 'intel',
                        storage: '100gb',
                        location: 'nairobi',
                        status: 'online',
                        description: "G3 VPS",
                        os:'ubuntu',
                        os_version: '20.04',
                        ip_address: '212.115.024.111',
                        ipv6:'212.115.024.111',
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
            notifications: [
                {
                    id: 1,
                    title: "New Message",
                    message: "You have a new message from John Doe.",
                    type: "message",
                    read: false,
                    timestamp: "2025-02-06T10:30:00Z",
                },
                {
                    id: 2,
                    title: "System Update",
                    message: "A new system update is available. Click here to update. Lorem20 ipsum dolor sit amet, consectetur adipiscing elit.",
                    type: "system",
                    read: false,
                    timestamp: "2025-02-06T09:15:00Z",
                },
                {
                    id: 3,
                    title: "Reminder",
                    message: "Your meeting with the product team starts in 30 minutes.",
                    type: "reminder",
                    read: true,
                    timestamp: "2025-02-05T16:45:00Z",
                },
                {
                    id: 4,
                    title: "Payment Received",
                    message: "You received a payment of $250.00 from Jane Doe.",
                    type: "payment",
                    read: false,
                    timestamp: "2025-02-06T12:00:00Z",
                },
                {
                    id: 5,
                    title: "Security Alert",
                    message: "Unusual login activity detected on your account.",
                    type: "security",
                    read: true,
                    timestamp: "2025-02-04T22:10:00Z",
                },
            ],
            support: {
                tickets: [],
            }
        },
        preferredCurrency: preferredCurrencyFromStorage || "NGN",
        showMobileNav: false
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
        LOGIN(state) {
            state.isLoggedIn = true
        },
        LOGOUT(state) {
            state.isLoggedIn = false
        },
        MARK_NOTIFICATION_READ(state, id) {
            const notification = state.user.notifications.find(one => one.id === id);
            if (notification) {
                notification.read = true;
            }
        },
        SET_SHOW_MOBILE_NAV(state, value) {
            state.showMobileNav = value;
        }
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
        },
        markNotificationAsRead({commit}, id){
            commit("MARK_NOTIFICATION_READ", id)
        },
        setShowMobileNav({commit}, value) {
            commit("SET_SHOW_MOBILE_NAV", value);
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