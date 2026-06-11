import { useMemo, useState } from "react";

export interface Movement {
    id: string;
    productName: string;
    type: 'In' | 'Out';
    quantity: number;
}

export interface Stats {
    totalIn: number;
    totalOut: number;
}

const generateMassiveData = (): Movement[] => {
        const data: Movement[] = [];
        const products = ["Laptop", "Monitor", "Teclado", "Ratón", "Cable", "Servidor"];

        for (let i = 0; i < 1000; i++) {
            data.push({
                id: `Movement-${i}`,
                productName: products[Math.floor(Math.random() * products.length)] + ` Modelo-${i}`,
                type: Math.random() > 0.5 ? "In" : "Out",
                quantity: Math.floor(Math.random() * 100) + 1
            })
        }
        console.log("Generando datos...");
        return data; 
};

const DATA = generateMassiveData();

export const useLogistic = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

    const filteredMovements = useMemo(() => {
        if (!searchTerm) return DATA;
        return DATA.filter(m => m.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [searchTerm]);

    const stats = useMemo((): Stats => {
        let totalIn: number = 0;
        let totalOut: number = 0;
        DATA.forEach(m => {
            if (m.type === "In") {
                totalIn += m.quantity;
            } else {
                totalOut += m.quantity;
            }
        })
        return {
            totalIn,
            totalOut
        }
    }, []);

    return {
        generateMassiveData,
        searchTerm,
        setSearchTerm,
        filteredMovements,
        stats
    }
}