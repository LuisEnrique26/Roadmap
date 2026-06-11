import React from "react";
import { type Movement } from "../hooks/useLogistic";

const HeavyTable = React.memo( ({movements}: {movements: Movement[]}) => {
    console.log("Renderizando HeavyTable");
    return <div>
        <h2>HeavyTable</h2>
        {movements.map((m) => (
            <div key={m.id}>
                <td>{m.id}</td>
                <td>{m.productName}</td>
                <td>{m.quantity}</td>
                <td>{m.type}</td>
            </div>
        ))}  
    </div>
});

export default HeavyTable;