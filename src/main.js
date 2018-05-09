// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

import store from "./store/index"
import mavonEditor from 'mavon-editor'
// markdown-it对象：md.s_markdown, md => mavonEditor实例
//                 or
//                 mavonEditor.markdownIt 
import 'mavon-editor/dist/css/index.css'
// use

import axios from 'axios'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(BootstrapVue);
Vue.use(mavonEditor)


Vue.prototype.axios = axios

Vue.config.productionTip = false


router.beforeEach((to, from, next)=>{
  if (!VueCookies.get("token") && to.path != '/login') {
    next({
      path: '/login',
    })
  } else {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      if (VueCookies.get("role")!="teacher") {
        next({
          path: '/sel/selectlist',
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  } 
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
})


