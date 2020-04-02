import Vue from 'vue'
import Router from 'vue-router'

// pages
import Login from './pages/Login/Login'
import Home from './pages/Home/Home'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta: {
                authRequired: false
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                authRequired: true
            }
        },

        { path: '*', redirect: '/' }
    ]
})

router.beforeEach((routeTo, routeFrom, next) => {

    const authenticated = JSON.parse(window.localStorage.getItem('user')) !== null

    if (authenticated) {

        if (routeTo.meta.authRequired) return next()

        if (routeTo.path !== '/') return next()

        return next({ name: 'home'})
    }

    if (routeTo.meta.authRequired) return next({ name: 'login'})

    return next()

})



export default router