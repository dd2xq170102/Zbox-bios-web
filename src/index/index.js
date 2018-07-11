// zbox-bios-web 前端框架入口js 2018-4-18 10:44
//

import 'jquery/dist/jquery.min.js'
import './index.css'
import Vue from 'vue'
import App from './App.vue'
import * as uiv from 'uiv'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

Vue.use(uiv)
Vue.config.productionTip = false //设置为 false 以阻止 vue 在启动时生成生产提示。

new Vue({
    el: "#app",
    data: {},
    template: '<App/>',
    components: {App}
})