import Vue from 'vue'
import VueRouter from 'vue-router'
import TokenService from '@/helpers/token'
import { authRouters } from '@/modules/auth/router/auth.router'
import { userRouters } from '@/modules/user/router/user.router'
import MainLayout from '@/layouts/MainLayout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home',
        // name: 'Home',
        component: MainLayout,
        children: [
            {
                path: '/home',
                name: 'HomePage',
                // lazy load
                component: () => import('@/modules/HomePage.vue'),
                meta: {
                    header: 'Home',
                    requiresAuth: true,
                },
            },
        ],
    },
    authRouters,
    userRouters,
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
})

router.beforeEach(async (to, from, next) => {
    const isPublic = to?.meta?.public || false
    const onlyWhenLoggedOut = to?.meta?.onlyWhenLoggedOut || false
    const loggedIn = !!TokenService.getToken()
    if (isPublic) next()
    if (!isPublic && !loggedIn) {
        return next({
            path: '/login',
            query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
        })
    }

    // Do not allow user to visit entry page if they are logged in
    if (loggedIn && onlyWhenLoggedOut) {
        return next('/')
    }

    // Not Found Page
    if (!to?.name) return next('/error/404')

    // if (loggedIn) {
    //     // check permission
    //     const metaRole = to?.meta?.roles || []
    //     const userPermissions = TokenService.getPermissions()
    //
    //     // Do not allow user to visit entry page if they are logged in or has not according role
    //     if (metaRole === 'all') {
    //         return next()
    //     } else if (!intersection(metaRole, userPermissions).length) {
    //         return next('/error/403')
    //     }
    // }
    return next()
})

export default router
