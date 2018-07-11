/**
* Created by zhuhao on 2018/4/24.
*/

<template v-for="(item,index) in message">
    <section>
        <span>{{ m }} </span>
        <span v-for="n in cacheNum">{{ n }} </span>
        <div class="modal fade" data-show="true" :id="alertId" tabindex="-1" role="dialog" data-backdrop="static"
             aria-labelledby="myModalLabel" aria-hidden="true">
            <div id="alert-myModal-core" class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModalLabel">系统提示</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">{{ m }}</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
    import $ from 'jquery'

    export default {
        data(){
            return {
                alertId: "util-alert-",
                cacheNum: 0,
                message: ["", ""]
            }
        },
        alert(data){
            let _this = this
            _this.cacheNum++
            console.log(t)
            _this.message.concat(data)
        },
        created: function () {
        },
        methods: {},
        props: ['alertMessage'],
    }
</script>
<style>
    #alert-myModal-core {
        /*					height:'+hight+'px; */
        top: 50%;
        position: absolute;
        width: 400px;
        margin-top: -150px;
        left: 50%;
        margin-left: -150px;
    }

    .modal-body {
        word-wrap: break-word;
    }
</style>