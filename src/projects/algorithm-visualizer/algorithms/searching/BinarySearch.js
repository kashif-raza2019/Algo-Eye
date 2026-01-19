/**
 * Binary Search Algorithm Implementation
 * Returns the index of the target or -1 if not found
 */
export const binarySearch = async (array, target, onStep, delay, onTraverse, onLineChange) => {
  const arr = [...array].sort((a, b) => a - b); // Ensure the array is sorted
  let left = 0;
  let right = arr.length - 1;
  let comparisons = 0;

  if (onLineChange) onLineChange(0); // while (left <= right)
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    comparisons++;

    // Play traversal sound
    if (onTraverse) onTraverse();

    if (onLineChange) onLineChange(2); // if (arr[mid] === target)
    
    // Call onStep to update UI with current mid index
    await onStep({
      array: [...arr],
      searching: [mid],
      found: [],
      comparisons,
      swaps: 0,
      codeLine: 2,
    });

    // Wait for delay
    await new Promise(resolve => setTimeout(resolve, delay));

    if (arr[mid] === target) {
      if (onLineChange) onLineChange(3); // return mid;
      
      // Found the element
      await onStep({
        array: [...arr],
        searching: [],
        found: [mid],
        comparisons,
        swaps: 0,
        codeLine: 3,
      });
      return mid;
    } else if (arr[mid] < target) {
      if (onLineChange) onLineChange(5); // left = mid + 1;
      left = mid + 1;
    } else {
      if (onLineChange) onLineChange(7); // right = mid - 1;
      right = mid - 1;
    }
  }

  if (onLineChange) onLineChange(10); // return -1;
  
  // Target not found - highlight all bars red
  await onStep({
    array: [...arr],
    searching: [],
    found: [],
    notFound: Array.from({ length: arr.length }, (_, i) => i),
    comparisons,
    swaps: 0,
    codeLine: 10,
  });

  return -1;
};

export const binarySearchCode = `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Found at index mid
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return -1; // Not found
}`; 

export const binarySearchInfo = {
  name: 'Binary Search',
  description: 'Binary Search is an efficient algorithm for finding an item from a sorted array. It works by repeatedly dividing the search interval in half. If the value of the search key is less than the item in the middle of the interval, narrow the interval to the lower half. Otherwise, narrow it to the upper half. This process continues until the value is found or the interval is empty.',
  timeComplexity: {
    best: 'O(1)',
    average: 'O(log n)',
    worst: 'O(log n)',
  },
  spaceComplexity: 'O(1)',
  useCases: [
    'Searching in large sorted datasets',
    'Databases and file systems',
    'Real-time applications requiring fast lookups',
  ],
};