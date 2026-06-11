import { useUserData } from "../hooks/useUserData";

const UserProfile = ({ userId }: { userId: string }) => {
    const { userData, isLoading, error, handleLogout } = useUserData(userId);
    
    if (isLoading) return <div>Cargando perfil...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;
    if (!userData) return <div>No hay sesión activa</div>;

    return (
        <div style={{ border: '1px solid gray', padding: 20 }}>
            <h2>Perfil de {userData.name}</h2>
            <p>Rol: {userData.role}</p>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default UserProfile;