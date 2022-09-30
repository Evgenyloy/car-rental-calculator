const tariff = document.querySelectorAll('.switcher__item-input');
const total = document.querySelector('.form__total');
const time = document.querySelector('#time');
const volume = document.querySelector('.slider__output');
const option = document.querySelectorAll('.option__input');

const orderTariff = document.querySelector('#order-tariff');
const orderTime = document.querySelector('#order-time');
const orderOption = document.querySelector('#order-option');


tariff.forEach((el) => {
    el.addEventListener('click', tariffUpdate);
})

function tariffUpdate(e) {
    currentSet.tariff = e.target.id;
    apdatePrice();
    orderUpdate();
}



time.addEventListener('input', timeUpdate);

function timeUpdate() {
    currentSet.time = time.value;
    volume.value = currentSet.time;
    apdatePrice();
    orderUpdate();
};

option.forEach((el) => {
    el.addEventListener('change', optionUpdate);
});

function optionUpdate(e) {
    if (e.target.checked) {
        currentSet.option.push(e.target.id);
    } else {
        let index = currentSet.option.indexOf(e.target.id);
        currentSet.option.splice(index, 1);
    }
    apdatePrice();
    orderUpdate();

};



function apdatePrice() {
    let tariffPrice = currentSet.gerTariffPrice();
    let optionPrice = currentSet.getOptionPrice();
    let totalPrice = currentSet.time * tariffPrice + optionPrice;

    total.value = totalPrice;
};

function orderUpdate() {
    orderTime.value = currentSet.time + ' hours';
    orderTariff.value = currentSet.gerTariffPrice() + ' \u{20AC}/hour';
    orderOption.value = currentSet.getOptionPrice() + '\u{20AC}';

};


const priceInfo = {
    tariff: {
        economy: 10,
        comfort: 15,
        business: 20,
        premium: 30,
    },
    option: {
        option1: 5,
        option2: 7,
        option3: 10,
        option4: 20,
    },
};


let currentSet = {
    tariff: 'comfort',
    time: 2,
    option: [],
    gerTariffPrice() {
        return priceInfo.tariff[this.tariff];
    },
    getOptionPrice() {
        let optionPrice = 0;
        if (!this.option.length == 0) {
            this.option.forEach((el) => {
                optionPrice += priceInfo.option[el];
            })
        }
        return optionPrice;
    }
};


tariff[1].click();