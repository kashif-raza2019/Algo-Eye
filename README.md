# Kashif Raza - Portfolio & Algorithm Visualizer

A professional portfolio website featuring an interactive algorithm visualizer micro-frontend application showcasing sorting and searching algorithms with real-time visualization and performance analysis.

## 📋 Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Deployment](#deployment)
- [Architecture](#architecture)

## ✨ Features

### Portfolio
- **Professional Landing Page** - Showcase of skills, projects, and contact information
- **Responsive Design** - Mobile-friendly layout
- **Project Showcase** - Link to interactive projects

### Algorithm Visualizer (Micro-frontend)
- **Sorting Algorithms**: Bubble Sort, Merge Sort, Insertion Sort, Selection Sort, Quick Sort, Heap Sort, Shell Sort, Counting Sort, Tim Sort
- **Searching Algorithms**: Linear Search, Binary Search
- **Real-time Visualization** - Step-by-step algorithm execution
- **Performance Metrics** - Comparison and statistics
- **Audio Feedback** - Sound effects for algorithm steps
- **Speed Control** - Adjustable execution speed
- **Algorithm Comparison** - Side-by-side algorithm analysis

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── sounds/
│       ├── ping.mp3
│       └── swap.mp3
├── src/
│   ├── pages/
│   │   ├── PortfolioPage.jsx          # Main portfolio page
│   │   └── ComparisonPage.jsx         # Algorithm comparison
│   ├── algorithms/
│   │   ├── sorting/
│   │   └── searching/
│   ├── components/
│   │   ├── AlgorithmDescription.jsx
│   │   ├── Bars.jsx
│   │   ├── CodeVisualizer.jsx
│   │   └── ComparisonStats.jsx
│   ├── section/
│   │   ├── AlgorithmCanvas.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── utils/
│   │   └── soundGenerator.js
│   ├── styles/
│   ├── App.js
│   ├── App.css
│   └── index.js
├── .env.example
├── package.json
└── README.md
```

## 🛠 Tech Stack

- **Frontend Framework**: React 19.2.3
- **Routing**: React Router 7.12.0
- **Build Tool**: Create React App
- **Code Quality**: ESLint, Prettier
- **Testing**: Jest, React Testing Library
- **Styling**: CSS3 with Flexbox/Grid

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository:
```bash
git clone https://github.com/kashifraza/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## 📜 Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run test:coverage` - Generate coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Environment Variables

Create `.env.production.local` for production settings:

```
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

### Deploy to Production

The application can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Docker containers

## 🏗 Architecture

### Micro-frontend Design

The Algorithm Visualizer is designed as a **micro-frontend** application:

1. **Isolated Functionality** - Self-contained module within the main app
2. **Modular Algorithms** - Each algorithm is independent
3. **Reusable Components** - Visualization components can be reused
4. **Separate Route** - Accessible at `/projects/algorithm-visualizer`
5. **Independent State** - Manages its own state and lifecycle

### Component Hierarchy

```
PortfolioPage
├── Header
├── About Section
├── Skills Section
├── Projects Section (links to micro-frontend)
└── Footer

Algorithm Visualizer (Micro-frontend)
├── Header (with back navigation)
├── AlgorithmCanvas
├── CodeVisualizer
├── AlgorithmDescription
└── Footer
```

## 📝 License

This project is licensed under the MIT License - see LICENSE file for details.

## 👨‍💻 Author

**Kashif Raza**
- Senior Software Engineer
- [GitHub](https://github.com/kashifraza)
- [LinkedIn](https://linkedin.com/in/kashif-raza)
- Email: kashif.raza@example.com

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
