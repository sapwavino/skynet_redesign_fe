import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: {
                layout: "DefaultLayout",
                title: "Home"
            },
        },
        {
            path: '/dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: {
                layout: "DashboardLayout",
                title: "Dashboard"
            }, // Assign layout
            children: [
                {
                    path: '',
                    component: () => import('../components/DashboardOverview.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "Dashboard Overview"
                    },
                },
                {
                    path: 'domains',
                    component: () => import('../components/DashboardDomains.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Domains"
                    },
                },
                {
                    path: 'hosting',
                    component: () => import('../components/DashboardHosting.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Hosting"
                    },
                },
                {
                    path: 'cloud',
                    component: () => import('../components/DashboardCloud.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Cloud"
                    },
                },
                {
                    path: 'email',
                    component: () => import('../components/DashboardEmail.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "Email Services"
                    },
                },
                {
                    path: 'database',
                    component: () => import('../components/DashboardDatabase.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Databases"
                    },
                },
                {
                    path: 'my-orders',
                    component: () => import('../components/DashboardOrders.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Orders"
                    },
                },
                {
                    path: 'invoices',
                    component: () => import('../components/DashboardInvoices.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Invoices"
                    },
                },
                {
                    path: 'wallet',
                    component: () => import('../components/DashboardWallet.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Wallet"
                    },
                },
                {
                    path: 'notifications',
                    component: () => import('../components/DashboardNotifications.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "My Notifications"
                    },
                },
                {
                    path: 'support',
                    component: () => import('../components/DashboardSupport.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "Support"
                    },
                },
                {
                    path: 'profile-settings',
                    component: () => import('../components/DashboardProfileSettings.vue'),
                    meta: {
                        layout: "DashboardLayout",
                        title: "Profile Settings"
                    },
                },
            ],
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue'),
            meta: {
                layout: "DashboardLayout",
                title: "My Cart"
            },
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
            meta: {
                layout: "DashboardLayout",
                title: "Login"
            },
        },
        {
            path: '/auth/signup',
            name: 'signup',
            component: () => import('../views/SignUpView.vue'),
            meta: {
                layout: "DashboardLayout",
                title: "Sign Up"
            },
        }
    ],

    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
})

router.beforeEach((to, from, next) => {
    const title = 'Skynet Web Services'
    document.title = to.meta.title ? title + ' | ' + to.meta.title : title;
    next();
});

export default router
