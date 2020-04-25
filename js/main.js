let startBtn = document.getElementById('start');

let budgetValue = document.getElementsByClassName('budget-value')[0];
let daybudgetValue = document.getElementsByClassName('daybudget-value')[0];
let levelValue = document.getElementsByClassName('level-value')[0];
let expensesValue = document.getElementsByClassName('expenses-value')[0];
let optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0];
let incomeValue = document.getElementsByClassName('income-value')[0];
let monthsavingsValue = document.getElementsByClassName('monthsavings-value')[0];
let yearsavingsValue = document.getElementsByClassName('yearsavings-value')[0] ;

let expensesItems = document.getElementsByClassName('expenses-item');

let buttons = document.getElementsByTagName('button');
let buttonExpenses = buttons[0];
let buttonOptionalExpenses = buttons[1];
let buttonCount = buttons[2];

let optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item');

let chooseIncome = document.querySelector('.choose-income');
let checkboxSavings = document.querySelector('#savings');
let sumValue = document.querySelector('#sum');
let percentValue = document.querySelector('#percent');
let year = document.querySelector('.year-value');
let month = document.querySelector('.month-value');
let day = document.querySelector('.day-value');

let money, time;

buttonExpenses.disabled = true;
buttonOptionalExpenses.disabled = true;
buttonCount.disabled = true;

startBtn.addEventListener('click', function() {
    buttonExpenses.disabled = false;
    buttonOptionalExpenses.disabled = false;
    buttonCount.disabled = false;    
    time = prompt('Введите дату в формате YYYY-MM-DD');
    money = +prompt('Ваш бюджет на месяц?', '');
      
    while (isNaN(money) || money == '' || money == null) {
        money = prompt('Ваш бюджет?', '');
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
});

buttonExpenses.addEventListener('click', function() {
    let sum = 0

    for (let i = 0; i < expensesItems.length; i++) {
        let a = expensesItems[i].value,
            b = expensesItems[++i].value;
        
        if (typeof(a) === 'string' && typeof(a) != null && typeof(b) != null 
            && a != '' && b != '' && a.length < 50) {
            console.log('done');    
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
        }
    } 
    expensesValue.textContent = sum;
});

buttonOptionalExpenses.addEventListener('click', function() {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});

buttonCount.addEventListener('click', function() {
    if (appData.budget != undefined) {
        appData.moneyPerDay = ((appData.budget - expensesValue.textContent) / 30).toFixed();
        daybudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay < 100) {
            levelValue.textContent = 'Минимальный уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка';
    } 
    } else {
        daybudgetValue.textContent = 'Произошла ошибка';
    }
});

chooseIncome.addEventListener('change', function() {
    let items = chooseIncome.value;
    appData.income = items.split(', ');
    incomeValue.textContent = appData.income;
});

checkboxSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +percentValue.value;
            
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        if (appData.savings == true) {
            let sum = +sumValue.value,
                percent = +percentValue.value;
                
            appData.monthIncome = sum/100/12*percent;
            appData.yearIncome = sum/100*percent;
    
            monthsavingsValue.textContent = appData.monthIncome.toFixed(1);
            yearsavingsValue.textContent = appData.yearIncome.toFixed(1);
        }
    }
});

let appData = {
    budget: money,
    timeData: time, 
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
}