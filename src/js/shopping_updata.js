require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		updataGoods:"../api/updataGoods"
	}	
});

require(['jquery','updataGoods'],function($,updataGoods){
	updataGoods.updataGoods();
});