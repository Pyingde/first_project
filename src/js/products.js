require.config({
	paths:{
		jquery:"../lib/jquery-3.2.1",
		Tbload:"Tbload",
		sets:"sets"
	},

});

require(['jquery','Tbload','sets'],function($,Tbload,sets){
	Tbload();
		setTimeout(function(){
		sets();
	},500);
});