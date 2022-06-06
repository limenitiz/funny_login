$(function () {
    const shrinkHeader = 50;
    $(window).scroll(function () {
        const scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) {
            $('header').addClass('shrink');
        }
        else {
            $('header').removeClass('shrink');
        }
    });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
    }
});
