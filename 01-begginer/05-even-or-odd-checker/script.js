const number = document.querySelector("#number");
const result = document.querySelector("#result");
const check = document.querySelector("#check");

check.addEventListener("click", () => {
    checkNum(number.value);
})

function checkNum(num) {
    const n = parseInt(num);
    const key = n % 2;

    switch (key) {
        case 0:
            result.innerText = "Even";
            result.style.color = "green";
            break;
        case 1:
            result.innerText = "Odd";
            result.style.color = "orangered";
            break;
        default:
            result.innerText = "Invalid";
            result.style.color = "red";
            break;
    }
}