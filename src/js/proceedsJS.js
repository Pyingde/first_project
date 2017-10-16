define(['jquery'], function($){
    return ()=>{
        // 扫码枪回车事件
        $(window).keydown(function(e){
            console.log($('.ip').val())
            if(!$('.ip input').val()){
                $('.ip input').focus();
                return;
            }
            var no = $('tr').length;
            if(e.keyCode === 13){
                // 添加tr,并写入序号
                $('tbody').append($('<tr></tr>').append($('<th scope="row"></th>').html(no)));
                // td数量
                $('tbody tr').eq(no-1).append($('<td>Table cell</td>'.repeat($('thead th').length-1)));
                // 编号写入tr
                
                // 焦点返回并清空
                
                $('.ip input').focus().val('');
                // 录入完成声效
                $('#embed').html('');
                $('#embed').append($('<embed src="../api/25.mp3" type="" />'));
            }
        })
        // .op的宽度
        $('.op').width($('table').width());
        
        // 双击可编辑
        $('td').dblclick(function(){
            var html = $(this).html()
            // $(this).html('').append($('<input type="text" class="put"/>').val(html).dblclick(function(){
            //     $(this).val(html)
            // }));
            var w = $(this).width()
            $(this).html('').html(`<input type="text" value="${html}" class="put"/>`);

            $('.put').css({'width':w})

            
            $('.put').focus().blur(function(){
                var val = $(this).val();

                $(this).parent().html(val);
                $(this).remove();
            })
        })


        // $('td')
    }
})