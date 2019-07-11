// 配置路由
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import home from '@/views/home'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', redirect: { name: 'login' } },
    { name: 'login', path: '/login', component: Login },
    { name: '/', path: '/', commponent: home }
  ]
})

export default router
