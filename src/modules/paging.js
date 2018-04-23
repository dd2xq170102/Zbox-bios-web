define(["jquery"],function(){
	var nowPage=1,//当前页号
		totalMsg=0,//总共信息条数
		pageSize=0,//每页信息数
		configs={},//合并后的config对象
		nowPaging={},//当前分页工具栏的对象集合
	    totalPage=0,//总页数
	    order="",
	    pageType=true,//是否是真分页
	    totalData=[];//假分页存储总数据
//		tableWidth;//table总宽度
	
	var initAll=function(){
		nowPage=1;
		totalMsg=0;
		pageSize=0;
		configs={};
		nowPaging={};
	    totalPage=0;
	    order="";
	    pageType=true;
	    totalData=[];
	}
	
	var init=function(config){
		initAll();
		configs=$.extend({
			id:"",//唯一标识
			url:"",//获取数据源
			pid:"",//容器元素的id
			data:"",//获取数据携带参数
			isShowHead:true,//是否显示表头
			isShowBoder:false,//是否显示边框
			isAlwaysLine:true,//是否总是显示固定行
			onAfterLoad:function(){},
			onBeforeLoad:function(){},
			pageSize:2,
			toolbar:[/*{
				name:"",
				icon:"",
				callback:function(){
					
				}
			}*/],
			table:[{
				field:"",
				name:"",
				width:0,
				format:function(e){
					
				}
			}]
		},config);
		configs.onBeforeLoad();
		pageSize=configs.pageSize;
//		getTableWidth(configs.table);
		loadHtml(configs.pid);
		loadTable();
		configs.onAfterLoad();
	}
	
	//计算table总宽度
	function getTableWidth(table) {
		var nowLong=$("#"+configs.pid).width();
		var width=0;
		for (var i = 0; i < table.length; i++) {
			if (table[i].width) {
				width+=table[i].width;
			}
		}
		if (width>=nowLong) {
			tableWidth=width-2;
		}else {
			tableWidth=nowLong-2;
		}
	}
	//加载页面
	function loadTable() {
		if (pageType===true) {
			datas={"pageSize":pageSize,"nowPage":nowPage,"order":"","orderType":"desc"};
			datas=$.extend(datas,configs.data);
			$.ajax({
				url:configs.url,
				type:"post",
				dataType:"json",
				async:true,
				data:datas,
				success:function(bdata){
					var pageModel=bdata.pageModel;
					if (!pageModel) {
						pageType=false;
						nowPage=1;
						totalMsg=bdata.length;
						totalData=bdata;
					}else {
						nowPage=pageModel.pageIndex;
						totalMsg=pageModel.recordCount;
						pageSize=pageModel.pageSize;
						totalData=bdata.listData;
					}
					console.log(totalData)
					createPaging(totalMsg);
					createGrid(totalData);
					if (configs.isShowBoder==true) {
//					$("#paging-table").addClass("paging-table");
						$("#paging-table-body").css("border","2px solid rgb(222, 168, 208)");
					}else {
						$("td").css("border-top","0px");
						$("th").css("border-bottom","0px");
					}
				},error:function(e){
					console.log(e)
				}
			});
		}else {
			createPaging(totalMsg);
			createGrid(totalData);
		}
	}
	
	//创建分页查询栏
	function createPaging(totalMsg) {
		if (totalMsg%pageSize!=0) {
			totalPage=parseInt(totalMsg/pageSize) +1;
		}else {
			totalPage=parseInt(totalMsg/pageSize);
		}
		var pageASum=[];
		for (var i = 1; i <= totalPage; i++) {
			var li="<li class='numA'>";
			if (i==nowPage) {
				li="<li class='numA active'>";
			}
			li+="<a href='javascritp:void(0);' class='paging-a'>"+i+"</a>"+"</li>";
			pageASum.push(li);	
		}
		var pageSum=[];
		if (pageASum.length>10) {
			if (totalPage+1-nowPage<=10) {
				for (var i = 0; i < 10; i++) {
					pageSum.push(pageASum[pageASum.length-10+i]);
				}
			}else {
				pageSum.push(pageASum[nowPage-1]);
				pageSum.push(pageASum[nowPage]);
				pageSum.push(pageASum[nowPage+1]);
				pageSum.push(pageASum[nowPage+2]);
				pageSum.push(pageASum[nowPage+3]);
				pageSum.push("<li class='numA'><a>...</a></li>");
				pageSum.push(pageASum[pageASum.length-4]);
				pageSum.push(pageASum[pageASum.length-3]);
				pageSum.push(pageASum[pageASum.length-2]);
				pageSum.push(pageASum[pageASum.length-1]);
			}
		}else {
			pageSum=pageASum;
		}
		
		$(".numA").remove();
		for (var i = 0; i <= totalPage; i++) {
			$("#paging-next").parent().before(pageSum[i]);
		}
		//加载分页工具栏格式
		if ($("#paging-pagination .active").children().html()=="1") {
			$("#paging-prev").parent().attr("class","previous disabled");
			$("#paging-first").parent().attr("class","previous disabled");
		}else {
			$("#paging-prev").parent().attr("class","paging-tool");
			$("#paging-first").parent().attr("class","paging-tool");
		}
		
		if ($("#paging-pagination .active").next().children().attr("id")=="paging-next") {
			$("#paging-next").parent().attr("class","previous disabled");
			$("#paging-last").parent().attr("class","previous disabled");
		}else {
			$("#paging-next").parent().attr("class","paging-tool");
			$("#paging-last").parent().attr("class","paging-tool");
		}
	}
	
	//创建表格
	function createGrid(data) {
		var startIndex=0;
		if (pageType===false) {
			startIndex=(nowPage-1)*pageSize;
		}
		
		$("#paging-table").css("width","100%")
		$("#paging-table-table").empty();
		if (configs.isAlwaysLine) {
			$("#paging-table-body-box").css("height",37*configs.pageSize+39+"px");
		}
		for (var i = startIndex; i < pageSize+startIndex&&i<data.length; i++) {
			$("#paging-table-table").append(function() {
				var tr="<tr class='tr-"+i+"'>";
				for (var j = 0; j < configs.table.length; j++) {
					var datav=data[i][configs.table[j].field];
					var titleStr=datav&&datav!=="null"?datav:"";
					if (configs.table[j].format) {
						datav=configs.table[j].format(data[i]);
					}
					if (configs.table[j].click) {
						datav="<a id='paging-table-field"+i+j+"'><span>"+datav+"</span></a>";
						new ClickUtil("#paging-table-table",'#paging-table-field'+i+j,configs.table[j].click,data[i]);
					}
					if (datav===null) {
						datav=""
					}
					tr+="<td title='"+titleStr+"' class='td-"+configs.table[j].field+"'>"+datav+"</td>";
				}
				tr+="</tr>";
				return tr;
			});
		}
		initTable();
	}
	


	function initTable() {
		var tTD; // 用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
		var table = document.getElementById("paging-table");
		var width = $(table).width() - 4;
		$(table).attr("style", "width:" + width + "px;");
		var twidth=table.offsetWidth
		for (j = 0; j < table.rows[0].cells.length; j++) {
			table.rows[0].cells[j].onmousedown = function() {
				// 记录单元格
				tTD = this;
				if (event.offsetX > tTD.offsetWidth - 10) {
					tTD.mouseDown = true;
					tTD.oldX = event.x;
					tTD.oldWidth = tTD.offsetWidth;
				}
				// 记录Table宽度
				// table = tTD; while (table.tagName != ‘TABLE') table =
				// table.parentElement;
				// tTD.tableWidth = table.offsetWidth;
			};
			table.rows[0].cells[j].onmouseup = function() {
				// 结束宽度调整
				if (tTD == undefined)
					tTD = this;
				tTD.mouseDown = false;
				tTD.style.cursor = 'default';
				twidth=table.offsetWidth
			};
			table.rows[0].cells[j].onmousemove = function() {
				// 更改鼠标样式
				if (event.offsetX > this.offsetWidth - 10)
					this.style.cursor = 'col-resize';
				else
					this.style.cursor = 'default';
				// 取出暂存的Table Cell
				if (tTD == undefined)
					tTD = this;
				// 调整宽度
				if (tTD.mouseDown != null && tTD.mouseDown == true) {
					tTD.style.cursor = 'default';
					if (tTD.oldWidth + (event.x - tTD.oldX) > 0){
						$(tTD).css("width" , tTD.oldWidth + (event.x - tTD.oldX));
						$(table).css("width" , twidth + (event.x - tTD.oldX));
					}
					// 调整列宽
//					tTD.style.width = tTD.width;
//					tTD.style.cursor = 'col-resize';
					// 调整该列中的每个Cell
//					table = tTD;
//					while (table.tagName != 'TABLE')
//						table = table.parentElement;
//					for (j = 0; j < table.rows.length; j++) {
//						table.rows[j].cells[tTD.cellIndex].width = tTD.width;
//					}
					// 调整整个表
					// table.width = tTD.tableWidth + (tTD.offsetWidth –
					// tTD.oldWidth);
					// table.style.width = table.width;
				}
			};
		}
		var allHead=$("#paging-table-head").children().children();
		
		for (var i = 0; i < allHead.length; i++) {
			allHead[i].tableWidth=allHead[i].offsetWidth;
		}
		for (var i = 0; i < allHead.length; i++) {
			allHead[i].width=allHead[i].tableWidth;
		}
	}

	//加载表格和分页，并初始化分页的回调函数
	function loadHtml(pid,data) {
		//加载页面
		$("#"+pid).load("/static/app/core/mode/paging.html",{},function(){
			//首页
			$("#paging-first").off('click').on('click',function(){
				if($("#paging-first").parent().attr("class")!="previous disabled"){
					nowPage=1;
					loadTable();
				}
			});
			//上一页
			$("#paging-prev").off('click').on('click',function(){
				if($("#paging-prev").parent().attr("class")!="previous disabled"){
					nowPage--;
					loadTable();
				}
			});
			//下一页
			$("#paging-next").off('click').on('click',function(){
				if($("#paging-next").parent().attr("class")!="previous disabled"){
					nowPage++;
					loadTable();
				}
			});
			//末页
			$("#paging-last").off('click').on('click',function(){
				if($("#paging-last").parent().attr("class")!="previous disabled"){
					nowPage=totalPage;
					loadTable();
				}
			});
			//页号点击
			$("#paging-pagination").off('click').on('click',".paging-a",function(){
				nowPage=this.innerText;
				loadTable();
			});
			//初始化工具栏
			if (configs.toolbar.length>0) {
				$("#paging-table-toolbar").append('<div class="paging-table-toolbar"><ul></ul></div>');
				var $ul=$("#paging-table-toolbar").find("ul");
				for (var i = 0; i < configs.toolbar.length; i++) {
					$ul.append('<li id="paging-table-toolbar'+i+'"><a><span class="'+configs.toolbar[i].icon+'" aria-hidden="true"></span>'+configs.toolbar[i].name+'</a></li>');
					new ClickUtil("#paging-table-toolbar","#paging-table-toolbar"+i,configs.toolbar[i].callback);
				}
			}
			//初始化表格标题
			if (configs.isShowHead) {
				for (var i = 0; i < configs.table.length; i++) {
					if (i===configs.table.length-1) {
						$("#paging-table-head").children().append("<th class='paging-table-head-last "+configs.table[i].field+"'>"+configs.table[i].name+"</th>");
					}else {
						$("#paging-table-head").children().append("<th class='"+configs.table[i].field+"'>"+configs.table[i].name+"</th>");
					}
					$("#paging-table-head ."+configs.table[i].field).attr("width",configs.table[i].width);
				}
			}
		});
	}
	
	function ClickUtil(id,id2,callback,param){
		if (id2==null) {
			$(id).off("click").on("click",function(){
				callback(param);
			});
		}else {
			$(id).off("click",id2).on("click",id2,function(){
				callback(param);
			});
		}
	}
	
	//取消原来的焦点显示
	function offActive() {
		$("#paging-pagination .active").attr("class","");
		var span=$("#paging-pagination #paging-span");
		var pspan=span.parent();
		var sdata=span.text();
		pspan.empty();
		pspan.append("<a href='javascritp:void(0);' class='paging-a'>"+sdata+"</a>");
	}
	//为当前点击A标签对象增加焦点
	function onActiveByA(e) {
		var data=e.innerText;
		var parent=$(e).parent();
		parent.empty();
		parent.append("<span id='paging-span'>"+data+"</span>");
		$("#paging-span").parent().attr("class","active");
	}
	return {init:init}
})

