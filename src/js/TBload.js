define(['jquery'],function($){
    return ()=>{
        $('#Header').load('html/Header.html');
        $('#Lnav').load('html/Lnav.html');
    }

    // return [$('#Header').load('./Header.html'),$('#Lnav').load('./Lnav.html')]
        // if(t === 'index'){
        //     return [$('#indexTop').load('html/indexTop.html'),$('#indexBottom').load('html/indexBottom.html')]
        // }else{
        //     return [$('#indexTop').load('../html/indexTop2.html'),$('#indexBottom').load('../html/indexBottom2.html')]
        // }
    
     
})