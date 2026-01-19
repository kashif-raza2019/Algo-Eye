/**
 * Linear Search Algorithm with Animation Steps
 * Returns the index of the target or -1 if not found
 */
export const linearSearch = async (array, target, onStep, delay, onTraverse, onLineChange) => {
  const arr = [...array];
  let comparisons = 0;

  if (onLineChange) onLineChange(0); // for (let i = 0; i < arr.length; i++)
  for (let i = 0; i < arr.length; i++) {
    comparisons++;

    // Play traversal sound
    if (onTraverse) onTraverse();

    if (onLineChange) onLineChange(1); // if (arr[i] === target)
    
    // Call onStep to update UI with current search index
    await onStep({
      array: [...arr],
      searching: [i],
      found: [],
      comparisons,
      swaps: 0,
      codeLine: 1,
    });

    // Wait for delay
    await new Promise(resolve => setTimeout(resolve, delay));

    if (arr[i] === target) {
      if (onLineChange) onLineChange(2); // return i;
      
      // Found the element
      await onStep({
        array: [...arr],
        searching: [],
        found: [i],
        comparisons,
        swaps: 0,
        codeLine: 2,
      });
      return i;
    }
  }

  if (onLineChange) onLineChange(5); // return -1;
  
  // Target not found - highlight all bars red
  await onStep({
    array: [...arr],
    searching: [],
    found: [],
    notFound: Array.from({ length: arr.length }, (_, i) => i),
    comparisons,
    swaps: 0,
    codeLine: 5,
  });

  return -1;
};

export const linearSearchCode = `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Found at index i
    }
  }
  return -1; // Not found
}`;

export const linearSearchInfo = {
  name: 'Linear Search',
  timeComplexity: 'O(n)',
  spaceComplexity: 'O(1)',
  description: 'Simple search algorithm that checks every element in the array sequentially until the target element is found or the array is exhausted.',
};
