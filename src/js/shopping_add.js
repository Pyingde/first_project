require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		shopping_addGood:"../api/shopping_addGood"
	}	
});

require(['jquery','shopping_addGood'],function($,shopping_addGood){
	shopping_addGood.shopping_addGood();
});