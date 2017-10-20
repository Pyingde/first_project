require.config({
	paths:{
		jquery:"../lib/jquery-3.1.1",
		provider_addProvider:"../api/provider_addProvider"
	}	
});

require(['jquery','provider_addProvider'],function($,provider_addProvider){
	provider_addProvider.provider_addProvider();
});