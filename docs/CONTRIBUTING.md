# Contributing Guidelines

Thank you for your interest in contributing to the Kashif Raza Portfolio project! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Avoid offensive language
- Focus on constructive feedback
- Help others learn and grow

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported
2. Provide a clear title and description
3. Include reproduction steps
4. Add screenshots or error logs if applicable
5. Specify your environment (OS, browser, Node version)

### Suggesting Enhancements

1. Check if the suggestion already exists
2. Provide a clear use case
3. Explain the expected behavior
4. Describe the current behavior

### Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/portfolio.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start development: `npm start`

### Code Style

- Run `npm run lint` before submitting
- Use `npm run format` to format code
- Follow the existing code structure
- Write meaningful commit messages
- Keep components focused and reusable

### Pull Request Process

1. Ensure your code passes linting: `npm run lint`
2. Run tests: `npm test`
3. Update README if needed
4. Provide a clear description of changes
5. Reference related issues

## Development Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to your fork
git push origin feature/new-feature

# Create Pull Request on GitHub
```

## Commit Message Format

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for code style changes
- `refactor:` for code refactoring
- `test:` for test additions
- `chore:` for dependency updates

Example: `feat: add algorithm comparison feature`

## Testing

- Write tests for new features
- Run `npm test` before submitting
- Aim for good test coverage

## Questions?

Feel free to open an issue or contact the maintainer.
