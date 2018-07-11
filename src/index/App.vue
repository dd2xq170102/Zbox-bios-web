<template>
    <div>
        <zboxHeader></zboxHeader>
        <zboxBody></zboxBody>
    </div>
</template>

<script>
    import $ from 'jquery'
    import API from '../common/api'
    import CONST from '../common/const'
    import hook from '../lib/ajaxhook'
    import Util from '../modules/util'
    //    import util from '../modules/util/util.vue'

    import zboxHeader from '../common/zboxHeader.vue'
    import zboxBody from '../common/zboxBody.vue'

    export default {
        data(){
            return {
                name: "asp",
                age: 22,
                msg: "",
                isShowUtil: false
            }
        },
        components: {
            zboxHeader,
            zboxBody
        },
        created: function () {
            this.ajaxhome()
            $.ajax({
                url: API.indexTest,
                dataType: "json",
                data: {},
                success: function (data) {
                    console.log(data)
                }
            })
        },
        methods: {
            getmsg(){
                return this.msg
            },
            ajaxhome: function () {
                var ZBOX_DEFAULT_RESPONSE = "default_response";
                var ZBOX_DIRECT_RESPONSE = "direct_response";

                hookAjax({
                    onload: function (xhr) {
                        var path = CONST.PROJECT_NAME;
                        var reqUrl = xhr.responseURL.replace(path + "/", "")
                        var index = reqUrl.indexOf("zboxService");
//                        console.log(index)
                        if (index != -1) {
//                            console.log(Object.prototype.toString.call(xhr.response))
//                            console.log(xhr.response);
                            var str = xhr.response;
                            try {
                                var obj = JSON.parse(str);
                                if (obj.success != true || obj.status != 200) {
//                                    console.log(Util)
                                    Util.alert("<span style='color:red;'>" + obj.status + ":" + obj.message + "</span>");
                                } else {
                                    if (Object.prototype.toString.call(obj.model) === "[object String]") {
                                        xhr.responseText = obj.model;
                                    } else {
                                        xhr.responseText = JSON.stringify(obj.model);
                                    }
                                }
                            } catch (e) {
                                Util.alert(e)
                            }
                        }
                    }
                });
            }
        }
    }
</script>
<style>
    #main-main img {
        height: 300px;
        margin: 0 auto;
    }

    #main-main {
        text-align: center;
    }

    .img-div-headPhoto {
        text-align: center;
    }

    .img-circle {
        width: 100px;
        height: 100px;
        margin: 5px auto;
    }

    #headPhoto {
        margin: 0 auto;
    }

    .container {
        background-color: rgba(225, 0, 255, 0.12);
        height: 100%;
    }

    html {
        height: 100%;
    }

    body {
        height: 100%;
    }
</style>