function add(a, b) {
    return a + b;
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
    return functions[operator](a, b);
}