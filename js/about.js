$(document).ready(function () {
    //NOTE - Слайдер отзывов
    
    const reviewsSwiper = new Swiper(".reviews__slider", {
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        navigation: {
            nextEl: ".reviews__nav .swiper-button-next",
            prevEl: ".reviews__nav .swiper-button-prev",
        },
    });
    
});
