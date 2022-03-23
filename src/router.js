import Vue from 'vue'
import VueRouter from 'vue-router'

import Registration from "@/components/Registration";
import Login from "@/components/Login";
import Home from "@/components/Home";


Vue.use(VueRouter)


const router = new VueRouter({
    routes: [
        {path: '/', component: Home},
        {path: '/login', component: Login},
        {path: '/registration', component: Registration}
    ],
    mode: 'history'
})

export default router