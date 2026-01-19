# Quick Reference & Cheat Sheet

## Project Structure at a Glance

```
portfolio/                      # Root project directory
├── public/                      # Static files
├── src/                         # Source code
│   ├── pages/                   # Page components
│   ├── algorithms/              # Algorithm implementations
│   ├── components/              # Reusable components
│   ├── section/                 # Layout sections
│   ├── utils/                   # Helper functions
│   ├── styles/                  # CSS files
│   ├── App.js                   # Main visualizer app
│   └── index.js                 # Entry point
├── .env.example                 # Environment template
├── .eslintrc.json              # Linter config
├── .prettierrc                  # Formatter config
├── Dockerfile                   # Docker config
├── docker-compose.yml          # Docker compose config
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## Essential Commands

### Setup & Install
```bash
npm install           # Install all dependencies
npm ci               # Install exact versions (CI/CD)
npm update           # Update dependencies
```

### Development
```bash
npm start            # Start dev server (http://localhost:3000)
npm test             # Run tests in watch mode
npm run lint         # Check code quality
npm run format       # Format code
```

### Production
```bash
npm run build        # Build for production
npm run test:coverage # Generate coverage report
```

### Quality Checks
```bash
npm run lint         # Show linting issues
npm run lint:fix     # Fix linting issues
npm run format       # Format with Prettier
npm audit            # Check dependencies
```

## Routing Map

```
/                                  → PortfolioPage (Home)
/projects/algorithm-visualizer     → Algorithm Visualizer App
```

## File Navigation

### Creating a New Component
```
1. Create file in src/components/
2. Add corresponding CSS file
3. Export component
4. Import in parent component
```

### Adding an Algorithm
```
1. Create file in src/algorithms/[sorting|searching]/
2. Export algorithm function
3. Import in src/App.js
4. Add to header options
5. Handle in App.js logic
```

## Git Workflow

```bash
# Check status
git status

# Create feature branch
git checkout -b feature/your-feature

# Stage changes
git add .

# Commit with message
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature

# Create PR on GitHub
```

## Testing

### Run Tests
```bash
npm test                    # Interactive mode
npm test -- --coverage     # With coverage
npm test -- --watchAll=false # Single run
```

### Test Patterns
```bash
npm test -- Bars            # Run specific test
npm test -- --testNamePattern="algorithm"  # Pattern match
```

## Debugging

### Browser DevTools
```
F12 or Cmd+Opt+I    # Open DevTools
Cmd+Shift+P         # Command palette
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `npm start -- --port 3001` |
| Module not found | `rm -rf node_modules && npm install` |
| Build fails | Check browser target in package.json |
| Tests fail | Clear cache: `npm test -- --clearCache` |

## Environment Variables

```env
# Development (.env.development)
REACT_APP_ENV=development
REACT_APP_DEBUG=true

# Production (.env.production)
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

Access in code:
```javascript
const env = process.env.REACT_APP_ENV;
```

## Performance Tips

### Check Performance
```bash
npm run build           # See bundle size
npm install -g serve   # Serve production build
serve -s build         # Run locally
```

### Optimize Images
```bash
# Use modern formats (WebP)
# Compress before upload
# Use responsive images
```

## Deployment Checklist

- [ ] Run `npm run lint`
- [ ] Run `npm test`
- [ ] Build: `npm run build`
- [ ] Test build locally
- [ ] Check .env variables
- [ ] Update version in package.json
- [ ] Push to main branch
- [ ] Monitor build in CI/CD

## Docker Commands

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 3000:3000 portfolio

# Using docker-compose
docker-compose up    # Start
docker-compose down  # Stop
```

## Common npm Commands

```bash
npm install package-name        # Add dependency
npm uninstall package-name      # Remove dependency
npm update                       # Update all
npm outdated                     # Check updates
npm list                         # Show tree
npm run [script-name]           # Run custom script
```

## React Patterns

### Component Template
```jsx
import React from 'react';
import './Component.css';

const Component = ({ prop1, prop2 }) => {
  const [state, setState] = React.useState(null);

  React.useEffect(() => {
    // Initialization
  }, []);

  return (
    <div className="component">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### Using Router
```jsx
import { Link, useNavigate } from 'react-router';

// Link navigation
<Link to="/path">Go</Link>

// Programmatic navigation
const navigate = useNavigate();
navigate('/path');
```

## CSS Classes & Selectors

```css
/* By class */
.component { }

/* By ID */
#unique { }

/* By attribute */
[type="button"] { }

/* Pseudo-classes */
.button:hover { }
.button:active { }

/* Pseudo-elements */
.element::before { }
.element::after { }
```

## Useful Links

- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com)
- [MDN Web Docs](https://developer.mozilla.org)
- [Can I Use](https://caniuse.com)
- [CSS Tricks](https://css-tricks.com)

## Keyboard Shortcuts

### VS Code
| Shortcut | Action |
|----------|--------|
| Cmd+P | File finder |
| Cmd+Shift+P | Command palette |
| Cmd+/ | Toggle comment |
| Cmd+D | Select word |
| Cmd+Shift+L | Select all occurrences |
| F2 | Rename symbol |

### Browser DevTools
| Shortcut | Action |
|----------|--------|
| Cmd+I | Toggle inspector |
| Cmd+J | Toggle console |
| Cmd+Shift+J | Toggle drawer |

## Numbers to Remember

- Node.js: >= 18.0.0
- npm: >= 9.0.0
- Default port: 3000
- Build folder: `build/`

## Contacts & Support

- **GitHub**: [kashifraza](https://github.com/kashifraza)
- **Email**: kashif.raza@example.com
- **LinkedIn**: [kashif-raza](https://linkedin.com/in/kashif-raza)
