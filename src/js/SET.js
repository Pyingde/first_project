
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
    // TB[0];
    // TB[1];
    TB()
    // console.log(TB[0])
    sets();
})