/**
 * Merge Sort Algorithm Implementation
 * Returns array of steps showing index changes and comparisons
 */

export const mergeSort = async (array, onStep, delay, onSwap, onTraverse, onLineChange) => {
    const arr = [...array];
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;

    const merge = async (left, mid, right) => {
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        // Line 0: while comparison
        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;
            if (onTraverse) onTraverse(); // Play traversal sound

            if (onLineChange) onLineChange(0);

            await onStep({
                array: [...arr],
                comparing: [left + i, mid + 1 + j],
                comparisons,
                swaps,
                codeLine: 0,
            });

            await new Promise(resolve => setTimeout(resolve, delay));

            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            swaps++;
            if (onSwap) onSwap(); // Play swap sound

            if (onLineChange) onLineChange(1);

            await onStep({
                array: [...arr],
                swapping: [k],
                comparisons,
                swaps,
                codeLine: 1,
            });

            await new Promise(resolve => setTimeout(resolve, delay));
            k++;
        }

        // Line 2: Copy remaining from left array
        while (i < leftArr.length) {
            arr[k] = leftArr[i];
            i++;
            k++;
            swaps++;
            if (onSwap) onSwap();

            if (onLineChange) onLineChange(2);

            await onStep({
                array: [...arr],
                swapping: [k - 1],
                comparisons,
                swaps,
                codeLine: 2,
            });

            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Line 3: Copy remaining from right array
        while (j < rightArr.length) {
            arr[k] = rightArr[j];
            j++;
            k++;
            swaps++;
            if (onSwap) onSwap();

            if (onLineChange) onLineChange(3);

            await onStep({
                array: [...arr],
                swapping: [k - 1],
                comparisons,
                swaps,
                codeLine: 3,
            });

            await new Promise(resolve => setTimeout(resolve, delay));
        }
    };

    const mergeSortRecursive = async (left, right) => {
        if (left < right) {
            const mid = Math.floor((left + right) / 2);

            if (onLineChange) onLineChange(4);

            await mergeSortRecursive(left, mid);
            await mergeSortRecursive(mid + 1, right);
            await merge(left, mid, right);
        }
    };

    await mergeSortRecursive(0, n - 1);

    // Final step with all sorted
    await onStep({
        array: [...arr],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        comparisons,
        swaps,
    });

    return arr;
};

export const mergeSortCode = `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`;

export const mergeSortInfo = {
    name: 'Merge Sort',
    description: 'Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts each half, and then merges them back together in sorted order. It has a time complexity of O(n log n) and is stable.',
    timeComplexity: {
        best: 'O(n log n)',
        average: 'O(n log n)',
        worst: 'O(n log n)',
    },
    spaceComplexity: 'O(n)',
    stable: true,
};