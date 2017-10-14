define(['jquery','xcarousel'],function($){
	return {
		provider_add:function(){
			$('.push').click(function(){
				$.post("http://localhost:666/additem", {
					name: $('#name').val(),
					adress: $('#adress').val(),
					tel: $('#tel').val(),
					fax: $('#fax').val(),
					remark:$('#remark').val();
				}, function(response){
					console.log(response);
					if(response.status){
						alert('登记成功');
					} else {
						alert(response.message);
					}
				})
			})
		}
	}
})