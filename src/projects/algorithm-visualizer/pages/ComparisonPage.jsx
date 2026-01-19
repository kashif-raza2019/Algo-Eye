import React, { useState, useRef, useEffect } from 'react';
import '../styles/ComparisonPage.css';
import confetti from 'canvas-confetti';
import AlgorithmCanvas from '../section/AlgorithmCanvas';
import CodeVisualizer from '../components/CodeVisualizer';
import AlgorithmDescription from '../components/AlgorithmDescription';
import ComparisonStats from '../components/ComparisonStats';

/**
 * Sorting Algorithms Import
 */
import { bubbleSort } from '../algorithms/sorting/BubbleSort';
import { mergeSort } from '../algorithms/sorting/MergeSort';
import { countingSort } from '../algorithms/sorting/CountingSort';
import { heapSort } from '../algorithms/sorting/HeapSort';
import { insertionSort } from '../algorithms/sorting/InsertionSort';
import { quickSort } from '../algorithms/sorting/QuickSort';
import { selectionSort } from '../algorithms/sorting/SelectionSort';
import { shellSort } from '../algorithms/sorting/ShellSort';
import { timSort } from '../algorithms/sorting/TimSort';
import { createAudioContext, playPingTone, playSwapTone } from '../utils/soundGenerator';

const ALGORITHMS = {
  'Bubble Sort': bubbleSort,
  'Merge Sort': mergeSort,
  'Insertion Sort': insertionSort,
  'Selection Sort': selectionSort,
  'Quick Sort': quickSort,
  'Heap Sort': heapSort,
  'Shell Sort': shellSort,
  'Counting Sort': countingSort,
  'Tim Sort': timSort,
};

