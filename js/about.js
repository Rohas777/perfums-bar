$(document).ready(function () {
    //NOTE - Подгонка оригинальных размеров изображений под vw значения

    $(".content img").each(function () {
        let initWidth = $(this).width(),
            viewportWidth = $("body").width(),
            calcWidth = (initWidth / viewportWidth) * 100;

        $(this).css("width", calcWidth + "vw");
    });

    //NOTE - Слайдер отзывов

    

    const reviewsSwiper = new Swiper(".reviews__slider", {

        slidesPerView: 3,

        loop: true,

        navigation: {

            nextEl: ".reviews__nav .swiper-button-next",

            prevEl: ".reviews__nav .swiper-button-prev",

        },

        pagination: {

            el: ".reviews .swiper-pagination",

            clickable: true,

        },

        breakpoints: {

            0: {

                spaceBetween: 30,

                slidesPerView: 1,

            },

            601: {

                slidesPerView: 3,

            },

            993: {

                spaceBetween: 40,

            },

        },

    });

    
});
