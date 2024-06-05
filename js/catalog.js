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
});
