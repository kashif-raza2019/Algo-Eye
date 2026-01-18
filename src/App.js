import React, { useState, useRef } from 'react';
import './App.css';
import confetti from 'canvas-confetti';
import Header from './section/Header';
import AlgorithmCanvas from './section/AlgorithmCanvas';
import CodeVisualizer from './components/CodeVisualizer';
import AlgorithmDescription from './components/AlgorithmDescription';
import ComparisonPage from './pages/ComparisonPage';
import Footer from './section/Footer';

/**
 * Sorting Algorithms Import
 */
import { bubbleSort } from './algorithms/sorting/BubbleSort';
import { mergeSort } from './algorithms/sorting/MergeSort';
import { countingSort } from './algorithms/sorting/CountingSort';
import { heapSort } from './algorithms/sorting/HeapSort';
import { insertionSort } from './algorithms/sorting/InsertionSort';
import { quickSort } from './algorithms/sorting/QuickSort';
import { selectionSort } from './algorithms/sorting/SelectionSort';
import { shellSort } from './algorithms/sorting/ShellSort';
import { timSort } from './algorithms/sorting/TimSort';

/**
 * Searching Algorithms Import
 */
import { linearSearch } from './algorithms/searching/LinearSearch';
import { binarySearch } from './algorithms/searching/BinarySearch';
import { createAudioContext, playPingTone, playSwapTone } from './utils/soundGenerator';

