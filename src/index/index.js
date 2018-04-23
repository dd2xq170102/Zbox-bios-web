// zbox-bios-web 前端框架入口js 2018-4-18 10:44
//

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    el: "#app",
    data: {
        aaa: "111"
    },
    template: '<App/>',
    components: {App}
})