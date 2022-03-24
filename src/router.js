import Vue from 'vue'
import VueRouter from 'vue-router'

import Registration from "@/components/Registration";
import Login from "@/components/Login";
import Home from "@/components/Home";


Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home,
            meta: {auth: true}

        },
        {
            path: '/login',
            name: 'login',
            component: Login,
            meta: {auth: false}
        },
        {
            path: '/registration',
            name: 'registration',
            component: Registration,
            meta: {auth: false}
        }
    ],
    mode: 'history'
})
router.beforeEach((to, from, next) => {

    if (to.meta.auth) {

        if (localStorage.getItem('auth')) {
            next()
        } else {
            next({name: "login"})
        }
        // eslint-disable-next-line no-prototype-builtins
    } else if (localStorage.hasOwnProperty('auth') === true) {

        next({path: "/"})
    } else {
        next()
    }
})

export default router