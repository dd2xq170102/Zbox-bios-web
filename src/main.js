console.log("start zbox-bios-web!")

document.write("hello world");

// var $ = require('jquery');
import $ from 'jquery'
// zTree支持
window.jQuery = $
// combo组件支持
window.$ = $

$.ajax({
    url:"/zboxService/base/testWeb/getPage",
    dataType:"json",
    success:function (data) {
        var dict=data.model.dict;
        console.log(dict);
        $("#last").append("<dev id='yes'></dev>")
        for(var i=0;i<dict.length;i++){
            $("#last").append(dict[i].id);
        }
    }
})

var ss=' sds  ';
console.log(ss);
ss=$.trim(ss);
console.log(ss);
console.log($(".ssss"));
console.log($("#last"));
$(".ssss").val("sdsdsdsdsds");
$("#test").val("sdsdsdsdsds");
// $("#last").append("<dev id='yes'></dev>")
