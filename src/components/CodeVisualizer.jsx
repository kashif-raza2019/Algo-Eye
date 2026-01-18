import React, { useState } from 'react';
import './CodeVisualizer.css';

const CodeVisualizer = ({ algorithmType, currentLine, executionStats }) => {
  const [isOpen, setIsOpen] = useState(false);

  const algorithmCode = {
    'Bubble Sort': [
      'for (let i = 0; i < n - 1; i++) {',
      '  let swappedInThisPass = false;',
      '  for (let j = 0; j < n - i - 1; j++) {',
      '    if (arr[j] > arr[j + 1]) {',
      '      // Swap elements',
      '      [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];',
      '      swaps++;',
      '    }',
      '  }',
      '  if (!swappedInThisPass) break;',
      '}',
    ],
    'Merge Sort': [
      '// Compare elements from left and right sub-arrays',
      'while (i < left.length && j < right.length) {',
      '  if (left[i] <= right[j]) {',
      '    result[k++] = left[i++];',
      '  } else {',
      '    result[k++] = right[j++];',
      '  }',
      '}',
      '// Copy remaining elements from left',
      'while (i < left.length) {',
      '  result[k++] = left[i++];',
      '}',
      '// Copy remaining elements from right',
      'while (j < right.length) {',
      '  result[k++] = right[j++];',
      '}',
    ],
    'Insertion Sort': [
      'for (let i = 1; i < n; i++) {',
      '  const key = arr[i];',
      '  let j = i - 1;',
      '  while (j >= 0 && arr[j] > key) {',
      '    arr[j + 1] = arr[j];',
      '    j--;',
      '  }',
      '  arr[j + 1] = key;',
      '}',
    ],
    'Selection Sort': [
      'for (let i = 0; i < n - 1; i++) {',
      '  let minIdx = i;',
      '  for (let j = i + 1; j < n; j++) {',
      '    if (arr[j] < arr[minIdx]) {',
      '      minIdx = j;',
      '    }',
      '  }',
      '  [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];',
      '}',
    ],
    'Quick Sort': [
      'function quickSort(arr, low, high) {',
      '  if (low < high) {',
      '    const pi = partition(arr, low, high);',
      '    quickSort(arr, low, pi - 1);',
      '    quickSort(arr, pi + 1, high);',
      '  }',
      '}',
    ],
    'Heap Sort': [
      'function heapify(arr, n, i) {',
      '  let largest = i;',
      '  if (2*i + 1 < n && arr[2*i + 1] > arr[largest])',
      '    largest = 2*i + 1;',
      '  if (2*i + 2 < n && arr[2*i + 2] > arr[largest])',
      '    largest = 2*i + 2;',
      '  if (largest !== i) {',
      '    [arr[i], arr[largest]] = [arr[largest], arr[i]];',
      '    heapify(arr, n, largest);',
      '  }',
      '}',
    ],
    'Shell Sort': [
      'for (let gap = n / 2; gap > 0; gap /= 2) {',
      '  for (let i = gap; i < n; i++) {',
      '    const temp = arr[i];',
      '    let j = i;',
      '    while (j >= gap && arr[j - gap] > temp) {',
      '      arr[j] = arr[j - gap];',
      '      j -= gap;',
      '    }',
      '    arr[j] = temp;',
      '  }',
      '}',
    ],
    'Counting Sort': [
      'const min = Math.min(...arr);',
      'const count = new Array(max - min + 1).fill(0);',
      'for (let i = 0; i < n; i++)',
      '  count[arr[i] - min]++;',
      'for (let i = 1; i < count.length; i++)',
      '  count[i] += count[i - 1];',
    ],
    'Tim Sort': [
      'const minRun = calculateMinRun(n);',
      '// Sort small runs with insertion sort',
      'for (let start = 0; start < n; start += minRun) {',
      '  insertionSort(arr, start, min(start + minRun, n));',
      '}',
      '// Merge sorted runs (merge sort)',
    ],
    'Linear Search': [
      'for (let i = 0; i < arr.length; i++) {',
      '  if (arr[i] === target) {',
      '    return i; // Found at index i',
      '  }',
      '}',
      'return -1; // Not found',
    ],
    'Binary Search': [
      'let left = 0, right = arr.length - 1;',
      'while (left <= right) {',
      '  const mid = Math.floor((left + right) / 2);',
      '  if (arr[mid] === target) {',
      '    return mid; // Found',
      '  } else if (arr[mid] < target) {',
      '    left = mid + 1;',
      '  } else {',
      '    right = mid - 1;',
      '  }',
      '}',
      'return -1; // Not found',
    ],
  };

  const getCodeLines = () => {
    return algorithmCode[algorithmType] || [];
  };

  const codeLines = getCodeLines();

  return (
    <div className={`code-visualizer ${isOpen ? 'open' : 'closed'}`}>
      <button 
        className="code-visualizer-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Hide code' : 'Show code'}
      >
        {isOpen ? '✕' : '◀'} CODE
      </button>

      {isOpen && (
        <div className="code-panel">
          <div className="code-header">
            <h3>{algorithmType}</h3>
            <div className="code-stats">
              {executionStats?.comparisons !== undefined && (
                <span className="stat">Comparisons: {executionStats.comparisons}</span>
              )}
              {executionStats?.swaps !== undefined && (
                <span className="stat">Swaps: {executionStats.swaps}</span>
              )}
            </div>
          </div>

          <div className="code-content">
            <pre>
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className={`code-line ${currentLine === index ? 'executing' : ''}`}
                >
                  <span className="line-number">{index + 1}</span>
                  <span className="line-code">{line}</span>
                </div>
              ))}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeVisualizer;
