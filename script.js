// Creating object for tracking values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingSecondOperand: false,
    operator: null,
}


function userInput(digit) {
    // Unpack properties from calculator
    const { displayValue, waitingSecondOperand } = calculator;

    if (waitingSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingSecondOperand = false;
    }
    else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

// Function for populating and updating the display
function updateDisplay() {
    let display = document.getElementById('display');
    display.value = calculator.displayValue;
}

updateDisplay();

// Putting all the buttons into an array
const buttons = Array.from(document.getElementsByClassName('buttons'));

// Getting all the elements in the array
buttons.map(button => {
    //Adding the event listener
    button.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('operator')) {
            handleOperator(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains('decimal')) {
            decimal(target.value);
            updateDisplay();
            return;
        }
        if (target.classList.contains('clear')) {
            clear();
            updateDisplay();
            return;
        }
        if (target.classList.contains('delete')) {
            deleteKey();
            updateDisplay();
            return;
        }

        userInput(target.value);
        updateDisplay();
    });
});

//Function for adding the decimal
function decimal(dot) {
    if (calculator.waitingSecondOperand === true) {
        calculator.displayValue = '0.'
        calculator.waitingSecondOperand = false;
        return;
    }
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

// Function for handling all the operators
function handleOperator(nextOp) {
    //unpack properties from calculator
    const { firstOperand, displayValue, operator } = calculator;

    // Convert string to floating-point number
    const inputValue = parseFloat(displayValue);

    if (operator && calculator.waitingSecondOperand) {
        calculator.operator = nextOp;
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }
    else if (operator) {
        const result = operate(firstOperand, operator, inputValue);

        //Rounding result to 4 decimal points
        calculator.displayValue = `${parseFloat(result.toFixed(4))}`; 
        calculator.firstOperand = result;
    }

    calculator.waitingSecondOperand = true;
    calculator.operator = nextOp;
}

// Function for clearing the display
function clear() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingSecondOperand = false;
    calculator.operator = null;
}

// Function for deleting numbers one-at-a-time
function deleteKey() {
    calculator.displayValue = calculator.displayValue.slice(0, -1);

    if (calculator.displayValue === '') {
        calculator.displayValue = '0';
    }
}

// Function for making calculations
function operate(firstOperand, operator, secondOperand) {
    switch(operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case '/':
            return firstOperand / secondOperand;
        case '*':
            return firstOperand * secondOperand;
    }

    return secondOperand;
}

