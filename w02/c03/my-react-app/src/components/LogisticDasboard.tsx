import { useLogistic } from "../hooks/useLogistic";
import StatSummary from "./StatSummary";
import HeavyTable from "./HeavyTable";

const LogisticaDashboard = () => {
    const { searchTerm, setSearchTerm, filteredMovements, stats } = useLogistic();

    return (
        <div>
            <h1>Dashboard</h1>
            <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <div style={{ display: "flex", flexDirection: "row"}}>
                <StatSummary stats={stats} />
                <HeavyTable movements={filteredMovements}/>
            </div>
        </div>
    )
}

export default LogisticaDashboard;