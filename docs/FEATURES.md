# Algorithm Visualizer

A professional, interactive web application for visualizing sorting and searching algorithms with real-time animation, speed control, and detailed statistics.

## Features

### Core Features
- **Real-time Animation**: Watch algorithms execute step-by-step with smooth visual transitions
- **Speed Control**: Adjust animation speed from Very Slow (4s) to Fast (0.5s)
- **Multiple Algorithms**: Currently supports:
  - **Sorting**: Bubble Sort
  - **Searching**: Linear Search
- **Color-coded Visualization**:
  - 🔵 Blue: Unsorted elements
  - 🟡 Orange: Elements being compared
  - 🔴 Red: Elements being swapped
  - 🟣 Purple: Elements being searched
  - 🟢 Green: Sorted/Found elements
- **Interactive Controls**: Run, Stop, and Reset buttons
- **Statistics Display**: Real-time comparison and swap counters
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Professional UI**: Modern gradient design with smooth animations

## Project Structure

```
src/
├── algorithms/
│   ├── sorting/
│   │   └── BubbleSort.js          # Bubble Sort implementation with animation
│   └── searching/
│       └── LinearSearch.js         # Linear Search implementation with animation
├── section/
│   ├── Header.jsx                 # Header with algorithm & speed controls
│   ├── Header.css                 # Header styling
│   ├── AlgorithmCanvas.jsx        # Canvas for visualization
│   └── AlgorithmCanvas.css        # Canvas styling
├── App.js                          # Main application component
├── App.css                         # Application styling
└── index.js                        # Application entry point
```

## Getting Started

### Prerequisites
- Node.js (v12 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository (or navigate to the project)
cd visualizer

# Install dependencies
npm install

# Start the development server
npm start
```

The application will open at `http://localhost:3000` (or the next available port).

## Usage

### Basic Workflow
1. **Select Algorithm Type**: Choose between "Sorting Algorithms" or "Searching Algorithms"
2. **Choose Algorithm**: Select the specific algorithm you want to visualize
3. **Adjust Speed**: Use the speed slider to set animation speed
4. **Run Algorithm**: Click "Run Algorithm" to start the visualization
5. **View Results**: Watch the bars animate as the algorithm executes
6. **Reset**: Click "Reset Array" to generate a new random dataset

### Speed Settings
- **Very Slow (4s)**: Each step takes 4 seconds
- **Slow (2s)**: Each step takes 2 seconds
- **Normal (1s)**: Each step takes 1 second
- **Fast (0.5s)**: Each step takes 0.5 seconds

### Controls During Animation
- **Run Button**: Disabled during execution; initiates algorithm
- **Reset Button**: Disabled during execution; generates new random data
- **Stop Button**: Enabled during execution; halts the animation

## Algorithm Details

### Bubble Sort
- **Time Complexity**: O(n²)
- **Space Complexity**: O(1)
- **Description**: Compares adjacent elements and swaps them if they're in the wrong order, "bubbling" larger values to the end
- **Best for**: Educational purposes, demonstrating comparison-based sorting

### Linear Search
- **Time Complexity**: O(n)
- **Space Complexity**: O(1)
- **Description**: Sequentially searches through an array to find a target value
- **Best for**: Understanding sequential search patterns and comparison operations

## Customization

### Adding New Algorithms

1. **Create Algorithm File**:
```javascript
// src/algorithms/sorting/YourAlgorithm.js
export const yourAlgorithm = async (array, onStep, delay) => {
  const arr = [...array];
  // Your algorithm implementation
  
  // Call onStep to update visualization
  await onStep({
    array: [...arr],
    comparing: [index1, index2],  // optional
    swapping: [index1, index2],   // optional
    sorted: [sortedIndices],      // optional
  });
  
  // Wait for delay
  await new Promise(resolve => setTimeout(resolve, delay));
  
  return arr;
};
```

2. **Update Header.jsx**:
   - Add algorithm to the `algorithms` object

3. **Update App.js**:
   - Import the new algorithm
   - Add case in `handleRunAlgorithm` function

### Adjusting Visualization Parameters
- **Canvas Size**: Modify canvas width/height in `AlgorithmCanvas.jsx`
- **Data Set Size**: Change the array length in `App.js` `generateNewDataSet` function
- **Colors**: Update color values in `AlgorithmCanvas.jsx` useEffect hook
- **Max Value Range**: Adjust the random number generation range in `generateNewDataSet`

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Considerations

- **Array Size**: Currently optimized for 50 elements. Larger arrays may impact performance
- **Animation Speed**: Slower speeds provide smoother visualization but take longer
- **Browser**: Modern browsers (with WebGL support) provide optimal performance

## Technologies Used

- **React 18**: UI framework
- **Canvas API**: Visualization rendering
- **CSS3**: Styling and animations
- **JavaScript ES6+**: Algorithm implementations

## Production Deployment

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deployment Options
- **Vercel**: Push to GitHub and deploy automatically
- **Netlify**: Connect GitHub repository for CI/CD
- **Traditional Hosting**: Upload `build/` folder to web server

## Known Limitations

- Current version supports basic algorithms
- Linear Search selects a random target value
- Animations are not interrupted gracefully if speed is changed during execution
- Maximum recommended array size: 500 elements

## Future Enhancements

- [ ] Add more sorting algorithms (Quick Sort, Merge Sort, Heap Sort, etc.)
- [ ] Add more searching algorithms (Binary Search, Jump Search, etc.)
- [ ] Graph-based algorithm visualization
- [ ] Pathfinding visualization (A*, Dijkstra)
- [ ] Data structure visualization (Trees, Graphs, Heaps)
- [ ] Sound effects for comparisons and swaps
- [ ] Statistics export (CSV/JSON)
- [ ] Algorithm comparison mode
- [ ] Dark mode theme
- [ ] Tutorial and educational tooltips

## Troubleshooting

### Application won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Animations not smooth
- Reduce array size in `generateNewDataSet()`
- Increase animation speed
- Close other applications to free up system resources

### Canvas not rendering
- Clear browser cache (Ctrl+Shift+Delete)
- Try a different browser
- Check browser console for errors (F12)

## Performance Tips

1. Use "Fast" speed for large arrays
2. Generate new dataset before running algorithms
3. Close unnecessary browser tabs
4. Use modern browsers (Chrome, Firefox, Safari)

## Contributing

To contribute improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue or contact the development team.

---

**Made with ❤️ for algorithm visualization and learning**
