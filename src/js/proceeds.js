
require.config({
    paths:{
        jquery:'../lib/jquery-3.2.1',
        proceedsJS:'./proceedsJS',
        TBload:'./TBload',
        set:'./sets'
    },
    shim:{
        proceedsJS:['jquery'],
        TBload:['jquery'],
        set:['jquery','TBload']
    }
});
require(['jquery','TBload','proceedsJS','set'],function($,TB,pro,set){
    // TB[0];
    TB();
    pro();
    setTimeout(function(){
        set();
    },500)
})