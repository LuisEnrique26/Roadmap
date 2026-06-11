import { useState, useEffect, useCallback } from 'react';

interface UserData {
    name: string;
    role: string;
}

interface UseUserData {
    userData: UserData | null;
    isLoading: boolean;
    error: string;
    handleLogout: () => void;
}

export const useUserData = (userId: string): UseUserData => {
    
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        setIsLoading(true);
        // Simulando un fetch a una API
        setTimeout(() => {
            if (userId === "123") {
                setUserData({ name: "Luis", role: "Developer" });
                setError("");
            } else {
                setError("Usuario no encontrado");
            }
            setIsLoading(false);
        }, 1000);
    }, [userId]);

    const handleLogout = useCallback(() => {
        setUserData(null);
        console.log("Cerrando sesión...");
    }, []);

    return { userData, isLoading, error, handleLogout };
};
