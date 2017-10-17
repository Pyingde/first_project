
require.config({
    paths:{
        jquery:'../lib/jquery-3.2.1',
        sets:'./sets',
        TBload:'./TBload'
    },
    shim:{
        sets:['jquery'],
        TBload:['jquery']
    }
});
require(['jquery','TBload','sets'],function($,TB,sets){
    TB()
    setTimeout(function(){
    sets();
    },500)
})