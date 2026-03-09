# Contributing to T-Shirt Customizer

First off, thank you for considering contributing to the T-Shirt Customizer project! It's people like you that make the open-source community such a great place.

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find that the problem has already been reported.

When creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you expected**
- **Describe the actual behavior**
- **Include screenshots if applicable**
- **Mention your operating system and browser/Node.js version**

### Suggesting Enhancements

Enhancement suggestions are welcome! Please provide:

- A clear and concise description of the enhancement
- Explain why this enhancement would be useful
- Provide examples of how the enhancement would be used

### Pull Requests

1. **Fork the repository**
2. **Create a new branch** (`git checkout -b feature/amazing-feature` or `git checkout -b fix/fixing-bug`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Code Style

- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Write clean, readable code
- Ensure your code passes linting: `npm run lint`

### Development Setup

1. Fork and clone the repository
2. Install dependencies:
   ```bash
   npm run install:all
   ```
3. Start development servers:
   ```bash
   npm run dev
   ```
4. Make your changes
5. Test thoroughly
6. Submit a pull request

## Coding Guidelines

### Frontend (React/Three.js)
- Use functional components with hooks
- Use Valtio for state management
- Follow existing patterns for 3D components
- Ensure responsive design with Tailwind CSS

### Backend (Node/Express)
- Use async/await for asynchronous operations
- Handle errors gracefully
- Use environment variables for configuration
- Follow RESTful API conventions

### Commit Messages

Use clear and meaningful commit messages:
```
feat: add new feature
fix: resolve specific issue
docs: update documentation
style: format code
refactor: restructure code
test: add tests
chore: maintenance tasks
```

## Questions?

Feel free to open an issue for any questions about contributing!

---

**Happy Coding!** 🚀
