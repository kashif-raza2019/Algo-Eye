# Merge Sort Implementation Guide

## Overview

Merge Sort is a **divide-and-conquer** sorting algorithm that:
1. Divides the array into halves recursively until single elements remain
2. Merges sub-arrays back together in sorted order
3. Guarantees O(n log n) performance in all cases

## Time & Space Complexity

| Aspect | Complexity | Notes |
|--------|-----------|-------|
| **Best Case** | O(n log n) | Even with sorted array |
| **Average Case** | O(n log n) | Typical case |
| **Worst Case** | O(n log n) | Guaranteed, unlike QuickSort |
| **Space Complexity** | O(n) | Requires extra space for merging |
| **Stable** | ✓ Yes | Equal elements maintain order |

## Algorithm Flow Visualization

```
Initial Array: [38, 27, 43, 3, 9, 82, 10]

Step 1: DIVIDE (Recursively split)
        [38, 27, 43, 3, 9, 82, 10]
              /              \
        [38, 27, 43, 3]    [9, 82, 10]
         /         \          /      \
    [38, 27]   [43, 3]   [9, 82]  [10]
    /    \      /   \    /   \
  [38]  [27]  [43] [3] [9] [82] [10]

Step 2: MERGE (Compare and combine in sorted order)
    [38]  [27]  →  [27, 38]
    [43]  [3]   →  [3, 43]
    [27, 38]  [3, 43]  →  [3, 27, 38, 43]
    
    [9] [82]  →  [9, 82]
    [10]  →  [10]
    [9, 82]  [10]  →  [9, 10, 82]
    
    [3, 27, 38, 43]  [9, 10, 82]  →  [3, 9, 10, 27, 38, 43, 82]

Final Sorted Array: [3, 9, 10, 27, 38, 43, 82]
```

## Implementation Details

### File: `src/algorithms/sorting/MergeSort.js`

```javascript
export const mergeSort = async (array, onStep, delay, onSwap, onTraverse, onLineChange) => {
    const arr = [...array];  // Work with copy
    let comparisons = 0;
    let swaps = 0;
    const n = arr.length;

    // MERGE FUNCTION: Combines two sorted subarrays
    const merge = async (left, mid, right) => {
        // Extract left and right subarrays
        const leftArr = arr.slice(left, mid + 1);
        const rightArr = arr.slice(mid + 1, right + 1);
        let i = 0, j = 0, k = left;

        // CODE LINE 0: Compare and merge main portion
        while (i < leftArr.length && j < rightArr.length) {
            comparisons++;
            if (onTraverse) onTraverse(); // Audio feedback
            if (onLineChange) onLineChange(0); // Highlight line 0

            // Show comparison
            await onStep({
                array: [...arr],
                comparing: [left + i, mid + 1 + j],  // Highlight compared indices
                comparisons,
                swaps,
                codeLine: 0,
            });
            await new Promise(resolve => setTimeout(resolve, delay));

            // Place smaller element
            if (leftArr[i] <= rightArr[j]) {
                arr[k] = leftArr[i];
                i++;
            } else {
                arr[k] = rightArr[j];
                j++;
            }
            swaps++;
            if (onSwap) onSwap(); // Play swap sound

            // CODE LINE 1: Show merge/swap
            if (onLineChange) onLineChange(1);
            await onStep({
                array: [...arr],
                swapping: [k],  // Highlight swapped index
                comparisons,
                swaps,
                codeLine: 1,
            });
            await new Promise(resolve => setTimeout(resolve, delay));
            k++;
        }

        // CODE LINE 2: Copy remaining from left subarray
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

        // CODE LINE 3: Copy remaining from right subarray
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

    // RECURSIVE SORT FUNCTION: Divide and conquer
    const mergeSortRecursive = async (left, right) => {
        if (left < right) {  // Continue dividing
            const mid = Math.floor((left + right) / 2);

            if (onLineChange) onLineChange(4); // Highlight recursive call line

            // Recursively sort left half
            await mergeSortRecursive(left, mid);
            
            // Recursively sort right half
            await mergeSortRecursive(mid + 1, right);
            
            // Merge the sorted halves
            await merge(left, mid, right);
        }
    };

    // Start the algorithm
    await mergeSortRecursive(0, n - 1);

    // Final state: all sorted
    await onStep({
        array: [...arr],
        sorted: Array.from({ length: n }, (_, idx) => idx),
        comparisons,
        swaps,
    });

    return arr;
};
```

