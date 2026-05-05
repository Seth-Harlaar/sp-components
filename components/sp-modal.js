import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpModal extends LitElement {
  static styles = css`
    :host {
      display: none;
      position: fixed;
      inset: 0;
      z-index: var(--z-popup, 1000);
      align-items: center;
      justify-content: center;
    }

    :host([open]) {
      display: flex;
    }

    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
    }

    .dialog {
      position: relative;
      background: var(--color-surface, var(--color-bg-raised, #fff));
      border: 1px solid var(--color-border);
      border-radius: var(--radius-xl, 0.5rem);
      box-shadow: var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.4));
      max-width: var(--sp-modal-width, 480px);
      width: 100%;
      max-height: 90vh;
      margin: var(--space-5, 1rem);
      display: flex;
      flex-direction: column;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: var(--space-7, 1rem) var(--space-9, 1.25rem);
      border-bottom: 1px solid var(--color-border);
      flex-shrink: 0;
    }

    .title {
      font-family: var(--font-ui, monospace);
      font-size: var(--text-xs, 0.75rem);
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-text-alt, var(--color-text));
    }

    .close-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-text);
      opacity: 0.55;
      padding: var(--space-2, 0.25rem) var(--space-3, 0.5rem);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm, 0.25rem);
      transition: opacity 0.15s ease, background 0.15s ease;
      line-height: 1;
      font-size: 1.1rem;
    }

    .close-btn:hover {
      opacity: 1;
      background: var(--color-surface-2, var(--color-bg-subtle));
    }

    .body {
      padding: var(--space-9, 1.25rem);
      overflow-y: auto;
      flex: 1;
    }

    .footer {
      padding: var(--space-7, 1rem) var(--space-9, 1.25rem);
      border-top: 1px solid var(--color-border);
      flex-shrink: 0;
    }

    ::slotted([slot='footer']:empty) {
      display: none;
    }
  `

  static properties = {
    open:    { type: Boolean, reflect: true },
    heading: { type: String },
  }

  constructor() {
    super()
    this.open = false
    this.heading = ''
    this._handleKeyDown = this._handleKeyDown.bind(this)
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('keydown', this._handleKeyDown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('keydown', this._handleKeyDown)
  }

  _handleKeyDown(e) {
    if (e.key === 'Escape' && this.open) this.close()
  }

  show() {
    this.open = true
    this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }))
  }

  close() {
    this.open = false
    this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <div class="backdrop" part="backdrop" @click=${this.close}></div>
      <div class="dialog" part="dialog">
        <div class="header" part="header">
          <span class="title">${this.heading}</span>
          <button class="close-btn" @click=${this.close} aria-label="Close">✕</button>
        </div>
        <div class="body" part="body">
          <slot></slot>
        </div>
        <div class="footer" part="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    `
  }
}

customElements.define('sp-modal', SpModal)
