/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'

// import Thrift from 'thrift'
// const eccrpc = require('./gen-nodejs/setup.js');
// const ttypes = require('./gen-nodejs/ecc_types.js');

//import css
import 'vue-beauty/package/style/vue-beauty.min.css'

//import components
import vueBeauty from 'vue-beauty'
Vue.use(vueBeauty)
Vue.use(VueResource)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')