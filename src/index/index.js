// zbox-bios-web 前端框架入口js 2018-4-18 10:44
//

import $ from 'jquery'
import '@/lib/bootstrap/bootstrap.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './App.vue'
import * as uiv from 'uiv'
import 'bootstrap/dist/js/bootstrap.min'

Vue.use(uiv)
Vue.config.productionTip = false

new Vue({
    el: "#app",
    data: {},
    template: '<App/>',
    components: {App}
})