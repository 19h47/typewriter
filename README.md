# Typewriter

A minimal, single-page writing app. Just you and the text—no toolbars, no accounts. Inspired by the focus of a typewriter, built for the web.

## Features

- **Distraction-free writing** — One full-screen editor, optional “distraction-free” mode that hides the UI (footer, shortcuts, theme toggle) until you need it.
- **Light / dark theme** — Toggle with the button or **Ctrl+K**. Theme and favicon follow the current mode.
- **Auto-save** — Content is saved to your browser (localStorage). Your text and preferences persist across sessions.
- **Keyboard shortcuts** — **Ctrl+S** to save, **Ctrl+K** to switch theme. Hover or focus the bottom-right corner to see the full list.
- **Accessible** — Focus outlines, screen-reader–friendly labels, and a proper shortcuts panel (keyboard + hover). Respects `prefers-reduced-motion` where relevant.
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

Opening `index.html` directly in the browser works too; localStorage will still save your content.

## Tech

- Single HTML file with embedded CSS and JavaScript.
- Custom elements: `typewriter-editor`, `typewriter-footer`, `typewriter-theme-toggle`, `typewriter-distraction-toggle`, `typewriter-shortcuts`.
- Layout and spacing use a simple golden-ratio scale (φ). No frameworks or build tools.

## License

MIT.
