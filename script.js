let display = "";

let firstNum = "";
let secondNum = "";
let pickedOperator = "";

function add(a, b) {
    return Number(a) + Number(b);
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {
    let functions = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
    }
    return functions[operator](a, b).toString();
}

function isOperation(string) {
    return ["*", "/", "-", "+"].includes(string);
}

function isSpecial(string) {
    return ["C", "="].includes(string);
}

function updateDisplay() {
    let displayDiv = document.querySelector(".display");
    if (display.includes("NaN") || display.includes("Infinity")) {
        displayDiv.innerText = "Oops";
        display = "";
        firstNum = "";
        secondNum = "";
        pickedOperator = "";
    } else {
        displayDiv.innerText = display;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let buttons = document.querySelectorAll(".buttons button");
    buttons.forEach((button) => button.addEventListener("click", buttonClicked))
})

function buttonClicked(event) {
    let buttonKey = this.dataset.key;
    if (isSpecial(buttonKey)) {
        if (buttonKey === "C") {
            display = "";
            firstNum = "";
            secondNum = "";
            pickedOperator = "";
        } else if (buttonKey === "=") {
            if (firstNum && secondNum && pickedOperator) {
                display = operate(firstNum, secondNum, pickedOperator);
                firstNum = display;
                secondNum = "";
                pickedOperator = "";
            }
        }
    } else if (isOperation(buttonKey)) {
        if (firstNum) {
            if (pickedOperator && secondNum) {
                display = operate(firstNum, secondNum, pickedOperator);
                firstNum = display;
                pickedOperator = buttonKey;
                secondNum = "";
            } else {
                pickedOperator = buttonKey;
                display = pickedOperator;
            }
            pickedOperator = buttonKey;
        }
    } else {
        if (!(buttonKey === "." && display.includes("."))) {
            if (!pickedOperator) {
                firstNum += buttonKey;
                display = firstNum;
            } else {
                secondNum += buttonKey;
                display = secondNum;
            }
        }
    }
    updateDisplay();
}