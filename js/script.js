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

//NOTE - Включение/выключение оверлея

function turnOverlay(turn) {
    if (turn) {
        $("body, html").addClass("hidden");
        $(".overlay").fadeIn(300);
        return;
    }

    $("body, html").removeClass("hidden");
    $(".overlay").fadeOut(300);
}
