# Typewriter

A minimal, single-page writing app. Just you and the text—no toolbars, no accounts. Inspired by the focus of a typewriter, built for the web.

## Features

- **Distraction-free writing** — One full-screen editor, optional “distraction-free” mode that hides the UI (footer, shortcuts, theme toggle) until you need it.
- **Light / dark theme** — Follows the system until you toggle it with the button or **Ctrl+K** (**⌘K** on macOS). The favicon follows the current theme.
- **Plain text** — The editor is `contenteditable="plaintext-only"`: pasted or dropped formatting is stripped, and only plain text is stored.
- **Auto-save** — Text and preferences are saved to localStorage as you type, and flushed when the tab is hidden or closed. Open tabs stay in sync.
- **Keyboard shortcuts** — **Ctrl+S** / **⌘S** to save, **Ctrl+K** / **⌘K** to switch theme, **Esc** to leave distraction-free mode. Hover, click or tap the bottom-right corner to see the list.
- **Accessible** — Focus outlines, toggle buttons with `aria-pressed`, a polite status for saves, a native popover for shortcuts. Respects `prefers-reduced-motion`.
- **Offline** — Installable, with a network-first service worker.
- **No build step** — One `index.html`, vanilla JS, and custom elements. Open the file or serve the folder and you’re done.

## Run locally

Serve the project root with any static server, then open the URL in your browser.

```bash
# Examples (from the project root)
npx serve .
# or
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly works too, without offline support.

## Tech

- Single HTML file with embedded CSS and JavaScript (ES module), plus `sw.js` and `manifest.webmanifest`.
- Custom elements: `typewriter-editor`, `typewriter-footer`, `typewriter-theme-toggle`, `typewriter-distraction-toggle`, `typewriter-shortcuts`.
- Layout and spacing use a simple golden-ratio scale (φ). Colors use `light-dark()` and `color-mix()`. No frameworks or build tools.

## License

MIT.
