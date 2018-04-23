define([], function() {

	function init(config) {
		return new Router(config);
	}

	//路由实体
	function Router(config) {
		var _this=this
		
		var _config={
			onRouter:function(){}
		}
		
		this._config=$.extend(_config,config);
		this._$this = $(document.body);
		Router.init.call(_this);
	}
	
	//初始化路由
	Router.init=function(){
		var _this=this,
			config=_this._config,
			_$this=_this._$this;
		
		Router.bindEvent.call(_this);
		var router = _this.getRouter();
		setTimeout(function() {
			_$this.trigger("routerChange", [_this.getRouter(), _this.getParam()]);
		}, 30);
	}
	
	//绑定路由更换事件
	Router.bindEvent=function(){
		var _this=this,
			config=_this._config,
			_$this=_this._$this,
			onRouter=config.onRouter;
		
		_$this.on("routerChange",function(e,router,param){
			typeof onRouter == "function" && onRouter(router,param);
			
		});
		
		$(window).on("hashchange",function(){
			_$this.trigger("routerChange",[_this.getRouter(),_this.getParam()]);
		});
	}
	
	//获取路由地址
	Router.prototype.getHash=function(){
		var _this=this;
		var hash=window.location.hash;
		if (!hash) {
			return hash;
		}
		hash = hash.substr(1);
		var router=hash.split("?")[0];
		var query=hash.split("?")[1];
		var param={};
		if (query) {
			var arr=query.split("&");
			for (var i = 0; i < arr.length; i++) {
				param[arr[i].split("=")[0]]=arr[i].split("=")[1]
			}
		}
		
		var ruslt={};
		ruslt.router=router;
		ruslt.param=param;
		return ruslt;
	}
	
	//设置路由
	Router.prototype.setRouter=function(router,param){
		var _this=this;
		var paramStr="";
		if (param) {
			for ( var key in param) {
				paramStr=paramStr.concat(key+"="+param[key]+"&")
			}
			if (paramStr) {
				paramStr="?".concat(paramStr);
			}
		}
		
		window.location.hash=router+paramStr;
	}
	
	//获取路由携带参数
	Router.prototype.getParam=function(){
		var _this=this;
		
		var hash=_this.getHash();
		
		if (hash) {
			return hash.param;
		}
		
		return {};
	}
	
	//获取路由
	Router.prototype.getRouter=function(){
		var _this=this;
		
		var hash=_this.getHash();
		
		if (hash) {
			return hash.router;
		}
		
		return hash;
	}
	
	return init;
});