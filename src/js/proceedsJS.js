define(['jquery'], function($){
    return ()=>{
        // 扫码枪回车事件
        $(window).keydown(function(e){
            
            if(e.keyCode === 13){
                var no = $('tr').length;
                // 非空验证
                if(!$('.ip input').val()){
                    $('.ip input').focus();
                    return;
                }
                // 添加tr,并写入序号
                $('tbody').append($('<tr></tr>').append($('<th scope="row"></th>').html(no)));
                // td数量
                $('tbody tr').eq(no-1).append($('<td></td>'.repeat($('thead th').length-1)));
                // 给数量部分添加class
                $('tbody tr').eq(no-1).find('td').eq(7).addClass('number');
                // 增加删除按钮
                $('tbody tr').eq(no-1).find('td').last().append($('<button class="X">&times</button>').click(function(){
                    // 点击删除商品
                    $(this).closest('tr').remove();
                    // 重新排列序号
                    for(var i=1; i<=$('body tr').length ;i++){
                        $('tbody th').eq(i-1).html(i)
                    }
                }))
                // 双击可编辑
                $('td').dblclick(function(){
                    // 折扣修改也没用，计算折扣取用数据库数据计算
                    var html = '';
                    setTimeout(()=>{
                        html = $(this).html();
                    },150)
                    var w = $(this).width();
                    // 双击的时候清空内容
                    $(this).html(`<input class="put" type="text" value="${html}" />`);

                    $(this).children().dblclick(function(){
                        $(this).parent().html(html);
                        $(this).remove();
                    })
                    $('.put').css({'width':w});
                    $('.put').focus().blur(function(){
                        var val = $(this).val();
                        $(this).parent().html(val);
                        $(this).remove();
                    })
                })
                
                
                // 价格被调整时重新计算总价和应收(待修复)
                $('.put').change(function(){
                    console.log('putput')
                })
                // 根据商品条码从数据库提取数据
                $.post("http://localhost:999/sy", {'tiaoma':$('.ip input').val()}
                , function(response){
                    response=JSON.parse(response)
                    // 里面的内容不影响外面的操作
                    if(response == false){
                        // 删除请求失败时写入的数据表格
                        $('body tr').last().remove();
                        alert('该商品不存在')
                    } else {
                        var data = $('tbody tr').eq(no-1).find('td');
                        console.log(response[0])
                        // 数据写入
                        data.eq(0).html(response[0].bianhao);
                        data.eq(1).html(response[0].tiaoma);
                        data.eq(2).html(response[0].name);
                        data.eq(3).html(response[0].size || null);
                        data.eq(4).html(response[0].url || null);
                        data.eq(5).html(response[0].class || '优等品');
                        data.eq(6).html(response[0].nuit || '个');
                        data.eq(7).html(response[0].amount || 1);
                        data.eq(8).html(response[0].jiage || 999999999999);
                        data.eq(9).html(response[0].rebate || 100);
                        // 单价计算（10）从数据库里提取价格和折扣，防止私自修改
                        var price = (Number(response[0].jiage)*Number(97)/100).toFixed(2);
                        data.eq(10).html(price);
                        // 金额计算
                        data.eq(11).html((price*Number(data.eq(7).html())).toFixed(2));
                        // 总价计算total
                        var total = 0;
                        for( var i=0; i<$('tbody tr').length; i++){
                            var a = $('tbody tr').eq(i).find('td').eq(11).html();
                            total += Number(a)
                        }
                        $('#total').val(total.toFixed(2));
                        // 应收
                        $('#receipt').val(total.toFixed(2));
                        // 保持总价除调减不可点击修改
                        var data_total =  $('#total').val();
                        $('#total').change(function(){
                            $(this).val(data_total);
                        });
                        // 调减计算cut,应收receipt
                        $('#cut').change(function(){
                            $('#receipt').val((Number($('#total').val())-Number($('#cut').val())).toFixed(2));
                        })
                        // 数量变更计算
                        $('tbody .number').dblclick(function(){
                            var ts = $(this);

                            $(this).children().blur(function(){
                                var a = Number($(this).val());
                                var b = Number(ts.next().next().next().html())
                                ts.next().next().next().next().html((a*b).toFixed(2));
                                // 总价~应收
                                var c = 0;
                                for(var i=0; i<$('tbody tr').length; i++){
                                    c+=Number($('tbody tr').eq(i).find('td').eq(11).html());
                                   
                                }
                                $('#total').val(c.toFixed(2));
                                $('#receipt').val((Number($('#total').val())-Number($('#cut').val())).toFixed(2));
                            })
                        })
                        // 点击删除减去对应部分
                        $('tbody .X').click(function(){
                            var num = $(this).parent().prev().html();
                            var c = 0;
                            for(var i=0; i<$('tbody tr').length; i++){
                                c+=Number($('tbody tr').eq(i).find('td').eq(11).html());
                            }
                            $('#total').val(c.toFixed(2));
                            $('#receipt').val((Number($('#total').val())-Number($('#cut').val())).toFixed(2));
                        })


                        
                        // 录入完成声效
                        $('#embed').html('');
                        $('#embed').append($('<embed src="../api/25.mp3" type="" />'));
                    }
                })
                
                // 焦点返回并清空
                $('.ip input').focus().val('');
                
            }
        })
        // .op的宽度
        $('.op').width($('table').width());
        
        


        // $('td')
    }
})