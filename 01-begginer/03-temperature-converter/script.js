let celsius = document.querySelector("#celcius");
let fahrenheit = document.querySelector("#fahrenheit");

let c = 0;
let f = 0;
let lastTypeConverted = "";

celsius.addEventListener("input", () => toConvert("celcius"));

fahrenheit.addEventListener("input", () => toConvert("fahrenheit"));



function toConvert(type) {
    switch (type) {
        case "celcius":
            if (celsius.value === "") celsius.value = "";
            c = celsius.value;
            f = (c * (9/5)) + 32;
            fahrenheit.value = f.toFixed(1);
            break;
        case "fahrenheit":
            if (fahrenheit.value === "") fahrenheit.value = "";
            f = fahrenheit.value;
            c = (f - 32) * (5/9);
            celsius.value = c.toFixed(1);
            break;
        default:
            break;
    }
}