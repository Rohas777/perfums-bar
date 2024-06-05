$(document).ready(function () {
    //NOTE - Функционал кнопки поиска

    $(".search__open").click(function () {
        if (!$(this).closest(".search").hasClass("active")) {
            $(this).closest(".search").addClass("active");
            $(this).closest(".menu__search").addClass("active");
            $(".menu__buttons").addClass("search-opened");
            setTimeout(function () {
                $(".search__input").focus();
            }, 800);
        }
    });

    $(".search__close").click(function () {
        if ($(this).closest(".search").hasClass("active")) {
            $(this).closest(".search").removeClass("active");
            $(this).closest(".menu__search").removeClass("active");
            $(".menu__buttons").removeClass("search-opened");
            setTimeout(function () {
                $(".search__input").val("");
            }, 800);
        }
    });

    //NOTE - Переключение цвета категорий

    $(".menu__categories button").click(function () {
        if ($(this).hasClass("active")) return;

        $(".menu__categories button").removeClass("active");
        $(this).addClass("active");
    });
    $(".menu__subcategories button").click(function () {
        if ($(this).hasClass("active")) return;

        $(".menu__subcategories button").removeClass("active");
        $(this).addClass("active");
    });

    //NOTE - Переключение литража флакона

    

    $(".product-card__capacity-item").click(function () {

        if ($(this).hasClass("active") || $(this).hasClass("not-avialable")) {

            return;

        }

    

        $(this)

            .closest(".product-card__capacity")

            .find(".product-card__capacity-item")

            .removeClass("active");

        $(this).addClass("active");

    });

    

    //NOTE - Функционал кнопки фильтров

    $(".menu__filter").click(function () {
        turnOverlay(true);
        $(this).addClass("active");
        $(".filter").addClass("opened");
    });

    $(".overlay").click(function () {
        turnOverlay(false);
        $(".menu__filter").removeClass("active");
        $(".filter").removeClass("opened");
    });

    $(".filter__close").click(function () {
        turnOverlay(false);
        $(".menu__filter").removeClass("active");
        $(".filter").removeClass("opened");
    });

    //NOTE - Фльтры

    $(".filter__head-wrapper").click(function () {
        if (!$(this).find(".filter__show").length) return;

        $(this)
            .closest(".filter__chunk")
            .find(".filter__body")
            .slideToggle(300);
        $(this).toggleClass("opened");
    });

    $(".filter__reset").click(function (e) {
        e.preventDefault();
        $(this).closest(".filter__chunk").find("input").prop("checked", false);
        console.log(
            $(this).closest(".filter__chunk").find("input").prop("checked")
        );
    });
});
