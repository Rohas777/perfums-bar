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

    
    //NOTE - Попап авторизации ---------------------------------------------------
    
    $(".auth-popup-open").click(function (e) {
        e.preventDefault();
    
        turnOverlay(true);
        $(".auth-popup").addClass("active");
    });
    
    $(".auth-popup__close").click(function (e) {
        e.preventDefault();
    
        turnOverlay(false);
        $(".auth-popup").removeClass("active");
    });
    
    //NOTE - Переключение форм и кнопка "Я не помню пароль"
    
    $(".auth-popup__form.active").slideDown();
    
    $(".auth-popup__switch").click(function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) return;
    
        const switchType = $(this).attr("data-switch"),
            switchForm = $("#" + switchType);
    
        $(".auth-popup__switch").not($(this)).removeClass("active");
        $(".auth-popup__form").not(switchForm).slideUp(400).removeClass("active");
        switchForm.slideDown(400).addClass("active");
        $(this).addClass("active");
    });
    
    //NOTE - Переключение входа по email/телефону
    
    $(".auth-popup__signin-switch").click(function (e) {
        e.preventDefault();
        const allInputs = $(this).closest(".auth-popup__item").find("input"),
            activeInput = allInputs.filter(".active"),
            hiddenInput = allInputs.not(".active");
    
        $(".auth-popup__signin-switch").animate(
            {
                opacity: 0,
            },
            150,
            function () {
                $(".auth-popup__signin-switch")
                    .text(activeInput.attr("data-desc"))
                    .animate(
                        {
                            opacity: 1,
                        },
                        150
                    );
            }
        );
    
        activeInput.removeClass("active");
        hiddenInput.addClass("active");
    
        $(this)
            .closest("form")
            .attr("data-auth-type", hiddenInput.attr("data-type"));
    });
    
    //NOTE - Скрыть/показать поле пароля
    
    $(".show-pass").click(function (e) {
        e.preventDefault();
        const input = $(this).closest(".auth-popup__item").find("input");
    
        if ($(this).hasClass("hide-pass")) {
            input.attr("type", "password");
        } else {
            input.attr("type", "text");
        }
    
        $(this).toggleClass("hide-pass");
    });
    
    //NOTE - Сброс состояния ошибки у инпутов при вводе
    
    $("input").on("input", removeInputErrorState);
    
    //NOTE - Форма регистрации
    
    $("#signup").submit(function (e) {
        e.preventDefault();
    
        const sex = $(this).find('[name="signup-sex"]:checked').val();
        console.log(sex ? sex : false);
    
        const inputs = [
            {
                name: "name",
                elem: $("#signup-name"),
                value: $("#signup-name").val().trim(),
                errorText: "Пожалуйста, укажите ваше имя",
            },
            {
                name: "tel",
                elem: $("#signup-tel"),
                value: $("#signup-tel").val().trim(),
                errorText: "Пожалуйста, укажите ваш номер телефона",
            },
            {
                name: "email",
                elem: $("#signup-email"),
                value: $("#signup-email").val().trim(),
                errorText: "Пожалуйста, укажите ваш email",
            },
            {
                name: "sex",
                elem: $(this).find('[name="signup-sex"]'),
                value: sex ? sex : false,
                errorText: "Пожалуйста, укажите ваш пол",
            },
            {
                name: "date",
                elem: $("#signup-date"),
                value: $("#signup-date").val().trim(),
                errorText: "Пожалуйста, укажите дату вашего рождения",
            },
            {
                name: "pass",
                elem: $("#signup-pass"),
                value: $("#signup-pass").val(),
                errorText: "Пожалуйста, укажите пароль",
            },
            {
                name: "pass-repeat",
                elem: $("#signup-pass-repeat"),
                value: $("#signup-pass-repeat").val(),
                errorText: "Пожалуйста, повторите пароль",
            },
        ];
    
        console.log(checkForm(inputs));
    });
    
    //NOTE - Форма входа
    
    $("#signin").submit(function (e) {
        e.preventDefault();
    
        let inputs;
    
        if ($(this).attr("data-auth-type") == "tel") {
            inputs = [
                {
                    name: "tel",
                    elem: $("#signin-tel"),
                    value: $("#signin-tel").val().trim(),
                    errorText: "Пожалуйста, укажите ваш номер телефона",
                },
                {
                    name: "pass",
                    elem: $("#signin-pass"),
                    value: $("#signin-pass").val(),
                    errorText: "Пожалуйста, укажите ваш пароль",
                },
            ];
        } else if ($(this).attr("data-auth-type") == "email") {
            inputs = [
                {
                    name: "email",
                    elem: $("#signin-email"),
                    value: $("#signin-email").val().trim(),
                    errorText: "Пожалуйста, укажите ваш eamil",
                },
                {
                    name: "pass",
                    elem: $("#signin-pass"),
                    value: $("#signin-pass").val(),
                    errorText: "Пожалуйста, укажите ваш пароль",
                },
            ];
        }
        console.log(checkForm(inputs));
    });
    
    //NOTE - Сброс состояния выбора пола
    
    $("[name='signup-sex']").click(function () {
        $("[name='signup-sex']").removeClass("error");
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
