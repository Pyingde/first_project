define(['jquery'],function($){
    return ()=>{
<<<<<<< HEAD
        // 先查询权限
        $('.lnav li').click(function(){
            if($(this).index()>0){
            $(this).next().slideToggle()
            if($(this).find('.xia').html() === 'ν'){
                $(this).find('.xia').html('>')
            }else{
                $(this).find('.xia').html('ν')
            }
            }
=======
    	console.log(44);
        // 先查询权限
        $('.lnav li').click(function(){
        	if($(this).index()>0){
        		 $(this).next().slideToggle()
	            if($(this).find('.xia').html() === 'ν'){
	                $(this).find('.xia').html('>')
	            }else{
	                $(this).find('.xia').html('ν')
	            }
        	}
           
>>>>>>> f59184d171a046275db93a1124537868c944deee
            
        })
    }
})