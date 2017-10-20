define(['jquery'],function($){
	return {
		shopping_addGood:function(){
			$('.push').click(function(){
				$.post("http://localhost:666/addGood", {
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
						alert('添加成功');
						window.location.href='html/shopping.html';
					} else {
						alert(response.message);
						window.location.href='html/shopping.html';
					}
				})
			});
		}
	}
})
