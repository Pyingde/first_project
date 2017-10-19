jQuery(function(){
	var params = location.search;			
			// 截取？后面的字符
	var name=decodeURI(params.slice(1));
	console.log(name);
	var h4=$('h4');
	var $tbody=$('tbody')[0];
	h4.html(name);
	$.post("http://localhost:666/selectAllgoods",{
		
	},function(msg){
		console.log(msg);	
		data(msg);
	})
	function data(msg){
        $tbody.innerHTML = msg.data.map(item=>{
			return `<tr>						
				<td>${item.goods_number}</td>
				<td class="name">${item.goods_name}</td>
				<td>${item.goods_type}</td>
				<td>${item.goods_num}</td>
				<td>${item.monad}</td>
				<td>${item.only_price}</td>
				<td>${item.buyer}</td>		
				<td>${item.provider}</td>	
			</tr>`
		}).join('');
	}
})