function App() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');
  const [speed, setSpeed] = useState(1);
  const [dataSet, setDataSet] = useState([]);
  const [animationState, setAnimationState] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchTarget, setSearchTarget] = useState('');
  const [currentCodeLine, setCurrentCodeLine] = useState(-1);
  const [currentPage, setCurrentPage] = useState('main'); // 'main' or 'comparison'
  const abortControllerRef = useRef(null);
  const pingAudioRef = useRef(null);
  const swapAudioRef = useRef(null);
  const audioContextRef = useRef(null);

  // Initialize audio elements and data set on mount
  React.useEffect(() => {
    // Initialize audio context for Web Audio API fallback
    audioContextRef.current = createAudioContext();

    // Initialize audio elements with proper handling
    const initAudio = () => {
      try {
        pingAudioRef.current = new Audio('/sounds/ping.mp3');
        swapAudioRef.current = new Audio('/sounds/swap.mp3');

        // Set volume
        pingAudioRef.current.volume = 0.4;
        swapAudioRef.current.volume = 0.4;

        // Preload audio
        pingAudioRef.current.preload = 'auto';
        swapAudioRef.current.preload = 'auto';
      } catch (err) {
        console.log('Audio file initialization error:', err.message);
      }
    };

    initAudio();
    generateNewDataSet();
  }, []);

  // Initialize audio on first user interaction (required by browser autoplay policy)
  const initializeAudioOnInteraction = () => {
    if (pingAudioRef.current && swapAudioRef.current) {
      try {
        // Try playing silent audio to unlock autoplay
        const emptyAudio = new Audio();
        emptyAudio.play().catch(() => {
          // Autoplay still blocked, but that's okay
        });
      } catch (err) {
        // Silently handle
      }
    }
  };

  // Function to play ping sound (for traversal/searching)
  const playPingSound = () => {
    if (soundEnabled) {
      // Try HTML5 audio first
      if (pingAudioRef.current) {
        try {
          pingAudioRef.current.currentTime = 0;
          const playPromise = pingAudioRef.current.play();

          if (playPromise !== undefined) {
            playPromise.catch(err => {
              // Fallback to Web Audio API
              if (audioContextRef.current) {
                playPingTone(audioContextRef.current);
              }
            });
          }
          return;
        } catch (err) {
          // Fall through to Web Audio API
        }
      }

      // Fallback to Web Audio API
      if (audioContextRef.current) {
        playPingTone(audioContextRef.current);
      }
    }
  };

  // Function to play swap sound
  const playSwapSound = () => {
    if (soundEnabled) {
      // Try HTML5 audio first
      if (swapAudioRef.current) {
        try {
          swapAudioRef.current.currentTime = 0;
          const playPromise = swapAudioRef.current.play();

          if (playPromise !== undefined) {
            playPromise.catch(err => {
              // Fallback to Web Audio API
              if (audioContextRef.current) {
                playSwapTone(audioContextRef.current);
              }
            });
          }
          return;
        } catch (err) {
          // Fall through to Web Audio API
        }
      }

      // Fallback to Web Audio API
      if (audioContextRef.current) {
        playSwapTone(audioContextRef.current);
      }
    }
  };

  // Initialize data set on mount
  React.useEffect(() => {
    generateNewDataSet();
  }, []);

  const generateNewDataSet = () => {
    const newData = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    setDataSet(newData);
    setAnimationState(null);
  };

  // Convert speed multiplier to delay in milliseconds
  const getDelay = () => {
    const baseDelay = 1000; // Base delay of 1000ms
    // Speed multiplier: 0.5 (slow) to 4 (fast)
    // Higher multiplier = faster execution = less delay
    const delay = Math.round(baseDelay / speed);
    return Math.max(delay, 50); // Minimum 50ms to prevent UI blocking
  };

  // Trigger confetti animation
  const triggerConfetti = () => {
    // Burst from center with multiple throws
    const duration = 2000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min, max) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      // Multiple bursts for better effect
      confetti({
        particleCount: 50,
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        origin: { y: 0.5 },
        ticks: 100,
      });
    }, 50);
  };

  const handleRunAlgorithm = async () => {
    if (isRunning) return;

    // Initialize audio on first user interaction (required by browser autoplay policy)
    initializeAudioOnInteraction();

    setIsRunning(true);
    abortControllerRef.current = new AbortController();
    const delay = getDelay();

    try {
      let sortedArray = [...dataSet];

      if (selectedAlgorithm === 'Bubble Sort') {
        sortedArray = await bubbleSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        // Update the main dataset to reflect the sorted state
        setDataSet(sortedArray);

        // Trigger confetti for sorting completion
        triggerConfetti();
      } else if (selectedAlgorithm === 'Linear Search') {
        const target = parseInt(searchTarget) || Math.floor(Math.random() * 100) + 1;
        const searchResult = await linearSearch(dataSet, target, setAnimationState, delay, playPingSound, setCurrentCodeLine);

        // For search, keep the original array
        sortedArray = dataSet;
        // Don't overwrite animationState for search - let LinearSearch set the final state

        setCurrentCodeLine(-1);

        // Trigger confetti only if element was found
        if (searchResult !== -1) {
          triggerConfetti();
        }
      } else if (selectedAlgorithm === 'Binary Search') {
        const target = parseInt(searchTarget) || Math.floor(Math.random() * 100) + 1;
        // Ensure the array is sorted for binary search
        const sortedForSearch = [...dataSet].sort((a, b) => a - b);
        setDataSet(sortedForSearch);

        const searchResult = await binarySearch(sortedForSearch, target, setAnimationState, delay, playPingSound, setCurrentCodeLine);

        setCurrentCodeLine(-1);

        // Trigger confetti only if element was found
        if (searchResult !== -1) {
          triggerConfetti();
        }
      }else if (selectedAlgorithm === 'Merge Sort') {
        sortedArray = await mergeSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);
        
        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        // Update the main dataset to reflect the sorted state
        setDataSet(sortedArray);

        // Trigger confetti for sorting completion
        triggerConfetti();
      } else if (selectedAlgorithm === 'Insertion Sort') {
        sortedArray = await insertionSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      } else if (selectedAlgorithm === 'Selection Sort') {
        sortedArray = await selectionSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      } else if (selectedAlgorithm === 'Quick Sort') {
        sortedArray = await quickSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      } else if (selectedAlgorithm === 'Heap Sort') {
        sortedArray = await heapSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      } else if (selectedAlgorithm === 'Shell Sort') {
        sortedArray = await shellSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      } else if (selectedAlgorithm === 'Counting Sort') {
        sortedArray = await countingSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      } else if (selectedAlgorithm === 'Tim Sort') {
        sortedArray = await timSort(dataSet, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine);

        // Show completed state with the sorted array
        setAnimationState({
          array: sortedArray,
          sorted: Array.from({ length: sortedArray.length }, (_, i) => i),
          comparisons: 0,
          swaps: 0,
        });

        setCurrentCodeLine(-1);
        setDataSet(sortedArray);
        triggerConfetti();
      }
    } catch (error) {
      console.error('Algorithm execution error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsRunning(false);
    setAnimationState(null);
  };

  const handleReset = () => {
    handleStop();
    if (selectedAlgorithm === 'Binary Search') {
      const newData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100) + 1).sort((a, b) => a - b);
      setDataSet(newData);
    } else {
      generateNewDataSet();
    }
  };

  return (
    <div className="App">
      {currentPage === 'comparison' ? (
        <ComparisonPage onBack={() => setCurrentPage('main')} />
      ) : (
        <>
          <Header
            onAlgorithmChange={setSelectedAlgorithm}
            onSpeedChange={setSpeed}
            isRunning={isRunning}
            onComparisonClick={() => setCurrentPage('comparison')}
          />

      <div className="main-content">
        <div className="controls">
          {(selectedAlgorithm === 'Linear Search' || selectedAlgorithm === 'Binary Search') && (
            <div className="search-input-container">
              <label htmlFor="search-input">Search for element:</label>
              <input
                id="search-input"
                type="number"
                min="1"
                max="100"
                value={searchTarget}
                onChange={(e) => setSearchTarget(e.target.value)}
                placeholder="Enter number (1-100)"
                disabled={isRunning}
                className="search-input"
              />
            </div>
          )}

          <button
            className="btn btn-primary"
            onClick={handleRunAlgorithm}
            disabled={isRunning}
          >
            {isRunning ? 'Running...' : 'Run Algorithm'}
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={isRunning}
          >
            Reset Array
          </button>

          <button
            className="btn btn-danger"
            onClick={handleStop}
            disabled={!isRunning}
          >
            Stop
          </button>

          <button
            className={`btn ${soundEnabled ? 'btn-sound-on' : 'btn-sound-off'}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Click to disable sound' : 'Click to enable sound'}
          >
            {soundEnabled ? '🔊 Sound ON' : '🔇 Sound OFF'}
          </button>
        </div>

        <AlgorithmCanvas
          dataSet={dataSet}
          algorithmType={selectedAlgorithm}
          animationState={animationState}
        />

        <CodeVisualizer
          algorithmType={selectedAlgorithm}
          currentLine={currentCodeLine}
          executionStats={animationState}
        />

        <AlgorithmDescription algorithmType={selectedAlgorithm} />
      </div>
        </>
      )}
      <Footer />
    </div>
  );
}

export default App;
