require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		shopping_data:"shopping_data",
//		Tbload:"Tbload",
//		sets:"sets"
	},

});

require(['jquery','shopping_data','Tbload','sets'],function($,shopping_data,Tbload,sets){
	shopping_data.shopping_data();
//	Tbload();
//	setTimeout(function(){
//		sets();
//	},500);
	
});