const ComparisonPage = ({ onBack }) => {
  const [algorithm1, setAlgorithm1] = useState('Bubble Sort');
  const [algorithm2, setAlgorithm2] = useState('Merge Sort');
  const [speed, setSpeed] = useState(1);
  const [dataSet, setDataSet] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [descriptionHeight, setDescriptionHeight] = useState(250);
  const [isDragging, setIsDragging] = useState(false);

  // Animation states for both algorithms
  const [animationState1, setAnimationState1] = useState(null);
  const [animationState2, setAnimationState2] = useState(null);

  // Code line states
  const [currentCodeLine1, setCurrentCodeLine1] = useState(-1);
  const [currentCodeLine2, setCurrentCodeLine2] = useState(-1);

  // Execution time tracking
  const [executionTime1, setExecutionTime1] = useState(0);
  const [executionTime2, setExecutionTime2] = useState(0);

  const abortControllerRef = useRef(null);
  const pingAudioRef = useRef(null);
  const swapAudioRef = useRef(null);
  const audioContextRef = useRef(null);
  const startTimeRef = useRef({ algo1: 0, algo2: 0 });

  // Initialize on mount
  useEffect(() => {
    audioContextRef.current = createAudioContext();
    const initAudio = () => {
      try {
        pingAudioRef.current = new Audio('/sounds/ping.mp3');
        swapAudioRef.current = new Audio('/sounds/swap.mp3');
        pingAudioRef.current.volume = 0.4;
        swapAudioRef.current.volume = 0.4;
        pingAudioRef.current.preload = 'auto';
        swapAudioRef.current.preload = 'auto';
      } catch (err) {
        console.log('Audio file initialization error:', err.message);
      }
    };
    initAudio();
    generateNewDataSet();
  }, []);

  const generateNewDataSet = () => {
    const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setDataSet(newData);
  };

  const initializeAudioOnInteraction = () => {
    if (pingAudioRef.current && swapAudioRef.current) {
      try {
        const emptyAudio = new Audio();
        emptyAudio.play().catch(() => {});
      } catch (err) {}
    }
  };

  const playPingSound = () => {
    if (soundEnabled) {
      if (pingAudioRef.current) {
        try {
          pingAudioRef.current.currentTime = 0;
          const playPromise = pingAudioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              if (audioContextRef.current) playPingTone(audioContextRef.current);
            });
          }
          return;
        } catch (err) {}
      }
      if (audioContextRef.current) playPingTone(audioContextRef.current);
    }
  };

  const playSwapSound = () => {
    if (soundEnabled) {
      if (swapAudioRef.current) {
        try {
          swapAudioRef.current.currentTime = 0;
          const playPromise = swapAudioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              if (audioContextRef.current) playSwapTone(audioContextRef.current);
            });
          }
          return;
        } catch (err) {}
      }
      if (audioContextRef.current) playSwapTone(audioContextRef.current);
    }
  };

  const getDelay = () => {
    const baseDelay = 1000;
    const delay = Math.round(baseDelay / speed);
    return Math.max(delay, 50);
  };

  const handleRunComparison = async () => {
    if (isRunning) return;
    if (algorithm1 === algorithm2) {
      alert('Please select two different algorithms to compare');
      return;
    }

    initializeAudioOnInteraction();
    setIsRunning(true);
    abortControllerRef.current = new AbortController();
    const delay = getDelay();

    try {
      // Reset states
      setAnimationState1(null);
      setAnimationState2(null);
      setCurrentCodeLine1(-1);
      setCurrentCodeLine2(-1);
      setExecutionTime1(0);
      setExecutionTime2(0);

      // Get algorithm functions
      const algo1Func = ALGORITHMS[algorithm1];
      const algo2Func = ALGORITHMS[algorithm2];

      // Create a shared dataset for both algorithms
      const sharedDataSet = [...dataSet];

      // Store start times
      const globalStartTime = Date.now();
      startTimeRef.current = { algo1: globalStartTime, algo2: globalStartTime };

      // Run both algorithms in parallel
      const [result1, result2] = await Promise.all([
        algo1Func(
          sharedDataSet,
          (state) => {
            setAnimationState1(state);
            setExecutionTime1(Date.now() - startTimeRef.current.algo1);
          },
          delay,
          playSwapSound,
          playPingSound,
          setCurrentCodeLine1
        ),
        algo2Func(
          sharedDataSet,
          (state) => {
            setAnimationState2(state);
            setExecutionTime2(Date.now() - startTimeRef.current.algo2);
          },
          delay,
          playSwapSound,
          playPingSound,
          setCurrentCodeLine2
        ),
      ]);

      // Show final states
      setAnimationState1({
        array: result1,
        sorted: Array.from({ length: result1.length }, (_, i) => i),
        comparisons: animationState1?.comparisons || 0,
        swaps: animationState1?.swaps || 0,
      });

      setAnimationState2({
        array: result2,
        sorted: Array.from({ length: result2.length }, (_, i) => i),
        comparisons: animationState2?.comparisons || 0,
        swaps: animationState2?.swaps || 0,
      });

      setCurrentCodeLine1(-1);
      setCurrentCodeLine2(-1);

      // Trigger celebration
      triggerConfetti();
    } catch (error) {
      console.error('Comparison execution error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const triggerConfetti = () => {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      confetti({
        particleCount: 50,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.5 },
        ticks: 100,
      });
    }, 50);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setAnimationState1(null);
    setAnimationState2(null);
    setCurrentCodeLine1(-1);
    setCurrentCodeLine2(-1);
    setExecutionTime1(0);
    setExecutionTime2(0);
    generateNewDataSet();
  };

  const speedLabel = {
    0.5: 'Very Slow',
    1: 'Slow',
    2: 'Normal',
    4: 'Fast',
  };

  const handleDividerMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      const container = document.querySelector('.comparison-page');
      const pageRect = container.getBoundingClientRect();

      // Calculate distance from bottom
      const distanceFromBottom = pageRect.bottom - e.clientY;
      
      // Set minimum and maximum heights
      const minHeight = 100;
      const maxHeight = pageRect.height - 300; // Leave space for controls and main comparison

      if (distanceFromBottom >= minHeight && distanceFromBottom <= maxHeight) {
        setDescriptionHeight(distanceFromBottom);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="comparison-page">
      {/* Header */}
      <div className="comparison-header">
        <button className="back-button" onClick={onBack} title="Back to main">
          ← Back
        </button>
        <h1>Algorithm Comparison</h1>
        <div className="header-spacer"></div>
      </div>

      {/* Controls */}
      <div className="comparison-controls">
        <div className="control-group">
          <label>Algorithm 1:</label>
          <select
            value={algorithm1}
            onChange={(e) => setAlgorithm1(e.target.value)}
            disabled={isRunning}
            className="control-select"
          >
            {Object.keys(ALGORITHMS).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Algorithm 2:</label>
          <select
            value={algorithm2}
            onChange={(e) => setAlgorithm2(e.target.value)}
            disabled={isRunning}
            className="control-select"
          >
            {Object.keys(ALGORITHMS).map((algo) => (
              <option key={algo} value={algo}>
                {algo}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label>Speed:</label>
          <input
            type="range"
            min="0.5"
            max="4"
            step="0.5"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            disabled={isRunning}
            className="speed-slider"
          />
          <span className="speed-label">{speedLabel[speed]}</span>
        </div>

        <button
          className="btn btn-primary"
          onClick={handleRunComparison}
          disabled={isRunning}
        >
          {isRunning ? 'Running...' : 'Run Comparison'}
        </button>

        <button
          className="btn btn-secondary"
          onClick={handleReset}
          disabled={isRunning}
        >
          Reset
        </button>

        <button
          className={`btn ${soundEnabled ? 'btn-sound-on' : 'btn-sound-off'}`}
          onClick={() => setSoundEnabled(!soundEnabled)}
          title={soundEnabled ? 'Disable sound' : 'Enable sound'}
        >
          {soundEnabled ? '🔊' : '🔇'}
        </button>
      </div>

      {/* Main Comparison Area */}
      <div className="comparison-container">
        {/* Left Algorithm */}
        <div className="comparison-panel left-panel">
          <div className="panel-header">
            <h2>{algorithm1}</h2>
          </div>

          <div className="panel-content">
            <AlgorithmCanvas
              dataSet={dataSet}
              algorithmType={algorithm1}
              animationState={animationState1}
            />

            <div className="stats-row">
              <ComparisonStats state={animationState1} time={executionTime1} />
            </div>

            <div className="code-section">
              <CodeVisualizer
                algorithmType={algorithm1}
                currentLine={currentCodeLine1}
                executionStats={animationState1}
              />
            </div>
          </div>
        </div>

        {/* Right Algorithm */}
        <div className="comparison-panel right-panel">
          <div className="panel-header">
            <h2>{algorithm2}</h2>
          </div>

          <div className="panel-content">
            <AlgorithmCanvas
              dataSet={dataSet}
              algorithmType={algorithm2}
              animationState={animationState2}
            />

            <div className="stats-row">
              <ComparisonStats state={animationState2} time={executionTime2} />
            </div>

            <div className="code-section">
              <CodeVisualizer
                algorithmType={algorithm2}
                currentLine={currentCodeLine2}
                executionStats={animationState2}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div 
        className={`complexity-divider ${isDragging ? 'dragging' : ''}`}
        onMouseDown={handleDividerMouseDown}
        title="Drag to resize description area"
      >
        <div className="divider-handle"></div>
      </div>

      {/* Complexity Comparison */}
      <div className="complexity-comparison" style={{ height: `${descriptionHeight}px` }}>
        <div className="complexity-panel left-panel">
          <AlgorithmDescription algorithmType={algorithm1} />
        </div>
        <div className="complexity-panel right-panel">
          <AlgorithmDescription algorithmType={algorithm2} />
        </div>
      </div>
    </div>
  );
};

export default ComparisonPage;
