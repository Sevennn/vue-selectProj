import Vue from 'vue'
import Router from 'vue-router'
import examPage from '@/components/contents/exampage'
import selectPage from '@/components/contents/elistpage'
import proList from '@/components/contents/plistpage'
import mainPage from '@/components/mainpage'
import createPage from '@/components/contents/createpage'
import loginPage from '@/components/loginpage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login', component: loginPage
    },
    {
      path: '/sel', component: mainPage,
      children: [
        { path: '/sel/selectlist', component: selectPage },
        { path: '/sel/prolist', component: proList,meta: { requiresAuth: true } },
        { path: '/sel/create/pro', component: createPage,meta: { requiresAuth: true } },
      ]
    },
    {
      path: '/exam',component: examPage
    },
    {
      path: '*',redirect: '/login'
    }
  ]
})
