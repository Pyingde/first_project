jQuery(function($){


		$('#new').modal({
			show: false
		});
		$('.btnadd').click(function(){
			$('#new').modal('toggle');
		})

		///点击删除操作
		$('tbody').on('click', '.delete', function(){
			var code = $(this).parent().siblings('.code').html();
			// console.log($(this).parent().parent())
			if(code == "") {
				alert("系统错误");
				return;
			}
			if(confirm("确定删除?")) {
				$.post('http://localhost:666/delProduct',{code:code},function(response){
					
				})
			}
			$(this).parent().parent().remove()
		})

		//点击修改操作
		$('tbody').on('click', '.update', function(e){
			$('#news').modal({show: false});
			$('#news').modal('toggle');

			var _code = $(this).parent().siblings('.code').html();
			$('#code1').val(_code);
			var _name = $(this).parent().siblings('.name').html();
			$('#name1').val(_name);
			var _type = $(this).parent().siblings('.type').html();
			$('#type1').val(_type);
			var _number = $(this).parent().siblings('.number').html();
			$('#number1').val(_number);
			var _unit = $(this).parent().siblings('.unit').html();
			$('#unit1').val(_unit);
			var _price = $(this).parent().siblings('.price').html();
			$('#price1').val(_price);

			$('#btn_uptate').on('click',function(){
				$.post("http://localhost:666/updateproduct", {
					code: $('#code1').val(),
					name: $('#name1').val(),
					type: $('#type1').val(),
					number: $('#number1').val(),
					unit: $('#unit1').val(),
					price: $('#price1').val(),

				},function(response){
					console.log(response);	
				})
				console.log(555555);
				console.log($('#number1').val())
			});

			

		})



		
		var $btnadd = $('.btnadd');
		var $tbody = $('.tbody')
		var $save = $('#btn_save')
		var $del = $('.btn_del')
		var $datalists = $('#datalists')

		$save.on('click',function(){
			console.log($('#code').val())
			$.post("http://localhost:666/addproduct", {
				code: $('#code').val(),
				name: $('#name').val(),
				type: $('#type').val(),
				number: $('#number').val(),
				unit: $('#unit').val(),
				price: $('#price').val(),
				class: $('#class').val(),
				tiaoma: $('#tiaoma').val(),
				rebate: $('#rebate').val(),
			},function(response){
				console.log(response);	
			})
		})


			$.post('http://localhost:666/product',{},function(response){
			

			tbody.innerHTML = response.data.map(item=>{
					// console.log(item)

					return `<tr>						
						<td class="code">${item.code}</td>
						<td class="name">${item.name}</td>
						<td class="type">${item.type}</td>
						<td class="number">${item.number}</td>
						<td class="unit">${item.unit}</td>
						<td class="price">${item.price}</td>
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
							<td class="type">${item.type}</td>
							<td class="number">${item.number}</td>
							<td class="unit">${item.unit}</td>
							<td class="price">${item.price}</td>
							<td><span class="glyphicon glyphicon-remove del"></span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<span class="glyphicon glyphicon-wrench mdf"></span></td>
						</tr>`
					}).join('');
				// console.log($(tbody))
				// $(tbody).appendTo($datalists);
		})
	})

});