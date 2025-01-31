import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue'),
        },
        {
            path: '/dashboard',
            component: () => import('../views/DashboardView.vue'),
            children: [
                {
                    path: '',
                    component: () => import('../components/DashboardOverview.vue')
                },
                {
                    path: 'domains',
                    component: () => import('../components/DashboardDomains.vue')
                },
            ],
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/CartView.vue'),
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
