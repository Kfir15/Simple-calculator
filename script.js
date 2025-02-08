// get the resultBox and all the buttons from the HTML
let resultBox = document.getElementById('resultBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

// update the result box
function updateResult(value) {
    
    /*
        in JavaScript, the '%' symbol is used as the modulus operator, 
        which returns the remainder of a division operation.
        
        however, in this calculator, we want '%' to act as a percentage operator.
        yhat means when the user enters a number followed by '%', 
        it should be converted to a decimal (50% → 0.5).
    */

    // if the value is a percentage, convert it to decimal
    if (value === '%') {
        // check if the last character is a number
        const lastChar = string[string.length - 1];
        if (/\d/.test(lastChar)) {
            // replace the last number with its percentage equivalent
            string = string.replace(/(\d+)$/, (num) => num / 100);
        }
    } else {
        string += value;
    }
    
    // replace * with × and / with ÷ for display
    resultBox.value = string.replace(/\*/g, '×').replace(/\//g, '÷');
}

// add listeners to all buttons
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        let value = e.target.innerHTML;

        // convert ×, ÷ to *, / for calculation
        if (value === '×') value = '*';
        if (value === '÷') value = '/';

        handleInput(value);
    });
});

// handle both button clicks and keyboard inputs
function handleInput(value) {
    if (value === '=') {
        try {
            // evaluate the expression
            string = eval(string).toString();

            // Replace for display (convert * and / back)
            resultBox.value = string.replace(/\*/g, '×').replace(/\//g, '÷');
        } catch {
            resultBox.value = "Error";
            string = "";
        }
    } 
    else if (value === 'AC') {
        string = "";
        resultBox.value = string;
    } 
    else if (value === 'DEL' || value === 'Backspace') {
        string = string.substring(0, string.length - 1);
        // replace for display
        resultBox.value = string.replace(/\*/g, '×').replace(/\//g, '÷');
    } 
    // if the input is a number or an operator
    else if (/[0-9+\-*/.%]/.test(value)) { 
        updateResult(value);
    } 
}

// listen for keyboard input
document.addEventListener('keydown', (e) => {
    let key = e.key;

    if (key === 'Enter' || key === '=') {
        handleInput('=');
    } else if (key === 'Escape') {
        handleInput('AC');
    } else if (key === 'Backspace') {
        handleInput('DEL');
    } else if (/[\d+\-*/.%]/.test(key)) { // numbers and operators
        handleInput(key);
    }
});