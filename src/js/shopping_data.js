define(['jquery'],function($){
	return {
		shopping_data:function(){
			// 当前分页
			var pageNo = 1;
			// 每页显示数量
			var qty = 10;
			//设置全局变量foag保证查询时数据不会变回初始值
//			var foag=0;
			//连接数据库动态生成表格
			var $table=$('table');
			var $tbody=$('table tbody')[0];
			var $page=$('.main .main_foot');
			$.post("http://localhost:666/selectGood",{pageNo:pageNo,qty:qty},function(msg){
				data(msg);	
				
			})	
//			//根据输入框信息查找
			var msg_btn=$('#msg_btn');
			msg_btn.click(function(){
				var pageNo=1;
				var qty=10;
				var input_msg=$('#msg').val();
				
				$.post("http://localhost:666/selectMsg2",{
					input_msg:input_msg,pageNo:pageNo,qty:qty	
				},function(msg){
					
					data(msg);
					$('#msg')[0].value='';
					
				})
				
			})
//			
//			// 点击分页获取相应信息
//			
			$page.on('click','.span',function(){
													
				pageNo = this.innerText;
				$.post("http://localhost:666/selectGood",{
					pageNo:pageNo,qty:qty	
				},function(msg){
					data(msg);							
				})	
			});
		
			
			
			function data(msg){
                $tbody.innerHTML = msg.message.map(item=>{
					return `<tr>						
						<td>${item.goods_number}</td>
						<td class="name">${item.goods_name}</td>
						<td>${item.goods_type}</td>
						<td>${item.goods_num}</td>
						<td>${item.monad}</td>
						<td>${item.only_price}</td>
						<td>${item.buyer}</td>		
						<td>${item.provider}</td>	
						<td><span class="glyphicon glyphicon-remove"></span></td>
						<td><span class="glyphicon glyphicon-wrench"></span></td>
					</tr>`
				}).join('');
				
				//点击删除按钮删除当前tr行
				$('tr').on('click','.glyphicon-remove',function(){
					
					var goods_name = $(this).parent().parent().children().eq(1).html();
					console.log(goods_name);
					$.post("http://localhost:666/delGoods",{
						goods_name:goods_name	
					},function(response){
//						var response=JSON.parse(response);
						console.log(response);
						if(response.status){
							alert('删除成功');
							
						} else {
							alert('删除失败');
							return;
						}
						
					})
					$(this).parent().parent().remove();
				});
//				点击更新按钮
				$('tr').on('click','.glyphicon-wrench',function(){
					
					var goods_name = $(this).parent().parent().children().eq(1).html();
					window.location.href='html/shopping_updata.html?'+goods_name;
				});
				
				// 生成分页				
				$page.html('');				
				var prev_page = document.createElement('span');
				$(prev_page).html('上一页').addClass("prev_page");
				$page.append(prev_page);
				for(var i=0;i<msg.pageLen;i++){
					var span = document.createElement('span');
					$(span).addClass('span')
					span.innerHTML = i+1;
					if(i===pageNo-1){
						$(span).addClass('active');
					}
					$page.append(span);
					
				}
				//生成页码及跳转页码
				var next_page = document.createElement('span');
				$(next_page).html('下一页').addClass("next_page");
				$page.append(next_page);	
				var page_num = document.createElement('span');
				$(page_num).html('跳转到').addClass('page_num');
				$page.append(page_num);
				var input =$('<input type="text" name="num" id="num" value="1" />');
				$page.append(input);
				var ye =$('<span>页</span>');
				$page.append(ye);	
<<<<<<< HEAD
				//生成进货，退货按钮
				var btn_in =$('<button id="btn_in">商品入库</button>');
				$page.append(btn_in);	
				var btn_out =$('<button id="btn_out">退货</button>');
				$page.append(btn_out);	
				
				//点击商品入库按钮，将订单商品添加进入仓库
				var btn_in=$('#btn_in');
				var btn_out=$('#btn_out');
				btn_in.click(function(){
					$.post("http://localhost:666/selectAllgoods",{
							
					},function(msg){
						console.log(msg.data);
						//将数组转化为json对象再传回后端
						var msg_obj = JSON.stringify(msg.data);
						$.post("http://localhost:666/insertAllgoods",{
							msg_obj
						},function(msg){
							console.log(msg);
								
						})	
					})
=======


				//生成进货，退货按钮
				var btn_in =$('<button id="btn_in">打印进货订单表</button>');
				$page.append(btn_in);	
				var btn_out =$('<button id="btn_out">打印退货订单表</button>');
				$page.append(btn_out);	
				
				//点击打印采购单按钮，生成订单表
				var btn_in=$('#btn_in');
				var btn_out=$('#btn_out');
				btn_in.click(function(){
					window.location.href='html/table.html?进货订单表';
				});
				btn_out.click(function(){
					window.location.href='html/table.html?退货单表';
>>>>>>> 57b57b639023f49977418e017551c5234dd302c4
				})
				
				
				
				
				
				
				//点击上下一页获取分页信息
				$('.next_page').on('click',function(){
					if(pageNo<msg.pageLen){
						pageNo++;
						$.post("http://localhost:666/selectGood",{
							pageNo:pageNo,qty:qty	
						},function(msg){
						
							data(msg);
							
						})
					}
				});
				$('.prev_page').on('click',function(){
					if(pageNo>1){
						pageNo--;
						$.post("http://localhost:666/selectGood",{
							pageNo:pageNo,qty:qty	
						},function(msg){
							
							data(msg);
							
						})
					}
				});
				//根据输入框的值跳转
				var num =$('#num');
				
				num.blur(function(){
					var num_val=num.val();
					num[0].value=num_val;
					
					$.post("http://localhost:666/selectGood",{
							pageNo:num_val,qty:qty	
						},function(msg){
						
							data(msg);
							var span = $('.span');
						
							span.each(function(){
								$(this).removeClass('active');
							})
							$(span[num_val-1]).addClass('active');
;						})
				})
				
        	}
			
			
		}
	}
})