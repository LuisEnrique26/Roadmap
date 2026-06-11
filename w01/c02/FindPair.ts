function findPair( prices: number[], target: number ): [number, number] | null {
    const pricesUsed = new Set<number>();

    for (let price of prices) {
        const aux = target - price;

        if (pricesUsed.has(aux)) {
            return [aux, price]; 
        }

        pricesUsed.add(price);
    }

    return null;
}

const catalog = [15, 25, 35, 45, 55, 65];
const targetGift = 90;

console.time("Buscando Pares");
console.log(findPair(catalog, targetGift));
console.timeEnd("Buscando Pares");