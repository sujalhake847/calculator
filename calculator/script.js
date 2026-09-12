let currentNumber = "";
let previousNumber = "";
let operator = null;


/* Display elements */

const display = document.getElementById("display");
const history = document.getElementById("history");


/* Update display */

function updateDisplay() {

    if (currentNumber === "") {
        display.innerText = "0";
    } else {
        display.innerText = currentNumber;
    }
}


/* Add number */

function appendNumber(number) {

    // Prevent multiple decimal points
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    // Prevent unnecessary zero
    if (currentNumber === "0" && number !== ".") {
        currentNumber = "";
    }

    currentNumber += number;

    updateDisplay();
}


/* Select operator */

function chooseOperator(selectedOperator) {

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (currentNumber !== "" && previousNumber !== "") {
        calculate();
    }

    if (currentNumber !== "") {
        previousNumber = currentNumber;
        currentNumber = "";
    }

    operator = selectedOperator;

    history.innerText =
        previousNumber + " " + getOperatorSymbol(operator);
}


/* Calculate result */

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === null
    ) {
        return;
    }

    let firstNumber = parseFloat(previousNumber);
    let secondNumber = parseFloat(currentNumber);

    let result;


    if (operator === "+") {

        result = firstNumber + secondNumber;

    } else if (operator === "-") {

        result = firstNumber - secondNumber;

    } else if (operator === "*") {

        result = firstNumber * secondNumber;

    } else if (operator === "/") {

        if (secondNumber === 0) {

            display.innerText = "Error";

            currentNumber = "";
            previousNumber = "";
            operator = null;

            return;
        }

        result = firstNumber / secondNumber;
    }


    history.innerText =
        firstNumber +
        " " +
        getOperatorSymbol(operator) +
        " " +
        secondNumber;


    currentNumber = String(
        Math.round(result * 100000000) / 100000000
    );

    previousNumber = "";

    operator = null;

    updateDisplay();
}


/* Delete last number */

function deleteNumber() {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();
}


/* Clear everything */

function clearDisplay() {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    history.innerText = "";

    updateDisplay();
}


/* Percentage */

function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber =
        String(parseFloat(currentNumber) / 100);

    updateDisplay();
}


/* Operator symbols */

function getOperatorSymbol(operator) {

    if (operator === "*") {
        return "×";
    }

    if (operator === "/") {
        return "÷";
    }

    if (operator === "+") {
        return "+";
    }

    if (operator === "-") {
        return "−";
    }

    return "";
}


/* Keyboard support */

document.addEventListener("keydown", function(event) {

    const key = event.key;


    if (
        !isNaN(key) ||
        key === "."
    ) {
        appendNumber(key);
    }


    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        chooseOperator(key);
    }


    if (key === "Enter" || key === "=") {
        calculate();
    }


    if (key === "Backspace") {
        deleteNumber();
    }


    if (key === "Escape") {
        clearDisplay();
    }


    if (key === "%") {
        percentage();
    }

});