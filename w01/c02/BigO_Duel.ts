const arr = new Array<string>;
const arr2 = new Set<string>;

for (let i = 1; i <= 1000000; i++) {
    arr.push(`user_${i.toString()}`);
    arr2.add(`user_${i.toString()}`);
}

console.time("Buscando Array");
console.log(arr.find((user) => user === "user_999999"));
console.timeEnd("Buscando Array");

console.time("Buscando Set");
console.log(arr2.has("user_999999"));
console.timeEnd("Buscando Set");
