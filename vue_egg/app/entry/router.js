import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 引入页面组件
import Login from '../page/login.vue'

import Error404 from '../page/404.vue'

// 定义路由
const routes = [
    {
        path: '/',
        component: Login,
        name: 'Login'
    },
    {
        path: '*',
        component: Error404,
        name: 'Error404'
    },
]

// 跳由实例化
const router = new VueRouter({
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
})

// 路由拦截
router.beforeEach((to, from, next) => {
    // 做一个路由拦截
    next()
})

// 路由跳转，滚动条置顶
router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router