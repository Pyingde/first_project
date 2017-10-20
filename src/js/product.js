jQuery(function($){


		$('.modal').modal({
			show: false
		});
		$('.btnadd').click(function(){
			$('.modal').modal('toggle');
		})

		///点击删除操作
		$('tbody').on('click', '.delete', function(){
			var code = $(this).parent().siblings('.code').html();
			if(code == "") {
				alert("系统错误");
				return;
			}
			if(confirm("确定删除?")) {
				$.post('http://localhost:666/delProduct',{code:code},function(response){
					
				})
			}
		})

		//点击修改操作
		$('table').bind('click', '.update', function(){
			
		})

		// var $main = $('.main');
		// var $chart = $('.chart');
		var $btnadd = $('.btnadd');
		// var $table = $('#table');
		var $tbody = $('.tbody')
		var $save = $('#btn_save')
		var $del = $('.btn_del')
		var $datalists = $('#datalists')
		// $btnadd.on('click',function(){
		// 	var Tr = $(".tbody").children().first();
		// 	console.log(Tr);
		// 	var newTr = Tr.clone().show();
		// 	$(".tbody").append(newTr);
		// })

		// $del.on('click',function(){
		// 	// console.log(666)
		// 	$(this).parent().parent().remove();
		// })

		$save.on('click',function(){
			console.log($('#code').val())
			$.post("http://localhost:666/addproduct", {
				code: $('#code').val(),
				name: $('#name').val(),
				type: $('#type').val(),
				number: $('#number').val(),
				unit: $('#unit').val(),
				price: $('#price').val(),
			},function(response){
				// $('#new').modal("hide");
				// if(response.data.state == true) {
				// 	//成功
				// }else{
				// 	//失败
				// }
				console.log(response);	
			})
		})

		// var input = 
		// input.onblur = function(){
		// 				target.innerHTML = this.value;
		// 			}

			$.post('http://localhost:666/product',{},function(response){
			// console.log(response);	

			// var tbody = $('<tbody></tbody>')[0];

			tbody.innerHTML = response.data.map(item=>{
					// console.log(item)

					return `<tr>						
						<td class="code">${item.code}</td>
						<td class="name">${item.name}</td>
						<td>${item.type}</td>
						<td>${item.number}</td>
						<td>${item.unit}</td>
						<td>${item.price}</td>
						<td><span class="glyphicon glyphicon-remove delete"></span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="glyphicon glyphicon-wrench update"></span></td>
					</tr>`
				}).join('');
			// console.log($(tbody))
			// $(tbody).appendTo($datalists);
			})

		

		$('.btnser').on('click',function(){
			// console.log(555)
			var msg = $('.chazhao').val();
			// console.log(msg)
			$.post("http://localhost:666/productout",{
				msg:msg

			},function(msg){
				// console.log(msg);	

				// var tbody = $('<tbody></tbody>')[0];

				tbody.innerHTML = msg.data.map(item=>{
						// console.log(item.code)

						return `<tr>						
							<td class="code">${item.code}</td>
							<td class="name">${item.name}</td>
							<td>${item.type}</td>
							<td>${item.number}</td>
							<td>${item.unit}</td>
							<td>${item.price}</td>
							<td><span class="glyphicon glyphicon-remove del"></span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="glyphicon glyphicon-wrench mdf"></span></td>
						</tr>`
					}).join('');
				// console.log($(tbody))
				// $(tbody).appendTo($datalists);
		})
	})

});