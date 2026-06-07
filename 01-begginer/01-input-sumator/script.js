let num1 = document.querySelector("#firstNumber");
let num2 = document.querySelector("#secondNumber");
let result = document.querySelector("#result");

let num1Parsed = 0;
let num2Parsed = 0;


num1.addEventListener("input", () => {
    checkInput(num1.value, 1);
})

num2.addEventListener("input", () => {
    checkInput(num2.value, 2);
})

function checkInput(str, position) {
    let num;
    if (str !== "") {
        num = parseInt(str);
        (position == 1) ? num1Parsed = num : num2Parsed = num;
        
        result.innerText = `= ${num1Parsed + num2Parsed}`
        return;
    }
    num = 0;
    (position == 1) ? num1Parsed = num : num2Parsed = num;
    result.innerText = `= ${num1Parsed + num2Parsed}`
}
