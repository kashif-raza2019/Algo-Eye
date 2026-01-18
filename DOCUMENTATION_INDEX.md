# Algorithm Visualizer - Documentation Index

Welcome to the Algorithm Visualizer! This project provides interactive visualization of sorting and searching algorithms with real-time code highlighting.

## 📚 Documentation Files

### 1. **README.md** (Project Root)
   - Quick start guide
   - Installation instructions
   - Basic usage

### 2. **DETAILED_README.md** (1,442 lines) ⭐ START HERE
   - **Complete implementation guide** for developers
   - React hooks deep dive (useState, useRef, useEffect)
   - JavaScript patterns (async/await, closures, destructuring)
   - Component breakdown with code examples
   - State management explained
   - Animation system (Canvas + requestAnimationFrame)
   - Audio system (HTML5 Audio + Web Audio API)
   - Code visualizer architecture
   - Performance optimizations
   - How to add new algorithms
   - Debugging tips

### 3. **MERGE_SORT_GUIDE.md** (NEW)
   - Detailed Merge Sort implementation
   - Algorithm flow visualization with ASCII diagrams
   - Time & space complexity analysis
   - Step-by-step examples
   - Code visualization mapping
   - Comparison with Bubble Sort
   - Real-world applications
   - Common implementation mistakes
   - Interactive learning tips

### 4. **MERGE_SORT_SUMMARY.md** (NEW)
   - Quick summary of Merge Sort updates
   - Visualization features explained
   - Testing checklist
   - Callback chain explanation
   - Troubleshooting guide
   - Performance metrics

---

## 🎯 Reading Guide by Role

### 👨‍🎓 Students Learning Algorithms
1. Start with DETAILED_README.md (sections: Algorithm Implementation)
2. Read MERGE_SORT_GUIDE.md for detailed algorithm explanation
3. Run visualizer and test each feature
4. Try modifying speed/array size to observe behavior

### 👨‍💻 Developers Maintaining Code
1. Read DETAILED_README.md (all sections)
2. Check src/algorithms/ for algorithm implementations
3. Review src/components/ for visualization components
4. Read MERGE_SORT_SUMMARY.md for latest changes

### 🎓 Educators Using in Class
1. Read DETAILED_README.md (Project Overview + Why This Approach)
2. Use MERGE_SORT_GUIDE.md for teaching materials
3. Show real-time visualization with code highlighting
4. Explain algorithm using statistics (comparisons, swaps)

### 🚀 Contributors Adding New Features
1. Read DETAILED_README.md (Architecture + Component Breakdown)
2. Study MERGE_SORT_GUIDE.md (how one algorithm is implemented)
3. Follow same patterns for new algorithms
4. Update CodeVisualizer.jsx with new algorithm code

---

## 🎨 Implemented Algorithms

### Sorting Algorithms
- **Bubble Sort** - O(n²) simple comparison sort
- **Merge Sort** - O(n log n) divide-and-conquer ⭐ NEW!

### Searching Algorithms
- **Linear Search** - O(n) simple iteration
- **Binary Search** - O(log n) requires sorted array

---

## 📁 Project Structure

```
visualizer/
├── DETAILED_README.md          ← Comprehensive guide
├── MERGE_SORT_GUIDE.md         ← Merge Sort details
├── MERGE_SORT_SUMMARY.md       ← Quick summary
├── README.md                    ← Quick start
├── package.json
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
└── src/
    ├── App.js                   ← Main orchestrator
    ├── App.css                  ← Global styles
    ├── index.js                 ← Entry point
    ├── components/
    │   ├── CodeVisualizer.jsx  ← Code highlighting
    │   └── CodeVisualizer.css
    ├── section/
    │   ├── Header.jsx           ← Controls & selection
    │   ├── Header.css
    │   ├── AlgorithmCanvas.jsx ← Canvas visualization
    │   └── AlgorithmCanvas.css
    ├── algorithms/
    │   ├── sorting/
    │   │   ├── BubbleSort.js
    │   │   └── MergeSort.js     ← NEW!
    │   └── searching/
    │       ├── LinearSearch.js
    │       └── BinarySearch.js
    └── utils/
        └── soundGenerator.js    ← Web Audio API
```

---

## 🚀 Quick Start

### Installation
```bash
cd visualizer
npm install
npm start
```

### Running
1. Open http://localhost:3000
2. Select algorithm (Sorting or Searching)
3. Choose specific algorithm (Bubble Sort or Merge Sort)
4. Adjust speed (0.5x to 4x)
5. Click "Run Algorithm"
6. Watch bars animate with code highlighting

### Features
- ✅ Real-time bar visualization (Canvas)
- ✅ Code highlighting synchronized with execution
- ✅ Sound effects (comparisons, swaps)
- ✅ Live statistics (comparisons count, swaps count)
- ✅ Confetti celebration on completion
- ✅ Speed control for learning
- ✅ Search input for Linear/Binary Search

---

## 🎨 Visual States

Each bar shows algorithm state through colors:

| Color | State | Audio |
|-------|-------|-------|
| Blue | Unsorted / Not visited | Silent |
| Orange | Being compared | "Ping" sound |
| Red | Being swapped/merged | "Swap" sound |
| Green | Sorted / Found | Silent (then confetti!) |