## Code Visualization Lines (CodeVisualizer.jsx)

The visualizer shows these code lines with real-time highlighting:

```javascript
'// Compare elements from left and right sub-arrays',  // Line 0
'while (i < left.length && j < right.length) {',       // Line 0
'  if (left[i] <= right[j]) {',                        // Line 1
'    result[k++] = left[i++];',                        // Line 1
'  } else {',                                           // Line 1
'    result[k++] = right[j++];',                       // Line 1
'  }',                                                  // Line 1
'}',                                                    // Line 1
'// Copy remaining elements from left',                // Line 2
'while (i < left.length) {',                           // Line 2
'  result[k++] = left[i++];',                          // Line 2
'}',                                                    // Line 2
'// Copy remaining elements from right',              // Line 3
'while (j < right.length) {',                          // Line 3
'  result[k++] = right[j++];',                         // Line 3
'}',                                                    // Line 3
```

## Visualization States

### 1. **Comparing State** (Orange bars)
When comparing elements from left and right sub-arrays during merge:
```javascript
comparing: [left + i, mid + 1 + j]
```
- Shows which two elements are being compared
- Triggered at line 0 of code
- Produces "ping" sound via `onTraverse()`

### 2. **Swapping State** (Red bars)
When placing element in final position:
```javascript
swapping: [k]
```
- Shows where element is being placed
- Triggered at lines 1, 2, 3 of code
- Produces "swap" sound via `onSwap()`

### 3. **Sorted State** (Green bars)
When entire array is sorted:
```javascript
sorted: Array.from({ length: n }, (_, idx) => idx)
```
- All bars highlighted green
- Triggered at completion
- Triggers confetti animation

## Step-by-Step Example: Sorting [3, 1, 4, 2]

### Initial: [3, 1, 4, 2]

### Pass 1: Divide into [3, 1] and [4, 2]

#### Sorting [3, 1]:
```
Divide: [3] and [1]
Merge: Compare 3 vs 1
       → Place 1 (1 < 3)
       → Place 3
Result: [1, 3]
```
**Visualization updates:**
1. `comparing: [3_idx, 1_idx]` - Show which elements compared
2. `swapping: [0]` - Show 1 placed at index 0
3. `swapping: [1]` - Show 3 placed at index 1

#### Sorting [4, 2]:
```
Divide: [4] and [2]
Merge: Compare 4 vs 2
       → Place 2 (2 < 4)
       → Place 4
Result: [2, 4]
```

### Pass 2: Merge [1, 3] and [2, 4]
```
Compare left[0]=1 vs right[0]=2
  → 1 < 2, place 1
Compare left[1]=3 vs right[0]=2
  → 2 < 3, place 2
Compare left[1]=3 vs right[1]=4
  → 3 < 4, place 3
Compare complete, place remaining 4

Result: [1, 2, 3, 4]
```

**Visualization:**
- Bars transition from orange (comparing) → red (swapping) → green (sorted)
- Statistics update: Comparisons: 5, Swaps: 8
- Code lines highlight in sequence: 0 → 1 → 2 → 3

## Why Merge Sort is Better Than Bubble Sort

| Aspect | Bubble Sort | Merge Sort |
|--------|------------|-----------|
| **Worst Case** | O(n²) | O(n log n) |
| **Average Case** | O(n²) | O(n log n) |
| **Best Case** | O(n) | O(n log n) |
| **Space** | O(1) | O(n) |
| **Stable** | Yes | Yes |
| **Adaptive** | Yes* | No |
| **For 1000 items** | ~500,000 ops | ~10,000 ops |

