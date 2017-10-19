define(['jquery'],function($){
	return {
		updataGoods:function(){
			var params = location.search;			
			// 截取？后面的字符
		    var _name=decodeURI(params.slice(1));
		    console.log(_name);
		    $.post("http://localhost:666/selectMsg2", {
		    	input_msg:_name,pageNo:1,qty:10	
		    },
		    function(response){
		    	console.log(response);
		    	$('#goods_number')[0].value=response.message[0].goods_number;
		    	$('#goods_name')[0].value=response.message[0].goods_name;
		    	$('#goods_type')[0].value=response.message[0].goods_type;
		    	$('#goods_num')[0].value=response.message[0].goods_num;
		    	$('#monad')[0].value=response.message[0].monad;
		    	$('#only_price')[0].value=response.message[0].only_price;
		    	$('#buyer')[0].value=response.message[0].buyer;
		    	$('#provider')[0].value=response.message[0].provider;
		    });
			$('.push').click(function(){
				$.post("http://localhost:666/updataGoods", {
					_name:_name,
					
					goods_number: $('#goods_number').val(),
					goods_name: $('#goods_name').val(),
					goods_type: $('#goods_type').val(),
					goods_num: $('#goods_num').val(),
					monad: $('#monad').val(),
					only_price: $('#only_price').val(),
					buyer:$('#buyer').val(),
					provider: $('#provider').val()
				}, function(response){
					console.log(response);
					if(response.status){
						alert('更新成功');
						window.location.href='shopping.html';
					} else {
						alert(response.message);
					}
				})
			});
			
		}
	}
})