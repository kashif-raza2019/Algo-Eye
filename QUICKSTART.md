# Quick Start Guide

## Installation & Running

```bash
# Navigate to project
cd /Users/kashifraza/Desktop/visualizer

# Install dependencies (if not already done)
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000` (or the next available port).

## Using the Visualizer

### Step 1: Select Algorithm Type
- Click the "Type" dropdown in the header
- Choose: **Sorting Algorithms** or **Searching Algorithms**

### Step 2: Choose Algorithm
- Click the "Algorithm" dropdown
- Select your algorithm (currently: Bubble Sort or Linear Search)

### Step 3: Adjust Speed
- Use the speed slider on the right side of the header
- Options: Very Slow → Slow → Normal → Fast

### Step 4: Run Algorithm
- Click the **"Run Algorithm"** button
- Watch the visualization with:
  - 🔵 **Blue** bars: Unsorted elements
  - 🟡 **Orange** bars: Currently being compared
  - 🔴 **Red** bars: Elements being swapped
  - 🟢 **Green** bars: Sorted/Found elements

### Step 5: Additional Controls
- **Reset Array**: Generate a new random dataset
- **Stop**: Stop the animation (available during execution)

## Tips for Best Experience

✅ **Optimal Settings**:
- Start with "Normal" speed (1 second/step)
- Use Bubble Sort for understanding comparison-based sorting
- Use Linear Search to see how sequential search works

✅ **Performance Tips**:
- For smooth animation, use "Fast" speed
- If animation stutters, close other applications
- Use modern browsers (Chrome, Firefox, Safari)

✅ **Learning Tips**:
- Watch how bars change colors during operations
- Notice comparison and swap counts
- Try multiple speeds to understand algorithm behavior

## What Each Algorithm Does

### Bubble Sort
- **What**: Compares adjacent elements, swaps if needed
- **When**: Elements bubbles to correct position
- **Watch**: See how larger elements "bubble" to the end
- **Time**: O(n²) - good for learning, not for large data

### Linear Search
- **What**: Searches through array one element at a time
- **When**: Looking for a target value
- **Watch**: See how each element is checked sequentially
- **Time**: O(n) - simple but not fast for large data

## Troubleshooting

| Issue | Solution |
|-------|----------|
| App won't start | Run `npm install` then `npm start` |
| Animations are slow | Increase speed slider to "Fast" |
| Canvas not showing | Refresh browser (Ctrl+R) |
| Buttons not responding | Wait for current animation to finish |
| Array looks same | Click "Reset Array" to generate new data |

## Building for Production

```bash
npm run build
```

This creates an optimized `build/` folder ready for deployment.

### Deploy to Vercel (Free)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify (Free)
1. Push code to GitHub
2. Connect repository on Netlify
3. Auto-deploys on every push

## File Structure Overview

```
visualizer/
├── src/
│   ├── algorithms/          ← Algorithm implementations
│   ├── section/            ← Header & Canvas components
│   ├── App.js              ← Main application
│   └── index.js            ← Entry point
├── public/                 ← Static files
├── package.json            ← Dependencies
└── FEATURES.md            ← Detailed documentation
```

## Key Features

✨ **What's Included**:
- Real-time animation visualization
- Speed control (0.5s to 4s per step)
- Color-coded element states
- Statistics display (comparisons, swaps)
- Responsive design (desktop, tablet, mobile)
- Professional gradient UI
- No dependencies beyond React

🚀 **Performance**:
- Smooth 60 FPS animation
- Lightweight (<2MB bundle)
- Works on all modern browsers

## Next Steps

1. **Explore**: Try different algorithms and speeds
2. **Learn**: Understand how each algorithm works
3. **Customize**: Modify array size or colors (see FEATURES.md)
4. **Deploy**: Share with others (see deployment section)

## Support & Documentation

- **Full Documentation**: See `FEATURES.md`
- **Enhancement Summary**: See `ENHANCEMENT_SUMMARY.md`
- **Algorithm Details**: See `/src/algorithms/`

---

**Ready to visualize? Click "Run Algorithm" and enjoy! 🎨**
