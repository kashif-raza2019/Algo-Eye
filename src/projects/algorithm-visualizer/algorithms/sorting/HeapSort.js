/**
 * Heap Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 * Stable: No
 *
 * Heap sort builds a max heap and repeatedly extracts the maximum
 * element, placing it at the end of the array. It's in-place and
 * has guaranteed O(n log n) performance.
 */

export const heapSort = async (
  arr,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onLineChange
) => {
  const array = [...arr];
  const n = array.length;
  let comparisons = 0;
  let swaps = 0;

  // Line 0: Build max heap
  if (onLineChange) onLineChange(0);
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    // eslint-disable-next-line no-loop-func
    await heapify(array, n, i, onStep, delay, onSwap, onTraverse, () => {
      comparisons++;
    });
  }

  // Line 1: Extract elements from heap
  if (onLineChange) onLineChange(1);
  for (let i = n - 1; i > 0; i--) {
    // Swap root with last element
    if (onTraverse) onTraverse();
    [array[0], array[i]] = [array[i], array[0]];
    if (onSwap) onSwap();
    swaps++;

    await onStep({
      array: [...array],
      swapping: [0, i],
      comparing: [0, i],
      sorted: Array.from({ length: n - i }, (_, idx) => n - 1 - idx),
      comparisons,
      swaps,
      codeLine: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));

    // Heapify root
    // eslint-disable-next-line no-loop-func
    await heapify(array, i, 0, onStep, delay, onSwap, onTraverse, () => {
      comparisons++;
    });
  }

  await onStep({
    array: array,
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
    codeLine: 2,
  });

  return array;
};

const heapify = async (array, n, i, onStep, delay, onSwap, onTraverse, incrementComparisons) => {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    if (onTraverse) onTraverse();
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    if (onTraverse) onTraverse();
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    if (onSwap) onSwap();
    incrementComparisons();

    await onStep({
      array: [...array],
      comparing: [i, largest],
      codeLine: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
    await heapify(array, n, largest, onStep, delay, onSwap, onTraverse, incrementComparisons);
  }
};
