import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '../components/Layout/index.vue'
import { HeaderTabModal } from '../model/app';
import { appStore } from "../store/app";

export let constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/main',
    },
    {
        path: '/login',
        name: 'Login111',
        component: () => import('../views/Goods.vue')
    },
    {
        path: '/main',
        component: Layout,
        redirect: '/main/goods',
        name: 'Main',
        meta: { 
            title: '主页1',
            icon: 'el-icon-menu',
            alwaysShow: true
        },
        children: [
            {
                path: '/main/goods',
                name: 'Goods',
                component: () => import('../views/Goods.vue'),
                redirect: '/main/goods/GoodsList',
                meta: { 
                    title: '商品',
                    alwaysShow: true
                },
                children: [
                    {
                        path: '/main/goods/GoodsList',
                        name: 'GoodsList',
                        component: () => import('../views/GoodsList.vue'),
                        meta: { 
                            title: 'shan',
                        },
                    }
                ]
            }
        ]
    },
    {
        path: '/main1',
        component: Layout,
        redirect: '/main1/home',
        name: 'Main1',
        meta: { 
            title: '主页2',
            icon: 'el-icon-menu',
            alwaysShow: true
        },
        children: [
            {
                path: '/main1/home',
                name: 'Home',
                component: () => import('../views/Home.vue'),
                meta: { 
                    title: '商品',
                }
            }
        ]
    },
    {
        path: '/main1',
        component: Layout,
        // redirect: '/main/home',
        name: 'Login1',
        meta: { 
            title: '主页2',
            icon: 'el-icon-menu'
        },
        children: [
            {
                path: '/main1/Login',
                name: 'Login',
                component: () => import('../views/Login.vue'),
                meta: { 
                    title: '主页3',
                    icon: 'el-icon-menu'
                },
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*', 
        name: 'NotFound', 
        component: () => import('../views/404.vue') 
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes
}) 

router.beforeEach((to, _from, next) => {
    handleHeaderTab(to)
    next()
})

export default router

function handleHeaderTab(to: any) {
    const store = appStore()
    const nowTab: HeaderTabModal = {
        name: to.name,
        path: to.path
    }
    const headerTabList = JSON.parse(JSON.stringify(store.headerTabList))
    if(headerTabList.length < 1 || !headerTabList.find((headerTab: HeaderTabModal) => headerTab.path === to.path)) {
        store.setHeaderTabList([...headerTabList, nowTab] as HeaderTabModal[])
    }
}