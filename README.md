# Typewriter

A minimal, single-page writing app. Just you and the text—no toolbars, no accounts. Inspired by the focus of a typewriter, built for the web.

## Features

- **Distraction-free writing** — One full-screen editor, optional “distraction-free” mode that hides the UI (footer, shortcuts, export, theme toggle) until you need it.
- **Light / dark theme** — Follows the system until you toggle it with the button or **Ctrl+K** (**⌘K** on macOS). The favicon follows the current theme.
- **Plain text** — The editor is `contenteditable="plaintext-only"`: pasted or dropped formatting is stripped, and only plain text is stored.
- **Export** — Download your text as a dated `.txt` file with the ⤓ link, top right.
- **Auto-save** — Text and preferences are saved to localStorage as you type, and flushed when the tab is hidden or closed. Open tabs stay in sync: a tab follows the others unless it has unsaved changes of its own.
- **Keyboard shortcuts** — **Ctrl+S** / **⌘S** to save, **Ctrl+K** / **⌘K** to switch theme, **Esc** to leave distraction-free mode. Hover, click or tap the bottom-right corner to see the list.
- **Accessible** — Focus outlines, toggle buttons with `aria-pressed`, a polite status for the saves you ask for (autosaves are not read aloud), a native popover for shortcuts. Respects `prefers-reduced-motion`.
- **Offline** — Installable. The service worker answers from its cache right away, even on a slow network, and refreshes it in the background: a new version shows on the next visit.
- **No build step** — One `index.html` and its `app-style.css`, vanilla JS, and custom elements. Open the file or serve the folder and you’re done.

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

- One HTML file with its JavaScript and the styles of its own, plus `app-style.css` for the base styles, `sw.js` and `manifest.webmanifest`. The service worker caches `app-style.css` with the page.
- One store, `window.store`, created by a classic script in `<head>` before the first paint. It holds the state (`text`, `theme`, `themeChosen`, `distractionFree`, `saved`), saves it to localStorage and sets `data-theme` and `data-distraction-free` on `<html>`.
- Every custom element is a brick: it reads the store with `select()` and changes it through its actions (`setText`, `toggleTheme`, `toggleDistractionFree`, `save`). No brick knows another, so removing one leaves the others working.
- Custom elements: `typewriter-editor`, `typewriter-word-count`, `typewriter-save-status`, `typewriter-export`, `typewriter-theme-toggle`, `typewriter-distraction-free-toggle`, `typewriter-shortcuts`.
- `app-style.css` is the base shared by the small apps (Tumblr, Messenger, SMS, Tweets, Typewriter, Library), copied from [its gist](https://gist.github.com/19h47/27df983fac74beb8d3e0a30688654498) with the revision in its header: the toolbar (`.app-toolbar`) and the footer (`.app-footer`) come from it; `index.html` adds the editor, the shortcuts and the distraction-free mode. A golden-ratio scale (φ), colors with `light-dark()` and `color-mix()`, classes prefixed `app-`. To update it, copy a newer revision and change `CACHE` in `sw.js`. No frameworks or build tools.

## License

MIT.
