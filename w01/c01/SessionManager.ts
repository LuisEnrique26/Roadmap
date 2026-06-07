// Creamos la clase, no necesitamos declarar el Partial
class SessionManager<T> {
    // Creamos el store, nunca debemos guardar información a medias
    private readonly store = new Map<string, T>();

    startSession(key: string, value: T) {
        this.store.set(key, value);
    }

    // Verificamos que exista la información, luego creamos una copia especificando la key para no copiar el Map entero y finalmente la retornamos
    getSessionCopy(key: string): T | undefined {
        if (!this.store.has(key)) return;
        const copy = structuredClone(this.store.get(key));
        return copy;
    }

    updateSession(key: string, value: Partial<T>) {
        const currentSession = this.store.get(key);

        if (!currentSession) return;

        const updated = {
            ...currentSession,
            ...value,
        };

        this.store.set(key, updated);

    }

    clearCache() {
        this.store.clear();
    }
}

interface SessionData {
    userId:     string;
    ip:         string;
    device:     string;
    lastActive: Date;
}

const sessionManager = new SessionManager<SessionData>();

sessionManager.startSession("1", {
    userId: "1",
    ip: "127.0.0.1",
    device: "Chrome",
    lastActive: new Date(),
});

const mySession = sessionManager.getSessionCopy("1");
if (mySession) {
    mySession.device = "Firefox";
}

sessionManager.updateSession("1", {
    lastActive: new Date("2023-01-01"),
});

console.log(sessionManager.getSessionCopy("1"));

sessionManager.clearCache();

console.log(sessionManager.getSessionCopy("1"));