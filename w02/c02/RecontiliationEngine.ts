function compareObjects<T extends Record<string, any>>(oldState: T, newState: T): Partial<T> {
    const differences: Partial<T> = {};

    for (const key in newState) {
        if (oldState[key] !== newState[key]) {
            differences[key] = newState[key];
        }
    }

    return differences;
}

interface AppState {
    theme: string;
    name: string;
    notifications: number;
    isLoading: boolean;
}

const oldState: AppState = {
    theme: "dark",
    name: "John Doe",
    notifications: 0,
    isLoading: false,
};

const newState: AppState = {
    theme: "light",
    name: "John Doe",
    notifications: 0,
    isLoading: true,
};

console.time("Comparando Objetos");
const diferences = compareObjects(oldState, newState);
console.timeEnd("Comparando Objetos");

console.log(diferences);