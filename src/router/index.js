import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
            meta: { layout: "DefaultLayout" }, // Assign layout
        },
        {
            path: '/dashboard',
            component: () => import('../views/DashboardView.vue'),
            meta: { layout: "DashboardLayout" }, // Assign layout
            children: [
                {
                    path: '',
                    component: () => import('../components/DashboardOverview.vue')
                },
                {
                    path: 'domains',
                    component: () => import('../components/DashboardDomains.vue')
                },
                {
                    path: 'hosting',
                    component: () => import('../components/DashboardHosting.vue')
                },
                {
                    path: 'cloud',
                    component: () => import('../components/DashboardCloud.vue')
                },
                {
                    path: 'email',
                    component: () => import('../components/DashboardEmail.vue')
                },
                {
                    path: 'database',
                    component: () => import('../components/DashboardDatabase.vue')
                },
                {
                    path: 'my-orders',
                    component: () => import('../components/DashboardOrders.vue')
                },
                {
                    path: 'invoices',
                    component: () => import('../components/DashboardInvoices.vue')
                },
                {
                    path: 'wallet',
                    component: () => import('../components/DashboardWallet.vue')
                },
                {
                    path: 'notifications',
                    component: () => import('../components/DashboardNotifications.vue')
                },
                {
                    path: 'support',
                    component: () => import('../components/DashboardSupport.vue')
                },
                {
                    path: 'profile-settings',
                    component: () => import('../components/DashboardProfileSettings.vue')
                },
            ],
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue'),
            meta: { layout: "DashboardLayout" },
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('../views/LoginView.vue'),
        },
        {
            path: '/auth/signup',
            name: 'signup',
            component: () => import('../views/SignUpView.vue'),
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return {
                selector: to.hash
            }
        }
    }
})

export default router
