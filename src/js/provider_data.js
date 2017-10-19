define(['jquery'],function($){
	return {
		provider_data:function(){
			// 当前分页
			var pageNo = 1;
			// 每页显示数量
			var qty = 10;
			//设置全局变量foag保证查询时数据不会变回初始值
			var foag=0;
			//连接数据库动态生成表格
			var $table=$('table');
			var $tbody=$('table tbody')[0];
			var $page=$('.main .main_foot');
			$.post("http://localhost:666/selectProvider",{pageNo:pageNo,qty:qty},function(msg){
				console.log(msg);
				data(msg);	
				
			})
			
			
			//根据输入框信息查找
			var msg_btn=$('#msg_btn');
			msg_btn.click(function(){
				var pageNo=1;
				var qty=10;
				var foag=1;	
				var input_msg=$('#msg').val();
				
				if(foag==1){
					$.post("http://localhost:666/selectMsg",{
						input_msg:input_msg,pageNo:pageNo,qty:qty	
					},function(msg){
						
						data(msg);
						$('#msg')[0].value='';
						
					})
				}
				
			})
			
			// 点击分页获取相应信息
			
			$page.on('click','.span',function(){
				if(foag==0){											
					pageNo = this.innerText;
					console.log(foag);
					$.post("http://localhost:666/selectProvider",{
						pageNo:pageNo,qty:qty	
					},function(msg){
						data(msg);							
					})	
				}
				else if(foag==1){											
					pageNo = this.innerText;
					console.log(foag);
					$.post("http://localhost:666/selectMsg",{
						input_msg:input_msg,pageNo:pageNo,qty:qty	
					},function(msg){
						data(msg);							
					})	
				}
			});
		
			
			
			function data(msg){
                $tbody.innerHTML = msg.message.map(item=>{
					return `<tr>						
						<td>${item.provider_num}</td>
						<td class="name">${item.name}</td>
						<td>${item.adress}</td>
						<td>${item.tel}</td>
						<td>${item.fax}</td>
						<td>${item.remark}</td>				
						<td><span class="glyphicon glyphicon-remove"></span></td>
						<td><span class="glyphicon glyphicon-wrench"></span></td>
					</tr>`
				}).join('');
				
				//点击删除按钮删除当前tr行
				$('tr').on('click','.glyphicon-remove',function(){
					
					var name = $(this).parent().parent().children().eq(1).html();
					console.log(name);
					$.post("http://localhost:666/delProvider",{
						name:name	
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
				//点击更新按钮
				$('tr').on('click','.glyphicon-wrench',function(){
					
					var name = $(this).parent().parent().children().eq(1).html();
					console.log(name);
					window.location.href='provider_updata.html?'+name;
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
				//点击上下一页获取分页信息
				$('.next_page').on('click',function(){
					if(pageNo<msg.pageLen){
						pageNo++;
						$.post("http://localhost:666/selectProvider",{
							pageNo:pageNo,qty:qty	
						},function(msg){
						
							data(msg);
							
						})
					}
				});
				$('.prev_page').on('click',function(){
					if(pageNo>1){
						pageNo--;
						$.post("http://localhost:666/selectProvider",{
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
					
					$.post("http://localhost:666/selectProvider",{
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