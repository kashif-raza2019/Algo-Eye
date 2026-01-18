import React from 'react';
import './ComparisonStats.css';

/**
 * ComparisonStats Component
 * Displays real-time statistics for algorithm execution
 */
const ComparisonStats = ({ state, time }) => {
  if (!state) {
    return (
      <div className="comparison-stats">
        <div className="stat-item">
          <span className="stat-label">Comparisons:</span>
          <span className="stat-value">--</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Swaps:</span>
          <span className="stat-value">--</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Time:</span>
          <span className="stat-value">--</span>
        </div>
      </div>
    );
  }

  return (
    <div className="comparison-stats">
      <div className="stat-item">
        <span className="stat-label">Comparisons:</span>
        <span className="stat-value">{state.comparisons || 0}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Swaps:</span>
        <span className="stat-value">{state.swaps || 0}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Time:</span>
        <span className="stat-value">{time}ms</span>
      </div>
    </div>
  );
};

export default ComparisonStats;
