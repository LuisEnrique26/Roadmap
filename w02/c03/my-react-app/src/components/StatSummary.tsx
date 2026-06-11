import React from "react";
import type { Stats } from "../hooks/useLogistic";

const StatSummary = React.memo( ( {stats}: {stats: Stats} ) => {
    return (
        <div>
            <h3>StatSummary</h3>
            <p>Total In: {stats.totalIn}</p>
            <p>Total Out: {stats.totalOut}</p>
        </div>
    )
});

export default StatSummary;