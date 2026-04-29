import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpNav extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([sticky]) {
      position: sticky;
      top: 0;
      z-index: var(--z-raised, 10);
    }

    nav {
      display: flex;
      align-items: center;
      gap: var(--space-6, 1.5rem);
      padding: var(--space-4, 1rem) var(--space-6, 1.5rem);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-bg);
    }

    :host([sticky]) nav {
      background: color-mix(in srgb, var(--color-bg) 88%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .brand {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .links {
      display: flex;
      align-items: center;
      gap: var(--space-4, 1rem);
      flex: 1;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-3, 0.75rem);
      margin-left: auto;
      flex-shrink: 0;
    }
  `

  static properties = {
    sticky: { type: Boolean, reflect: true },
  }

  render() {
    return html`
      <nav part="nav">
        <div class="brand" part="brand">
          <slot name="brand"></slot>
        </div>
        <div class="links" part="links">
          <slot></slot>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>
      </nav>
    `
  }
}

customElements.define('sp-nav', SpNav)
