/**
 * Shell Sort Algorithm
 * Time Complexity: O(n log n) to O(n²) depending on gap sequence
 * Space Complexity: O(1)
 * Stable: No
 *
 * Shell sort is a generalization of insertion sort that sorts
 * elements far apart first, then progressively reducing the gap.
 */

export const shellSort = async (
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

  // Line 0: Initialize gap sequence
  if (onLineChange) onLineChange(0);
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    // Line 1: Do a gapped insertion sort
    if (onLineChange) onLineChange(1);
    for (let i = gap; i < n; i++) {
      const temp = array[i];
      let j = i;

      // Line 2: Shift elements by gap
      if (onLineChange) onLineChange(2);
      while (j >= gap && array[j - gap] > temp) {
        if (onTraverse) onTraverse();
        comparisons++;

        array[j] = array[j - gap];
        if (onSwap) onSwap();
        swaps++;
        j -= gap;

        await onStep({
          array: [...array],
          comparing: [j, j + gap],
          swapping: [j],
          comparisons,
          swaps,
          codeLine: 2,
        });

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      // Line 3: Insert element
      if (onLineChange) onLineChange(3);
      array[j] = temp;
      if (onSwap) onSwap();
      swaps++;

      await onStep({
        array: [...array],
        swapping: [j],
        comparisons,
        swaps,
        codeLine: 3,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
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
