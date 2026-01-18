/**
 * Quick Sort Algorithm
 * Time Complexity: O(n log n) average, O(n²) worst case
 * Space Complexity: O(log n) due to recursion
 * Stable: No
 *
 * Quick sort uses divide-and-conquer with a pivot element.
 * It's very efficient on average and widely used in practice.
 */

export const quickSort = async (
  arr,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onLineChange
) => {
  const array = [...arr];
  const stats = { comparisons: 0, swaps: 0 };

  // Line 0: Initialize
  if (onLineChange) onLineChange(0);

  await quickSortHelper(array, 0, array.length - 1, onStep, delay, onSwap, onTraverse, onLineChange, stats);

  // Line 5: Return sorted array
  if (onLineChange) onLineChange(5);
  await onStep({
    array: array,
    sorted: Array.from({ length: array.length }, (_, i) => i),
    comparisons: stats.comparisons,
    swaps: stats.swaps,
    codeLine: 5,
  });

  return array;
};

const quickSortHelper = async (
  array,
  low,
  high,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onLineChange,
  stats
) => {
  if (low < high) {
    // Line 1: Partition
    if (onLineChange) onLineChange(1);
    const pi = await partition(array, low, high, onStep, delay, onSwap, onTraverse, stats);

    // Line 2: Recursively sort left
    if (onLineChange) onLineChange(2);
    await quickSortHelper(array, low, pi - 1, onStep, delay, onSwap, onTraverse, onLineChange, stats);

    // Line 3: Recursively sort right
    if (onLineChange) onLineChange(3);
    await quickSortHelper(array, pi + 1, high, onStep, delay, onSwap, onTraverse, onLineChange, stats);
  }
};

const partition = async (
  array,
  low,
  high,
  onStep,
  delay,
  onSwap,
  onTraverse,
  stats
) => {
  const pivot = array[high];
  let i = low - 1;

  // Line 4: Partition logic
  for (let j = low; j < high; j++) {
    if (onTraverse) onTraverse();
    stats.comparisons++;

    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
      if (onSwap) onSwap();
      stats.swaps++;

      await onStep({
        array: [...array],
        comparing: [j, high],
        swapping: [i, j],
        comparisons: stats.comparisons,
        swaps: stats.swaps,
        codeLine: 4,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  [array[i + 1], array[high]] = [array[high], array[i + 1]];
  if (onSwap) onSwap();
  stats.swaps++;

  return i + 1;
};
