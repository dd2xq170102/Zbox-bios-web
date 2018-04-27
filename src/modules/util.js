import $ from 'jquery'

export default {
    alert: _alert,
    dialog: dialog,
    judge: judge
}

var cacheNum = 0;

//弹出框alert
function _alert(msg) {
    cacheNum++;
    if (!msg) {
        msg = "无内容";
    }
    var alertId = "alert-myModal-" + cacheNum;
    var hight = window.screen.availHeight;//document.body.offsetHeight;
    //弹出框页面
    var html =
        `<style>
        #alert-myModal-core{ 
/*					height:'+hight+'px; */
            top:50%;    
            position:absolute; 
            margin-top:-150px;left:50%; margin-left:-150px;
        }
        .modal-body{
            word-wrap:break-word;
        }
        </style>
        <div class="modal fade" data-show="true" id="` + alertId + `" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
            <div id="alert-myModal-core" class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="myModalLabel">系统提示</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">` + msg + `</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>`;

    //添加页面到HTML
    $(document.body).append(html);

    //当弹出框隐藏时删除弹出框
    $('#' + alertId).on('hidden.bs.modal', function () {
        $('#' + alertId).remove();
    });

    //显示弹出框
    $('#' + alertId).modal('show');
}

//业务弹出框
function dialog(configs) {
    var pic_real_width, pic_real_height;


    if (!configs) {
        configs = {};
    }
    var config = $.extend({
        //唯一ID
        id: "",
        //dialog标题
        title: "",
        //加载页面路径
        htmlUrl: "",
        //弹出框宽度
        width: "",
        //弹出框高度
        heigth: "",
        //加载页面之前
        onBeforeLoad: function () {
        },
        //加载页面之后
        onAfterLoad: function () {
        },
        //关闭页面之前
        onBeforeClose: function () {
        },
        //按钮组，名称及回调函数
        buttons: [{
            name: "", callBack: function () {
            }
        }]
    }, configs);
    cacheNum++;
    //弹出框唯一id
    var dialogId = "dialog-myModal" + config.id + cacheNum;
    //浏览器工作区间高度
    var htmlHeight = document.body.scrollHeight;
    //弹出框内容div高度
    var divHeight = parseInt(config.height) - 121 + "";
    //弹出框外边距
    var padding = 20;
    //判断弹出框高度是否超过浏览器高度
    if (htmlHeight - 60 >= parseInt(config.height)) {
//			padding=(htmlHeight-60-parseInt(config.height))/2;
        padding = 30;
    }
    var html = '<div class="modal fade" style="height:100%;overflow-y:auto;" id="' + dialogId + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<style>#judge-myModal-core{ ' +
//					'height:100%;  '+
        'padding-top: ' + padding + 'px;' +
        'padding-bottom: ' + padding + 'px;' +
        '}</style>' +
        '<div id="judge-myModal-core" style="width:' + config.width + '" class="modal-dialog  modal-sm">' +
        '<div class="modal-content" style="height:' + config.height + '">' +
        '<div class="modal-header" >' +
        ' <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        ' <h4 class="modal-title" id="myModalLabel">' + config.title + '</h4>' +
        ' </div>' +
        ' <div id="' + dialogId + '-body" class="modal-body" style="height:' + divHeight + 'px; overflow-y:auto;"></div>' +
        ' <div class="modal-footer">' +
        '<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>';
    for (var int = 0; int < config.buttons.length; int++) {
        html += ' <button id="button-dialog-' + int + '" type="button" class="btn btn-primary">' + config.buttons[int].name + '</button>';
    }
    html += ' </div>' +
        '</div><!-- /.modal-content -->' +
        ' </div><!-- /.modal-dialog -->' +
        '</div>';

    //添加页面到HTML
    $(document.body).append(html);


    //当弹出框隐藏时删除弹出框
    $('#' + dialogId).on('hidden.bs.modal', function () {
        config.onBeforeClose();
        $('#' + dialogId).remove();
    });

    //按钮回调函数
    for (var i = 0; i < config.buttons.length; i++) {
        !function (i) {
            $('#button-dialog-' + i).on('click', function () {
                config.buttons[i].callBack();
            });
        }(i);
    }

    //显示弹出框
    $('#' + dialogId).modal('show');

    $('#' + dialogId).on('shown.bs.modal', function () {
        //加载页面前和加载页面后回调函数
        config.onBeforeLoad();
        $("#" + dialogId + "-body").load(config.htmlUrl);
        config.onAfterLoad();
    });
}

//侧边栏
function sidebar(configs) {
    var config = $.extend({
        //唯一ID
        id: "",
        //弹出框宽度
        width: "",
        //弹出框高度
        heigth: "",
        //加载页面之前
        onBeforeLoad: function () {
        },
        //加载页面之后
        onAfterLoad: function () {
        },
        //关闭页面之前
        onBeforeClose: function () {
        }
    }, configs);

}

// 判断窗口
function judge(text, fun1, fun2) {
    var configs = {
        text: text,
        yes: fun1,
        no: fun2
    }
    if (!configs) {
        configs = {};
    }
    var config = $.extend({
        text: "",
        yes: function () {
            _alert("是！但你什么都没做");
        },
        no: function () {
            _alert("否！但你什么都没做");
        }
    }, configs);
    var runYes = config.yes;
    var runNo = config.no;
    var hight = window.screen.availHeight;//document.body.offsetHeight;
    var html = '<div class="modal fade" id="judge-myModal" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">' +
        '<style>#judge-myModal-core{ ' +
        'height:' + hight + 'px;  ' +
        'top:50%;    ' +
        'position:absolute; ' +
        'margin-top:-150px;left:50%; margin-left:-150px;' +
        '}</style>' +
        '<div id="judge-myModal-core" class="modal-dialog  modal-sm">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        ' <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
        ' <h4 class="modal-title" id="myModalLabel">提示信息</h4>' +
        ' </div>' +
        ' <div class="modal-body">' + config.text + '</div>' +
        ' <div class="modal-footer">' +
        '<button id="button-judge-yes" type="button" class="btn btn-primary">是</button>' +
        ' <button id="button-judge-no" type="button" class="btn btn-primary">否</button>' +
        ' </div>' +
        '</div><!-- /.modal-content -->' +
        ' </div><!-- /.modal-dialog -->' +
        '</div>';
    // 添加页面到HTML
    $(document.body).append(html);

    // 是
    $('#button-judge-yes').on('click', function () {
        runYes();
        $('#judge-myModal').modal('hide');
    });

    // 否
    $('#button-judge-no').on('click', function () {
        runNo();
        $('#judge-myModal').modal('hide');
    });

    // 当弹出框隐藏时删除弹出框
    $('#judge-myModal').on('hidden.bs.modal', function () {
        $('#judge-myModal').remove();
    });

    // 显示弹出框
    $('#judge-myModal').modal('show');
}

