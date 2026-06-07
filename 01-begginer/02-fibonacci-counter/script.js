let buttonPrev = document.querySelector(".prev");
let buttonNext = document.querySelector(".next");
let result = document.querySelector("#result");

let index = 0;

buttonPrev.addEventListener("click", () => {
    if (index === 0) {
        buttonPrev.style.visibility = "hidden";
        return;
    }
    index--;
    getFibonacci(index);
})

buttonNext.addEventListener("click", () => {
    index++;
    if (index === 1) {
        buttonPrev.style.visibility = "visible";
    }
    getFibonacci(index);
})

function getFibonacci(n) {
    if (n < 0)  return result.innerText = 0;
    if (n === 0) return result.innerText = 0;
    if (n === 1) return result.innerText = 1;
    
    let a = 0;
    let b = 1;
    let temp;
    for (let i = 2; i <= n; i++) {
        console.log(`${a} + ${b}`);
        temp = a + b;
        a = b;
        b = temp;
    }

    result.innerText = b;
}