import React, { useState } from "react";
export default function CustomInputSection({ onApplyCustomArray, disabled }) {

    const [count, setCount] = useState(8);
    const [elementsText, setElementsText] = useState("35,12,89,45,67,23,90,15");
    const [error, setError] = useState("");


    // Helper to quickly fill random values matching the count

    const handleRandomFill = () => {
        const n = Math.min(Math.max(parseInt(count, 10) || 8, 2), 50);
        setCount(n);
        const randvals = Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
        setElementsText(randvals.join(", "));
        setError("");
    };
    // Validates inputs and sends array to parent App

    const handleApply = (e) => {
        e.preventDefault();
        setError("");

        const n = parseInt(count, 10);
        if (isNaN(n) || n < 2 || n > 50) {
            setError("Please specify a count (N) between 2 and 50. ");
            return;
        }
        // Split by comma or whitespace
        const parsed = elementsText
            .split(/[\s,]+/)
            .filter((v) => v.trim().length > 0)
            .map(Number);

        if (parsed.some(isNaN)) {
            setError("All elements must be valid numbers.");
            return;
        }
        if (parsed.length !== n) {
            setError(`Count is set to ${n}, but you enetered ${parsed.length} elements.`);
            return;
        }
        onApplyCustomArray(parsed);
    };
    return (
        <div className="custom-input-card">
            <div className="card-header">
                <h3>Custom Array Input</h3>
            </div>
            <form onSubmit={handleApply} className="custom-input-form">
                <div className="form-row">
                    <div className="field-group">
                        <label>1. Number of Elements (N)</label>
                        <input
                            type="number"
                            min="2"
                            max="50"
                            value={count}
                            disabled={disabled}
                            onChange={(e) => setCount(e.target.value)}
                            placeholder="e.g. 8"
                        />
                    </div>
                    <div className="field-group flex-2">
                        <label>2. Enter Elements (comma or space separated)</label>
                        <input
                            type="text"
                            value={elementsText}
                            disabled={disabled}
                            onChange={(e) => setElementsText(e.target.value)}
                            placeholder="e.g. 35, 12, 89, 45, 67, 23, 90, 15"
                        />
                    </div>
                </div>
                {error && <div className="error-banner">{error}</div>}
                <div className="action-row">
                    <button type="submit" className="btn-primary" disabled={disabled}>
                        Load Array to Visualizer
                    </button>
                    <button
                        type="button"
                        className="btn-secondary"
                        disabled={disabled}
                        onClick={handleRandomFill}
                    >
                        Generate Random Numbers
                    </button>
                </div>
            </form>
        </div>
    );
}