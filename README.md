# Typewriter

A minimal, single-page writing app. Just you and the text—no toolbars, no accounts. Inspired by the focus of a typewriter, built for the web.

## Features

- **Distraction-free writing** — One full-screen editor, optional “distraction-free” mode that hides the UI (footer, shortcuts, texts, export, theme toggle) until you need it.
- **Several texts** — The ≡ button, top right, lists the texts, the one written last first, titled by their first line, with the words of each counted beside its date and of all of them beside the title of the list: open one, start a new one, or remove one (after a confirmation). A blank text is not kept. The page reopens the text open last.
- **Light / dark theme** — Follows the system until you toggle it with the button or **Ctrl+K** (**⌘K** on macOS). The favicon, the keyboard of Material Symbols grey on the background of the theme like the book of Library, follows the current theme; on the home screen of a phone, where the icon of a web app does not follow the system theme, it is the dark one.
- **Plain text** — The editor is `contenteditable="plaintext-only"`: pasted or dropped formatting is stripped, and only plain text is stored.
- **Export** — Download the text open as a `.txt` file, named after its first line and dated, with the ⤓ link, top right.
- **Auto-save** — Texts and preferences are saved to localStorage as you type, and flushed when the tab is hidden or closed. Open tabs stay in sync: a tab follows the others unless it has unsaved changes of its own, and keeps the text it has open. A save that fails, such as with the storage full, says so in the footer until one goes through.
- **Keyboard shortcuts** — **Ctrl+S** / **⌘S** to save, **Ctrl+K** / **⌘K** to switch theme, **Esc** to leave distraction-free mode. Hover, click or tap the bottom-right corner to see the list.
- **Accessible** — Focus outlines, toggle buttons with `aria-pressed`, a polite status for the saves you ask for and for the ones that fail (autosaves are not read aloud), native popovers for the shortcuts and the texts, the text open marked with `aria-current`. Respects `prefers-reduced-motion`.
- **Offline** — Installable. The service worker answers from its cache right away, even on a slow network, and refreshes it in the background: a new version shows on the next visit.
- **No build step** — One `index.html` and its `app-style.css`, vanilla JS, and custom elements. Open the file or serve the folder and you’re done.

## Limits

localStorage holds about 5 MiB per origin, a few million characters, shared with every app served from the same origin (19h47.github.io). Safari may clear it after seven days of use without a visit, unless the app is installed on the Home Screen or in the Dock: export what matters.

## Breaking changes

- **Several texts** — The text no longer lives in `typewriter-store` but in a `typewriter-text:<id>` key of its own. The text saved before is not carried over: export it from the previous version first.

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
- One store, `window.store`, created by a classic script in `<head>` before the first paint. It holds the state (`texts`, `current`, `theme`, `themeChosen`, `distractionFree`, `saved`, `lastSave`), saves it to localStorage and sets `data-theme` and `data-distraction-free` on `<html>`.
- localStorage holds one key per text, `typewriter-text:<id>` (`{ text, updatedAt }`), so that a keystroke rewrites only the text open, and `typewriter-store` for the preferences and the text open last. The list of texts is the list of these keys. The first save asks the browser to keep the storage persistent (`navigator.storage.persist()`).
- Every custom element is a brick: it reads the store with `select()` and changes it through its actions (`setText`, `create`, `open`, `remove`, `toggleTheme`, `toggleDistractionFree`, `save`). No brick knows another, so removing one leaves the others working.
- Custom elements: `typewriter-editor`, `typewriter-word-count`, `typewriter-save-status`, `typewriter-documents`, `typewriter-export`, `typewriter-theme-toggle`, `typewriter-distraction-free-toggle`, `typewriter-shortcuts`.
- `app-style.css` is the base shared by the small apps (Tumblr, Messenger, SMS, Tweets, Typewriter, Library, Letterhead, Overlay), copied from [its gist](https://gist.github.com/19h47/27df983fac74beb8d3e0a30688654498) with the revision in its header: the toolbar (`.app-toolbar`) and the footer (`.app-footer`) come from it; `index.html` adds the editor, the shortcuts and the distraction-free mode. A golden-ratio scale (φ), colors with `light-dark()` and `color-mix()`, classes prefixed `app-`. To update it, copy a newer revision and change `CACHE` in `sw.js`. No frameworks or build tools.

## License

MIT. The keyboard of the favicon is from [Material Symbols](https://github.com/google/material-design-icons), by Google, under the [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0).
