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

    $('#but').click(function(){
        $.post("http://localhost:999/login", {
            'username': $('#username').val(),
            'password': $('#password').val(),
        }
        , function(response){
            response=JSON.parse(response)
            if(response.status){
                alert('登录成功');
                var root = JSON.stringify(response.cookie);
                var date = new Date();
                date.setDate(date.getDate()+15);
                console.log(date)
                document.cookie = "root=" + root + ";path=/;expires=" + date;
                document.cookie = "name=666";
                
                document.cookie="csx=csx";
                console.log(document.cookie)
            } else {
                alert(response.message);
            }
        })
    })

})