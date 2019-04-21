/*
	Cordova/Phonegap-Multi-Page-Locations
	It helps you to create a Cordova app with multiple html file pages. also you can now send Data between pages.
	Developer: Saleh Mosleh (salehmosleh2012@gmail.com)
	Url: https://github.com/salehmosleh/Cordova-Multi-Page
*/
function MultiPageLocations(){
	
	this.clear = function(){
		if(sessionStorage.hasOwnProperty("pageparams"))
			sessionStorage.removeItem("pageparams");
		if(sessionStorage.hasOwnProperty("checkCache"))
			sessionStorage.removeItem("checkCache");
		if(sessionStorage.hasOwnProperty("pagecache"))
			sessionStorage.removeItem("pagecache");
	};
	
	this.Cache = null;
	
	// private / must be up
	this.checkCache = function(){
		if(sessionStorage.hasOwnProperty("pagecache")){
			var pgcache = JSON.parse(sessionStorage.pagecache);
			if(pgcache.length>0){
				this.Cache = pgcache.pop();
			}
			sessionStorage.pagecache = JSON.stringify(pgcache);
		}
	};
	
	if(sessionStorage.hasOwnProperty("checkCache")){
		if(sessionStorage.checkCache=="true")
			this.checkCache();
	}
	
	this.goto = function(page,data,cache){
		data = typeof(data)=="undefined" ? {} : data;
		if(typeof(cache)!="undefined"){
			cache.pageScrollTop = $(window).scrollTop();
		}else{
			cache = {};
		}
		if(sessionStorage.hasOwnProperty("pageparams")){ 
			var getParams = JSON.parse(sessionStorage.pageparams);
			if(typeof(getParams.push)!="undefined")
				getParams.push(data);
			else
				getParams = [data];
			sessionStorage.pageparams = JSON.stringify(getParams);
		}else{
			sessionStorage.pageparams = JSON.stringify([data]); 
		}
		if(sessionStorage.hasOwnProperty("pagecache")){ 
			var getParams = JSON.parse(sessionStorage.pagecache);
			if(typeof(getParams.push)!="undefined")
				getParams.push(cache);
			else
				getParams = [cache];
			sessionStorage.pagecache = JSON.stringify(getParams);
		}else{
			sessionStorage.pagecache = JSON.stringify([cache]); 
		}
		sessionStorage.checkCache = "false";
		gotoAppP( page );
	};
	
	
	this.getPageParameters = function(){
		var getsParam = JSON.parse(sessionStorage.pageparams);
		if(getsParam.length<=0)
			return null;
		return getsParam[getsParam.length-1];
	};
	
	this.back = function(){
		var getsParam = JSON.parse(sessionStorage.pageparams);
		if(getsParam.length>0)
			getsParam.pop();
		sessionStorage.pageparams = JSON.stringify(getsParam);
		sessionStorage.checkCache = "true";
		if (typeof (navigator.app) !== "undefined") {
			navigator.app.backHistory();
		} else {
			window.history.back();
		}
	};
	
};
