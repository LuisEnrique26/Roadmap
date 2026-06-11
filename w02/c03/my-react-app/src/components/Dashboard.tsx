import React,{ useState, useMemo, useCallback } from 'react';

// Envolvemos el componente gráfico con React.memo para evitar re-renderizaciones innecesarias
const HeavyChart = React.memo(
  ({ data, onChartClick }: any) => {
    console.log("Renderizando gráfico pesado... (Esto debería pasar lo menos posible)");
    return (
        <div onClick={onChartClick}>
            Gráfico con {data.length} puntos.
        </div>
    );
});

// Ya que no va a cambiar, lo sacamos del componente principal
const points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Dashboard = () => {
    console.log("Renderizando Dashboard completo");
    
    const [searchTerm, setSearchTerm] = useState("");

    // Envolvemos la función con useMemo para evitar re-renderizaciones innecesarias
    const evenPoints = useMemo(() => {
        console.log("Calculando números pares...");
        return points.filter(p => p % 2 === 0);
    }, []);

    // Envolvemos la función con useCallback para evitar re-renderizaciones innecesarias
    const handleChartClick = useCallback(
      () => {
        console.log("Hiciste clic en el gráfico");
      }, []);

    return (
        <div>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                placeholder="Buscar..."
            />
            <HeavyChart 
                data={evenPoints} 
                onChartClick={handleChartClick} 
            />
        </div>
        
    );
};

export default Dashboard;