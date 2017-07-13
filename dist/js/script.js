(function ($) {
    $(document).ready(function () {
        inWindow('.elem_anim');
        ShowMenu();
        $(window).scroll(function(){
            inWindow('.elem_anim');
            ShowMenu();
        })
    });

    function inWindow(s){
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var currentEls = $(s);
        currentEls.each(function(){
            var el = $(this);
            var offset = el.offset();
            if(scrollTop <= offset.top && (el.height() + offset.top) < (scrollTop + windowHeight)){
                $(this).addClass('go')
            }
        });
    }

    function ShowMenu() {

            var $scroll = $(window).scrollTop();
            if($scroll > 100){
                $('header').stop().animate({top: "0px"}, 500);
                // $('#scrollTop').stop().animate({bottom: "20px"}, 500);
            }else {
                $('header').stop().animate({top: "-70px"}, 500);
                // $('#scrollTop').stop().animate({bottom: "-60px"}, 500);
            };
    }


})(jQuery);