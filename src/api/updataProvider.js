define(['jquery'],function($){
	return {
		updataProvider:function(){
			var params = location.search;			
			// 截取？后面的字符
		    var provider_name=decodeURI(params.slice(1));
		    console.log(provider_name);
		    $.post("http://localhost:666/selectMsg", {
		    	input_msg:provider_name,pageNo:1,qty:10	
		    },
		    function(response){
		    	console.log(response);
		    	$('#provider_num')[0].value=response.message[0].provider_num;
		    	$('#name')[0].value=response.message[0].name;
		    	$('#adress')[0].value=response.message[0].adress;
		    	$('#tel')[0].value=response.message[0].tel;
		    	$('#fax')[0].value=response.message[0].fax;
		    	$('#remark')[0].value=response.message[0].remark;
		    });
			$('.push').click(function(){
				$.post("http://localhost:666/updataProvider", {
					provider_name:provider_name,
					provider_num: $('#provider_num').val(),
					name: $('#name').val(),
					adress: $('#adress').val(),
					tel: $('#tel').val(),
					fax: $('#fax').val(),
					remark:$('#remark').val()
				}, function(response){
					console.log(response);
					if(response.status){
						alert('更新成功');
						window.location.href='provider_page.html';
					} else {
						alert(response.message);
					}
				})
			});
			
		}
	}
})