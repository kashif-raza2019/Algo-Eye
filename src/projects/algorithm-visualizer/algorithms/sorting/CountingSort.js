/**
 * Counting Sort Algorithm
 * Time Complexity: O(n + k) where k is the range of input
 * Space Complexity: O(n + k)
 * Stable: Yes
 *
 * Counting sort works by counting occurrences of each value
 * and then placing them in sorted order. It's linear time
 * but requires extra space for the count array.
 */

export const countingSort = async (
  arr,
  onStep,
  delay,
  onSwap,
  onTraverse,
  onLineChange
) => {
  const n = arr.length;
  if (n <= 1) return arr;

  const array = [...arr];
  const min = Math.min(...array);
  const max = Math.max(...array);
  const range = max - min + 1;

  // Line 0: Find min and max
  if (onLineChange) onLineChange(0);

  // Create count array
  const count = new Array(range).fill(0);

  // Line 1: Count occurrences
  if (onLineChange) onLineChange(1);
  for (let i = 0; i < n; i++) {
    if (onTraverse) onTraverse();
    count[array[i] - min]++;

    await onStep({
      array: [...array],
      comparing: [i],
      comparisons: i,
      swaps: 0,
      codeLine: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Line 2: Modify count array (cumulative)
  if (onLineChange) onLineChange(2);
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Line 3: Build sorted array
  if (onLineChange) onLineChange(3);
  const output = new Array(n);
  let sortedCount = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (onTraverse) onTraverse();
    const index = count[array[i] - min] - 1;
    output[index] = array[i];
    count[array[i] - min]--;
    sortedCount++;

    if (onSwap) onSwap();

    // Create display array with sorted elements at the beginning
    const displayArray = [...output].filter(el => el !== undefined).concat([...array].filter((_, idx) => !output.includes(array[idx])));
    const sorted = Array.from({ length: sortedCount }, (_, i) => i);

    await onStep({
      array: displayArray.length > 0 ? displayArray : [...array],
      swapping: [index],
      comparisons: n - i,
      swaps: sortedCount,
      sorted: sorted,
      codeLine: 3,
    });

    await new Promise((resolve) => setTimeout(resolve, delay));
  }

  // Line 4: Final sorted array
  if (onLineChange) onLineChange(4);

  await onStep({
    array: output,
    sorted: Array.from({ length: n }, (_, i) => i),
    comparisons: n,
    swaps: n,
    codeLine: 4,
  });

  return output;
};