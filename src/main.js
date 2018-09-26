import Vue from 'vue'
import VueRouter from 'vue-router'
import routers from './router/routers'
Vue.use(VueRouter);
axios.defaults.withCredentials=true;
const router = new VueRouter({
  mode: 'history',
  routes: routers
});
import $ from 'jquery'
import '@/js/validate.js'
import axios from 'axios'
//注册到全局
//可以直接使用axios
// Axios 是一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中
Vue.prototype.axios=axios;
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'

//导入省市区三级联动插件
import Distpicker from 'v-distpicker'
Vue.component('v-distpicker', Distpicker);

// 导入 table 和 分页组件  注册到全局
import {VTable,VPagination} from 'vue-easytable'
Vue.component(VTable.name, VTable);
Vue.component(VPagination.name, VPagination);



//导入bootstrap
// import './assets/bootstrap-3.3.7-dist/js/bootstrap.min.js'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.min.css'


import App from './App'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import routers from './routers'
// import VueRouter from 'vue-router'
// import centerindex from './components/user-center/centerindex.vue'
//
// // import VueResource from 'vue-resource'
//
// Vue.config.productionTip = false
// // Vue.use(VueResource)
//
//
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
//
//
//
//
