require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		provider_data:"provider_data",
		Tbload:"Tbload",
		sets:"sets"
	},

});

require(['jquery','provider_data','Tbload','sets'],function($,provider_data,Tbload,sets){
	provider_data.provider_data();
	Tbload();
	setTimeout(function(){
		sets();
	},500);
	
});