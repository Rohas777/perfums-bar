function turnPaymentPopup(popup, turn) {
    if (turn) {
        popup.fadeIn(400).addClass("active");
        turnOverlay(true);
        return;
    }

    $(".payment-popup").fadeOut(600);
    $(".payment-popup").removeClass("active");
    switchScroll();
    turnOverlay();
}

$(document).ready(function () {
    //NOTE - Инициализация телефонных масок

    let $telInput = $("[type='tel']");

    $telInput.inputmask({
        mask: "+7 (999) 999 99 99",
        placeholder: "+7 (XXX) XXX XX XX",
    });

    //NOTE - Сброс состояния ошибки у инпутов при вводе

    $("input").on("input", removeInputErrorStatePayment);

    $(".payment__marker").hover(function () {
        if (
            !$(this).closest(".message-wrapper").hasClass("success") &&
            !$(this).closest(".message-wrapper").hasClass("error")
        )
            return;

        $(this).find(".message").fadeToggle(400);
    });

    //NOTE - Форма оплаты

    $("#paymentForm").submit(function (e) {
        e.preventDefault();

        const inputs = [
            {
                name: "name",
                elem: $("#paymentName"),
                value: $("#paymentName").val().trim(),
                errorText: "Пожалуйста, укажите ваше имя",
            },
            {
                name: "surname",
                elem: $("#paymentSurname"),
                value: $("#paymentSurname").val().trim(),
                errorText: "Пожалуйста, укажите вашу фамилию",
            },
            {
                name: "middlename",
                elem: $("#paymentMiddlename"),
                value: $("#paymentMiddlename").val().trim(),
                errorText: "Пожалуйста, укажите ваше отчество",
            },
            {
                name: "tel",
                elem: $("#paymentTel"),
                value: $("#paymentTel").val().trim(),
                errorText: "Пожалуйста, укажите ваш телефон",
            },
            {
                name: "email",
                elem: $("#paymentEmail"),
                value: $("#paymentEmail").val().trim(),
                errorText: "Пожалуйста, укажите ваш eamil",
            },
            {
                name: "region",
                elem: $("#paymentRegion"),
                value: $("#paymentRegion").val().trim(),
                errorText: "Пожалуйста, укажите вашу страну/регион",
            },
            {
                name: "address",
                elem: $("#paymentAddress"),
                value: $("#paymentAddress").val().trim(),
                errorText: "Пожалуйста, укажите ваш адрес",
            },
        ];

        let check = checkForm(inputs, true);
        let paymentType = $("[name='paymentType']:checked").attr("id");

        console.log(check);

        if (!check) return;

        console.log(paymentType);

        switch (paymentType) {
            case "paymentQr":
                // Код, который будет выполнен, если expression === value1
                turnPaymentPopup($(".qr-popup"), true);
                break;
            case "paymentOnline":
                // Код, который будет выполнен, если expression === value2
                break;
            case "paymentSbp":
                // Код, который будет выполнен, если expression === value2
                break;
            default:
            // Код, который будет выполнен, если ни одно из условий не совпало
        }
    });

    $("[name='paymentType']").change(function () {
        $(".payment__btns [type='submit']").text($(this).val());
    });

    $(document).on("mouseup", function (e) {
        if (
            !$(".payment-popup").is(e.target) &&
            !$(".payment-popup").find(e.target).length &&
            $(".payment-popup").hasClass("active")
        ) {
            turnPaymentPopup();
        }
    });
    $(".payment-popup__close").click(function (e) {
        turnPaymentPopup();
    });
});