---

## 📊 Technology Stack

- **React 18** - UI framework with hooks
- **Canvas API** - High-performance visualization
- **Web Audio API** - Sound generation
- **canvas-confetti** - Celebration animations
- **CSS3** - Styling with gradients & animations

---

## 🔑 Key Concepts Used

### React
- Hooks: useState, useRef, useEffect
- Functional components
- Props and callbacks
- Conditional rendering
- Component composition

### JavaScript
- Async/await
- Promises
- Closures
- Destructuring
- Spread operator
- Array methods

### Web APIs
- Canvas 2D context
- requestAnimationFrame
- Web Audio API
- setTimeout/setInterval

### Algorithms
- Divide and conquer (Merge Sort)
- Comparison-based sorting
- Big O complexity analysis
- Time and space trade-offs

---

## 📈 Performance Notes

### For 10 Elements (Visualizer Default)

**Bubble Sort:**
- Comparisons: ~45
- Swaps: Up to 45
- Time: ~2-3 seconds

**Merge Sort:**
- Comparisons: ~24
- Swaps: ~24
- Time: ~1-2 seconds

Merge Sort is faster and more organized!

---

## 🛠️ Development Guide

### Adding a New Algorithm

1. **Create algorithm file** (`src/algorithms/sorting/QuickSort.js`)
   ```javascript
   export const quickSort = async (array, onStep, delay, onSwap, onTraverse, onLineChange) => {
       // Implementation with callbacks
   };
   ```

2. **Add to CodeVisualizer** (`src/components/CodeVisualizer.jsx`)
   ```javascript
   'QuickSort': [
       'function quickSort(arr, low, high) {',
       // ... code lines
   ],
   ```

3. **Update Header** (`src/section/Header.jsx`)
   ```javascript
   { code: 'Quick Sort', name: 'Quick Sort' }
   ```

4. **Update App.js** (`src/App.js`)
   ```javascript
   else if (selectedAlgorithm === 'Quick Sort') {
       sortedArray = await quickSort(...);
   }
   ```

5. **Update CodeVisualizer callbacks** in algorithm to highlight lines

---

## 🐛 Debugging

### Browser DevTools
1. **Elements Tab**: Inspect canvas and UI
2. **Console Tab**: Check for errors and logs
3. **Performance Tab**: Monitor 60 FPS for smooth animation
4. **Network Tab**: Verify assets loading

### Code Debugging
```javascript
// Add logging to App.js
console.log('Animation State:', animationState);
console.log('Current Line:', currentCodeLine);

// Add logging to algorithms
console.log('Comparing:', arr[i], 'vs', arr[j]);
console.log('Swaps:', swaps, 'Comparisons:', comparisons);
```

---

## 📞 Common Questions

**Q: Why does Merge Sort take less time than Bubble Sort?**
A: Merge Sort has O(n log n) complexity vs Bubble Sort's O(n²). For 10 items: 24 vs 45 operations!

**Q: Can I adjust array size?**
A: Current visualizer uses fixed 10 elements. Easy to modify in App.js generateNewDataSet()

**Q: Why Canvas instead of HTML elements?**
A: Canvas renders at 60 FPS. DOM elements would be too slow and jittery.

**Q: How does code highlighting work?**
A: Each algorithm calls onLineChange(lineNumber) at execution points, CodeVisualizer highlights that line.

**Q: Why Web Audio API fallback?**
A: Browser autoplay policies block audio.play(). Web Audio API works with oscillators.

---

## 🎓 Learning Resources

Inside DETAILED_README.md:
- React Hooks tutorial
- JavaScript patterns explained
- Canvas rendering techniques
- Algorithm complexity analysis
- Web Audio API guide

Inside MERGE_SORT_GUIDE.md:
- Step-by-step algorithm walkthrough
- Visualization mapping to code
- Common mistakes with solutions
- Real-world applications
- Performance comparisons

---

## ✅ Verification Checklist

After starting visualizer:
- [ ] Page loads without errors
- [ ] Algorithm dropdown works
- [ ] Speed slider responds
- [ ] "Run Algorithm" animates bars
- [ ] Code highlights in real-time
- [ ] Statistics update (comparisons, swaps)
- [ ] Sound plays (if enabled)
- [ ] Bars show correct colors
- [ ] Confetti celebrates on completion
- [ ] "Reset Array" clears state

---

## 📝 Version History

- **v1.0**: Bubble Sort + Linear Search
- **v1.1**: Added speed control & code visualizer
- **v1.2**: Added sound effects & confetti
- **v1.3**: Added Binary Search
- **v1.4**: **NEW!** Merge Sort with full visualization

---

## 🙏 Credits

- **Algorithm Visualizations**: Based on educational best practices
- **Canvas Rendering**: Canvas API 2D context
- **Sound Effects**: Web Audio API with oscillators
- **Confetti**: canvas-confetti library
- **UI Framework**: React 18 with hooks

---

## 📞 Support

For issues or improvements:
1. Check DETAILED_README.md troubleshooting section
2. Review MERGE_SORT_GUIDE.md common mistakes
3. Verify build: `npm run build`
4. Check browser console for errors

---

**Happy Learning! 🎉**

Start with DETAILED_README.md to understand the full implementation, then explore the visualizer!
