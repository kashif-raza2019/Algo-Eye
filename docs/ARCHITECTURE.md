# Project Architecture & Development Guide

## Overview

This project is organized with a **portfolio-first** architecture where the main application is a portfolio showcase, and the **Algorithm Visualizer** functions as an integrated micro-frontend.

## Directory Structure

```
src/
├── pages/                          # Page components
│   ├── PortfolioPage.jsx          # Main portfolio landing page
│   └── ComparisonPage.jsx         # Algorithm comparison view
│
├── algorithms/                     # Core algorithm implementations
│   ├── sorting/
│   │   ├── BubbleSort.js
│   │   ├── MergeSort.js
│   │   ├── QuickSort.js
│   │   ├── HeapSort.js
│   │   ├── InsertionSort.js
│   │   ├── SelectionSort.js
│   │   ├── ShellSort.js
│   │   ├── CountingSort.js
│   │   └── TimSort.js
│   └── searching/
│       ├── LinearSearch.js
│       └── BinarySearch.js
│
├── components/                     # Reusable UI components
│   ├── AlgorithmDescription.jsx    # Algorithm info display
│   ├── Bars.jsx                    # Visualization bars
│   ├── CodeVisualizer.jsx          # Code line highlighting
│   ├── ComparisonStats.jsx         # Performance metrics
│   └── *.css                       # Component styles
│
├── section/                        # Layout sections
│   ├── Header.jsx                  # Navigation header
│   ├── AlgorithmCanvas.jsx         # Main visualization canvas
│   ├── Footer.jsx                  # Footer component
│   └── *.css                       # Section styles
│
├── utils/                          # Utility functions
│   └── soundGenerator.js           # Audio generation
│
├── styles/                         # Global/page styles
│   └── ComparisonPage.css
│   └── PortfolioPage.css
│
├── App.js                          # Main application component
├── App.css                         # Main app styles
├── index.js                        # React entry point
└── index.css                       # Global styles
```

## Architecture Patterns

### 1. Micro-frontend Structure

The Algorithm Visualizer is designed as a contained micro-frontend:

```
Portfolio (Main Shell)
    └── Routes
        ├── / (PortfolioPage)
        └── /projects/algorithm-visualizer (Visualizer App)
```

### 2. Component Hierarchy

```
App (Router)
├── Route: /
│   └── PortfolioPage
│       ├── Header (Portfolio)
│       ├── About Section
│       ├── Skills Section
│       ├── Projects Section
│       └── Footer
│
└── Route: /projects/algorithm-visualizer
    └── App (Visualizer Container)
        ├── Header (Visualizer with back button)
        ├── AlgorithmCanvas
        ├── CodeVisualizer
        ├── AlgorithmDescription
        └── Footer
```

### 3. State Management

**Portfolio Page**: Simple, component-level state
- Skills array
- Projects array

**Algorithm Visualizer**:
- Current algorithm
- Data set
- Animation state
- Execution speed
- Sound settings
- Current code line

## Key Design Decisions

### 1. Routing Strategy

- Main app uses React Router v7
- PortfolioPage is the landing page (/)
- Visualizer is accessible at /projects/algorithm-visualizer
- Navigation uses Link components for seamless routing

### 2. Algorithm Structure

Each algorithm module exports:
- Algorithm function (async)
- Accepts: dataSet, setState callback, delay, sound callbacks, lineTracker
- Returns: sorted/found array or index

Example:
```javascript
export const bubbleSort = async (
  data,
  setAnimationState,
  delay,
  playSwapSound,
  playPingSound,
  setCurrentCodeLine
) => {
  // Implementation
};
```

### 3. Visualization Approach

- Real-time array state updates
- Bar components re-render on state change
- CSS transitions for smooth animations
- Audio feedback for user engagement

### 4. Performance Considerations

- Abort controller for stopping execution
- Minimal DOM updates through React optimization
- Lazy sound loading
- Optimized render cycles

## Development Workflow

### Adding a New Algorithm

1. **Create algorithm file** in appropriate folder:
   ```javascript
   // src/algorithms/sorting/NewSort.js
   export const newSort = async (data, setAnimationState, delay, playSwapSound, playPingSound, setCurrentCodeLine) => {
     // Implementation
   };
   ```

2. **Import in App.js**:
   ```javascript
   import { newSort } from './algorithms/sorting/NewSort';
   ```

3. **Add to algorithm options** in Header.js

4. **Handle in App.js** handleRunAlgorithm method

### Adding a New Component

1. **Create component file** in `components/` or `section/`
2. **Add styles** in corresponding .css file
3. **Export from component file**
4. **Import where needed**

### Styling Guidelines

- Use CSS modules or component-scoped CSS
- Mobile-first responsive design
- Use CSS Grid/Flexbox for layouts
- Maintain consistent color scheme
- Ensure accessibility (WCAG 2.1 AA)

## Performance Optimization Tips

### 1. Code Splitting (Already configured)
```javascript
const ComparisonPage = React.lazy(() => import('./pages/ComparisonPage'));
```

### 2. Memoization for Components
```javascript
const Bars = React.memo(({ bars, sorted }) => {
  // Component renders only when props change
});
```

### 3. Animation Optimization
- Use CSS transforms (GPU accelerated)
- Avoid expensive layout changes
- Use requestAnimationFrame for smooth animations

### 4. Bundle Size
```bash
npm run build
# Analyze with tools like:
# - source-map-explorer
# - webpack-bundle-analyzer
```

## Testing Strategy

### Unit Tests
- Algorithm correctness
- Edge cases (empty arrays, single element, etc.)
- Component rendering

### Integration Tests
- Algorithm flow
- UI interaction
- Navigation

### E2E Tests
- Full user workflows
- Cross-browser testing

## Build & Deployment

### Development
```bash
npm start
```

### Production Build
```bash
npm run build
```

### Pre-commit Checks
```bash
npm run lint
npm run format
npm test
```

## Security Considerations

1. **Input Validation**: Sanitize user inputs
2. **XSS Prevention**: React auto-escapes content
3. **CSRF**: Use secure cookies for API calls
4. **Dependencies**: Regular security audits

```bash
npm audit
npm audit fix
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

Tested versions specified in package.json browserslist.

## Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast (WCAG AA)
- Focus management

## Code Quality

### Linting
```bash
npm run lint
npm run lint:fix
```

### Code Formatting
```bash
npm run format
npm run format:check
```

### Pre-commit Hooks (Optional)
Use husky + lint-staged for automatic checks:
```bash
npm install --save-dev husky lint-staged
npx husky install
```

## Troubleshooting

### Module not found
- Clear node_modules: `rm -rf node_modules && npm install`
- Check import paths

### Algorithm not running
- Check browser console for errors
- Verify algorithm export/import
- Check abort controller logic

### Styling issues
- Check CSS file imports
- Verify class names
- Test in different browsers

## Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

## Future Enhancements

- [ ] TypeScript migration
- [ ] State management (Redux/Zustand)
- [ ] Advanced algorithm comparisons
- [ ] Custom dataset input
- [ ] Algorithm step-through debugger
- [ ] Dark mode support
- [ ] Multi-language support
- [ ] Blockchain/NFT showcase
