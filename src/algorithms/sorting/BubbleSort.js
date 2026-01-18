/**
 * Bubble Sort Algorithm with Animation Steps
 * Returns array of steps showing index changes and comparisons
 */
export const bubbleSort = async (array, onStep, delay, onSwap, onTraverse, onLineChange) => {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;

  for (let i = 0; i < n - 1; i++) {
    if (onLineChange) onLineChange(0); // for (let i = 0; i < n - 1; i++)
    let swappedInThisPass = false;

    if (onLineChange) onLineChange(2); // for (let j = 0; j < n - i - 1; j++)
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;

      // Play traversal sound
      if (onTraverse) onTraverse();

      if (onLineChange) onLineChange(3); // if (arr[j] > arr[j + 1])
      
      // Show comparison state
      await onStep({
        array: [...arr],
        comparing: [j, j + 1],
        sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
        comparisons,
        swaps,
        codeLine: 3,
      });

      // Wait for delay
      await new Promise(resolve => setTimeout(resolve, delay));

      if (arr[j] > arr[j + 1]) {
        if (onLineChange) onLineChange(5); // [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        
        // Swap with animation
        swaps++;
        
        // Play swap sound
        if (onSwap) onSwap();
        
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        await onStep({
          array: [...arr],
          swapping: [j, j + 1],
          sorted: Array.from({ length: i }, (_, idx) => n - 1 - idx),
          comparisons,
          swaps,
          codeLine: 5,
        });

        swappedInThisPass = true;

        // Wait for swap animation
        await new Promise(resolve => setTimeout(resolve, delay / 2));
      }
    }

    // If no swaps occurred, array is sorted
    if (!swappedInThisPass) {
      if (onLineChange) onLineChange(9); // if (!swappedInThisPass) break;
      break;
    }
  }

  // Final step with all sorted
  await onStep({
    array: [...arr],
    sorted: Array.from({ length: n }, (_, idx) => idx),
    comparisons,
    swaps,
  });

  return arr;
};

export const bubbleSortCode = `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}`;

export const bubbleSortInfo = {
  name: 'Bubble Sort',
  timeComplexity: 'O(n²)',
  spaceComplexity: 'O(1)',
  description: 'Simple comparison-based sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
};
