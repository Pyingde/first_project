define(['jquery'],function($){
    return ()=>{
        // 先查询权限
        $('.lnav li').click(function(){
            $(this).next().slideToggle()
            if($(this).find('.xia').html() === 'ν'){
                $(this).find('.xia').html('>')
            }else{
                $(this).find('.xia').html('ν')
            }
            
        })
    }
})