import React from "react";

export default function Visualizer({ array, activeIndices, pivotIndex, sorted }) {
    // Find highest number so bars scale proportionally (min 1 to avoid divide-by-zero)
    const maxVal = Math.max(...array, 1);

    return (
        <div className="visualizer-container">
            <div className="bars-wrapper">
                {array.map((value, idx) => {
                    // Calculate height percentage (min 8% so small numbers are still visible)
                    const heightPercent = Math.max((value / maxVal) * 82, 8);

                    const isComparing = activeIndices.includes(idx);
                    const isPivot = pivotIndex === idx;

                    let barClass = "bar";
                    if (sorted) {
                        barClass += " bar-sorted";
                    } else if (isPivot) {
                        barClass += " bar-pivot";
                    } else if (isComparing) {
                        barClass += " bar-comparing";
                    }

                    return (
                        <div key={idx} className="bar-column">
                            {/* Display the actual user-input value */}
                            <span className="bar-value">{value}</span>

                            {/* The animated visual bar */}
                            <div
                                className={barClass}
                                style={{ height: `${heightPercent}%` }}
                            />

                            {/* Display index */}
                            <span className="bar-index">[{idx}]</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
