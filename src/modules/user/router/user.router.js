import MainLayout from '../../../layouts/MainLayout.vue'

export const userRouters = {
    path: '/',
    component: MainLayout,
    children: [
        {
            path: '/user',
            name: 'UserPage',
            // lazy load
            component: () => import('../pages/UserPage.vue'),
            meta: {
                header: 'User List',
                requiresAuth: true,
            },
        },
        {
            path: '/profile',
            name: 'ProfilePage',
            // lazy load
            component: () => import('../pages/ProfilePage.vue'),
            meta: {
                header: 'Profile',
                requiresAuth: true,
            },
        },
        {
            path: '/user/:id/detail',
            name: 'UserDetailPage',
            // lazy load
            component: () => import('../pages/UserDetailPage.vue'),
            meta: {
                requiresAuth: true,
            },
        },
    ],
}
