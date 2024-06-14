$(document).ready(function () {
    //NOTE - Инициализация галлерей

    Fancybox.bind("[data-fancybox]", {});

    //NOTE - Кнопка оригинального бренда

    $(".product__orig-button").click(function () {
        $(".product__image_original").toggleClass("active");
    });

    //NOTE - Счётчик товаров

    $(".product__counter-control").click(function () {
        const counterContainer = $(".product__counter");
        let productCount = counterContainer.find("span").text() - 0,
            maxCount = counterContainer.data("max") - 0;

        if (
            productCount === 1 &&
            $(this).hasClass("product__counter-control_minus")
        ) {
            return;
        }
        if (
            productCount === maxCount &&
            $(this).hasClass("product__counter-control_plus")
        ) {
            return;
        }
        $(".product__counter-control").removeClass("disabled");

        if ($(this).hasClass("product__counter-control_minus")) {
            productCount--;
        }
        if ($(this).hasClass("product__counter-control_plus")) {
            productCount++;
        }

        if (productCount === 1) {
            $(".product__counter-control_minus").addClass("disabled");
        }
        if (productCount === maxCount) {
            $(".product__counter-control_plus").addClass("disabled");
        }

        counterContainer.find("span").text(productCount);
    });

    //NOTE - Кнопка "В избранное"

    $(".fav-button").click(function () {
        $(this).toggleClass("added");
    });

    //NOTE - Слайдер похожих товаров

    const similarSwiper = new Swiper(".similar__slider", {
        slidesPerView: 3,
        spaceBetween: 35,
        loop: true,

        navigation: {
            nextEl: ".similar__slider .swiper-button-next",
            prevEl: ".similar__slider .swiper-button-prev",
        },
    });

    //NOTE - Слайдер рекомендуемых товаров

    const recommendationsSwiper = new Swiper(".recommendations__slider", {
        slidesPerView: 3,
        spaceBetween: 35,
        loop: true,

        navigation: {
            nextEl: ".recommendations__slider .swiper-button-next",
            prevEl: ".recommendations__slider .swiper-button-prev",
        },
    });
});