*Bubble sort can detect early if array is sorted

## Real-World Applications

1. **External Sorting**: Merging large files too big for RAM
2. **Linked Lists**: O(n log n) without random access
3. **Parallel Computing**: Easy to parallelize merge process
4. **Database Sorting**: Used in many database systems
5. **Video Games**: Sorting game objects by depth

## Common Mistakes in Implementation

### ❌ Mistake 1: Modifying Original Array
```javascript
// WRONG: Merges in-place which corrupts data
const merge = (left, mid, right) => {
    // Direct array mutation without copying
};
```

### ✓ Correct: Use Temporary Arrays
```javascript
// RIGHT: Extract subarrays safely
const leftArr = arr.slice(left, mid + 1);
const rightArr = arr.slice(mid + 1, right + 1);
```

### ❌ Mistake 2: Wrong Index Calculations
```javascript
// WRONG: Comparing wrong indices
comparing: [i, j]  // These are subarray indices, not arr indices!
```

### ✓ Correct: Map to Original Array
```javascript
// RIGHT: Map subarray indices to original array
comparing: [left + i, mid + 1 + j]
```

### ❌ Mistake 3: Infinite Recursion
```javascript
// WRONG: No base case
const mergeSortRecursive = async (left, right) => {
    const mid = Math.floor((left + right) / 2);
    await mergeSortRecursive(left, mid);      // Missing: if (left < right)
    await mergeSortRecursive(mid + 1, right);
};
```

### ✓ Correct: Proper Base Case
```javascript
// RIGHT: Stops at single elements
const mergeSortRecursive = async (left, right) => {
    if (left < right) {  // ← Base case!
        const mid = Math.floor((left + right) / 2);
        // ... rest of code
    }
};
```

## Performance Analysis on UI

### For Array of 10 Elements:

```
Bubble Sort:
- Comparisons: ~45 (in worst case)
- Total operations: ~90
- Swaps: Up to 45
- Visible: Every bar might swap

Merge Sort:
- Comparisons: ~24 (10 * log₂(10) / 2)
- Total operations: ~48
- Swaps: ~24
- Visible: Organized merge process from top-down

Visual Difference:
- Bubble Sort: Chaotic, slow movement of larger elements
- Merge Sort: Organized, sub-arrays sorted independently then merged
```

## Interactive Learning Tips

1. **Speed Slow** (0.5x): Watch each comparison and merge carefully
2. **Sound ON**: Notice "ping" = comparison, "swap" = element placed
3. **Code Open**: See lines highlight as merge/sort happens
4. **Multiple Runs**: Watch different initial arrays to see pattern consistency

## Further Optimization: In-Place Merge

Standard merge sort uses O(n) extra space. For production code, consider:

```javascript
// In-place merge uses complex pointer manipulation
// Not used in visualizer as clarity is more important
// But available in advanced sorting libraries

// Drawback: Much harder to visualize step-by-step!
```

## Comparison with Other Algorithms in Visualizer

| Algorithm | Type | Complexity | When to Use |
|-----------|------|-----------|-----------|
| **Bubble Sort** | Comparison | O(n²) | Educational, nearly sorted data |
| **Merge Sort** | Comparison | O(n log n) | General purpose, stable sort needed |
| **Linear Search** | Search | O(n) | Unsorted array, small size |
| **Binary Search** | Search | O(log n) | Sorted array only |

## Next Steps

To add a new sorting algorithm like QuickSort:

1. Create `src/algorithms/sorting/QuickSort.js`
2. Follow Merge Sort pattern with line callbacks
3. Add code to CodeVisualizer
4. Update Header.jsx with option
5. Add case in App.js handleRunAlgorithm
6. Create algorithm info export

The modular callback structure makes it easy to integrate new algorithms!
