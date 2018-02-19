import Vue from 'vue'
import Router from 'vue-router'
import mainPage from '@/components/contents/mainpage'
import selectPage from '@/components/contents/selectpage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: selectPage
    },
    {
      path: '/123456',
      component: selectPage
    },
  ]
})
