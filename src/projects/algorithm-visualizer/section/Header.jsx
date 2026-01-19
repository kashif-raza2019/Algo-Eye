import React, { useState } from 'react';
import { Link } from 'react-router';
import './Header.css';

const Header = ({ onAlgorithmChange, onSpeedChange, isRunning, onComparisonClick }) => {
    const [algorithmType, setAlgorithmType] = useState('SORTING');
    const [algorithmName, setAlgorithmName] = useState('Bubble Sort');
    const [speed, setSpeed] = useState(1);

    const algorithms = {
        SORTING: [
            { code: 'Bubble Sort', name: 'Bubble Sort' },
            { code: 'Merge Sort', name: 'Merge Sort' },
            { code: 'Insertion Sort', name: 'Insertion Sort' },
            { code: 'Selection Sort', name: 'Selection Sort' },
            { code: 'Quick Sort', name: 'Quick Sort' },
            { code: 'Heap Sort', name: 'Heap Sort' },
            { code: 'Shell Sort', name: 'Shell Sort' },
            { code: 'Counting Sort', name: 'Counting Sort' },
            { code: 'Tim Sort', name: 'Tim Sort' },
        ],
        SEARCHING: [
            { code: 'Linear Search', name: 'Linear Search' },
            { code: 'Binary Search', name: 'Binary Search' },
        ],
    };

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        const firstAlgorithm = algorithms[newType][0].code;
        setAlgorithmType(newType);
        setAlgorithmName(firstAlgorithm);
        onAlgorithmChange(firstAlgorithm);
    };

    const handleAlgorithmChange = (e) => {
        const selectedName = e.target.value;
        setAlgorithmName(selectedName);
        onAlgorithmChange(selectedName);
    };

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        onSpeedChange(newSpeed);
    };

    const speedLabel = {
        0.5: 'Very Slow (2s)',
        1: 'Slow (1s)',
        2: 'Normal (0.5s)',
        4: 'Fast (0.25s)',
    };

    return (
        <div className="header">
            <div className="header-left">
                <Link to="/" className="back-to-portfolio" title="Back to Portfolio">
                    ← Portfolio
                </Link>
                <div className="header-title">Algo-Eye</div>
            </div>
            
            <div className="header-middle">
                <div className="control-group">
                    <label htmlFor="type-select" className="control-label">Type:</label>
                    <select 
                        id="type-select"
                        className="header-select" 
                        value={algorithmType} 
                        onChange={handleTypeChange}
                        disabled={isRunning}
                    >
                        <option value="SORTING">Sorting Algorithms</option>
                        <option value="SEARCHING">Searching Algorithms</option>
                    </select>
                </div>

                <div className="control-group">
                    <label htmlFor="algo-select" className="control-label">Algorithm:</label>
                    <select 
                        id="algo-select"
                        className="header-select" 
                        value={algorithmName} 
                        onChange={handleAlgorithmChange}
                        disabled={isRunning}
                    >
                        {algorithms[algorithmType].map((algo) => (
                            <option key={algo.code} value={algo.code}>{algo.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="header-right">
                <button 
                    className="comparison-button"
                    onClick={onComparisonClick}
                    disabled={isRunning}
                    title="Compare two algorithms side-by-side"
                >
                    ⚖️ Compare
                </button>

                <div className="speed-control">
                    <label htmlFor="speed-slider" className="control-label">Speed:</label>
                    <input
                        id="speed-slider"
                        type="range"
                        min="0.5"
                        max="4"
                        step="0.5"
                        value={speed}
                        onChange={handleSpeedChange}
                        className="speed-slider"
                        disabled={isRunning}
                    />
                    <span className="speed-label">{speedLabel[speed]}</span>
                </div>
            </div>
        </div>
    );
};

export default Header;