require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		provider_add:"../api/provider_add"
	},
	
	
});

require(['jquery','provider_add'],function($,provider_add){
	provider_add.provider_add();
});