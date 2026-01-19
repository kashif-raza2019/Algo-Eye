/**
 * Tim Sort Algorithm
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 * Stable: Yes
 *
 * Tim sort is a hybrid algorithm combining merge sort and insertion sort.
 * It was designed to perform well on real-world data. Used in Python and Java.
 */

export const timSort = async (
  arr,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onLineChange
) => {
  const array = [...arr];
  const n = array.length;
  const minRun = calculateMinRun(n);
  let comparisons = 0;
  let swaps = 0;

  // Line 0: Sort small runs with insertion sort
  if (onLineChange) onLineChange(0);
  for (let start = 0; start < n; start += minRun) {
    const end = Math.min(start + minRun, n);
    // eslint-disable-next-line no-loop-func
    await insertionSortRange(array, start, end, onStep, delay, onSwap, onTraverse, (stats) => {
      comparisons = stats.comparisons;
      swaps = stats.swaps;
    });
  }

  // Line 1: Merge sorted runs
  if (onLineChange) onLineChange(1);
  for (let size = minRun; size < n; size *= 2) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size;
      const end = Math.min(start + size * 2, n);

      if (mid < end) {
        // eslint-disable-next-line no-loop-func
        await mergeRuns(array, start, mid, end, onStep, delay, onSwap, onTraverse, (stats) => {
          comparisons = stats.comparisons;
          swaps = stats.swaps;
        });
      }
    }
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

const calculateMinRun = (n) => {
  let r = 0;
  while (n >= 64) {
    r |= n & 1;
    n >>= 1;
  }
  return n + r;
};

const insertionSortRange = async (
  array,
  start,
  end,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onStats
) => {
  let comparisons = 0;
  let swaps = 0;

  for (let i = start + 1; i < end; i++) {
    const key = array[i];
    let j = i - 1;

    while (j >= start && array[j] > key) {
      if (onTraverse) onTraverse();
      comparisons++;

      array[j + 1] = array[j];
      if (onSwap) onSwap();
      swaps++;

      await onStep({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [j + 1],
        comparisons,
        swaps,
        codeLine: 0,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
      j--;
    }

    array[j + 1] = key;
    if (onSwap) onSwap();
    swaps++;
  }

  onStats({ comparisons, swaps });
};

const mergeRuns = async (
  array,
  left,
  mid,
  right,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onStats
) => {
  const leftArr = array.slice(left, mid);
  const rightArr = array.slice(mid, right);
  let i = 0,
    j = 0,
    k = left;
  let comparisons = 0;
  let swaps = 0;

  while (i < leftArr.length && j < rightArr.length) {
    if (onTraverse) onTraverse();
    comparisons++;

    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i];
      i++;
    } else {
      array[k] = rightArr[j];
      j++;
    }

    if (onSwap) onSwap();
    swaps++;
    k++;

    await onStep({
      array: [...array],
      swapping: [k - 1],
      comparisons,
      swaps,
      codeLine: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  while (i < leftArr.length) {
    array[k] = leftArr[i];
    i++;
    k++;
    swaps++;
  }

  while (j < rightArr.length) {
    array[k] = rightArr[j];
    j++;
    k++;
    swaps++;
  }

  onStats({ comparisons, swaps });
};
