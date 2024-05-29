//NOTE - Функция переключения скролла

function switchScroll(item = $("html, body")) {
    if (item.hasClass("hidden")) {
        item.removeClass("hidden");
    } else {
        item.addClass("hidden");
    }
}

//NOTE - Массив ответов для FAQ блока

const answers = [
    "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
    "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
    "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p><p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
    "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
    "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
    "<p>Номерная парфюмерия предлагает качественные ароматы по доступным ценам. Номера заменяют имена, сохраняя превосходное качество и эксклюзивность.</p>",
];

//NOTE - Функция валидации Email'а

function validateEmail(email) {
    var re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(String(email).toLowerCase());
}

//NOTE - Функция вызыва сообщения об ошибке

function showMessage(elem, text) {
    if (!elem.hasClass("error")) {
        elem.addClass("error").text(text).slideDown(300);
        return;
    }
    elem.slideUp(300);
    setTimeout(function () {
        elem.text(text).slideDown(300);
    }, 300);
}

//NOTE - Функция проверки инпута для вывода сообщения

function checkInputForMessage(input, inputVal, errorText) {
    const message = input.closest("form").find(".message");
    if (!inputVal) {
        showMessage(message, errorText);
        return false;
    }
    if (input.attr("data-type") == "email" && !validateEmail(inputVal)) {
        showMessage(message, "Пожалуйста, введите корректный Email");
        return false;
    }

    return true;
}

//NOTE - Функция проверки инпута для изменения состояния

function checkInput(
    input,
    inputVal,
    errorText = "Вам необходимо корректно заполнить поля"
) {
    const message = input.closest("form").find(".message");

    if (!inputVal) {
        input.addClass("error");
    }
    if (input.attr("data-type") == "email" && !validateEmail(inputVal)) {
        input.addClass("error");
    }
    if (message.hasClass("error")) {
        return;
    }

    if (!checkInputForMessage(input, inputVal, errorText)) return false;

    input.removeClass("error");
    message.removeClass("error").slideUp(300);
    return inputVal;
}

//NOTE - Функция сброса состояния ошибки у текущего инпута

function removeInputErrorState() {
    $(this).removeClass("error");
    $(this).closest("form").find(".message").removeClass("error").slideUp(300);
}

//NOTE - Функция проверки формы

function checkForm(inputs) {
    let response = {};

    inputs.forEach((input) => {
        response[input.name] = checkInput(
            input.elem,
            input.value,
            input.errorText
        );
    });
    for (let elem in response) {
        if (!response[elem]) {
            return false;
        }
    }

    return response;
}

$(document).ready(function () {
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
