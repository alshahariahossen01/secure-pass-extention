# Contributing to Secure Pass Vault

Thank you for your interest in contributing to Secure Pass Vault! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## How to Contribute

### Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Use the bug report template** when creating a new issue
3. **Provide detailed information**:
   - Browser and version
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Error messages or console logs

### Suggesting Features

1. **Check existing feature requests** to avoid duplicates
2. **Clearly describe the feature**:
   - What problem does it solve?
   - How should it work?
   - Why is it valuable?
3. **Consider security implications** for a password manager

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test thoroughly**
5. **Commit with clear messages** (`git commit -m 'Add amazing feature'`)
6. **Push to your fork** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

## Development Setup

### Prerequisites

- Node.js (v14 or higher)
- A Chromium-based browser or Firefox
- Git

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/secure-pass-extention.git

# Navigate to the directory
cd secure-pass-extention

# Load the extension in your browser (see INSTALLATION.md)
```

### Project Structure

```
secure-pass-extention/
├── manifest.json          # Extension manifest
├── popup/                 # Extension popup UI
│   ├── popup.html
│   ├── popup.css
│   └── popup.js
├── background/            # Background service worker
│   └── background.js
├── content/              # Content scripts
│   └── content.js
├── options/              # Settings page
│   ├── options.html
│   ├── options.css
│   └── options.js
└── icons/                # Extension icons
```

## Coding Guidelines

### JavaScript

- Use modern ES6+ syntax
- Follow consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Avoid global variables
- Use async/await for asynchronous operations

### CSS

- Use class selectors over ID selectors
- Follow BEM naming convention when appropriate
- Keep specificity low
- Group related properties
- Use CSS custom properties for theming

### Security Best Practices

**CRITICAL**: This is a security-focused application. Always consider:

1. **Never store passwords in plain text**
2. **Always use Web Crypto API for encryption**
3. **Validate and sanitize all inputs**
4. **Avoid using eval() or similar**
5. **Follow principle of least privilege**
6. **Never log sensitive information**
7. **Use Content Security Policy**

### Testing

Before submitting a PR:

1. **Manual Testing**
   - Test in Chrome and Firefox
   - Test all features thoroughly
   - Test edge cases and error conditions

2. **Security Testing**
   - Verify encryption/decryption works
   - Test with various password strengths
   - Ensure no data leaks

3. **UI Testing**
   - Test on different screen sizes
   - Verify responsive design
   - Check accessibility

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **perf**: Performance improvements
- **test**: Adding tests
- **chore**: Maintenance tasks

### Examples

```
feat: Add password history feature

Add ability to view previously used passwords for each account.
Passwords are stored encrypted with timestamps.

Closes #123
```

```
fix: Correct TOTP timer calculation

Fixed an issue where TOTP codes were regenerating at incorrect intervals.
Now properly syncs with 30-second intervals.

Fixes #456
```

## Feature Development Checklist

- [ ] Feature implements security best practices
- [ ] Code follows project coding guidelines
- [ ] All existing features still work
- [ ] Feature is documented in README
- [ ] Changes are tested in multiple browsers
- [ ] No sensitive data is logged
- [ ] Commit messages follow guidelines
- [ ] PR description clearly explains changes

## Security Vulnerability Reporting

**DO NOT** open public issues for security vulnerabilities.

Instead:
1. Email security concerns to: security@securepassvault.com (TBD)
2. Include detailed information about the vulnerability
3. Allow time for the issue to be addressed before public disclosure

## Questions?

- Open a GitHub issue for general questions
- Check existing documentation
- Review closed issues for similar questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Thank You!

Your contributions help make Secure Pass Vault better for everyone. We appreciate your time and effort!
