import AuthLayout from '../../../layouts/AuthLayout.vue'

export const authRouters = {
    path: '/',
    component: AuthLayout,
    children: [
        {
            path: '/login',
            name: 'LoginPage',
            // lazy load
            component: () => import('../pages/LoginPage.vue'),
            meta: {
                onlyWhenLoggedOut: true,
                public: true,
            },
        },
        {
            path: '/error/404',
            name: 'Error404Page',
            // lazy load
            component: () => import('../pages/Error404Page.vue'),
            meta: {
                public: true,
                roles: 'all',
            },
        },
    ],
}
