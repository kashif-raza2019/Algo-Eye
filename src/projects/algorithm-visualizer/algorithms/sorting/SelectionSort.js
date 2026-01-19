/**
 * Selection Sort Algorithm
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 * Stable: No
 *
 * Selection sort divides the array into sorted and unsorted portions,
 * repeatedly finding the minimum element and moving it to the front.
 */

export const selectionSort = async (
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

  // Line 0: Outer loop - find minimum
  if (onLineChange) onLineChange(0);
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    // Line 1: Inner loop - search for minimum
    if (onLineChange) onLineChange(1);
    for (let j = i + 1; j < n; j++) {
      if (onTraverse) onTraverse();
      comparisons++;

      if (array[j] < array[minIdx]) {
        minIdx = j;
      }

      await onStep({
        array: [...array],
        comparing: [i, j],
        sorted: Array.from({ length: i }, (_, idx) => idx),
        comparisons,
        swaps,
        codeLine: 1,
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    // Line 2: Swap minimum with current position
    if (onLineChange) onLineChange(2);
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      if (onSwap) onSwap();
      swaps++;
    }

    await onStep({
      array: [...array],
      swapping: [i, minIdx],
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
      comparisons,
      swaps,
      codeLine: 2,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  await onStep({
    array: array,
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons,
    swaps,
    codeLine: 3,
  });

  return array;
};
