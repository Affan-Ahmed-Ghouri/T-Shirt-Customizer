# Changelog

All notable changes to T-Shirt Customizer project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added
- Comprehensive deployment configuration for multiple platforms
  - Vercel configuration (`vercel.json`)
  - Netlify configuration (`netlify.toml`)
  - GitHub Actions workflow for GitHub Pages
  - CI/CD pipeline with automated testing
- Environment variable templates and examples
- Setup scripts for quick project initialization
  - `setup.sh` for Linux/Mac
  - `setup.bat` for Windows
- Professional documentation
  - Enhanced README with detailed features and setup instructions
  - Deployment guide with platform-specific instructions
  - Deployment checklist for pre-production validation
  - Contributing guidelines
  - MIT License file
- GitHub repository templates
  - Bug report template
  - Feature request template
  - Pull request template
- Root `package.json` with monorepo scripts
- Improved Vite configuration with build optimization

### Fixed
- API endpoint configuration for production deployments
- Environment variable handling for different deployment platforms
- Port configuration to use `process.env.PORT` for cloud platforms
- Typo in Express JSON limit (`limig` → `limit`)
- Better error handling and user feedback

### Changed
- Project structure improved for easier deployment
- Enhanced error messages for better debugging
- Updated gitignore to exclude sensitive files and build artifacts
- Improved README with badges, installation, and deployment instructions

### Documentation
- Complete README overhaul with professional formatting
- Detailed deployment guide for Vercel, Netlify, and GitHub Pages
- Pre-deployment checklist with 15 categories
- Contributing guidelines with code style information
- Environment variable documentation
- Troubleshooting section for common issues

---

## [1.0.0] - Initial Release

### Features
- 3D T-shirt customization with Three.js and React Three Fiber
- AI-powered design generation using OpenAI's DALL-E API
- Custom image upload for logos and designs
- Real-time color picker
- Smooth animations with Framer Motion
- Glassmorphism UI design
- Responsive layout for mobile and desktop
- Download functionality for customized t-shirts
- Filter tabs for logo and full-shirt textures

### Tech Stack
- React 18
- Vite
- Three.js
- @react-three/fiber
- @react-three/drei
- Framer Motion
- Tailwind CSS
- valtio (state management)
- react-color
- Node.js + Express (backend)
- OpenAI API

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] vs [Released]

Changes marked as **[Unreleased]** have not been deployed yet.

## How to Update This Changelog

1. Add new entry under `[Unreleased]`
2. Categorize changes (Added, Fixed, Changed, Deprecated, Removed, Security)
3. When deploying, create new version section and move items
4. Link version number to release notes

---

**Want to contribute?** Check out [CONTRIBUTING.md](CONTRIBUTING.md)!
