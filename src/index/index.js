// zbox-bios-web 前端框架入口js 2018-4-18 10:44
//

import 'jquery/dist/jquery.min.js'
import './index.css'
import Vue from 'vue'
import App from './App.vue'
import * as uiv from 'uiv'

Vue.use(uiv)
Vue.config.productionTip = false

new Vue({
    el: "#app",
    data: {},
    template: '<App/>',
    components: {App}
})