```markdown
# Plugged In Notes ⚡

A modern, feature-rich note-taking web app designed for developers, writers, and productivity enthusiasts and built with a vanilla JavaScript interface.

## Features ✨

### Core Functionality
- **Rich Text & Markdown Toggle** - Switch between WYSIWYG formatting and Markdown syntax
- **Code-Friendly Editor**  
  - 10+ monospace fonts (Fira Code, JetBrains Mono, etc.)
  - Custom text/highlight colors
  - GitHub-like scrollbars
- **Organizational Tools**
  - Unlimited notes with auto-save
  - Tag system with quick filtering
  - Search/replace with highlight
- **Export Options** - Save notes as PDFs
- **Dark/Light Mode** - Eye-friendly themes

### Technical Highlights
- 🚀 **Zero Dependencies** (except `marked.js` and `jsPDF`)
- 📱 **Responsive Design** - Collapsible sidebar for mobile
- ⌨️ **Keyboard Shortcuts** (Ctrl+S, Ctrl+Z, Ctrl+B)
- 📈 Real-time word/letter counter
- 🔄 Auto-save every 2 seconds
- 🎨 CSS Custom Properties for easy theming

## Installation & Usage 🛠️

### Quick Start
1. Clone the repo:
   ```bash
   git clone https://github.com/seershan/plugged-in-notes.git
   ```
2. Open `index.html` in a modern browser

### Requirements
- Modern browser with JavaScript enabled
- Internet connection (for CDN resources)

## Documentation 📖

### Basic Controls
| Action                  | Button/Shortcut            |
|-------------------------|----------------------------|
| New Note                | <kbd>New Note</kbd> button |
| Save Note               | <kbd>Ctrl+S</kbd>          |
| Toggle Dark Mode        | Moon icon (☀️/🌙)          |
| Export PDF              | <kbd>Export PDF</kbd>      |
| Toggle Sidebar (Mobile) | <kbd>☰</kbd> hamburger     |

### Advanced Features
1. **Tag Management**:
   - Add tags: Type in tag input + click <kbd>+</kbd>
   - Remove tags: Click <kbd>×</kbd> on tags

2. **Code Formatting**:
   ```markdown
   Toggle Markdown mode for:
   - `inline code`
   - # Headers
   - *italics* **bold**
   ```

3. **Search/Replace**:
   - Use footer inputs for batch text operations

## Customization 🎨

### Theme Variables (styles.css)
```css
:root {
  --primary-color: #0366d6;
  --secondary-color: #f6f8fa;
  --text-color: #24292e;
  /* Adjust these values for custom themes */
}
```

### Font Configuration
Modify the `fontFamily` dropdown in `index.html` to add/remove monospace fonts.

## Roadmap 🗺️

- [ ] Cloud Sync Integration
- [ ] Note Version History
- [ ] Code Syntax Highlighting
- [ ] Multi-language Support

## Contributing 🤝

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


**Made with ❤️ by [Seershan Mitra]**  
[![GitHub Stars](https://img.shields.io/github/stars/seershan/plugged-in-notes?style=social)](https://github.com/seershan/plugged-in-notes)
```

This README includes:
- Feature overview
- Installation instructions
- Usage documentation
- Customization guide
- Contribution guidelines
- Responsive design notes
- Future roadmap
- License information
