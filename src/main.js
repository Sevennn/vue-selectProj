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
import { Collapse } from 'bootstrap-vue/es/components';
import { Tabs } from 'bootstrap-vue/es/components';
import { FormGroup } from 'bootstrap-vue/es/components';
import { FormTextarea } from 'bootstrap-vue/es/components';
import { ButtonGroup } from 'bootstrap-vue/es/components';
import axios from 'axios';
import VueAxios from 'vue-axios';
import { Tooltip } from 'bootstrap-vue/es/components';
import { FormFile } from 'bootstrap-vue/es/components';
import $ from "jquery";
import "bootstrap-fileinput/js/fileinput.js";
import "bootstrap-fileinput/themes/fa/theme.js";

import mavonEditor from 'mavon-editor'
// markdown-it对象：md.s_markdown, md => mavonEditor实例
//                 or
//                 mavonEditor.markdownIt 
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

Vue.use(FormFile);
Vue.use(Tooltip);
Vue.use(VueAxios, axios)
Vue.use(ButtonGroup);
Vue.use(FormTextarea);
Vue.use(FormGroup);
Vue.use(Tabs);
Vue.use(Collapse);
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

require('bootstrap/dist/css/bootstrap.css')
require('bootstrap-fileinput/css/fileinput.css')
require('font-awesome/css/font-awesome.css')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
})


