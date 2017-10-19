define(['jquery'],function($){
	return {
		provider_addProvider:function(){
			$('.push').click(function(){
				$.post("http://localhost:666/addProvider", {
					
					provider_num: $('#provider_num').val(),
					name: $('#name').val(),
					adress: $('#adress').val(),
					tel: $('#tel').val(),
					fax: $('#fax').val(),
					remark:$('#remark').val()
				}, function(response){
					console.log(response);
					if(response.status){
						alert('添加成功');
						window.location.href='provider_page.html';
					} else {
						alert(response.message);
					}
				})
			});
		}
	}
})

