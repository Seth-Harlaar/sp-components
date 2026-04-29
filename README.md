# Component Library

Custom HTML web components built with [Lit](https://lit.dev), hosted on GitHub and served via jsDelivr CDN. No build step, no npm publish — source files are the artifact.

## Importing a Component

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/gh/{username}/{repo}@latest/components/component-name.js'
</script>
```

Replace `{username}` and `{repo}` with your GitHub username and repo name. Components self-register as custom elements, so the tag is available immediately after the import.

## Theming

Theming is built on CSS custom properties (variables) that cascade through Shadow DOM. The `<sp-theme>` component loads the token and theme CSS, and sets a `data-theme` attribute that scopes all variable overrides.

### Basic usage

```html
<script type="module">
  import 'https://cdn.jsdelivr.net/gh/{username}/{repo}@latest/components/sp-theme.js'
  import 'https://cdn.jsdelivr.net/gh/{username}/{repo}@latest/components/my-button.js'
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

### Adding a theme

1. Create `themes/your-theme.css`
2. Override any variables from `themes/default.css`:

```css
[data-theme="your-theme"] {
  --color-primary: #e11d48;
  --color-bg:      #fdf2f8;
  /* only override what changes */
}
```

3. Use it: `<sp-theme name="your-theme">`

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

### Future: `::part()` for deeper customization

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

## Adding a Component

1. Create `components/your-component-name.js`
2. Use this template:

```js
import { LitElement, html, css } from 'https://esm.sh/lit@3'

class YourComponentName extends LitElement {
  static styles = css`
    :host { display: block; }

    /* Use tokens — never hardcode colors, spacing, or radii */
    .root {
      color: var(--color-text);
      background: var(--color-bg);
      padding: var(--space-4);
      border-radius: var(--radius-md);
    }
  `

  static properties = {
    // define reactive properties here
  }

  render() {
    /* Add part="" attributes to elements consumers may want to style */
    return html`<div class="root" part="root"><slot></slot></div>`
  }
}

customElements.define('your-component-name', YourComponentName)
```

3. Commit and push — the component is live on the CDN immediately.
4. Update `docs/index.html` to list the new component.

## Versioning

- `@latest` — always the newest commit on the default branch
- `@v1.0.0` — pin to a specific git tag for stability in production

To create a version tag: `git tag v1.0.0 && git push --tags`

## How It Works

- **jsDelivr** serves files directly from this GitHub repo — no npm publish needed
- **esm.sh** resolves the `lit` package as a proper ES module for the browser
- The browser deduplicates the Lit import: even if 10 components are on one page, Lit loads once and is shared across all of them
- **CSS custom properties** cascade through Shadow DOM boundaries, making them the right primitive for theming web components

## Docs

Enable GitHub Pages in repo settings (source: `docs/` folder on `main`) to publish the component catalog at `https://{username}.github.io/{repo}/`.
