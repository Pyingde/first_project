$(()=>{
    var left = $('body').innerWidth()/2-$('#main').innerWidth()/2;
    var top  = $('body').innerHeight()/2-$('#main').innerHeight()/2;
    $('#main').css({'left':left,'top':top})
    $( "#main" ).draggable();

    $(window).resize(function(){
        var left = $('body').innerWidth()/2-$('#main').innerWidth()/2;
        var top  = $('body').innerHeight()/2-$('#main').innerHeight()/2;
        $('#main').css({'left':left,'top':top});
    });

    $('#but').on('click',function(){
        post();
    })
    function post(){
        if(!$('#username').val()){
            alert('请输入用户名');
            $('#username').focus();
            return false;
        }
        if(!$('#password').val()){
            alert('请输入用户密码');
            $('#password').focus();
            return false;
        }
        $.post(baseUrl+"/login", {
            'name': $('#username').val(),
            'password': $('#password').val(),
        }
        , function(response){
            // response=JSON.parse(response)
            if(response != false){
                alert('登录成功');
                // window.location.href='http://localhost/csx/first_project/src';
                console.log(response)
            } else {
                alert('用户或密码输入有误');
            }
        })
    }
    // 回车手动执行
    $(window).keydown(function(e){
        if(e.keyCode === 13){
            post();
        }
    })

})