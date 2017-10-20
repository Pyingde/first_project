define(['jquery'], function($){
    return ()=>{
        // 扫码枪回车事件
        $(window).keydown(function(e){
            console.log(e.keyCode)
            if(e.keyCode === 13){
                var no = $('tr').length;
                // 非空验证
                if(!$('.ip input').val()){
                    $('.ip input').focus();
                    return;
                }
                // 数量++
                var arry = [];
                var arr_id = $('.ip input').val();
                for(var i=0; i<$('tbody tr').length ;i++){
                    arry.push($('tbody tr').eq(i).find('td').eq(1).html())
                }
                if(arry.indexOf(arr_id)>=0){
                    for(var i=0; i<$('tbody tr').length ;i++){
                        if($('tbody tr').eq(i).find('td').eq(1).html() == arr_id){
                            var arr_num = Number($('tbody tr').eq(i).find('.number').html());
                            console.log(arr_num)
                            $('tbody tr').eq(i).find('.number').html(arr_num+1);
                            // 价格-声音
                            $('tbody tr').eq(i).find('td').eq(11).html(($('tbody tr').eq(i).find('.number').html()*$('tbody tr').eq(i).find('td').eq(10).html()).toFixed(2))
                            var c = 0;
                            for(var j=0; j<$('tbody tr').length; j++){
                                c+=Number($('tbody tr').eq(j).find('td').eq(11).html());
                            }
                            $('#total').val(c.toFixed(2));
                            $('#receipt').val((Number($('#total').val())-Number($('#cut').val())).toFixed(2));
                            // $('#embed').append($('<embed src="../api/25.mp3" type="" />'));
                            $('.ip input').val('').focus();
                            return false;
                        }
                    }
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
                    var html = $(this).html();
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
                // 根据商品条码从数据库提取数据
                $.post("http://localhost:666/sy", {'tiaoma':$('.ip input').val()}
                , function(response){
                    response=JSON.parse(response)
                    // 里面的内容不影响外面的操作
                    if(response == false){
                        // 删除请求失败时写入的数据表格
                        $('body tr').last().remove();
                        alert('该商品不存在')

                    } else {
                        
                        var data = $('tbody tr').eq(no-1).find('td');
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
                        if(response[0].rebate == null){
                            response[0].rebate = data.eq(9).html()
                        }
                        var price = (Number(response[0].jiage)*Number(response[0].rebate)/100).toFixed(2);
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
                        var arr_number=[];
                        $('tbody .number').dblclick(function(){
                            var ts = $(this);
                            arr_number.push(ts.html())
                            $(this).children().blur(function(){
                                var a = Number($(this).val());
                                if(a!=NaN && a>0){
                                var b = Number(ts.next().next().next().html())
                                ts.next().next().next().next().html((a*b).toFixed(2));
                                // 总价~应收
                                var c = 0;
                                for(var i=0; i<$('tbody tr').length; i++){
                                    c+=Number($('tbody tr').eq(i).find('td').eq(11).html());
                                }
                                $('#total').val(c.toFixed(2));
                                $('#receipt').val((Number($('#total').val())-Number($('#cut').val())).toFixed(2));
                                arr_number=[];
                                }else{
                                    ts.html(arr_number[0])
                                    arr_number=[];
                                }
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
                        // $('#embed').html('');
                        // $('#embed').append($('<embed src="../api/25.mp3" type="" />'));
                    }
                })
                // 焦点返回并清空
                $('.ip input').focus().val('');
            }
            // 案件快捷事件
            // 落单
            if(e.keyCode === 46){
                if(!$('tbody tr')[0]){return false;}
                if(confirm('确定落单吗？')===true){
                    $('tbody').html('');
                    $('#total').val('');
                    $('#cut').val(0);
                    $('#receipt').val('');
                }
            }
            // 挂单
            if(e.keyCode === 71){}
            // 提单
            if(e.keyCode === 84){}
            // 打印
            if(e.keyCode === 68){}
            // 结算
            if(e.keyCode === 32){}
            // 退出
            if(e.keyCode === 27){}
        })
        // .op的宽度
        $('.op').width($('table').width());

    }
})