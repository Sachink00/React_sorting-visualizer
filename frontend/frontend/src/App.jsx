import React, { useState, useEffect, useRef } from "react";
// If you renamed your file to CustomInputSection.jsx, use that.
// Otherwise this points to your current file:
import CustomInputSection from "./components/customeInputSectio";
import Visualizer from "./components/Visualizer";
import { getMoves } from "./algorithms/sortingAlgorithms";
import "./App.css";

export default function App() {
  const [array, setArray] = useState([35, 12, 89, 45, 67, 23, 90, 15]);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [speed, setSpeed] = useState(60);
  const [isSorting, setIsSorting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [pivotIndex, setPivotIndex] = useState(null);
  const [sorted, setSorted] = useState(false);
  const [stats, setStats] = useState({ comparisons: 0, swaps: 0 });

  // Store remaining moves and timer across renders
  const movesQueue = useRef([]);
  const timerRef = useRef(null);

  // Reset visual state
  const resetVisualizer = (newArr = null) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSorting(false);
    setIsPaused(false);
    setActiveIndices([]);
    setPivotIndex(null);
    setSorted(false);
    setStats({ comparisons: 0, swaps: 0 });
    movesQueue.current = [];
    if (newArr) {
      setArray([...newArr]);
    }
  };

  // Called when user submits custom numbers from the input section
  const handleApplyCustomArray = (newArr) => {
    resetVisualizer(newArr);
  };

  // Start sorting from scratch
  const startSort = () => {
    if (isSorting) return;
    setSorted(false);
    setStats({ comparisons: 0, swaps: 0 });

    // Generate all step-by-step moves
    const moves = getMoves(algorithm, array);
    movesQueue.current = moves;
    setIsSorting(true);
    setIsPaused(false);
  };

  // Toggle Pause / Resume
  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Step runner effect
  useEffect(() => {
    if (!isSorting || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Interval delay inversely proportional to speed slider (10 to 110)
    const intervalDelay = Math.max(120 - speed, 10);

    timerRef.current = setInterval(() => {
      // Finished sorting
      if (movesQueue.current.length === 0) {
        clearInterval(timerRef.current);
        setIsSorting(false);
        setIsPaused(false);
        setActiveIndices([]);
        setPivotIndex(null);
        setSorted(true);
        return;
      }

      // Execute next move
      const move = movesQueue.current.shift();

      if (move.type === "compare") {
        setActiveIndices(move.indices);
        setStats((prev) => ({ ...prev, comparisons: prev.comparisons + 1 }));
      } else if (move.type === "swap") {
        const [i, j] = move.indices;
        setArray((prev) => {
          const next = [...prev];
          [next[i], next[j]] = [next[j], next[i]];
          return next;
        });
        setStats((prev) => ({ ...prev, swaps: prev.swaps + 1 }));
      } else if (move.type === "pivot") {
        setPivotIndex(move.indices[0]);
      } else if (move.type === "overwrite") {
        setArray((prev) => {
          const next = [...prev];
          next[move.index] = move.value;
          return next;
        });
        setStats((prev) => ({ ...prev, swaps: prev.swaps + 1 }));
      }
    }, intervalDelay);

    return () => clearInterval(timerRef.current);
  }, [isSorting, isPaused, speed]);

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1>Sorting Visualizer</h1>
        <p className="subtitle">
          Interactive Algorithm Visualizer & Analysis Studio
        </p>
      </header>

      {/* 1. Custom User Input Section */}
      <CustomInputSection
        onApplyCustomArray={handleApplyCustomArray}
        disabled={isSorting}
      />

      {/* 2. Visualizer Canvas/Bars Area */}
      <Visualizer
        array={array}
        activeIndices={activeIndices}
        pivotIndex={pivotIndex}
        sorted={sorted}
      />

      {/* 3. Live Telemetry / Stats */}
      <div className="stats-panel">
        <div className="stat-item">
          <span className="stat-label">Algorithm</span>
          <span className="stat-value highlight">
            {algorithm.toUpperCase()} SORT
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Comparisons</span>
          <span className="stat-value">{stats.comparisons}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Swaps / Writes</span>
          <span className="stat-value">{stats.swaps}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Status</span>
          <span className="stat-value status">
            {sorted ? "Sorted 🎉" : isSorting ? (isPaused ? "Paused ⏸️" : "Sorting... ⚡") : "Ready"}
          </span>
        </div>
      </div>

      {/* 4. Controls Bar */}
      <div className="controls-bar">
        {/* Algorithm Select */}
        <div className="control-group">
          <label>Algorithm</label>
          <select
            value={algorithm}
            disabled={isSorting}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="bubble">Bubble Sort</option>
            <option value="selection">Selection Sort</option>
            <option value="insertion">Insertion Sort</option>
            <option value="quick">Quick Sort</option>
            <option value="merge">Merge Sort</option>
          </select>
        </div>

        {/* Speed Slider */}
        <div className="control-group slider-group">
          <label>Speed: {speed}%</label>
          <input
            type="range"
            min="10"
            max="115"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        {/* Action Buttons */}
        <div className="btn-group">
          {!isSorting ? (
            <button className="btn-start" onClick={startSort} disabled={sorted}>
              Start Sorting
            </button>
          ) : (
            <button className="btn-pause" onClick={togglePause}>
              {isPaused ? "Resume" : "Pause"}
            </button>
          )}

          <button
            className="btn-reset"
            onClick={() => resetVisualizer([...array])}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
