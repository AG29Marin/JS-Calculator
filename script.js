const operators = ['+', '-', '/', '*'];

function add(number1, number2) {
    let sum = parseFloat(Math.round(number1 + number2));
    return sum;
}

function divide(number1, number2) {
    if(number2 === '0') {
        return 'Error';
    }
    else {
        let division = parseFLoat(Math.round((number1 / number2)));
        return division;  
    }
}

function substract(number1, number2) {
    let subtraction = parseFloat(Math.round(number1 - number2));
    return subtraction;
}

function multiply(number1, number2) {
    let multiplication = parseFloat(Math.round(number1 * number2));
    return multiplication;
}

function operate(number1, operator, number2) {
    switch(operator) {
        case '+':
            return add(number1, number2);
        case '-':
            return substract(number1, number2);
        case '/':
            return divide(number1, number2);
        case '*':
            return multiply(number1, number2);
    }
}

let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));

buttons.map(button => {
    button.addEventListener('click', element => {
        calculate(element);
    })
})

function calculate(elem) {

    if (display.innerText == '0') {
        display.innerText = '';
    }

    switch (elem.target.innerText) {
        case 'AC':
            display.innerText = '0';
            break;
        case 'DEL':
            if (display.innerText != 'Error') {
                display.innerText = display.innerText.slice(0, -1);
            }
            if (display.innerText == '') {
                display.innerText = '0';
            }
            break;
        case '=':
            try {
                display.innerText = eval(display.innerText);
            }
            catch {
                display.innerText = 'Error';
             }
            break;
        case '.':
            if(!display.innerText.includes('.')) {
                display.innerText += '.';
            }
            break;
        default:
            display.innerText += elem.target.innerText; // += means add a new value to the value that already existed
            break;
    }
}

// Trying to escape eval() 
function equal() {
    let split1 = display.innerText.split('-');
    let split2 = display.innerText.split('+');
    let split3 = display.innerText.split('*');
    let split4 = display.innerText.split('/');
    let firstValue = parseFloat(split1[0] || split2[0] || split3[0] || split4[0]);
    let secondValue = parseFloat(split1[1] || split2[1] || split3[1] || split4[1]);
    
    if (operators.includes[display.innerText]) {

        console.log(operators);
    }

    console.log(firstValue);
    console.log(secondValue);

    // let split = display.innerText.split(buttons.includes(display.innerText));

    // console.log(split[0]);
}