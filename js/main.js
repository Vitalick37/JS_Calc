window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    const DAY_STRING = ['день', 'дня', 'дней'];

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
        mainForm = document.querySelector('.main-form'),
        typeSite = document.querySelector('.type-site'),
        maxDeadline = document.querySelector('.max-deadline'),
        rangeDeadline = document.querySelector('.range-deadline'),
        deadlineValue = document.querySelector('.deadline-value'),
        adaptValue = document.querySelector('.adapt_value'),
        desktopTemplatesValue = document.querySelector('.desktopTemplates_value'),
        mobileTemplatesValue = document.querySelector('.mobileTemplates_value'),
        editableValue = document.querySelector('.editable_value'),
        adapt = document.getElementById('adapt'),
        desktopTemplates = document.getElementById('desktopTemplates'),
        editable = document.getElementById('editable'),
        mobileTemplates = document.getElementById('mobileTemplates'),
        calcDescription = document.querySelector('.calc-description'),
        metrikaYandex = document.getElementById('metrikaYandex'),
        analyticsGoogle = document.getElementById('analyticsGoogle'),
        sendOrder = document.getElementById('sendOrder'),
        cardHead = document.querySelector('.card-head'),
        totalPrice = document.querySelector('.total_price'),
        firstFieldset = document.querySelector('.first-fieldset');

    // возвращает  склоняемое слово
    function declOfNum(n, titles) {
        return n + ' ' + titles[n % 10 === 1 && n % 100 !== 11 ?
            0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
    }
    // ##############################################################################################

    function showElem(elem) {
        elem.style.display = 'block';
    };

    function hideElem(elem) {
        elem.style.display = 'none';
    };

    function dopOptionsString() {
        let str = '';
        // Подключим Яндекс Метрику, Гугл Аналитику и отправку заявок на почту.
        if (metrikaYandex.checked || analyticsGoogle.checked || sendOrder.checked) {
            str += 'Подключим';
            if (metrikaYandex.checked) {
                str += ' Яндекс Метрику';
                if (analyticsGoogle.checked && sendOrder.checked) {
                    str += ', Гугл Аналитику и отправку заявок на почту'
                    return
                }
                if (analyticsGoogle.checked || sendOrder.checked) {
                    str += ' и';
                }
            };
            if (analyticsGoogle.checked) {
                str += ' Гугл Аналитику';
                if (sendOrder.checked) {
                    str += ' и';
                }
            };
            if (sendOrder.checked) {
                str += ' отправку заявок на почту';
            }
            str += '.';
        }

        return str;
    };

    function rendertextContent(total, site, maxDay, minDay) {
        // динамическая запись типа сайта
        typeSite.textContent = site;
        // ##############################################################################################

        // запись суммы
        totalPriceSum.textContent = total;
        // ##############################################################################################

        // запись количества дней на разработку сайта в тексе
        maxDeadline.textContent = declOfNum(maxDay, DAY_STRING);
        // ##############################################################################################

        rangeDeadline.min = minDay;
        rangeDeadline.max = maxDay;

        deadlineValue.textContent = declOfNum(rangeDeadline.value, DAY_STRING);

        calcDescription.textContent = `
        Сделаем ${site} ${adapt.checked ? ', адаптированный под мобильные устройства и планшеты' : ''}.
        ${editable.checked ? 'Установим панель админстратора, чтобы вы могли самостоятельно менять содержание на сайте без разработчика.' : ''}
        ${dopOptionsString()}
        `
    };



    function priceCalculation(elem = {}) {
        let result = 0,
            index = 0,
            options = [],
            site = '',
            maxDeadLineDay = DATA.deadlineDay[index][1],
            minDeadLineDay = DATA.deadlineDay[index][0],
            overPercent = 0;

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

                // тип сайта в тексте
                site = item.dataset.site;
                // ##############################################################################################

                // количество дней на разработку сайта в тексе
                maxDeadLineDay = DATA.deadlineDay[index][1];
                minDeadLineDay = DATA.deadlineDay[index][0];
                // ##############################################################################################

                // создание массива выбранных чекбоксов
            } else if (item.classList.contains('calc-handler') && item.checked) {
                options.push(item.value);
            } else if (item.classList.contains('want-faster') && item.checked) {
                const overDay = maxDeadLineDay - rangeDeadline.value;
                overPercent = overDay * (DATA.deadlinePercent[index] / 100);
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
        result += result * overPercent;
        // ##############################################################################################
        rendertextContent(result, site, maxDeadLineDay, minDeadLineDay);

    };

    function handlerCallBackForm(event) {

        // чекбокс не активен и активируется только после включения другого чекбокса. При выключении второго чекбокса первый тоже выключается и становится неактивен.
        if (adapt.checked) {
            mobileTemplates.disabled = false;
        } else {
            mobileTemplates.disabled = true;
            mobileTemplates.checked = false;
        };
        // ##############################################################################################

        // ДЗ lesson_3 Наверное можно записать короче, но я не придумал как. 
        // И ещё почему-то при первом checked на любой элемент его значение не меняется. Далее все работает норм.
        // function selectCheck (select, selectValue) {
        //     selectValue.textContent = select.checked ? 'Да' : 'Нет';
        // };

        // adapt.addEventListener('change', () => {
        //     selectCheck(adapt, adaptValue)
        // });
        // desktopTemplates.addEventListener('change', () => {
        //     selectCheck(desktopTemplates, desktopTemplatesValue)
        // });
        // mobileTemplates.addEventListener('change', () => {
        //     selectCheck(mobileTemplates, mobileTemplatesValue)
        // });
        // editable.addEventListener('change', () => {
        //     selectCheck(editable, editableValue)
        // });

        adaptValue.textContent = adapt.checked ? 'Да' : 'Нет';
        mobileTemplatesValue.textContent = mobileTemplates.checked ? 'Да' : 'Нет';
        desktopTemplatesValue.textContent = desktopTemplates.checked ? 'Да' : 'Нет';
        editableValue.textContent = editable.checked ? 'Да' : 'Нет';

        // ##############################################################################################



        // функция чекбокса "хочу быстрее"
        const target = event.target;
        if (target.classList.contains('want-faster')) {
            // if (target.checked) {
            //     showElem(fastRange)
            // } else {
            //     hideElem(fastRange)
            // }

            target.checked ? showElem(fastRange) : hideElem(fastRange);
            priceCalculation(target);
        };
        // ##############################################################################################

        if (target.classList.contains('calc-handler')) {
            priceCalculation(target);
        };
    };

    function moveBackTotal() {
        if (document.documentElement.getBoundingClientRect().bottom > document.documentElement.clientHeight + 200) {
            totalPrice.classList.remove('totalPriceBottom');
            firstFieldset.after(totalPrice);
            window.addEventListener('scroll', moveTotal);
            window.removeEventListener('scroll', moveBackTotal);
        }
    };

    function moveTotal() {
        if (document.documentElement.getBoundingClientRect().bottom < document.documentElement.clientHeight + 200) {
            totalPrice.classList.add('totalPriceBottom');
            endButton.before(totalPrice);
            window.removeEventListener('scroll', moveTotal);
            window.addEventListener('scroll', moveBackTotal);
        }
    };

    startButton.addEventListener('click', function () {
        showElem(mainForm);
        hideElem(firstScreen);
        window.addEventListener('scroll', moveTotal)
    });

    endButton.addEventListener('click', function () {
        for (const elem of formCalculate.elements) {
            if (elem.tagName === 'FIELDSET') {
                hideElem(elem);
            };
        };

        cardHead.textContent = 'Заявка на разработку сайта';

        hideElem(totalPrice);

        showElem(total);
    });

    formCalculate.addEventListener('change', handlerCallBackForm);
    priceCalculation();

});