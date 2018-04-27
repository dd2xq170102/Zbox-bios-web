<template>
        <div>
            <div class="row clearfix">
                <div class="col-md-12 column">
                    <nav class="navbar navbar-default"
                         style="background-color: #efbadd;" role="navigation">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse"
                                    data-target="#bs-example-navbar-collapse-1">
                                <span class="sr-only">Toggle navigation</span> <span
                                    class="icon-bar"></span> <span class="icon-bar"></span> <span
                                    class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="javascript:void(0);">ZBOX</a>

                        </div>
                        <div class="collapse navbar-collapse"
                             id="bs-example-navbar-collapse-1">
                            <ul class="nav navbar-nav">
                                <li class="main-top-link" id="top-link-home"><a href="#/home">首页</a></li>
                                <li class="main-top-link dropdown"><a
                                        href="javascript:void(0);" class="dropdown-toggle"
                                        data-toggle="dropdown">下拉按钮<strong class="caret"></strong></a>
                                    <ul class="dropdown-menu">
                                        <li id="test1"><a href="javascript:void(0);">下拉1</a></li>
                                        <li id="test2"><a href="javascript:void(0);">下拉2</a></li>
                                        <li><a href="javascript:void(0);">下拉三</a></li>
                                        <li class="divider"></li>
                                        <li><a href="javascript:void(0);">下拉间隔1</a></li>
                                        <li class="divider"></li>
                                        <li><a href="javascript:void(0);">下拉间隔2</a></li>
                                    </ul></li>
                            </ul>
                            <form class="navbar-form navbar-left" role="search">
                                <div class="form-group">
                                    <input type="text" class="form-control" />
                                </div>
                                <button type="submit" class="btn btn-default">搜索框</button>
                            </form>
                            <ul class="nav navbar-nav navbar-right">
                                <li class="main-top-link" id="top-link-note"><a
                                    href="#/note">笔记</a></li>
                                <li class="main-top-link" id="top-link-dict"><a
                                        href="#/dict">字典</a></li>
                                <li class="main-top-link" id="top-link-chatRoom"><a
                                        href="#/chatRoom">聊天室</a></li>
                                <li class="main-top-link" id="top-link-video"><a
                                        href="#/video">video</a></li>
                                <li class="main-top-link" id="top-link-test"><a
                                        href="#/test">测试</a></li>
                                <li class="main-top-link" id="top-link-clipper"><a
                                        href="#/clipper">图片裁剪</a></li>
                                <li class="main-top-link dropdown"><a
                                        href="javascript:void(0);" class="dropdown-toggle"
                                        data-toggle="dropdown">右链接下拉<strong class="caret"></strong></a>
                                    <ul class="dropdown-menu">
                                        &lt;!&ndash; <li><a href="#/clipper">图片裁剪</a></li> &ndash;&gt;
                                        <li><a href="javascript:void(0);">下拉2</a></li>
                                        <li><a href="javascript:void(0);">下拉3</a></li>
                                        <li class="divider"></li>
                                        <li id="file-upload"><a href="javascript:void(0);">文件上传</a></li>
                                    </ul></li>
                            </ul>
                        </div>
                    </nav>
                    <div class="row clearfix">
                        <div id="main-main" class="col-md-10 column"></div>
                        <div class="col-md-2 column">
                            <div id="headPhoto" class="row clearfix">
                                <div class="col-md-12 column img-div-headPhoto">
                                    <img class="img-circle" src="../imgs/(158).jpg"/>
                                </div>
                            </div>
                            <div class="row clearfix">
                                <div class="col-md-12 column">
                                    <div class="panel-group" id="panel-458331">
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <a class="panel-title collapsed" data-toggle="collapse"
                                                   data-parent="#panel-458331" href="#panel-element-700547">
                                                    地址定位 </a>
                                            </div>
                                            <div id="panel-element-700547" class="panel-collapse collapse">
                                                <div style="word-wrap: break-word;" id="address-GPS"
                                                     class="panel-body"></div>
                                            </div>
                                        </div>
                                        <div class="panel panel-default">
                                            <div class="panel-heading">
                                                <a class="panel-title" data-toggle="collapse"
                                                   data-parent="#panel-458331" href="#panel-element-975236">个人头像</a>
                                            </div>
                                            <div id="panel-element-975236" class="panel-collapse in">
                                                <div class="panel-body">
                                                    <canvas width="80" height="80"
                                                            data-jdenticon-hash="d5ba28528b1a486ead3564b327955555"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
<style>
    #main-main img{
        height: 300px;
        margin: 0 auto;
    }
    #main-main{
        text-align:center;
    }
    .img-div-headPhoto{
        text-align: center;
    }
    .img-circle{
        width: 100px;
        height: 100px;
        margin:5px auto;
    }
    #headPhoto{
        margin:0 auto;
    }
    .container{
        background-color: rgba(225, 0, 255, 0.12);
        height: 100%;
    }
    html{
        height: 100%;
    }
    body{
        height: 100%;
    }
</style>