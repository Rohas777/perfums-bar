$(document).ready(function () {
    //NOTE - Слайдер в оффере

    const offerSwiper = new Swiper(".offer__slider", {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000,
        },

        navigation: {
            nextEl: ".offer__slider .swiper-button-next",
            prevEl: ".offer__slider .swiper-button-prev",
        },
        pagination: {
            el: ".offer__slider .swiper-pagination",
            clickable: true,
        },
    });

    //NOTE - Кнопка для скролла на следующий блок

    $(".slide-down").click(function () {
        const scrollTarget = $(this)
            .closest("section")
            .next("section")
            .offset().top;

        $("body, html").animate(
            {
                scrollTop: scrollTarget,
            },
            "slow"
        );
    });
});
