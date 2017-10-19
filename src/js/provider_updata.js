require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		updataProvider:"../api/updataProvider"
	}	
});

require(['jquery','updataProvider'],function($,updataProvider){
	updataProvider.updataProvider();
});