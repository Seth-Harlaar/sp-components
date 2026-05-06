import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-bg-raised);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg, 0.5rem);
      padding: var(--space-4, 1rem) var(--space-5, 1.25rem);
      overflow: hidden;
      position: relative;
    }

    :host([accent]) .card::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--sp-card-accent, var(--color-primary));
    }

    :host([interactive]) .card {
      cursor: pointer;
      transition: transform var(--transition-normal, 200ms ease),
                  border-color var(--transition-normal, 200ms ease),
                  box-shadow var(--transition-normal, 200ms ease);
    }

    :host([interactive]) .card:hover {
      transform: translateY(-2px);
      border-color: var(--color-border-strong);
      box-shadow: var(--shadow-md);
    }

    :host([raised]) .card {
      box-shadow: var(--shadow-md, 0 4px 20px rgba(0, 0, 0, 0.4));
    }

    :host([bordered]) .card {
      border: 2px solid var(--color-border-strong, #94a3b8);
    }

    :host([size="sm"]) .card {
      padding: var(--space-3, 0.75rem) var(--space-4, 1rem);
      border-radius: var(--radius-md, 0.375rem);
    }

    :host([size="lg"]) .card {
      padding: var(--space-6, 1.5rem) var(--space-8, 2rem);
      border-radius: var(--radius-xl, 0.75rem);
    }
  `

  static properties = {
    interactive: { type: Boolean, reflect: true },
    accent:      { type: Boolean, reflect: true },
    raised:      { type: Boolean, reflect: true },
    bordered:    { type: Boolean, reflect: true },
    size:        { type: String,  reflect: true },
  }

  render() {
    return html`<div class="card" part="card"><slot></slot></div>`
  }
}

customElements.define('sp-card', SpCard)
