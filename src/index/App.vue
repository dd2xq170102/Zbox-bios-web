<template>
    <section>
        <div id="aaa">{{age}}</div>
        <input v-if="name=='asp'" v-model="age"/>
    </section>
</template>

<script>
    import $ from 'jquery'
    import API from '../common/api'
    import CONST from '../common/const'
    import hook from '../lib/ajaxhook'
    import Util from '../modules/util'

    export default {
        data(){
            return {
                name: "asp",
                age: 22
            }
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
                                    console.log(Util)
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