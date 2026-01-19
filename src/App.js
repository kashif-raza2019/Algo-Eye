import React from 'react';
import './App.css';
import PortfolioPage from './pages/PortfolioPage';

/**
 * App Component - Main Algorithm Visualizer Wrapper
 * ================================================
 * 
 * This component serves as the entry point for the Algorithm Visualizer
 * micro-frontend when accessed via the route /projects/algorithm-visualizer
 * from the main portfolio application.
 * 
 * The actual visualization logic is in AlgorithmVisualizer component
 * located in src/projects/algorithm-visualizer/AlgorithmVisualizer.jsx
 * 
 * @component
 * @returns {JSX.Element} The Algorithm Visualizer application
 */
const App = () => {
  return <PortfolioPage />;
};

export default App;
