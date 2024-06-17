$(document).ready(function () {
    //NOTE - Инициализация телефонных масок

    let $telInput = $("[type='tel']");

    $telInput.inputmask({
        mask: "+7 (999) 999 99 99",
        placeholder: "+7 (XXX) XXX XX XX",
    });

    //NOTE - Инициализация галлерей

    Fancybox.bind("[data-fancybox]", {});

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

    //NOTE - Функционал попапа преимуществ в оффере

    

    $(".offer-advantage").click(function () {

        let item = $(this);

        item.next(".offer-advantage__full").fadeIn(600);

        switchScroll();

        setTimeout(function (e) {

            item.next(".offer-advantage__full").addClass("active");

        }, 600);

    });

    $(".offer-advantage__close").click(function () {

        $(".offer-advantage__full").fadeOut(600);

        $(".offer-advantage__full").removeClass("active");

        switchScroll();

    });

    $(document).on("mouseup", function (e) {

        if (

            !$(".offer-advantage__full .container").is(e.target) &&

            !$(".offer-advantage__full .container").find(e.target).length &&

            $(".offer-advantage__full").hasClass("active")

        ) {

            $(".offer-advantage__full").fadeOut(600);

            $(".offer-advantage__full").removeClass("active");

            switchScroll();

        }

    });

    

    //NOTE - Функционал блока FAQ

    let questions = $(".faq__question");
    let answer = $(".faq__answer");

    questions.click(async function () {
        let index = $(this).index();
        if (
            answer.attr("data-faq-index") == index ||
            questions.hasClass("animating")
        ) {
            return;
        }
        questions.removeClass("active");
        $(this).addClass("active");
        $(this).addClass("animating");

        answer.slideUp(400);
        setTimeout(function () {
            answer.html(answers[index]).slideDown(600);
            answer.attr("data-faq-index", index);
        }, 400);
        setTimeout(function () {
            questions.removeClass("animating");
        }, 1000);
    });

    //NOTE - Сброс состояния ошибки у инпутов при вводе

    $("input").on("input", removeInputErrorState);

    //NOTE - Форма подписки в UTP2

    $("#follow").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "email",
                elem: $("#follow-email"),
                value: $("#follow-email").val().trim(),
                errorText: "Пожалуйста, укажите ваш Email",
            },
        ];
        console.log(checkForm(inputs));
    });

    //NOTE - Форма заявки вопроса в UTP2

    $("#feedback").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "name",
                elem: $("#feedback-name"),
                value: $("#feedback-name").val().trim(),
                errorText: "Пожалуйста, укажите ваше имя",
            },
            {
                name: "tel",
                elem: $("#feedback-tel"),
                value: $("#feedback-tel").val().trim(),
            },
        ];

        console.log(checkForm(inputs));
    });

    //NOTE - Слайдер сертификатов

    const certsSwiper = new Swiper(".certs__slider", {
        slidesPerView: 3,
        loop: true,
        navigation: {
            nextEl: ".certs__nav .swiper-button-next",
            prevEl: ".certs__nav .swiper-button-prev",
        },
    });

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
