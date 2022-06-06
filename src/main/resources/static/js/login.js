let showWelcome = 1;
let showCookies = 1;
let showThanks = 1;


$(document).ready(function (){
    drawKeyboard();
    showCustomPopup('welcome-popup', 'Welcome', 'Спасибо что посетили наш сайт');
});


function showCookiesPopup() {
    if (showCookies > 0) {
        showCustomPopup('cookies-popup', 'Cookies', 'Мы используем cookies :)');
    }
    showCookies -= 1;
}


function getRandChar(length=1) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


function getRandInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function getNewRandSymbol() {
    document.getElementById('username-input').value = getRandChar();
}


function pushSymbol() {
    document.getElementById('username').value +=
        document.getElementById('username-input').value;
}


function sendUserData() {
    if (document.getElementById('password').value !==
        document.getElementById('password_confirm').value) {

        showCustomPopup('error-popup', 'Error', 'Пароли не совпадают');
        return;
    }

    if (document.getElementById('username').value === '' ||
        document.getElementById('password').value === '' ||
        document.getElementById('password_confirm').value === '' ||
        document.getElementById('phone').value === '') {

        showCustomPopup('error-popup', 'Error', 'Данные не заполнены');
        return;
    }

    $.ajax({
        url: "/users/save",
        dataType: "json",
        contentType: "application/json",
        type: "POST",
        async: false,
        cache: false,
        data: JSON.stringify({
            username: $("#username").val(),
            password: $("#password").val(),
            phone: $("#phone").val()
        }),
        success: function (response) {
            console.log("success");
        },
        error: function (response) {
            console.log("error");
        }
    });

    clearUserData();
}


function clearUserData() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password_confirm').value = '';
    document.getElementById('phone').value = '8';
}


function swapSendAndClearBt(btName) {
    swapElem('btSend', 'btClear');
}


function addPassword() {
    let color = document.getElementById('password-input').value;
    let hash = 0;
    for (let c of color) {
        if (!isNaN(Number(c))) {
            hash += Number(c);
            console.log("hash = " + hash);
        }
    }
    document.getElementById('password').value += hash;

    console.log("pass = " + document.getElementById('password').value);
}


function addPasswordConfirm() {
    let color = document.getElementById('confirm-password-input').value;
    let hash = 0;
    for (let c of color) {
        if (!isNaN(Number(c))) {
            hash += Number(c);
        }
    }
    document.getElementById('password_confirm').value += hash;

    console.log("pass = " + document.getElementById('password_confirm').value);
}


function drawKeyboard(){
    let rows = 2;
    let cols = 5;

    let $keyboard = $('#keyboard');
    let keyboard = '';

    let num = 0;
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < cols; j++) {
            keyboard += `
            <span
                id='elem${i}${j}'
            >
                <button
                    onclick="inputNumber(${num})"
                    style="
                        width: 20px;
                        height: 20px;
                    "
                > ${num}
                </button>            
            </span>
            `;
            num = num + 1;
        }
        keyboard += `<br>`;
    }

    $keyboard.html(keyboard);
}


function inputNumber(num) {
    if (document.getElementById('phone').value.length > 10) {
        showCustomPopup('error-popup', 'Error', 'Номер ' +
            'телефона не может быть длиннее 10 символов');

        return;
    }

    document.getElementById('phone').value=
        document.getElementById('phone').value + num;

    shakeKeyboard();
}


function shakeKeyboard() {
    let rows = 2;
    let cols = 5;

    for (let i = 0; i < 10; i++) {
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < cols; j++) {
                let id1=`elem${i}${j}`;
                let ii = getRandInt(0, rows-1);
                let jj = getRandInt(0, cols-1);
                let id2 = `elem${ii}${jj}`;

                swapElem(id1, id2);
            }
        }
    }
}


function swapElem(id1, id2) {
    let $btSend = $(`#${id1}`).html();
    let $btClear = $(`#${id2}`).html();
    $(`#${id1}`).html($btClear);
    $(`#${id2}`).html($btSend);
}
