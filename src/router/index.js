import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import login from '@/pages/login'
import picture from '@/pages/picture'
import search from '@/pages/search'
import newRelease from '@/pages/components/newRelease.vue'
import continueRelease from '@/pages/components/continueRelease.vue'

import adminHome from '@/pages/admin/index'
import adminLogin from '@/pages/admin/login'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'index',
        component: index
    }, {
        path: '/login',
        name: 'login',
        component: login
    }, {
        path: '/picture',
        name: 'picture',
        component: picture,
        children: [
            { path: '/', name: "新发布", component: newRelease },
            { path: 'continue', name: "继续添加", component: continueRelease },
        ]
    }, {
        path: '/search',
        name: 'search',
        component: search
    }, {
        path: '/admin/',
        name: 'adminHome',
        component: adminHome
    }, {
        path: '/admin/login',
        name: 'adminLogin',
        component: adminLogin
    }]
})