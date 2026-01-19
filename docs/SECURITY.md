# Security & Setup Guide

## Security Best Practices

### 1. Dependencies Management

Keep dependencies up to date:
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Update packages
npm update

# Check outdated packages
npm outdated
```

### 2. Environment Variables

**Never commit secrets!**

Sensitive values go in `.env.local`:
```env
# .env.local (add to .gitignore)
REACT_APP_API_KEY=your_secret_here
REACT_APP_DB_URL=database_url
```

Use `.env.example` for public variables:
```env
# .env.example (committed to repo)
REACT_APP_TITLE=Kashif Raza Portfolio
REACT_APP_DESCRIPTION=Senior Software Engineer
```

### 3. Secure Headers

When deploying, configure these headers:

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self'
Referrer-Policy: strict-origin-when-cross-origin
```

### 4. CORS Configuration

If using APIs:
```javascript
// Backend CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
```

### 5. Content Security Policy

Add to HTML head:
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

Or better, via HTTP headers in your server/deployment platform.

## Development Setup

### Initial Setup

```bash
# Clone repository
git clone https://github.com/kashifraza/portfolio.git
cd portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Start development
npm start
```

### IDE Configuration

#### VS Code

Create `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "javascript.preferences.quotePreference": "single",
  "eslint.autoFixOnSave": false,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsx]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

Recommended extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- Thunder Client (API testing)

### Pre-commit Hooks

Using husky + lint-staged:

```bash
# Install
npm install --save-dev husky lint-staged

# Initialize husky
npx husky install

# Create pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

Add to `package.json`:
```json
{
  "lint-staged": {
    "src/**/*.{js,jsx}": "eslint --fix",
    "src/**/*.{js,jsx,css}": "prettier --write"
  }
}
```

## Authentication (If Needed)

### JWT Implementation

```javascript
// utils/auth.js
export const storeToken = (token) => {
  localStorage.setItem('authToken', token);
};

export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const removeToken = () => {
  localStorage.removeItem('authToken');
};

export const isAuthenticated = () => {
  return !!getToken();
};
```

### Protected Routes

```javascript
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

// Usage in routing
<Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
```

## API Integration

### Fetch Wrapper

```javascript
// utils/api.js
export const apiCall = async (url, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
};

// Usage
const data = await apiCall('/api/portfolio');
```

## Performance Monitoring

### Lighthouse CI

```bash
npm install --save-dev @lhci/cli@latest @lhci/server@latest
```

Config: `lighthouserc.json`
```json
{
  "ci": {
    "collect": {
      "url": ["http://localhost:3000"],
      "uploadArtifacts": true
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

### Web Vitals

Already configured in `src/reportWebVitals.js`:
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Error Tracking (Optional)

### Sentry Integration

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/index.js
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.REACT_APP_ENV,
  tracesSampleRate: 1.0,
});

const root = Sentry.withProfiler(App);
```

## Data Protection

### GDPR Compliance

- Clear privacy policy
- Cookie consent banner
- Data retention policies
- Right to deletion implementation

### CCPA Compliance (California)

- Disclose data collection
- Provide opt-out mechanism
- Honor "do not sell" requests

## Backup & Recovery

### Regular Backups

- GitHub provides version control
- Database backups (if applicable)
- Environment configuration backups

### Disaster Recovery

1. Keep backups in multiple locations
2. Test recovery procedures regularly
3. Document recovery process
4. Maintain communication plan

## Compliance Checklist

- [ ] Privacy Policy updated
- [ ] Terms of Service current
- [ ] GDPR compliance
- [ ] CCPA compliance
- [ ] Accessibility (WCAG 2.1 AA)
- [ ] Security headers configured
- [ ] Dependencies audited
- [ ] SSL/TLS enabled
- [ ] Rate limiting configured
- [ ] Logging enabled

## Incident Response

### If Compromised

1. Immediately rotate secrets
2. Review access logs
3. Communicate with users
4. Deploy patches
5. Document incident

### Communication Plan

- Identify who to notify
- Prepare notification templates
- Have escalation procedures

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://snyk.io/blog/10-react-security-best-practices/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
