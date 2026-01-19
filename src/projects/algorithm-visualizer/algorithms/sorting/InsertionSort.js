/**
 * Insertion Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * Stable: Yes
 *
 * Insertion sort builds the sorted array one item at a time by
 * inserting elements into their correct position. It's efficient
 * for small arrays and nearly sorted data.
 */

export const insertionSort = async (
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

  // Line 0: Iterate through array
  if (onLineChange) onLineChange(0);
  for (let i = 1; i < n; i++) {
    const key = array[i];
    let j = i - 1;

    // Line 1: Compare and shift
    if (onLineChange) onLineChange(1);
    while (j >= 0 && array[j] > key) {
      if (onTraverse) onTraverse();
      comparisons++;

      // Line 2: Shift element
      if (onLineChange) onLineChange(2);
      array[j + 1] = array[j];
      if (onSwap) onSwap();
      swaps++;

      await onStep({
        array: [...array],
        comparing: [j, j + 1],
        swapping: [j + 1],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        comparisons,
        swaps,
        codeLine: 2,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
      j--;
    }

    // Line 3: Insert key
    if (onLineChange) onLineChange(3);
    array[j + 1] = key;
    if (onSwap) onSwap();
    swaps++;

    await onStep({
      array: [...array],
      swapping: [j + 1],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      comparisons,
      swaps,
      codeLine: 3,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  await onStep({
    array: array,
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
    codeLine: 4,
  });

  return array;
};
