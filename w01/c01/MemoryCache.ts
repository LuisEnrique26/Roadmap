// Instanciamos la clase
class MemoryCache<T> {
    // Encapsulamos la información y agregamos readonly ya no podremos modificarla
    // Usamos un Map para almacenar la información
    private readonly store = new Map<string , T>();

    // Creamos los métodos
    set(key : string , value : T) {
        this.store.set(key , value);
    }

    get(key : string): T | undefined {
        return this.store.get(key);
    }

    // Creamos un método para limpiar la información
    clearCache() {
        this.store.clear();
    }
}

// Creamos la interfaz de prueba
interface User {
    id : string;
    name : string;
    email : string;
    password : string;
    role : string;
    created_at : Date;
    updated_at : Date;
    deleted_at : Date | null;
}

// Creamos la instancia con la interfaz que creamos
const cacheUsuarios = new MemoryCache<User>();

// Agregamos información
cacheUsuarios.set("1" , {
    id : "1",
    name : "John Doe",
    email : "2H2bD@example.com",
    password : "123456",
    role : "admin",
    created_at : new Date(),
    updated_at : new Date(),
    deleted_at : new Date(),
});

cacheUsuarios.set("2", {
    id : "2",
    name : "Louis",
    email : "louis@example.com",
    password : "123456789",
    role : "user",
    created_at : new Date(),
    updated_at : new Date(),
    deleted_at : new Date(),
});

// Mostramos la información
console.log(cacheUsuarios.get("1"));
console.log(cacheUsuarios.get("2"));

// Limpiamos la información
cacheUsuarios.clearCache();

// Mostramos la información para ver que se ha limpiado
console.log(cacheUsuarios.get("1"));
console.log(cacheUsuarios.get("2"));