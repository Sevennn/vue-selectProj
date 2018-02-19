// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import { Navbar } from 'bootstrap-vue/es/components';
import { Form } from 'bootstrap-vue/es/components';
import { Button } from 'bootstrap-vue/es/components';
import { FormInput } from 'bootstrap-vue/es/components';
import { ListGroup } from 'bootstrap-vue/es/components';
import { Image } from 'bootstrap-vue/es/components';
import { Card } from 'bootstrap-vue/es/components';
import { Layout } from 'bootstrap-vue/es/components';
import { FormRadio } from 'bootstrap-vue/es/components';
import { FormCheckbox } from 'bootstrap-vue/es/components';

Vue.use(FormCheckbox);
Vue.use(FormRadio);
Vue.use(Layout);
Vue.use(Card);
Vue.use(Image);
Vue.use(ListGroup);
Vue.use(FormInput);
Vue.use(Button);
Vue.use(Form);
Vue.use(Navbar);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})


