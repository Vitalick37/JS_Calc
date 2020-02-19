window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    const startButton = document.querySelector('.start-button'),
        firstScreen = document.querySelector('.first-screen'),
        formCalculate = document.querySelector('.form-calculate'),
        endButton = document.querySelector('.end-button'),
        total = document.querySelector('.total'),
        fastRange = document.querySelector('.fast-range'),
        mainForm = document.querySelector('.main-form');

    function showElem(elem) {
        elem.style.display = 'block';
    };

    function hideElem(elem) {
        elem.style.display = 'none';
    };

    function handlerCallBackForm(event) {
        const target = event.target;
        if (target.classList.contains('want-faster')) {
            // if (target.checked) {
            //     showElem(fastRange)
            // } else {
            //     hideElem(fastRange)
            // }

            target.checked ? showElem(fastRange) : hideElem(fastRange);
        };
    };

    startButton.addEventListener('click', function () {
        showElem(mainForm);
        hideElem(firstScreen);
    });

    endButton.addEventListener('click', function () {
        for (const elem of formCalculate.elements) {
            if (elem.tagName === 'FIELDSET') {
                hideElem(elem);
            };
        };
        showElem(total);
    });

    formCalculate.addEventListener('change', handlerCallBackForm);

});