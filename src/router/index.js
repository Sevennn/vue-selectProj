import Vue from 'vue'
import Router from 'vue-router'
import examPage from '@/components/contents/exampage'
import selectPage from '@/components/contents/selectpage'
import proList from '@/components/contents/prolist'
import navbar from '@/components/navbar'
import mainPage from '@/components/mainpage'
import createPage from '@/components/contents/createpage'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/sel', component: mainPage,
      children: [
        { path: '/sel/selectlist', component: selectPage },
        { path: '/sel/prolist', component: proList },
        { path: '/sel/create/pro', component: createPage },
      ]
    },
  ]
})
