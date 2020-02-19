window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    const DATA = {
        whichSite: ['landing', 'multiPage', 'onlineStore'],
        price: [4000, 8000, 26000],
        desktopTemplates: [50, 40, 30],
        adapt: 20,
        mobileTemplates: 15,
        editable: 10,
        metrikaYandex: [500, 1000, 2000],
        analyticsGoogle: [850, 1350, 3000],
        sendOrder: 500,
        deadlineDay: [
            [2, 7],
            [3, 10],
            [7, 14]
        ],
        deadlinePercent: [20, 17, 15],
    };

    const startButton = document.querySelector('.start-button'),
        firstScreen = document.querySelector('.first-screen'),
        formCalculate = document.querySelector('.form-calculate'),
        endButton = document.querySelector('.end-button'),
        total = document.querySelector('.total'),
        fastRange = document.querySelector('.fast-range'),
        totalPriceSum = document.querySelector('.total_price__sum'),
        mainForm = document.querySelector('.main-form');

    function showElem(elem) {
        elem.style.display = 'block';
    };

    function hideElem(elem) {
        elem.style.display = 'none';
    };

    if (adapt.checked) {
        mobileTemplates.disabled = false;  
    } else if (!adapt.checked) {
        mobileTemplates.disabled = true;   
    };
        

    function priceCalculation(elem) {
        let result = 0,
            index = 0,
            options = [];
        // сброс чекбоксов при смене типа сайта
        if (elem.name === 'whichSite') {
            for (const item of formCalculate.elements) {
                if (item.type === 'checkbox') {
                    item.checked = false;
                }
            }
            hideElem(fastRange);
        }
        // ##############################################################################################

        // получения индекса выбранного типа сайта
        for (const item of formCalculate.elements) {
            if (item.name === 'whichSite' && item.checked) {
                index = DATA.whichSite.indexOf(item.value);
                // ##############################################################################################

                // создание массива выбранных чекбоксов
            } else if (item.classList.contains('calc-handler') && item.checked) {
                options.push(item.value);
            }
            // ##############################################################################################
        }

        // перебор массива выбранных чекбоксов и подсчет суммы в соответствии в выбором
        options.forEach(function (key) {
            if (typeof (DATA[key]) === 'number') {
                if (key === 'sendOrder') {
                    result += DATA[key];
                } else {
                    result += DATA.price[index] * DATA[key] / 100;
                }
            }
            if (key === 'desktopTemplates') {
                result += DATA.price[index] * DATA.desktopTemplates[index] / 100;
            } else {
                result += DATA[key][index];
            }
        });
        // ##############################################################################################

        // подсчет суммы в зависимости от типа сайта(передача индекса)
        result += DATA.price[index];
        // ##############################################################################################

        // запись суммы
        totalPriceSum.textContent = result;
        // ##############################################################################################
    };

    function handlerCallBackForm(event) {
        // функция чекбокса "хочу быстрее"
        const target = event.target;
        if (target.classList.contains('want-faster')) {
            // if (target.checked) {
            //     showElem(fastRange)
            // } else {
            //     hideElem(fastRange)
            // }

            target.checked ? showElem(fastRange) : hideElem(fastRange);
        };
        // ##############################################################################################

        if (target.classList.contains('calc-handler')) {
            priceCalculation(target);
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