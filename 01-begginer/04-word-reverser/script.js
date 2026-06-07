const word = document.querySelector("#word");
const result = document.querySelector("#result");

let reversed_word;

word.addEventListener("input", () => {
    reversed_word = word.value.split("").reverse().join("");
    result.innerText = reversed_word;
})