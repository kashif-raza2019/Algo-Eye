# Deployment Guide

This guide covers how to deploy the Kashif Raza Portfolio application to various platforms.

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git
- GitHub account (for most deployment options)

## Build for Production

```bash
# Install dependencies
npm install

# Run linting and tests
npm run lint
npm test

# Build the application
npm run build
```

This creates an optimized production build in the `build/` directory.

## Deployment Platforms

### 1. Vercel (Recommended)

Vercel is the easiest platform for React apps.

#### Prerequisites
- Vercel account (free)
- GitHub repository

#### Steps

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select your repository
5. Configure environment variables if needed
6. Click "Deploy"

Vercel automatically deploys on every push to main branch.

### 2. Netlify

#### Steps

1. Go to [netlify.com](https://netlify.com)
2. Sign in with GitHub
3. Click "New site from Git"
4. Select your repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Click "Deploy"

### 3. GitHub Pages

For static hosting on GitHub Pages:

#### Steps

1. Update `homepage` in package.json:
```json
"homepage": "https://yourusername.github.io/portfolio"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Add deploy scripts to package.json:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

4. Deploy:
```bash
npm run deploy
```

### 4. AWS S3 + CloudFront

#### Steps

1. Build the application:
```bash
npm run build
```

2. Create S3 bucket and upload build files

3. Create CloudFront distribution pointing to S3

4. Configure domain DNS

See AWS documentation for detailed steps.

### 5. Docker Deployment

Create a Dockerfile:

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/build ./build
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]
```

Build and run:
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## Environment Configuration

### Development
```bash
REACT_APP_ENV=development
REACT_APP_DEBUG=true
```

### Production
```bash
REACT_APP_ENV=production
REACT_APP_DEBUG=false
```

## Pre-deployment Checklist

- [ ] Run `npm run lint` - No errors
- [ ] Run `npm test` - All tests pass
- [ ] Build locally: `npm run build`
- [ ] Test build locally: `npm install -g serve && serve -s build`
- [ ] Update .env for production
- [ ] Review package.json version
- [ ] Check all links and resources
- [ ] Verify responsive design
- [ ] Test on multiple browsers
- [ ] Update README if needed

## Performance Optimization

1. **Enable Gzip Compression** - Most platforms do this by default
2. **Enable CDN** - Vercel, Netlify, and AWS provide CDN
3. **Set cache headers** - Configure based on platform
4. **Optimize images** - Use modern formats (WebP)
5. **Code splitting** - Create React App handles this

## Monitoring & Logs

### Vercel
- Deployment logs in Vercel dashboard
- Real-time logs available

### Netlify
- Build logs in Netlify dashboard
- Function logs for serverless features

### Custom Server
- Configure application logging
- Use third-party services (e.g., Sentry)

## Troubleshooting

### Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node version: `node --version`
- Review error logs

### Application doesn't work
- Check browser console for errors
- Verify environment variables
- Test on different browsers

### Slow performance
- Check bundle size: `npm run build`
- Analyze with Lighthouse
- Enable caching

## Rollback Procedure

- **Vercel**: Click "Rollback" in deployment history
- **Netlify**: Select previous deployment and redeploy
- **GitHub Pages**: Re-run deployment script

## Support

For deployment issues, check:
- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Create React App Docs](https://create-react-app.dev)
