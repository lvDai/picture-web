import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import login from '@/pages/login'
import picture from '@/pages/picture'
import search from '@/pages/search'
import waterfall from '@/pages/waterfall'
import newRelease from '@/pages/components/newRelease.vue'
import continueRelease from '@/pages/components/continueRelease.vue'

import adminHome from '@/pages/admin/index'

import userData from '@/pages/admin/components/userData'
import tags from '@/pages/admin/components/tags'
import pictureData from '@/pages/admin/components/pictureData'
import noAuditPicture from '@/pages/admin/components/noAuditPicture'
import category from '@/pages/admin/components/category'
import addAlbum from '@/pages/admin/components/addAlbum'
import publicAlbum from '@/pages/admin/components/publicAlbum'
import addBanner from '@/pages/admin/components/addBanner'
import banner from '@/pages/admin/components/banner'
import lookGroup from '@/pages/admin/components/lookGroup'
import addGroup from '@/pages/admin/components/addGroup'
import addAlbumJoinGroup from '@/pages/admin/components/addAlbumJoinGroup'

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
        path: '/admin',
        name: 'adminHome',
        component: adminHome,
        children: [
            { path: '/', name: "用户信息", component: userData },
            { path: 'tags', name: "查看标签", component: tags },
            { path: 'pictureData', name: "已审核图片", component: pictureData },
            { path: 'noAuditPicture', name: "未审核图片", component: noAuditPicture },
            { path: 'category', name: "查看分类", component: category },
            { path: 'addAlbum', name: "新增相簿", component: addAlbum },
            { path: 'publicAlbum', name: "查看相簿", component: publicAlbum },
            { path: 'addBanner', name: "添加banner", component: addBanner },
            { path: 'banner', name: "查看banner", component: banner },
            { path: 'lookGroup', name: "查看群组", component: lookGroup },
            { path: 'addGroup', name: "添加群组", component: addGroup },
            { path: 'addAlbumJoinGroup', name: "添加群组", component: addAlbumJoinGroup },
        ]
    }, {
        path: '/admin/login',
        name: 'adminLogin',
        component: adminLogin
    }, {
        path: '/waterfall',
        name: 'waterfall',
        component: waterfall
    }]
})