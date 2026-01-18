import React from 'react';
import './AlgorithmDescription.css';

/**
 * AlgorithmDescription Component
 * Displays detailed information about the selected algorithm including:
 * - Time complexity (Best, Average, Worst)
 * - Space complexity
 * - Stability
 * - Description
 */
const AlgorithmDescription = ({ algorithmType }) => {
  const algorithmDetails = {
    'Bubble Sort': {
      description:
        'Bubble Sort is a simple sorting algorithm that repeatedly steps through the array, compares adjacent elements, and swaps them if they are in the wrong order. The algorithm gets its name because smaller elements "bubble" to the top (beginning) of the array.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      stable: true,
      useCases: 'Educational purposes, small datasets, nearly sorted arrays',
      pros: 'Simple to understand and implement, in-place sorting',
      cons: 'Very slow on large datasets, O(n²) complexity',
    },
    'Merge Sort': {
      description:
        'Merge Sort is a divide-and-conquer algorithm that recursively divides the array into halves until single elements remain, then merges them back in sorted order. It guarantees O(n log n) performance regardless of input.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(n)',
      stable: true,
      useCases: 'Large datasets, linked lists, external sorting, guaranteed performance needed',
      pros: 'Guaranteed O(n log n), stable, parallelizable, good for linked lists',
      cons: 'Requires O(n) extra space, slower on small arrays due to overhead',
    },
    'Insertion Sort': {
      description:
        'Insertion sort builds the sorted array one item at a time by inserting elements into their correct position. It\'s efficient for small arrays and nearly sorted data.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      stable: true,
      useCases: 'Small arrays, nearly sorted data, online sorting',
      pros: 'Simple implementation, efficient for nearly sorted data, in-place, stable',
      cons: 'O(n²) average case, slower on random data',
    },
    'Selection Sort': {
      description:
        'Selection sort divides the array into sorted and unsorted portions, repeatedly finding the minimum element and moving it to the front.',
      timeComplexity: {
        best: 'O(n²)',
        average: 'O(n²)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      stable: false,
      useCases: 'Small datasets, when minimizing swaps is important',
      pros: 'Simple to understand, minimizes swaps (O(n)), in-place',
      cons: 'Always O(n²), unstable, not suitable for large data',
    },
    'Quick Sort': {
      description:
        'Quick sort uses divide-and-conquer with a pivot element to partition the array. It\'s very efficient on average and widely used in practice.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(log n)',
      stable: false,
      useCases: 'General-purpose sorting, large datasets, in-place sorting needed',
      pros: 'Very fast average case, in-place, cache-friendly',
      cons: 'Unstable, O(n²) worst case, recursion overhead',
    },
    'Heap Sort': {
      description:
        'Heap sort builds a max heap and repeatedly extracts the maximum element, placing it at the end of the array. It\'s in-place and has guaranteed O(n log n) performance.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(1)',
      stable: false,
      useCases: 'Guaranteed performance needed, in-place sorting, priority queues',
      pros: 'Guaranteed O(n log n), in-place, no extra space needed',
      cons: 'Unstable, poor cache locality, slower than quick sort in practice',
    },
    'Shell Sort': {
      description:
        'Shell sort is a generalization of insertion sort that sorts elements far apart first, then progressively reducing the gap. It improves on insertion sort for larger datasets.',
      timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log² n)',
        worst: 'O(n²)',
      },
      spaceComplexity: 'O(1)',
      stable: false,
      useCases: 'Medium-sized datasets, when simplicity and efficiency are balanced',
      pros: 'More efficient than insertion sort, in-place, simple to implement',
      cons: 'Complex analysis, unstable, performance varies with gap sequence',
    },
    'Counting Sort': {
      description:
        'Counting sort works by counting occurrences of each value and then placing them in sorted order. It\'s linear time but requires extra space for the count array.',
      timeComplexity: {
        best: 'O(n + k)',
        average: 'O(n + k)',
        worst: 'O(n + k)',
      },
      spaceComplexity: 'O(n + k)',
      stable: true,
      useCases: 'Small range of integers, non-negative numbers, radix sort',
      pros: 'Linear time complexity, stable, predictable performance',
      cons: 'Only for integers, O(k) space where k is range, not good for large ranges',
    },
    'Tim Sort': {
      description:
        'Tim sort is a hybrid algorithm combining merge sort and insertion sort. It was designed to perform well on real-world data. Used in Python and Java.',
      timeComplexity: {
        best: 'O(n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
      },
      spaceComplexity: 'O(n)',
      stable: true,
      useCases: 'Production sorting (Python, Java), real-world data, mixed data patterns',
      pros: 'Excellent average case, stable, optimized for real data, O(n) for nearly sorted',
      cons: 'Complex implementation, O(n) extra space, slower on small arrays',
    },
    'Linear Search': {
      description:
        'Linear Search is the simplest searching algorithm that checks every element in the array sequentially until the target element is found or the end is reached. Works on both sorted and unsorted arrays.',
      timeComplexity: {
        best: 'O(1)',
        average: 'O(n)',
        worst: 'O(n)',
      },
      spaceComplexity: 'O(1)',
      stable: true,
      useCases: 'Small arrays, unsorted data, finding first occurrence',
      pros: 'Simple implementation, works on unsorted arrays, no preprocessing needed',
      cons: 'Very slow on large datasets, O(n) complexity',
    },
    'Binary Search': {
      description:
        'Binary Search is an efficient searching algorithm that works on sorted arrays by repeatedly dividing the search space in half. It eliminates half of the remaining elements with each comparison.',
      timeComplexity: {
        best: 'O(1)',
        average: 'O(log n)',
        worst: 'O(log n)',
      },
      spaceComplexity: 'O(1)',
      stable: true,
      useCases: 'Large sorted datasets, phone books, dictionary lookups',
      pros: 'Very fast O(log n), works on large datasets, simple implementation',
      cons: 'Requires sorted array, not suitable for unsorted data',
    },
  };

  const details = algorithmDetails[algorithmType] || algorithmDetails['Bubble Sort'];
  const isSearching = algorithmType.includes('Search');

  return (
    <div className="algorithm-description">
      <div className="description-header">
        <h3>{algorithmType}</h3>
      </div>

      <div className="description-content">
        {/* Main Description */}
        <div className="description-section">
          <p className="description-text">{details.description}</p>
        </div>

        {/* Complexity Grid */}
        <div className="complexity-grid">
          {/* Time Complexity */}
          <div className="complexity-box">
            <h4>⏱️ Time Complexity</h4>
            <div className="complexity-details">
              <div className="complexity-row">
                <span className="complexity-label">Best Case:</span>
                <span className="complexity-value best">{details.timeComplexity.best}</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-label">Average Case:</span>
                <span className="complexity-value average">{details.timeComplexity.average}</span>
              </div>
              <div className="complexity-row">
                <span className="complexity-label">Worst Case:</span>
                <span className="complexity-value worst">{details.timeComplexity.worst}</span>
              </div>
            </div>
          </div>

          {/* Space Complexity */}
          <div className="complexity-box">
            <h4>💾 Space Complexity</h4>
            <div className="complexity-details">
              <div className="complexity-row">
                <span className="complexity-value space">{details.spaceComplexity}</span>
                <span className="complexity-label">
                  {details.spaceComplexity === 'O(1)' ? '(In-place)' : '(Extra space)'}
                </span>
              </div>
            </div>
          </div>

          {/* Stability */}
          <div className="complexity-box">
            <h4>🔄 Stability</h4>
            <div className="complexity-details">
              <div className="stability-badge">
                <span className={details.stable ? 'stable' : 'unstable'}>
                  {details.stable ? '✓ Stable' : '✗ Unstable'}
                </span>
                <span className="stability-note">
                  {details.stable
                    ? 'Equal elements maintain relative order'
                    : 'Equal elements may change order'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="additional-info">
          <div className="info-row">
            <span className="info-label">📍 Use Cases:</span>
            <span className="info-value">{details.useCases}</span>
          </div>

          <div className="info-row">
            <span className="info-label">✅ Pros:</span>
            <span className="info-value">{details.pros}</span>
          </div>

          <div className="info-row">
            <span className="info-label">❌ Cons:</span>
            <span className="info-value">{details.cons}</span>
          </div>
        </div>

        {/* Algorithm Type Badge */}
        <div className="algorithm-type-badge">
          <span className={`type-badge ${isSearching ? 'search' : 'sort'}`}>
            {isSearching ? '🔍 Searching Algorithm' : '📊 Sorting Algorithm'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmDescription;
