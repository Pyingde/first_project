define(['jquery'], function($){
    return ()=>{
        // 付款监听
        var socket = io("ws://"+fukuanIo+":8818");
        socket.on('ok', function(data){

            if(data == $('#receipt').val()){

                $('#qrcode').fadeToggle(900,function(){
                    $('#queren').fadeToggle(900);
                });
                $('#esc_zhifu').fadeOut();
                setTimeout(function(){
                    $('#eE').fadeToggle(900,function(){
                        $('.zhezhao').css("display","none");
                        $('#queren').css("display","none");
                        $('#qrcode').fadeToggle()
                        $('#esc_zhifu').fadeToggle()
                        $('#qrcode').children().remove();
                    });

                },3000)
            }
        })
        // .op的宽度
        $('.op').width($('table').width());
        $(window).resize(function(){
            $('.op').width($('table').width());
        })
        // 弹窗居中
        var left = $('body').innerWidth()/2-$('.way').innerWidth()/2;
        var top  = $('body').innerHeight()/2-$('.way').innerHeight()/2;
        $('.way').css({'left':left,'top':top})
        $(window).resize(function(){
            var left = $('body').innerWidth()/2-$('.way').innerWidth()/2;
            var top  = $('body').innerHeight()/2-$('.way').innerHeight()/2;
            $('.way').css({'left':left,'top':top});
        });
        // 二维码居中
        var left2 = $('body').innerWidth()/2-$('#eE').innerWidth()/2;
        var top2  = $('body').innerHeight()/2-$('#eE').innerHeight()/2;
        $('#eE').css({'left':left2,'top':top2})
        // 对象（有空余时间改成面向对象）
        var fn = {
            // 落单
            LD: function(){
                if(!$('tbody tr')[0]){return false;}
                if(confirm('确定落单吗？')===true){
                    $('tbody').html('');
                    $('#total').val('');
                    $('#cut').val(0);
                    $('#receipt').val('');
                }
            },
            // 打印
            print: function(){
                
                // 买单时间
                var date = new Date();
                var fen = date.getSeconds();
                var minutes = date.getMinutes();
                var hours = date.getHours();
                var day = date.getDate();
                var mon = date.getMonth()+1;
                if(String(fen).split('').length <2){
                    fen = "0"+fen;
                }
                if(String(minutes).split('').length <2){
                    fen = "0"+fen;
                }
                if(String(hours).split('').length <2){
                    fen = "0"+fen;
                }
                if(String(day).split('').length <2){
                    fen = "0"+fen;
                }
                if(String(mon).split('').length <2){
                    fen = "0"+fen;
                }
                // 商品信息
                var textAll = ``;
                for(var i=0; i<$('tbody tr').length; i++){
                    var a_name = $('tbody tr').eq(i).find('td').eq(2).html();
                    var a_money = $('tbody tr').eq(i).find('td').eq(10).html();
                    var a_number = $('tbody tr').eq(i).find('td').eq(7).html();
                    var a_nuit = $('tbody tr').eq(i).find('td').eq(6).html();
                    if(a_name.split('').length<4){
                        var konge = `_`.repeat(4-a_name.split('').length);
                        a_name = konge+a_name;
                    }
                    
                    textAll +=`${a_name}     ${a_number} ${a_nuit}     ${a_money} \n`;
                }

                // \n商品名称：香烟\n单品金额：100 元 \n商品数量：10 条\n总金额：1000 元\n
// var txt = `无阻超市收银系统 \n
//     *************************************\n
//     商品名称：${a01}\n
//     单品金额：${a02} 元 \n
//     商品数量：${a03} 条\n
//     总金额：${a04} 元\n
//     买单时间：${date.getFullYear()}-${mon}-${day} ${hours}:${minutes}:${fen}\n
//     *************************************\n`;
var txt = `无阻超市收银系统 \n
*************************************\n商品名称 | 商品数量  | 单品金额 \n${textAll}总金额：${$('#receipt').val()} 元\n买单时间：${date.getFullYear()}-${mon}-${day} ${hours}:${minutes}:${fen}\n*************************************\n`;
    console.log(txt)

                $.post("http://10.3.131.33:81/print", {text: txt},function(res){console.log(res)
                })

            },
            Over: function(){
                // 弹窗1
                $('.zhezhao').css("display","block");
                $('.way').fadeToggle()
                // 写入数据库voucher
                // 编号|商品名称|商品数量|商品价格|总价
                
                var DDip = parseInt(Math.random()*10000000000);
                var DDall = ``;
                for(var i=0; i<$('tbody tr').length; i++){
                    var a_name = $('tbody tr').eq(i).find('td').eq(2).html();
                    var a_number = $('tbody tr').eq(i).find('td').eq(7).html();
                    var a_money = $('tbody tr').eq(i).find('td').eq(10).html();
                    var a_nuit = $('tbody tr').eq(i).find('td').eq(6).html();
                    DDall += `商品名称：${a_name} —— 商品数量：${a_number} —— 商品价格：${a_money}  ; `;
                }

                var Over_voucher = {"DDip":DDip, "text":DDall, "money":$('#receipt').val() }

                // $.post(baseIo+COM_port+"/voucher", Over_voucher
                // , function(response){
                //     console.log(response);
                //     if(response === true){
                //         $('tbody').html('');
                //         $('#total').val('');
                //         $('#cut').val(0);
                //         $('#receipt').val('');
                //     }
                // });
            }
        };
        
        // 扫码枪回车事件
        $(window).keydown(function(e){
            // console.log(e.keyCode)
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
                            // console.log(arr_num)
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
                    // 双击的op时候清空内容
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
                $.post(baseIo+COM_port+"/sy", {'tiaoma':$('.ip input').val()}
                , function(response){
                    console.log(response)
                    // 里面的内容不影响外面的操作
                    if(response == false){
                        // 删除请求失败时写入的数据表格
                        $('body tr').last().remove();
                        alert('该商品不存在')

                    } else {
                        
                        var data = $('tbody tr').eq(no-1).find('td');
                        // 数据写入
                        data.eq(0).html(response.bianhao);
                        data.eq(1).html(response.tiaoma);
                        data.eq(2).html(response.name);
                        data.eq(3).html(response.size || null);
                        data.eq(4).html(response.url || null);
                        data.eq(5).html(response.class || '优等品');
                        data.eq(6).html(response.nuit || '个');
                        data.eq(7).html(response.amount || 1);
                        data.eq(8).html(response.jiage || 999999999999);
                        data.eq(9).html(response.rebate || 100);
                        // {"bianhao":"1231","tiaoma":"123456","name":"酷儿饮料","size":"500ml","url":"广州","class":"次品","nuit":"瓶","jiage":"8","rebate":"98"}
                        // 单价计算（10）从数据库里提取价格和折扣，防止私自修改
                        if(response.rebate == null){
                            response.rebate = data.eq(9).html()
                        }
                        var price = (Number(response.jiage)*Number(response.rebate)/100).toFixed(2);
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
            if(e.keyCode === 46){fn.LD();}
            // 挂单
            if(e.keyCode === 71){}
            // 提单
            if(e.keyCode === 84){}
            // 打印
            if(e.keyCode === 68){fn.print();}
            // 结算
            if(e.keyCode === 32){fn.Over();}
            // 退出
            if(e.keyCode === 27){}
        })
        
        // 落单挂单提单打印结算退出
        $('#butLD').click(function(){fn.LD();});
        $('#butprint').click(function(){fn.print();});
        $('#butOver').click(function(){fn.Over();});

        // 点击网络支付弹出二维码
        $('.weixin').click(function(){
            socket.emit('money',$('#receipt').val());
            $('.way').fadeToggle(600,function(){
                $('#eE').fadeToggle();
            })
        })
        // 退出
        $('#esc_zhifu').click(function(){
             $('#qrcode').children().remove();
            $.post(baseIo+COM_port+"/moneydel", {"ip":"999"}
                , function(response){

                })
            $('#eE').fadeToggle();
            $('.zhezhao').css("display","none");
        })
    }
})