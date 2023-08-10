const maxDisplayLength = 10;
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

function resetValues() {
    display = "";
    firstNum = "";
    secondNum = "";
    pickedOperator = "";
}

function updateDisplay() {
    let displayDiv = document.querySelector(".display");
    
    if (display.length > 10) {
        let [beforeDecimal, afterDecimal] = display.split(".");
        let hasToRemove = display.length - maxDisplayLength
        if (afterDecimal >= hasToRemove) {
            display = Number(display).toFixed(afterDecimal.length-hasToRemove).toString();
        } else {
            displayDiv.innerText = "Oops";
            resetValues()
            return;
        }
    }

    if (display.includes("NaN") || display.includes("Infinity")) {
        displayDiv.innerText = "Oops";
        resetValues()
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
            resetValues()
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
        if (!(buttonKey === "." && display.includes(".")) && display.length < 10) {
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