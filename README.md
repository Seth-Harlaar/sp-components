# Component Library

Custom HTML web components built with [Lit](https://lit.dev), hosted on GitHub and served via jsDelivr CDN. No build step, no npm publish — source files are the artifact.

## Importing a Component

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/component-name.js'
</script>
```

Replace `Seth-Harlaar` and `sp-components` with your GitHub username and repo name. Components self-register as custom elements, so the tag is available immediately after the import.

## Components

| Component | File | Description |
|-----------|------|-------------|
| `sp-theme` | `components/sp-theme.js` | Loads theme CSS and sets `data-theme`. Attr: `name` |
| `sp-card` | `components/sp-card.js` | Content card. Attrs: `interactive`, `accent` |
| `sp-button` | `components/sp-button.js` | Button. Attrs: `variant` (default/primary/outline/ghost), `size` (sm/md/lg), `full`, `disabled` |
| `sp-tag` | `components/sp-tag.js` | Pill label. Attr: `color` (primary/success/warning/error/info) |
| `sp-nav` | `components/sp-nav.js` | Header nav. Slots: `brand`, default, `actions`. Attr: `sticky` |

### Example

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-theme.js'
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-nav.js'
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-card.js'
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-button.js'
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-tag.js'
</script>

<sp-theme name="dark">
  <sp-nav sticky>
    <span slot="brand">My Site</span>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <sp-button slot="actions" variant="primary">Sign in</sp-button>
  </sp-nav>

  <sp-card interactive accent>
    <sp-tag color="primary">New</sp-tag>
    <p>Card content goes here.</p>
    <sp-button variant="outline">Read more</sp-button>
  </sp-card>
</sp-theme>
```

## Theming

Theming is built on CSS custom properties (variables) that cascade through Shadow DOM. The `<sp-theme>` component loads the token and theme CSS, and sets a `data-theme` attribute that scopes all variable overrides.

### Basic usage

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/sp-theme.js'
  import 'https://cdn.jsdelivr.net/gh/Seth-Harlaar/sp-components@latest/components/my-button.js'
</script>

<sp-theme name="dark">
  <my-button>Click me</my-button>
</sp-theme>
```

### Switching themes at runtime

```js
document.querySelector('sp-theme').name = 'dark'
document.querySelector('sp-theme').name = 'default'
```

### Available themes

| Name | File |
|------|------|
| `default` | `themes/default.css` (light, built-in) |
| `dark` | `themes/dark.css` |

### Overriding tokens in your project

Load `sp-theme` first, then override any variables in your own stylesheet — your values win because they load after the theme files.

**Global overrides** (apply to all themes):

```css
/* your-project.css */
:root {
  --color-primary:       #e11d48;
  --color-primary-hover: #be123c;
  --font-family-base:    Georgia, serif;
}
```

**Theme-scoped overrides** (only apply when a specific theme is active):

```css
[data-theme="dark"] {
  --color-primary: #fb7185; /* lighter pink for dark bg */
}
```

**Component-specific overrides** via `::part()`:

```css
sp-button::part(button) {
  border-radius: 9999px; /* pill shape for this project */
  letter-spacing: 0.05em;
}
```

### Using CSS variables in components

All components should use tokens instead of hardcoded values:

```js
static styles = css`
  :host { display: block; }

  button {
    background: var(--color-primary);
    color:      var(--color-primary-contrast);
    padding:    var(--space-2) var(--space-4);
    font-size:  var(--font-size-sm);
    border-radius: var(--radius-md);
    transition: background var(--transition-fast);
  }

  button:hover {
    background: var(--color-primary-hover);
  }
`
```

### `::part()` for deeper customization

Components expose their internals via `part` attributes, enabling consumers to write CSS that pierces Shadow DOM without modifying the component:

```js
// In a component template:
render() {
  return html`<button part="button"><slot></slot></button>`
}
```

```css
/* In consumer CSS — no JS or theme changes needed */
my-button::part(button) {
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}
```

Every component you write should expose meaningful `part` attributes on its key elements.

## How It Works

- **jsDelivr** serves files directly from this GitHub repo — no npm publish needed
- **esm.sh** resolves the `lit` package as a proper ES module for the browser
- The browser deduplicates the Lit import: even if 10 components are on one page, Lit loads once and is shared across all of them
- **CSS custom properties** cascade through Shadow DOM boundaries, making them the right primitive for theming web components
