(function ($) {
    $(document).ready(function () {
        //добавлять класс, когда элемент находится в поле видимости
        inWindow('.elem_anim');
        //показывать меню при скролле
        ShowMenu();
        //навигация по лендингу
        LandingInit();
        //клик по стрелке вниз
        ToDown();

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
            if(scrollTop <= offset.top && (el.height()/2 + offset.top) < (scrollTop + windowHeight)){
                $(this).addClass('go')
            }
        });
    }

    function ShowMenu() {

            var $scroll = $(window).scrollTop();
            if($scroll > 100){
                $('header').addClass('stick');
                // $('header').stop().animate({top: "0px"}, 500);
                // $('#scrollTop').stop().animate({bottom: "20px"}, 500);
            }else {
                $('header').removeClass('stick');
                // $('header').stop().animate({top: "-70px"}, 500);
                // $('#scrollTop').stop().animate({bottom: "-60px"}, 500);
            };
    }

    function LandingInit() {
        $("a[rel='m_PageScroll2id']").mPageScroll2id({
            highlightSelector:"#navigation-menu a[rel='m_PageScroll2id']",
            liveSelector:"#navigation-menu a[rel='m_PageScroll2id']",
            offset:65
        });
    }
    
    function ToDown() {
        $('.arrow-to-down').click(function () {
            $('a[href="#skills"]').click();
        })
    }


})(jQuery);